import { MembershipTier } from '../../generated/prisma/enums';

/**
 * Threshold total spent (dalam rupiah) untuk naik tier.
 * Cek dari yang tertinggi ke terendah.
 */
export const TIER_THRESHOLDS: Record<MembershipTier, number> = {
  [MembershipTier.platinum]: 10_000_000, // >= 10 juta
  [MembershipTier.gold]:      5_000_000, // >= 5 juta
  [MembershipTier.silver]:    1_000_000, // >= 1 juta
  [MembershipTier.bronze]:    0,         // default
};

/**
 * Konversi: setiap Rp POINT_RATE rupiah spent → 1 point
 */
export const POINT_RATE = 1_000; // Rp 1.000 = 1 point

/**
 * Konversi: setiap POINT_TO_RUPIAH point → Rp 100 potongan harga
 */
export const POINT_TO_RUPIAH = 100; // 1 point = Rp 100

/**
 * Point minimum untuk redeem.
 */
export const MIN_REDEEM_POINTS = 100; // minimal 100 point = Rp 10.000

/**
 * Voucher ongkir gratis per tier (dalam rupiah).
 * Bronze tidak dapat benefit ongkir otomatis.
 */
export const TIER_SHIPPING_BENEFIT: Partial<Record<MembershipTier, number>> = {
  [MembershipTier.silver]:   5_000,
  [MembershipTier.gold]:    10_000,
  [MembershipTier.platinum]: 15_000,
};

/**
 * Tentukan tier berdasarkan totalSpent.
 */
export function determineTier(totalSpent: number): MembershipTier {
  if (totalSpent >= TIER_THRESHOLDS[MembershipTier.platinum]) return MembershipTier.platinum;
  if (totalSpent >= TIER_THRESHOLDS[MembershipTier.gold])     return MembershipTier.gold;
  if (totalSpent >= TIER_THRESHOLDS[MembershipTier.silver])   return MembershipTier.silver;
  return MembershipTier.bronze;
}

/**
 * Hitung point yang diperoleh dari nilai transaksi.
 */
export function calculatePointsEarned(amount: number): number {
  return Math.floor(amount / POINT_RATE);
}
