"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonNullValueFilter = exports.NullsOrder = exports.QueryMode = exports.NullableJsonNullValueInput = exports.SortOrder = exports.SiteSettingsScalarFieldEnum = exports.PromotionBenefitScalarFieldEnum = exports.PromotionSectionScalarFieldEnum = exports.PromotionLandingScalarFieldEnum = exports.WishlistScalarFieldEnum = exports.SearchAnalyticScalarFieldEnum = exports.ConsultationScalarFieldEnum = exports.FaqScalarFieldEnum = exports.BlogPostScalarFieldEnum = exports.PointTransactionScalarFieldEnum = exports.MembershipScalarFieldEnum = exports.PaymentScalarFieldEnum = exports.OrderStatusHistoryScalarFieldEnum = exports.OrderItemScalarFieldEnum = exports.OrderScalarFieldEnum = exports.VoucherScalarFieldEnum = exports.GuestCartItemScalarFieldEnum = exports.GuestCartScalarFieldEnum = exports.CartItemScalarFieldEnum = exports.CartScalarFieldEnum = exports.ProductReviewImageScalarFieldEnum = exports.ProductReviewHelpfulScalarFieldEnum = exports.ProductReviewScalarFieldEnum = exports.BundleItemScalarFieldEnum = exports.BundleScalarFieldEnum = exports.ProductVariantScalarFieldEnum = exports.ProductImageScalarFieldEnum = exports.ProductScalarFieldEnum = exports.CategoryScalarFieldEnum = exports.BannerScalarFieldEnum = exports.AddressScalarFieldEnum = exports.UserScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.Decimal = void 0;
const runtime = __importStar(require("@prisma/client/runtime/index-browser"));
exports.Decimal = runtime.Decimal;
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    User: 'User',
    Address: 'Address',
    Banner: 'Banner',
    Category: 'Category',
    Product: 'Product',
    ProductImage: 'ProductImage',
    ProductVariant: 'ProductVariant',
    Bundle: 'Bundle',
    BundleItem: 'BundleItem',
    ProductReview: 'ProductReview',
    ProductReviewHelpful: 'ProductReviewHelpful',
    ProductReviewImage: 'ProductReviewImage',
    Cart: 'Cart',
    CartItem: 'CartItem',
    GuestCart: 'GuestCart',
    GuestCartItem: 'GuestCartItem',
    Voucher: 'Voucher',
    Order: 'Order',
    OrderItem: 'OrderItem',
    OrderStatusHistory: 'OrderStatusHistory',
    Payment: 'Payment',
    Membership: 'Membership',
    PointTransaction: 'PointTransaction',
    BlogPost: 'BlogPost',
    Faq: 'Faq',
    Consultation: 'Consultation',
    SearchAnalytic: 'SearchAnalytic',
    Wishlist: 'Wishlist',
    PromotionLanding: 'PromotionLanding',
    PromotionSection: 'PromotionSection',
    PromotionBenefit: 'PromotionBenefit',
    SiteSettings: 'SiteSettings'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.UserScalarFieldEnum = {
    id: 'id',
    name: 'name',
    email: 'email',
    phone: 'phone',
    password: 'password',
    role: 'role',
    isVerified: 'isVerified',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
    bannedAt: 'bannedAt',
    banReason: 'banReason',
    refreshToken: 'refreshToken',
    verifyToken: 'verifyToken',
    verifyTokenExp: 'verifyTokenExp',
    resetToken: 'resetToken',
    resetTokenExp: 'resetTokenExp'
};
exports.AddressScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    label: 'label',
    receiverName: 'receiverName',
    phone: 'phone',
    address: 'address',
    notes: 'notes',
    cityId: 'cityId',
    provinceId: 'provinceId',
    postalCode: 'postalCode',
    isDefault: 'isDefault',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.BannerScalarFieldEnum = {
    id: 'id',
    imageUrl: 'imageUrl',
    altText: 'altText',
    label: 'label',
    title: 'title',
    extraText: 'extraText',
    desc: 'desc',
    path: 'path',
    isActive: 'isActive',
    sortOrder: 'sortOrder',
    startDate: 'startDate',
    endDate: 'endDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.CategoryScalarFieldEnum = {
    id: 'id',
    parentId: 'parentId',
    name: 'name',
    slug: 'slug',
    description: 'description',
    imageUrl: 'imageUrl',
    sortOrder: 'sortOrder',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ProductScalarFieldEnum = {
    id: 'id',
    categoryId: 'categoryId',
    name: 'name',
    slug: 'slug',
    description: 'description',
    notes: 'notes',
    basePrice: 'basePrice',
    discountPrice: 'discountPrice',
    weight: 'weight',
    sku: 'sku',
    mainImage: 'mainImage',
    stock: 'stock',
    reservedStock: 'reservedStock',
    soldCount: 'soldCount',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    metaTitle: 'metaTitle',
    metaDescription: 'metaDescription',
    avgRating: 'avgRating',
    reviewCount: 'reviewCount',
    deletedAt: 'deletedAt'
};
exports.ProductImageScalarFieldEnum = {
    id: 'id',
    productId: 'productId',
    imageUrl: 'imageUrl',
    publicId: 'publicId',
    altText: 'altText',
    imageType: 'imageType',
    sortOrder: 'sortOrder',
    isFeatured: 'isFeatured',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ProductVariantScalarFieldEnum = {
    id: 'id',
    productId: 'productId',
    name: 'name',
    value: 'value',
    basePrice: 'basePrice',
    discountPrice: 'discountPrice',
    priceAdjustment: 'priceAdjustment',
    stock: 'stock',
    reservedStock: 'reservedStock',
    weight: 'weight',
    imageUrl: 'imageUrl',
    altText: 'altText',
    sku: 'sku',
    isActive: 'isActive',
    sortOrder: 'sortOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.BundleScalarFieldEnum = {
    id: 'id',
    name: 'name',
    slug: 'slug',
    description: 'description',
    imageUrl: 'imageUrl',
    publicId: 'publicId',
    bundlePrice: 'bundlePrice',
    discountPrice: 'discountPrice',
    isActive: 'isActive',
    stock: 'stock',
    soldCount: 'soldCount',
    sortOrder: 'sortOrder',
    startDate: 'startDate',
    endDate: 'endDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.BundleItemScalarFieldEnum = {
    id: 'id',
    bundleId: 'bundleId',
    productId: 'productId',
    quantity: 'quantity'
};
exports.ProductReviewScalarFieldEnum = {
    id: 'id',
    productId: 'productId',
    userId: 'userId',
    orderId: 'orderId',
    rating: 'rating',
    review: 'review',
    isVerifiedPurchase: 'isVerifiedPurchase',
    helpfulCount: 'helpfulCount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ProductReviewHelpfulScalarFieldEnum = {
    id: 'id',
    reviewId: 'reviewId',
    userId: 'userId',
    isHelpful: 'isHelpful',
    createdAt: 'createdAt'
};
exports.ProductReviewImageScalarFieldEnum = {
    id: 'id',
    reviewId: 'reviewId',
    imageUrl: 'imageUrl',
    createdAt: 'createdAt'
};
exports.CartScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.CartItemScalarFieldEnum = {
    id: 'id',
    cartId: 'cartId',
    productId: 'productId',
    variantId: 'variantId',
    quantity: 'quantity',
    price: 'price',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.GuestCartScalarFieldEnum = {
    id: 'id',
    sessionId: 'sessionId',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.GuestCartItemScalarFieldEnum = {
    id: 'id',
    guestCartId: 'guestCartId',
    productId: 'productId',
    variantId: 'variantId',
    quantity: 'quantity',
    price: 'price',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.VoucherScalarFieldEnum = {
    id: 'id',
    code: 'code',
    type: 'type',
    source: 'source',
    value: 'value',
    minPurchase: 'minPurchase',
    maxDiscount: 'maxDiscount',
    usageLimit: 'usageLimit',
    usedCount: 'usedCount',
    isActive: 'isActive',
    startDate: 'startDate',
    endDate: 'endDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    ownerId: 'ownerId'
};
exports.OrderScalarFieldEnum = {
    id: 'id',
    orderNumber: 'orderNumber',
    userId: 'userId',
    addressId: 'addressId',
    voucherId: 'voucherId',
    bundleId: 'bundleId',
    status: 'status',
    paymentStatus: 'paymentStatus',
    subtotal: 'subtotal',
    discountAmount: 'discountAmount',
    shippingCost: 'shippingCost',
    total: 'total',
    courier: 'courier',
    service: 'service',
    shippingProvider: 'shippingProvider',
    trackingNumber: 'trackingNumber',
    estimatedDelivery: 'estimatedDelivery',
    deliveredAt: 'deliveredAt',
    cancelledAt: 'cancelledAt',
    cancelReason: 'cancelReason',
    notes: 'notes',
    paymentDeadline: 'paymentDeadline',
    cancelDeadline: 'cancelDeadline',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.OrderItemScalarFieldEnum = {
    id: 'id',
    orderId: 'orderId',
    productId: 'productId',
    productName: 'productName',
    variantId: 'variantId',
    variantName: 'variantName',
    quantity: 'quantity',
    price: 'price',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    bundleId: 'bundleId'
};
exports.OrderStatusHistoryScalarFieldEnum = {
    id: 'id',
    orderId: 'orderId',
    status: 'status',
    note: 'note',
    createdAt: 'createdAt'
};
exports.PaymentScalarFieldEnum = {
    id: 'id',
    orderId: 'orderId',
    provider: 'provider',
    status: 'status',
    amount: 'amount',
    externalId: 'externalId',
    paymentMethod: 'paymentMethod',
    paymentUrl: 'paymentUrl',
    expiredAt: 'expiredAt',
    paidAt: 'paidAt',
    refundedAt: 'refundedAt',
    refundReason: 'refundReason',
    metadata: 'metadata',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.MembershipScalarFieldEnum = {
    userId: 'userId',
    tier: 'tier',
    points: 'points',
    totalSpent: 'totalSpent',
    pointsExpiredAt: 'pointsExpiredAt',
    lastDailyLoginAt: 'lastDailyLoginAt',
    lastTierUpAt: 'lastTierUpAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PointTransactionScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    points: 'points',
    type: 'type',
    referenceId: 'referenceId',
    description: 'description',
    expiredAt: 'expiredAt',
    createdAt: 'createdAt'
};
exports.BlogPostScalarFieldEnum = {
    id: 'id',
    authorId: 'authorId',
    title: 'title',
    slug: 'slug',
    excerpt: 'excerpt',
    coverImage: 'coverImage',
    coverPublicId: 'coverPublicId',
    content: 'content',
    status: 'status',
    viewCount: 'viewCount',
    publishedAt: 'publishedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.FaqScalarFieldEnum = {
    id: 'id',
    question: 'question',
    answer: 'answer',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ConsultationScalarFieldEnum = {
    id: 'id',
    name: 'name',
    email: 'email',
    phone: 'phone',
    message: 'message',
    status: 'status',
    respondedBy: 'respondedBy',
    response: 'response',
    respondedAt: 'respondedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.SearchAnalyticScalarFieldEnum = {
    id: 'id',
    query: 'query',
    count: 'count',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.WishlistScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    productId: 'productId',
    createdAt: 'createdAt'
};
exports.PromotionLandingScalarFieldEnum = {
    id: 'id',
    title: 'title',
    slug: 'slug',
    subtitle: 'subtitle',
    description: 'description',
    badgeText: 'badgeText',
    startDate: 'startDate',
    endDate: 'endDate',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    heroBundleId: 'heroBundleId'
};
exports.PromotionSectionScalarFieldEnum = {
    id: 'id',
    promotionId: 'promotionId',
    title: 'title',
    subtitle: 'subtitle',
    sortOrder: 'sortOrder',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PromotionBenefitScalarFieldEnum = {
    id: 'id',
    promotionId: 'promotionId',
    icon: 'icon',
    title: 'title',
    description: 'description',
    sortOrder: 'sortOrder'
};
exports.SiteSettingsScalarFieldEnum = {
    id: 'id',
    siteName: 'siteName',
    siteDescription: 'siteDescription',
    contactEmail: 'contactEmail',
    contactPhone: 'contactPhone',
    contactAddress: 'contactAddress',
    socialInstagram: 'socialInstagram',
    socialTiktok: 'socialTiktok',
    socialFacebook: 'socialFacebook',
    socialWhatsapp: 'socialWhatsapp',
    shippingOriginCityId: 'shippingOriginCityId',
    taxRate: 'taxRate',
    currency: 'currency',
    maintenanceMode: 'maintenanceMode',
    updatedAt: 'updatedAt'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.NullableJsonNullValueInput = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.JsonNullValueFilter = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull,
    AnyNull: exports.AnyNull
};
//# sourceMappingURL=prismaNamespaceBrowser.js.map