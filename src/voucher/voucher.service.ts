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

// Multiplier minimum purchase otomatis = 2x nilai voucher
const AUTO_MIN_PURCHASE_MULTIPLIER = 2;

@Injectable()
export class VoucherService {
  constructor(private readonly prisma: PrismaService) {}

  // ─── Admin: Create Voucher ────────────────────────────────────────────────

  async create(dto: CreateVoucherDto) {
    const code = dto.code.toUpperCase().trim();

    const exists = await this.prisma.voucher.findUnique({ where: { code } });
    if (exists) throw new BadRequestException(`Kode voucher "${code}" sudah digunakan`);

    // Auto-set minPurchase = 2x nilai voucher jika tidak diisi manual
    // Berlaku untuk fixed dan percentage; free_shipping tidak perlu
    const autoMinPurchase =
      dto.minPurchase !== undefined
        ? dto.minPurchase
        : dto.type !== 'free_shipping'
          ? dto.value * AUTO_MIN_PURCHASE_MULTIPLIER
          : 0;

    return this.prisma.voucher.create({
      data: {
        code,
        type: dto.type,
        source: dto.source ?? 'manual',
        value: dto.value,
        minPurchase: autoMinPurchase,
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

    return { valid: true, voucher, discountAmount, finalShippingCost, usedCount };
  }

  async apply(code: string, subtotal: number, userId?: string) {
    const voucher = await this.findValidVoucherByCode(code, subtotal, userId);
    const { discountAmount, finalShippingCost, usedCount } = this.buildApplyVoucherResult(
      voucher,
      subtotal,
      0,
    );

    return { valid: true, voucher, discountAmount, finalShippingCost, usedCount };
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

    return { valid: true, voucher, discountAmount, finalShippingCost, usedCount };
  }

  // ─── Internal: Apply Voucher (dipanggil saat order dibuat) ───────────────

  async applyVoucher(
    tx: any,
    voucherId: string,
    subtotal: number,
    userId?: string,
    shippingCost = 0,
  ): Promise<{ discountAmount: number; finalShippingCost: number; usedCount: number }> {
    const voucher = await tx.voucher.findUnique({ where: { id: voucherId } });
    const validVoucher = this.assertVoucherCanBeApplied(voucher, subtotal, userId);
    const result = this.buildApplyVoucherResult(validVoucher, subtotal, shippingCost);

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

  private calculateDiscount(voucher: Voucher, subtotal: number, shippingCost = 0): number {
    let discountAmount = 0;

    const value = Number(voucher.value);
    const maxDiscount = voucher.maxDiscount ? Number(voucher.maxDiscount) : Infinity;

    switch (voucher.type as VoucherType) {
      case VoucherType.percentage:
        discountAmount = Math.min((subtotal * value) / 100, maxDiscount);
        break;

      case VoucherType.fixed:
        discountAmount = value;
        break;

      case VoucherType.free_shipping:
        discountAmount = shippingCost;
        break;
    }

    return Math.floor(discountAmount);
  }

  private buildApplyVoucherResult(
    voucher: Voucher,
    subtotal: number,
    shippingCost: number,
  ): ApplyVoucherResult {
    const discountAmount = this.calculateDiscount(voucher, subtotal, shippingCost);
    return {
      voucher,
      discountAmount,
      finalShippingCost:
        voucher.type === VoucherType.free_shipping
          ? Math.max(0, shippingCost - discountAmount)
          : shippingCost,
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

    // Voucher fixed: nilai voucher tidak boleh >= subtotal
    if (voucher.type === VoucherType.fixed) {
      const value = Number(voucher.value);
      if (value >= subtotal) {
        throw new BadRequestException(
          `Nilai voucher (Rp ${value.toLocaleString('id-ID')}) melebihi atau sama dengan total belanja Anda (Rp ${subtotal.toLocaleString('id-ID')}). Tambahkan produk lagi untuk menggunakan voucher ini.`,
        );
      }
    }

    // Voucher percentage: diskon tidak boleh menghabiskan seluruh subtotal
    if (voucher.type === VoucherType.percentage) {
      const value = Number(voucher.value);
      const maxDiscount = voucher.maxDiscount ? Number(voucher.maxDiscount) : Infinity;
      const discountAmount = Math.min((subtotal * value) / 100, maxDiscount);
      if (discountAmount >= subtotal) {
        throw new BadRequestException(
          `Diskon voucher ini menghabiskan seluruh total belanja Anda. Tambahkan produk lagi untuk menggunakan voucher ini.`,
        );
      }
    }

    return voucher;
  }

  private async findById(id: string) {
    const voucher = await this.prisma.voucher.findUnique({ where: { id } });
    if (!voucher) throw new NotFoundException('Voucher tidak ditemukan');
    return voucher;
  }
}