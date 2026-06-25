import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { Voucher, VoucherType } from '../../generated/prisma/client';
import { UpdateVoucherDto } from './dto/update-voucher.dto';

export interface ApplyVoucherResult {
  voucher: Voucher;
  discountAmount: number;
  finalShippingCost: number;
  usedCount: number;
}

@Injectable()
export class VoucherService {
  constructor(private readonly prisma: PrismaService) {}

  // ─── Admin: Create Voucher ────────────────────────────────────────────────

  async create(dto: CreateVoucherDto) {
    const code = dto.code.toUpperCase().trim();

    const exists = await this.prisma.voucher.findUnique({ where: { code } });
    if (exists) throw new BadRequestException(`Kode voucher "${code}" sudah digunakan`);

    return this.prisma.voucher.create({
      data: {
        code,
        type: dto.type,
        source: dto.source ?? 'manual',
        value: dto.value,
        minPurchase: dto.minPurchase ?? 0,
        maxDiscount: dto.maxDiscount,
        usageLimit: dto.usageLimit,
        isActive: dto.isActive ?? true,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
        ownerId: dto.ownerId,
      },
    });
  }

  // ─── Admin: Update Voucher ────────────────────────────────────────────────

  async update(id: string, dto: UpdateVoucherDto) {
    await this.findById(id);
    return this.prisma.voucher.update({
      where: { id },
      data: {
        ...(dto.code && { code: dto.code.toUpperCase().trim() }),
        ...(dto.type && { type: dto.type }),
        ...(dto.source && { source: dto.source }),
        ...(dto.value !== undefined && { value: dto.value }),
        ...(dto.minPurchase !== undefined && { minPurchase: dto.minPurchase }),
        ...(dto.maxDiscount !== undefined && { maxDiscount: dto.maxDiscount }),
        ...(dto.usageLimit !== undefined && { usageLimit: dto.usageLimit }),
        ...(dto.isActive !== undefined && { isActive: dto.isActive }),
        ...(dto.startDate && { startDate: new Date(dto.startDate) }),
        ...(dto.endDate && { endDate: new Date(dto.endDate) }),
        ...(dto.ownerId !== undefined && { ownerId: dto.ownerId }),
      },
    });
  }

  // ─── Admin: List All Vouchers ─────────────────────────────────────────────

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [vouchers, total] = await Promise.all([
      this.prisma.voucher.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { owner: { select: { id: true, name: true, email: true } } },
      }),
      this.prisma.voucher.count(),
    ]);

    return { data: vouchers, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  // ─── Admin: Deactivate ────────────────────────────────────────────────────

  async deactivate(id: string) {
    await this.findById(id);
    return this.prisma.voucher.update({
      where: { id },
      data: { isActive: false },
    });
  }

  // ─── User: Get My Vouchers ────────────────────────────────────────────────

  async getMyVouchers(userId: string) {
    const now = new Date();
    return this.prisma.voucher.findMany({
      where: {
        ownerId: userId,
        isActive: true,
        OR: [{ endDate: null }, { endDate: { gte: now } }],
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // ─── User: Validate Voucher ───────────────────────────────────────────────

  /**
   * Validasi voucher sebelum checkout. Tidak mengubah state DB.
   * Mengembalikan { valid: true, discountAmount, finalShippingCost } jika valid.
   */
  async validate(
    code: string,
    subtotal: number,
    shippingCost: number,
    userId?: string,
  ) {
    const voucher = await this.findValidVoucherByCode(code, subtotal, userId);
    const { discountAmount, finalShippingCost, usedCount } = this.buildApplyVoucherResult(
      voucher,
      subtotal,
      shippingCost,
    );

    return {
      valid: true,
      voucher,
      discountAmount,
      finalShippingCost,
      usedCount,
    };
  }

  async apply(code: string, subtotal: number, userId?: string) {
    const voucher = await this.findValidVoucherByCode(code, subtotal, userId);
    const { discountAmount, finalShippingCost, usedCount } = this.buildApplyVoucherResult(
      voucher,
      subtotal,
      0,
    );

    return {
      valid: true,
      voucher,
      discountAmount,
      finalShippingCost,
      usedCount,
    };
  }

  async validateById(
    voucherId: string,
    subtotal: number,
    shippingCost: number,
    userId?: string,
  ) {
    const voucher = await this.findValidVoucherById(voucherId, subtotal, userId);
    const { discountAmount, finalShippingCost, usedCount } = this.buildApplyVoucherResult(
      voucher,
      subtotal,
      shippingCost,
    );

    return {
      valid: true,
      voucher,
      discountAmount,
      finalShippingCost,
      usedCount,
    };
  }

  // ─── Internal: Apply Voucher (dipanggil saat order dibuat) ────YYYYY───────────

  /**
   * Dipanggil dari OrdersService di dalam transaksi.
   * Increment usedCount dan kembalikan nilai diskon.
   */
  async applyVoucher(
    tx: any,
    voucherId: string,
    subtotal: number,
    userId?: string,
  ): Promise<{ discountAmount: number; finalShippingCost: number; usedCount: number }> {
    const voucher = await tx.voucher.findUnique({ where: { id: voucherId } });
    const validVoucher = this.assertVoucherCanBeApplied(voucher, subtotal, userId);
    const result = this.buildApplyVoucherResult(validVoucher, subtotal, 0);

    // Increment usedCount
    const updatedVoucher = await tx.voucher.update({
      where: { id: voucherId },
      data: { usedCount: { increment: 1 } },
    });

    return {
      discountAmount: result.discountAmount,
      finalShippingCost: result.finalShippingCost,
      usedCount: updatedVoucher.usedCount,
    };
  }

  // ─── Private: Kalkulasi Diskon ────────────────────────────────────────────

  private calculateDiscount(voucher: Voucher, subtotal: number): number {
    let discountAmount = 0;

    const value = Number(voucher.value);
    const maxDiscount = voucher.maxDiscount ? Number(voucher.maxDiscount) : Infinity;

    switch (voucher.type as VoucherType) {
      case VoucherType.percentage:
        discountAmount = Math.min((subtotal * value) / 100, maxDiscount);
        break;

      case VoucherType.fixed:
        discountAmount = Math.min(value, subtotal); // tidak melebihi subtotal
        break;

      case VoucherType.free_shipping:
        discountAmount = 0;
        break;
    }

    return Math.floor(discountAmount);
  }

  private buildApplyVoucherResult(
    voucher: Voucher,
    subtotal: number,
    shippingCost: number,
  ): ApplyVoucherResult {
    return {
      voucher,
      discountAmount: this.calculateDiscount(voucher, subtotal),
      finalShippingCost: shippingCost,
      usedCount: voucher.usedCount,
    };
  }

  private async findValidVoucherByCode(code: string, subtotal: number, userId?: string) {
    const voucher = await this.prisma.voucher.findUnique({ where: { code: code.toUpperCase().trim() } });
    return this.assertVoucherCanBeApplied(voucher, subtotal, userId);
  }

  private async findValidVoucherById(voucherId: string, subtotal: number, userId?: string) {
    const voucher = await this.prisma.voucher.findUnique({ where: { id: voucherId } });
    return this.assertVoucherCanBeApplied(voucher, subtotal, userId);
  }

  private assertVoucherCanBeApplied(voucher: Voucher | null, subtotal: number, userId?: string) {
    if (!voucher) throw new NotFoundException('Voucher tidak ditemukan');
    if (!voucher.isActive) throw new BadRequestException('Voucher tidak aktif');

    const now = new Date();
    if (voucher.startDate && voucher.startDate > now)
      throw new BadRequestException('Voucher belum berlaku');
    if (voucher.endDate && voucher.endDate < now)
      throw new BadRequestException('Voucher sudah kadaluarsa');
    if (voucher.usageLimit !== null && voucher.usedCount >= voucher.usageLimit)
      throw new BadRequestException('Voucher sudah habis');
    if (subtotal < Number(voucher.minPurchase))
      throw new BadRequestException(
        `Minimum pembelian Rp ${Number(voucher.minPurchase).toLocaleString('id-ID')} untuk pakai voucher ini`,
      );
    if (voucher.ownerId && voucher.ownerId !== userId)
      throw new BadRequestException('Voucher ini tidak untuk akun Anda');

    return voucher;
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────

  private async findById(id: string) {
    const voucher = await this.prisma.voucher.findUnique({ where: { id } });
    if (!voucher) throw new NotFoundException('Voucher tidak ditemukan');
    return voucher;
  }
}