export declare const Role: {
    readonly customer: "customer";
    readonly admin: "admin";
    readonly super_admin: "super_admin";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const OrderStatus: {
    readonly pending: "pending";
    readonly paid: "paid";
    readonly processing: "processing";
    readonly shipped: "shipped";
    readonly delivered: "delivered";
    readonly cancelled: "cancelled";
};
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
export declare const PaymentStatus: {
    readonly pending: "pending";
    readonly paid: "paid";
    readonly failed: "failed";
    readonly expired: "expired";
    readonly refunded: "refunded";
};
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
export declare const ProductStatus: {
    readonly active: "active";
    readonly inactive: "inactive";
    readonly draft: "draft";
};
export type ProductStatus = (typeof ProductStatus)[keyof typeof ProductStatus];
export declare const ConsultationStatus: {
    readonly new: "new";
    readonly in_progress: "in_progress";
    readonly closed: "closed";
};
export type ConsultationStatus = (typeof ConsultationStatus)[keyof typeof ConsultationStatus];
export declare const BlogStatus: {
    readonly draft: "draft";
    readonly published: "published";
};
export type BlogStatus = (typeof BlogStatus)[keyof typeof BlogStatus];
export declare const PaymentProvider: {
    readonly xendit: "xendit";
    readonly midtrans: "midtrans";
};
export type PaymentProvider = (typeof PaymentProvider)[keyof typeof PaymentProvider];
export declare const ImageType: {
    readonly main: "main";
    readonly nutrition: "nutrition";
    readonly ingredients: "ingredients";
    readonly usage: "usage";
    readonly other: "other";
};
export type ImageType = (typeof ImageType)[keyof typeof ImageType];
export declare const VoucherType: {
    readonly percentage: "percentage";
    readonly fixed: "fixed";
    readonly free_shipping: "free_shipping";
};
export type VoucherType = (typeof VoucherType)[keyof typeof VoucherType];
export declare const VoucherSource: {
    readonly manual: "manual";
    readonly point_redeem: "point_redeem";
    readonly tier_benefit: "tier_benefit";
};
export type VoucherSource = (typeof VoucherSource)[keyof typeof VoucherSource];
export declare const MembershipTier: {
    readonly bronze: "bronze";
    readonly silver: "silver";
    readonly gold: "gold";
    readonly platinum: "platinum";
};
export type MembershipTier = (typeof MembershipTier)[keyof typeof MembershipTier];
export declare const PointTransactionType: {
    readonly purchase: "purchase";
    readonly daily_login: "daily_login";
    readonly redeem: "redeem";
    readonly expired: "expired";
    readonly refund: "refund";
    readonly bonus: "bonus";
};
export type PointTransactionType = (typeof PointTransactionType)[keyof typeof PointTransactionType];
