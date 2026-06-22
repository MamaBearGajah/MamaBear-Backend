import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MembershipTier } from '../../generated/prisma/enums';
import {
  POINT_TO_RUPIAH,
  TIER_SHIPPING_BENEFIT,
  calculatePointsEarned,
  determineTier,
  MIN_REDEEM_POINTS,
} from './membership.constants';
import { RedeemPointsDto } from './dto/redeem-points.dto';

@Injectable()
export class MembershipService {
  private readonly logger = new Logger(MembershipService.name);

  constructor(private readonly prisma: PrismaService) {}

  // ─── Get or Create Membership ────────────────────────────────────────────────

  /**
   * Ambil membership milik user. Jika belum ada, buat otomatis (bronze).
   */
  async getOrCreate(userId: string) {
    const existing = await this.prisma.membership.findUnique({
      where: { userId },
    });
    if (existing) return existing;

    return this.prisma.membership.create({
      data: { userId },
    });
  }

  // ─── Get My Membership ───────────────────────────────────────────────────────

  async getMyMembership(userId: string) {
    const membership = await this.getOrCreate(userId);

    const pointTransactions = await this.prisma.pointTransaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    const myVouchers = await this.prisma.voucher.findMany({
      where: {
        ownerId: userId,
        isActive: true,
        OR: [{ endDate: null }, { endDate: { gte: new Date() } }],
      },
      orderBy: { createdAt: 'desc' },
    });

    return {
      membership,
      recentTransactions: pointTransactions,
      activeVouchers: myVouchers,
      nextTierInfo: this.getNextTierInfo(membership.tier, Number(membership.totalSpent)),
    };
  }

  // ─── Process Purchase ────────────────────────────────────────────────────────

  /**
   * Dipanggil dari OrdersService saat order status → delivered.
   * Menambahkan totalSpent, point, dan cek tier upgrade.
   */
  async processPurchase(userId: string, paidAmount: number, orderId: string) {
    const membership = await this.getOrCreate(userId);

    const earnedPoints = calculatePointsEarned(paidAmount);
    const newTotalSpent = Number(membership.totalSpent) + paidAmount;
    const newPoints = membership.points + earnedPoints;
    const newTier = determineTier(newTotalSpent);
    const tierUpgraded = newTier !== membership.tier;

    this.logger.log(
      `User ${userId}: spent +${paidAmount} → totalSpent=${newTotalSpent}, points +${earnedPoints}, tier=${newTier}`,
    );

    await this.prisma.$transaction(async (tx) => {
      // Update membership
      await tx.membership.update({
        where: { userId },
        data: {
          totalSpent: newTotalSpent,
          points: newPoints,
          tier: newTier,
          ...(tierUpgraded && { lastTierUpAt: new Date() }),
        },
      });

      // Catat point transaction
      if (earnedPoints > 0) {
        await tx.pointTransaction.create({
          data: {
            userId,
            points: earnedPoints,
            type: 'purchase',
            referenceId: orderId,
            description: `Point dari pembelian order #${orderId}`,
          },
        });
      }

      // Jika tier upgrade dan tier baru punya benefit ongkir → buat voucher ongkir
      if (tierUpgraded && newTier !== MembershipTier.bronze) {
        const shippingBenefit = TIER_SHIPPING_BENEFIT[newTier];
        if (shippingBenefit) {
          await this.issueShippingVoucher(tx, userId, newTier, shippingBenefit);
        }
      }
    });

    return {
      earnedPoints,
      newTotalSpent,
      newPoints,
      newTier,
      tierUpgraded,
    };
  }

  // ─── Redeem Points → Voucher ──────────────────────────────────────────────

  async redeemPoints(userId: string, dto: RedeemPointsDto) {
    const membership = await this.getOrCreate(userId);

    if (dto.points < MIN_REDEEM_POINTS) {
      throw new BadRequestException(
        `Minimal redeem ${MIN_REDEEM_POINTS} point`,
      );
    }

    if (membership.points < dto.points) {
      throw new BadRequestException(
        `Point tidak cukup. Kamu punya ${membership.points} point, ingin redeem ${dto.points} point`,
      );
    }

    const discountValue = dto.points * POINT_TO_RUPIAH;
    const voucherCode = await this.generateVoucherCode('RDM');

    // Masa berlaku voucher: 30 hari dari sekarang
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);

    const voucher = await this.prisma.$transaction(async (tx) => {
      // Kurangi point
      await tx.membership.update({
        where: { userId },
        data: { points: { decrement: dto.points } },
      });

      // Catat point transaction (negatif = keluar)
      await tx.pointTransaction.create({
        data: {
          userId,
          points: -dto.points,
          type: 'redeem',
          description: `Redeem ${dto.points} point → voucher potongan Rp ${discountValue.toLocaleString('id-ID')}`,
        },
      });

      // Buat voucher
      return tx.voucher.create({
        data: {
          code: voucherCode,
          type: 'fixed',
          source: 'point_redeem',
          value: discountValue,
          minPurchase: 0,
          usageLimit: 1,
          isActive: true,
          endDate,
          ownerId: userId,
        },
      });
    });

    return {
      voucher,
      pointsUsed: dto.points,
      discountValue,
      message: `Berhasil redeem ${dto.points} point. Voucher Rp ${discountValue.toLocaleString('id-ID')} telah diterbitkan dan berlaku 30 hari.`,
    };
  }

  /**
   * Daily login check-in.
   * - 5 point per hari
   * - Bonus 20 point setiap 7 hari login berturut-turut
   * - Hanya bisa diklaim 1x per hari (00:00 WIB)
   */
  async dailyLoginCheckIn(userId: string) {
    const membership = await this.getOrCreate(userId);

    const now = new Date();

    // Ambil awal hari ini (UTC+7 / WIB) — pakai UTC untuk konsistensi DB
    const todayStart = new Date(now);
    todayStart.setUTCHours(0, 0, 0, 0);

    // Cek apakah sudah check-in hari ini
    if (
      membership.lastDailyLoginAt &&
      membership.lastDailyLoginAt >= todayStart
    ) {
      const nextCheckIn = new Date(todayStart);
      nextCheckIn.setUTCDate(nextCheckIn.getUTCDate() + 1);

      return {
        alreadyClaimed: true,
        message: 'Kamu sudah check-in hari ini. Kembali lagi besok!',
        nextCheckIn,
        currentPoints: membership.points,
      };
    }

    // Hitung streak
    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setUTCDate(yesterdayStart.getUTCDate() - 1);

    const isConsecutive =
      membership.lastDailyLoginAt !== null &&
      membership.lastDailyLoginAt >= yesterdayStart;

    // Hitung streak count dari history transaksi
    const recentLoginTransactions = await this.prisma.pointTransaction.count({
      where: {
        userId,
        type: 'daily_login',
        createdAt: { gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) },
      },
    });

    // Streak count (termasuk hari ini)
    const streakCount = isConsecutive ? recentLoginTransactions + 1 : 1;
    const isStreakBonus = streakCount > 0 && streakCount % 7 === 0;

    const basePoints = 5;          // DAILY_LOGIN_POINTS
    const bonusPoints = isStreakBonus ? 20 : 0; // STREAK_BONUS_POINTS
    const totalPoints = basePoints + bonusPoints;

    await this.prisma.$transaction(async (tx) => {
      // Update membership: tambah point & set lastDailyLoginAt
      await tx.membership.update({
        where: { userId },
        data: {
          points: { increment: totalPoints },
          lastDailyLoginAt: now,
        },
      });

      // Catat transaksi point
      await tx.pointTransaction.create({
        data: {
          userId,
          points: basePoints,
          type: 'daily_login',
          description: `Daily check-in (hari ke-${streakCount})`,
        },
      });

      // Catat bonus streak (jika ada)
      if (isStreakBonus) {
        await tx.pointTransaction.create({
          data: {
            userId,
            points: bonusPoints,
            type: 'bonus',
            description: `Bonus streak ${streakCount} hari berturut-turut!`,
          },
        });
      }
    });

    this.logger.log(
      `Daily check-in user ${userId}: +${totalPoints} pts (streak ${streakCount}d${isStreakBonus ? ', BONUS!' : ''})`,
    );

    return {
      alreadyClaimed: false,
      message: isStreakBonus
        ? `🎉 Streak ${streakCount} hari! +${totalPoints} point (termasuk bonus streak ${bonusPoints} point).`
        : `Check-in berhasil! +${basePoints} point. Streak: ${streakCount} hari.`,
      pointsEarned: totalPoints,
      basePoints,
      bonusPoints,
      streakCount,
      isStreakBonus,
      currentPoints: membership.points + totalPoints,
    };
  }

  // ─── Get Point History ────────────────────────────────────────────────────

  async getPointHistory(userId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const [transactions, total] = await Promise.all([
      this.prisma.pointTransaction.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.pointTransaction.count({ where: { userId } }),
    ]);

    return {
      data: transactions,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  // ─── Admin: All Members ───────────────────────────────────────────────────

  async findAll(page = 1, limit = 20, tier?: MembershipTier) {
    const skip = (page - 1) * limit;
    const where = tier ? { tier } : {};

    const [members, total] = await Promise.all([
      this.prisma.membership.findMany({
        where,
        skip,
        take: limit,
        orderBy: { totalSpent: 'desc' },
        include: { user: { select: { id: true, name: true, email: true } } },
      }),
      this.prisma.membership.count({ where }),
    ]);

    return {
      data: members,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────

  private async issueShippingVoucher(
    tx: any,
    userId: string,
    tier: MembershipTier,
    value: number,
  ) {
    const code = await this.generateVoucherCode(`SHIP-${tier.toUpperCase()}`);

    // Berlaku 90 hari
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 90);

    await tx.voucher.create({
      data: {
        code,
        type: 'free_shipping',
        source: 'tier_benefit',
        value,
        usageLimit: 1,
        isActive: true,
        endDate,
        ownerId: userId,
      },
    });

    this.logger.log(
      `Issued shipping voucher ${code} (Rp ${value}) for user ${userId} tier ${tier}`,
    );
  }

  private async generateVoucherCode(prefix: string): Promise<string> {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code: string;
    let exists: boolean;

    do {
      const random = Array.from({ length: 6 }, () =>
        chars.charAt(Math.floor(Math.random() * chars.length)),
      ).join('');
      code = `${prefix}-${random}`;
      const found = await this.prisma.voucher.findUnique({ where: { code } });
      exists = !!found;
    } while (exists);

    return code;
  }

  private getNextTierInfo(currentTier: MembershipTier, totalSpent: number) {
    const tiers: MembershipTier[] = [
      MembershipTier.bronze,
      MembershipTier.silver,
      MembershipTier.gold,
      MembershipTier.platinum,
    ];

    const thresholds: Record<MembershipTier, number> = {
      [MembershipTier.bronze]:   0,
      [MembershipTier.silver]:   1_000_000,
      [MembershipTier.gold]:     5_000_000,
      [MembershipTier.platinum]: 10_000_000,
    };

    const currentIdx = tiers.indexOf(currentTier);
    if (currentIdx === tiers.length - 1) {
      return { nextTier: null, remainingSpend: 0, message: 'Tier tertinggi telah dicapai!' };
    }

    const nextTier = tiers[currentIdx + 1];
    const remainingSpend = thresholds[nextTier] - totalSpent;

    return {
      nextTier,
      remainingSpend,
      message: `Belanja Rp ${remainingSpend.toLocaleString('id-ID')} lagi untuk naik ke tier ${nextTier}`,
    };
  }
}
