import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "./prismaNamespace.js";
export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never;
export interface PrismaClientConstructor {
    new <Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions<Options> = LogOptions<Options>, OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends {
        omit: infer U;
    } ? U : Prisma.PrismaClientOptions['omit'], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs>(options: Prisma.Subset<Options, Prisma.PrismaClientOptions>): PrismaClient<LogOpts, OmitOpts, ExtArgs>;
}
export interface PrismaClient<in LogOpts extends Prisma.LogLevel = never, in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = undefined, in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    $connect(): runtime.Types.Utils.JsPromise<void>;
    $disconnect(): runtime.Types.Utils.JsPromise<void>;
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<R>;
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
        extArgs: ExtArgs;
    }>>;
    get user(): Prisma.UserDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get address(): Prisma.AddressDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get banner(): Prisma.BannerDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get category(): Prisma.CategoryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get product(): Prisma.ProductDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get productImage(): Prisma.ProductImageDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get productVariant(): Prisma.ProductVariantDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get bundle(): Prisma.BundleDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get bundleItem(): Prisma.BundleItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get productReview(): Prisma.ProductReviewDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get productReviewHelpful(): Prisma.ProductReviewHelpfulDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get productReviewImage(): Prisma.ProductReviewImageDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get cart(): Prisma.CartDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get cartItem(): Prisma.CartItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get guestCart(): Prisma.GuestCartDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get guestCartItem(): Prisma.GuestCartItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get voucher(): Prisma.VoucherDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get order(): Prisma.OrderDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get orderItem(): Prisma.OrderItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get orderStatusHistory(): Prisma.OrderStatusHistoryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get payment(): Prisma.PaymentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get membership(): Prisma.MembershipDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get pointTransaction(): Prisma.PointTransactionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get blogPost(): Prisma.BlogPostDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get faq(): Prisma.FaqDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get consultation(): Prisma.ConsultationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get searchAnalytic(): Prisma.SearchAnalyticDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get wishlist(): Prisma.WishlistDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get promotionLanding(): Prisma.PromotionLandingDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get promotionSection(): Prisma.PromotionSectionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get promotionBenefit(): Prisma.PromotionBenefitDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get siteSettings(): Prisma.SiteSettingsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
}
export declare function getPrismaClientClass(): PrismaClientConstructor;
