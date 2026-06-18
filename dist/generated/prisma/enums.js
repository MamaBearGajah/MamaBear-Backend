"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointTransactionType = exports.MembershipTier = exports.VoucherSource = exports.VoucherType = exports.ImageType = exports.PaymentProvider = exports.BlogStatus = exports.ConsultationStatus = exports.ProductStatus = exports.PaymentStatus = exports.OrderStatus = exports.Role = void 0;
exports.Role = {
    customer: 'customer',
    admin: 'admin',
    super_admin: 'super_admin'
};
exports.OrderStatus = {
    pending: 'pending',
    paid: 'paid',
    processing: 'processing',
    shipped: 'shipped',
    delivered: 'delivered',
    cancelled: 'cancelled'
};
exports.PaymentStatus = {
    pending: 'pending',
    paid: 'paid',
    failed: 'failed',
    expired: 'expired',
    refunded: 'refunded'
};
exports.ProductStatus = {
    active: 'active',
    inactive: 'inactive',
    draft: 'draft'
};
exports.ConsultationStatus = {
    new: 'new',
    in_progress: 'in_progress',
    closed: 'closed'
};
exports.BlogStatus = {
    draft: 'draft',
    published: 'published'
};
exports.PaymentProvider = {
    xendit: 'xendit',
    midtrans: 'midtrans'
};
exports.ImageType = {
    main: 'main',
    nutrition: 'nutrition',
    ingredients: 'ingredients',
    usage: 'usage',
    other: 'other'
};
exports.VoucherType = {
    percentage: 'percentage',
    fixed: 'fixed',
    free_shipping: 'free_shipping'
};
exports.VoucherSource = {
    manual: 'manual',
    point_redeem: 'point_redeem',
    tier_benefit: 'tier_benefit'
};
exports.MembershipTier = {
    bronze: 'bronze',
    silver: 'silver',
    gold: 'gold',
    platinum: 'platinum'
};
exports.PointTransactionType = {
    purchase: 'purchase',
    daily_login: 'daily_login',
    redeem: 'redeem',
    expired: 'expired',
    refund: 'refund',
    bonus: 'bonus'
};
//# sourceMappingURL=enums.js.map