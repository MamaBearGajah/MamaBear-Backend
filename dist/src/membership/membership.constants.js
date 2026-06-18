"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TIER_SHIPPING_BENEFIT = exports.MIN_REDEEM_POINTS = exports.POINT_TO_RUPIAH = exports.POINT_RATE = exports.TIER_THRESHOLDS = void 0;
exports.determineTier = determineTier;
exports.calculatePointsEarned = calculatePointsEarned;
const enums_1 = require("../../generated/prisma/enums");
exports.TIER_THRESHOLDS = {
    [enums_1.MembershipTier.platinum]: 10_000_000,
    [enums_1.MembershipTier.gold]: 5_000_000,
    [enums_1.MembershipTier.silver]: 1_000_000,
    [enums_1.MembershipTier.bronze]: 0,
};
exports.POINT_RATE = 1_000;
exports.POINT_TO_RUPIAH = 100;
exports.MIN_REDEEM_POINTS = 100;
exports.TIER_SHIPPING_BENEFIT = {
    [enums_1.MembershipTier.silver]: 5_000,
    [enums_1.MembershipTier.gold]: 10_000,
    [enums_1.MembershipTier.platinum]: 15_000,
};
function determineTier(totalSpent) {
    if (totalSpent >= exports.TIER_THRESHOLDS[enums_1.MembershipTier.platinum])
        return enums_1.MembershipTier.platinum;
    if (totalSpent >= exports.TIER_THRESHOLDS[enums_1.MembershipTier.gold])
        return enums_1.MembershipTier.gold;
    if (totalSpent >= exports.TIER_THRESHOLDS[enums_1.MembershipTier.silver])
        return enums_1.MembershipTier.silver;
    return enums_1.MembershipTier.bronze;
}
function calculatePointsEarned(amount) {
    return Math.floor(amount / exports.POINT_RATE);
}
//# sourceMappingURL=membership.constants.js.map