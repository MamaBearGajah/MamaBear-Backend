import { MembershipTier } from '../../generated/prisma/enums';
export declare const TIER_THRESHOLDS: Record<MembershipTier, number>;
export declare const POINT_RATE = 10000;
export declare const POINT_TO_RUPIAH = 1000;
export declare const MIN_REDEEM_POINTS = 10;
export declare const TIER_SHIPPING_BENEFIT: Partial<Record<MembershipTier, number>>;
export declare function determineTier(totalSpent: number): MembershipTier;
export declare function calculatePointsEarned(amount: number): number;
