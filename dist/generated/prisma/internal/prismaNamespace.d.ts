import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models.js";
import { type PrismaClient } from "./class.js";
export type * from '../models.js';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
export declare const prismaVersion: PrismaVersion;
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: runtime.DbNullClass;
export declare const JsonNull: runtime.JsonNullClass;
export declare const AnyNull: runtime.AnyNullClass;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
export type XOR<T, U> = T extends object ? U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : U : T;
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
export declare const ModelName: {
    readonly User: "User";
    readonly Address: "Address";
    readonly Banner: "Banner";
    readonly Category: "Category";
    readonly Product: "Product";
    readonly ProductImage: "ProductImage";
    readonly ProductVariant: "ProductVariant";
    readonly Bundle: "Bundle";
    readonly BundleItem: "BundleItem";
    readonly ProductReview: "ProductReview";
    readonly ProductReviewHelpful: "ProductReviewHelpful";
    readonly ProductReviewImage: "ProductReviewImage";
    readonly Cart: "Cart";
    readonly CartItem: "CartItem";
    readonly GuestCart: "GuestCart";
    readonly GuestCartItem: "GuestCartItem";
    readonly Voucher: "Voucher";
    readonly Order: "Order";
    readonly OrderItem: "OrderItem";
    readonly OrderStatusHistory: "OrderStatusHistory";
    readonly Payment: "Payment";
    readonly Membership: "Membership";
    readonly PointTransaction: "PointTransaction";
    readonly BlogPost: "BlogPost";
    readonly Faq: "Faq";
    readonly Consultation: "Consultation";
    readonly SearchAnalytic: "SearchAnalytic";
    readonly Wishlist: "Wishlist";
    readonly PromotionLanding: "PromotionLanding";
    readonly PromotionSection: "PromotionSection";
    readonly PromotionBenefit: "PromotionBenefit";
    readonly SiteSettings: "SiteSettings";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "user" | "address" | "banner" | "category" | "product" | "productImage" | "productVariant" | "bundle" | "bundleItem" | "productReview" | "productReviewHelpful" | "productReviewImage" | "cart" | "cartItem" | "guestCart" | "guestCartItem" | "voucher" | "order" | "orderItem" | "orderStatusHistory" | "payment" | "membership" | "pointTransaction" | "blogPost" | "faq" | "consultation" | "searchAnalytic" | "wishlist" | "promotionLanding" | "promotionSection" | "promotionBenefit" | "siteSettings";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        User: {
            payload: Prisma.$UserPayload<ExtArgs>;
            fields: Prisma.UserFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findFirst: {
                    args: Prisma.UserFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findMany: {
                    args: Prisma.UserFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                create: {
                    args: Prisma.UserCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                createMany: {
                    args: Prisma.UserCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                delete: {
                    args: Prisma.UserDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                update: {
                    args: Prisma.UserUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                deleteMany: {
                    args: Prisma.UserDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                upsert: {
                    args: Prisma.UserUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                aggregate: {
                    args: Prisma.UserAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUser>;
                };
                groupBy: {
                    args: Prisma.UserGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserCountAggregateOutputType> | number;
                };
            };
        };
        Address: {
            payload: Prisma.$AddressPayload<ExtArgs>;
            fields: Prisma.AddressFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AddressFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AddressPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AddressFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AddressPayload>;
                };
                findFirst: {
                    args: Prisma.AddressFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AddressPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AddressFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AddressPayload>;
                };
                findMany: {
                    args: Prisma.AddressFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AddressPayload>[];
                };
                create: {
                    args: Prisma.AddressCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AddressPayload>;
                };
                createMany: {
                    args: Prisma.AddressCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AddressCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AddressPayload>[];
                };
                delete: {
                    args: Prisma.AddressDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AddressPayload>;
                };
                update: {
                    args: Prisma.AddressUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AddressPayload>;
                };
                deleteMany: {
                    args: Prisma.AddressDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AddressUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AddressUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AddressPayload>[];
                };
                upsert: {
                    args: Prisma.AddressUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AddressPayload>;
                };
                aggregate: {
                    args: Prisma.AddressAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAddress>;
                };
                groupBy: {
                    args: Prisma.AddressGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AddressGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AddressCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AddressCountAggregateOutputType> | number;
                };
            };
        };
        Banner: {
            payload: Prisma.$BannerPayload<ExtArgs>;
            fields: Prisma.BannerFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.BannerFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BannerPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.BannerFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BannerPayload>;
                };
                findFirst: {
                    args: Prisma.BannerFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BannerPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.BannerFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BannerPayload>;
                };
                findMany: {
                    args: Prisma.BannerFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BannerPayload>[];
                };
                create: {
                    args: Prisma.BannerCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BannerPayload>;
                };
                createMany: {
                    args: Prisma.BannerCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.BannerCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BannerPayload>[];
                };
                delete: {
                    args: Prisma.BannerDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BannerPayload>;
                };
                update: {
                    args: Prisma.BannerUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BannerPayload>;
                };
                deleteMany: {
                    args: Prisma.BannerDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.BannerUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.BannerUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BannerPayload>[];
                };
                upsert: {
                    args: Prisma.BannerUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BannerPayload>;
                };
                aggregate: {
                    args: Prisma.BannerAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateBanner>;
                };
                groupBy: {
                    args: Prisma.BannerGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BannerGroupByOutputType>[];
                };
                count: {
                    args: Prisma.BannerCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BannerCountAggregateOutputType> | number;
                };
            };
        };
        Category: {
            payload: Prisma.$CategoryPayload<ExtArgs>;
            fields: Prisma.CategoryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CategoryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>;
                };
                findFirst: {
                    args: Prisma.CategoryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>;
                };
                findMany: {
                    args: Prisma.CategoryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>[];
                };
                create: {
                    args: Prisma.CategoryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>;
                };
                createMany: {
                    args: Prisma.CategoryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>[];
                };
                delete: {
                    args: Prisma.CategoryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>;
                };
                update: {
                    args: Prisma.CategoryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>;
                };
                deleteMany: {
                    args: Prisma.CategoryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CategoryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CategoryUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>[];
                };
                upsert: {
                    args: Prisma.CategoryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>;
                };
                aggregate: {
                    args: Prisma.CategoryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCategory>;
                };
                groupBy: {
                    args: Prisma.CategoryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CategoryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CategoryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CategoryCountAggregateOutputType> | number;
                };
            };
        };
        Product: {
            payload: Prisma.$ProductPayload<ExtArgs>;
            fields: Prisma.ProductFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProductFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                findFirst: {
                    args: Prisma.ProductFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                findMany: {
                    args: Prisma.ProductFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>[];
                };
                create: {
                    args: Prisma.ProductCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                createMany: {
                    args: Prisma.ProductCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>[];
                };
                delete: {
                    args: Prisma.ProductDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                update: {
                    args: Prisma.ProductUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                deleteMany: {
                    args: Prisma.ProductDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProductUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProductUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>[];
                };
                upsert: {
                    args: Prisma.ProductUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                aggregate: {
                    args: Prisma.ProductAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProduct>;
                };
                groupBy: {
                    args: Prisma.ProductGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProductCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductCountAggregateOutputType> | number;
                };
            };
        };
        ProductImage: {
            payload: Prisma.$ProductImagePayload<ExtArgs>;
            fields: Prisma.ProductImageFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProductImageFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductImagePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProductImageFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductImagePayload>;
                };
                findFirst: {
                    args: Prisma.ProductImageFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductImagePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProductImageFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductImagePayload>;
                };
                findMany: {
                    args: Prisma.ProductImageFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductImagePayload>[];
                };
                create: {
                    args: Prisma.ProductImageCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductImagePayload>;
                };
                createMany: {
                    args: Prisma.ProductImageCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProductImageCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductImagePayload>[];
                };
                delete: {
                    args: Prisma.ProductImageDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductImagePayload>;
                };
                update: {
                    args: Prisma.ProductImageUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductImagePayload>;
                };
                deleteMany: {
                    args: Prisma.ProductImageDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProductImageUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProductImageUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductImagePayload>[];
                };
                upsert: {
                    args: Prisma.ProductImageUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductImagePayload>;
                };
                aggregate: {
                    args: Prisma.ProductImageAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProductImage>;
                };
                groupBy: {
                    args: Prisma.ProductImageGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductImageGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProductImageCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductImageCountAggregateOutputType> | number;
                };
            };
        };
        ProductVariant: {
            payload: Prisma.$ProductVariantPayload<ExtArgs>;
            fields: Prisma.ProductVariantFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProductVariantFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductVariantPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProductVariantFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductVariantPayload>;
                };
                findFirst: {
                    args: Prisma.ProductVariantFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductVariantPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProductVariantFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductVariantPayload>;
                };
                findMany: {
                    args: Prisma.ProductVariantFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductVariantPayload>[];
                };
                create: {
                    args: Prisma.ProductVariantCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductVariantPayload>;
                };
                createMany: {
                    args: Prisma.ProductVariantCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProductVariantCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductVariantPayload>[];
                };
                delete: {
                    args: Prisma.ProductVariantDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductVariantPayload>;
                };
                update: {
                    args: Prisma.ProductVariantUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductVariantPayload>;
                };
                deleteMany: {
                    args: Prisma.ProductVariantDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProductVariantUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProductVariantUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductVariantPayload>[];
                };
                upsert: {
                    args: Prisma.ProductVariantUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductVariantPayload>;
                };
                aggregate: {
                    args: Prisma.ProductVariantAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProductVariant>;
                };
                groupBy: {
                    args: Prisma.ProductVariantGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductVariantGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProductVariantCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductVariantCountAggregateOutputType> | number;
                };
            };
        };
        Bundle: {
            payload: Prisma.$BundlePayload<ExtArgs>;
            fields: Prisma.BundleFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.BundleFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BundlePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.BundleFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BundlePayload>;
                };
                findFirst: {
                    args: Prisma.BundleFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BundlePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.BundleFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BundlePayload>;
                };
                findMany: {
                    args: Prisma.BundleFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BundlePayload>[];
                };
                create: {
                    args: Prisma.BundleCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BundlePayload>;
                };
                createMany: {
                    args: Prisma.BundleCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.BundleCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BundlePayload>[];
                };
                delete: {
                    args: Prisma.BundleDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BundlePayload>;
                };
                update: {
                    args: Prisma.BundleUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BundlePayload>;
                };
                deleteMany: {
                    args: Prisma.BundleDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.BundleUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.BundleUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BundlePayload>[];
                };
                upsert: {
                    args: Prisma.BundleUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BundlePayload>;
                };
                aggregate: {
                    args: Prisma.BundleAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateBundle>;
                };
                groupBy: {
                    args: Prisma.BundleGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BundleGroupByOutputType>[];
                };
                count: {
                    args: Prisma.BundleCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BundleCountAggregateOutputType> | number;
                };
            };
        };
        BundleItem: {
            payload: Prisma.$BundleItemPayload<ExtArgs>;
            fields: Prisma.BundleItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.BundleItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BundleItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.BundleItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BundleItemPayload>;
                };
                findFirst: {
                    args: Prisma.BundleItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BundleItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.BundleItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BundleItemPayload>;
                };
                findMany: {
                    args: Prisma.BundleItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BundleItemPayload>[];
                };
                create: {
                    args: Prisma.BundleItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BundleItemPayload>;
                };
                createMany: {
                    args: Prisma.BundleItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.BundleItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BundleItemPayload>[];
                };
                delete: {
                    args: Prisma.BundleItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BundleItemPayload>;
                };
                update: {
                    args: Prisma.BundleItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BundleItemPayload>;
                };
                deleteMany: {
                    args: Prisma.BundleItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.BundleItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.BundleItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BundleItemPayload>[];
                };
                upsert: {
                    args: Prisma.BundleItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BundleItemPayload>;
                };
                aggregate: {
                    args: Prisma.BundleItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateBundleItem>;
                };
                groupBy: {
                    args: Prisma.BundleItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BundleItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.BundleItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BundleItemCountAggregateOutputType> | number;
                };
            };
        };
        ProductReview: {
            payload: Prisma.$ProductReviewPayload<ExtArgs>;
            fields: Prisma.ProductReviewFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProductReviewFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductReviewPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProductReviewFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductReviewPayload>;
                };
                findFirst: {
                    args: Prisma.ProductReviewFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductReviewPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProductReviewFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductReviewPayload>;
                };
                findMany: {
                    args: Prisma.ProductReviewFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductReviewPayload>[];
                };
                create: {
                    args: Prisma.ProductReviewCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductReviewPayload>;
                };
                createMany: {
                    args: Prisma.ProductReviewCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProductReviewCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductReviewPayload>[];
                };
                delete: {
                    args: Prisma.ProductReviewDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductReviewPayload>;
                };
                update: {
                    args: Prisma.ProductReviewUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductReviewPayload>;
                };
                deleteMany: {
                    args: Prisma.ProductReviewDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProductReviewUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProductReviewUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductReviewPayload>[];
                };
                upsert: {
                    args: Prisma.ProductReviewUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductReviewPayload>;
                };
                aggregate: {
                    args: Prisma.ProductReviewAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProductReview>;
                };
                groupBy: {
                    args: Prisma.ProductReviewGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductReviewGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProductReviewCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductReviewCountAggregateOutputType> | number;
                };
            };
        };
        ProductReviewHelpful: {
            payload: Prisma.$ProductReviewHelpfulPayload<ExtArgs>;
            fields: Prisma.ProductReviewHelpfulFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProductReviewHelpfulFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductReviewHelpfulPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProductReviewHelpfulFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductReviewHelpfulPayload>;
                };
                findFirst: {
                    args: Prisma.ProductReviewHelpfulFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductReviewHelpfulPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProductReviewHelpfulFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductReviewHelpfulPayload>;
                };
                findMany: {
                    args: Prisma.ProductReviewHelpfulFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductReviewHelpfulPayload>[];
                };
                create: {
                    args: Prisma.ProductReviewHelpfulCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductReviewHelpfulPayload>;
                };
                createMany: {
                    args: Prisma.ProductReviewHelpfulCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProductReviewHelpfulCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductReviewHelpfulPayload>[];
                };
                delete: {
                    args: Prisma.ProductReviewHelpfulDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductReviewHelpfulPayload>;
                };
                update: {
                    args: Prisma.ProductReviewHelpfulUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductReviewHelpfulPayload>;
                };
                deleteMany: {
                    args: Prisma.ProductReviewHelpfulDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProductReviewHelpfulUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProductReviewHelpfulUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductReviewHelpfulPayload>[];
                };
                upsert: {
                    args: Prisma.ProductReviewHelpfulUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductReviewHelpfulPayload>;
                };
                aggregate: {
                    args: Prisma.ProductReviewHelpfulAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProductReviewHelpful>;
                };
                groupBy: {
                    args: Prisma.ProductReviewHelpfulGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductReviewHelpfulGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProductReviewHelpfulCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductReviewHelpfulCountAggregateOutputType> | number;
                };
            };
        };
        ProductReviewImage: {
            payload: Prisma.$ProductReviewImagePayload<ExtArgs>;
            fields: Prisma.ProductReviewImageFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProductReviewImageFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductReviewImagePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProductReviewImageFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductReviewImagePayload>;
                };
                findFirst: {
                    args: Prisma.ProductReviewImageFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductReviewImagePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProductReviewImageFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductReviewImagePayload>;
                };
                findMany: {
                    args: Prisma.ProductReviewImageFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductReviewImagePayload>[];
                };
                create: {
                    args: Prisma.ProductReviewImageCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductReviewImagePayload>;
                };
                createMany: {
                    args: Prisma.ProductReviewImageCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProductReviewImageCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductReviewImagePayload>[];
                };
                delete: {
                    args: Prisma.ProductReviewImageDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductReviewImagePayload>;
                };
                update: {
                    args: Prisma.ProductReviewImageUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductReviewImagePayload>;
                };
                deleteMany: {
                    args: Prisma.ProductReviewImageDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProductReviewImageUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProductReviewImageUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductReviewImagePayload>[];
                };
                upsert: {
                    args: Prisma.ProductReviewImageUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductReviewImagePayload>;
                };
                aggregate: {
                    args: Prisma.ProductReviewImageAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProductReviewImage>;
                };
                groupBy: {
                    args: Prisma.ProductReviewImageGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductReviewImageGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProductReviewImageCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductReviewImageCountAggregateOutputType> | number;
                };
            };
        };
        Cart: {
            payload: Prisma.$CartPayload<ExtArgs>;
            fields: Prisma.CartFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CartFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CartPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CartFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CartPayload>;
                };
                findFirst: {
                    args: Prisma.CartFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CartPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CartFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CartPayload>;
                };
                findMany: {
                    args: Prisma.CartFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CartPayload>[];
                };
                create: {
                    args: Prisma.CartCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CartPayload>;
                };
                createMany: {
                    args: Prisma.CartCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CartCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CartPayload>[];
                };
                delete: {
                    args: Prisma.CartDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CartPayload>;
                };
                update: {
                    args: Prisma.CartUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CartPayload>;
                };
                deleteMany: {
                    args: Prisma.CartDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CartUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CartUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CartPayload>[];
                };
                upsert: {
                    args: Prisma.CartUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CartPayload>;
                };
                aggregate: {
                    args: Prisma.CartAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCart>;
                };
                groupBy: {
                    args: Prisma.CartGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CartGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CartCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CartCountAggregateOutputType> | number;
                };
            };
        };
        CartItem: {
            payload: Prisma.$CartItemPayload<ExtArgs>;
            fields: Prisma.CartItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CartItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CartItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CartItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CartItemPayload>;
                };
                findFirst: {
                    args: Prisma.CartItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CartItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CartItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CartItemPayload>;
                };
                findMany: {
                    args: Prisma.CartItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CartItemPayload>[];
                };
                create: {
                    args: Prisma.CartItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CartItemPayload>;
                };
                createMany: {
                    args: Prisma.CartItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CartItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CartItemPayload>[];
                };
                delete: {
                    args: Prisma.CartItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CartItemPayload>;
                };
                update: {
                    args: Prisma.CartItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CartItemPayload>;
                };
                deleteMany: {
                    args: Prisma.CartItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CartItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CartItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CartItemPayload>[];
                };
                upsert: {
                    args: Prisma.CartItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CartItemPayload>;
                };
                aggregate: {
                    args: Prisma.CartItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCartItem>;
                };
                groupBy: {
                    args: Prisma.CartItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CartItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CartItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CartItemCountAggregateOutputType> | number;
                };
            };
        };
        GuestCart: {
            payload: Prisma.$GuestCartPayload<ExtArgs>;
            fields: Prisma.GuestCartFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.GuestCartFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GuestCartPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.GuestCartFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GuestCartPayload>;
                };
                findFirst: {
                    args: Prisma.GuestCartFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GuestCartPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.GuestCartFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GuestCartPayload>;
                };
                findMany: {
                    args: Prisma.GuestCartFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GuestCartPayload>[];
                };
                create: {
                    args: Prisma.GuestCartCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GuestCartPayload>;
                };
                createMany: {
                    args: Prisma.GuestCartCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.GuestCartCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GuestCartPayload>[];
                };
                delete: {
                    args: Prisma.GuestCartDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GuestCartPayload>;
                };
                update: {
                    args: Prisma.GuestCartUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GuestCartPayload>;
                };
                deleteMany: {
                    args: Prisma.GuestCartDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.GuestCartUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.GuestCartUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GuestCartPayload>[];
                };
                upsert: {
                    args: Prisma.GuestCartUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GuestCartPayload>;
                };
                aggregate: {
                    args: Prisma.GuestCartAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateGuestCart>;
                };
                groupBy: {
                    args: Prisma.GuestCartGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.GuestCartGroupByOutputType>[];
                };
                count: {
                    args: Prisma.GuestCartCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.GuestCartCountAggregateOutputType> | number;
                };
            };
        };
        GuestCartItem: {
            payload: Prisma.$GuestCartItemPayload<ExtArgs>;
            fields: Prisma.GuestCartItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.GuestCartItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GuestCartItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.GuestCartItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GuestCartItemPayload>;
                };
                findFirst: {
                    args: Prisma.GuestCartItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GuestCartItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.GuestCartItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GuestCartItemPayload>;
                };
                findMany: {
                    args: Prisma.GuestCartItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GuestCartItemPayload>[];
                };
                create: {
                    args: Prisma.GuestCartItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GuestCartItemPayload>;
                };
                createMany: {
                    args: Prisma.GuestCartItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.GuestCartItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GuestCartItemPayload>[];
                };
                delete: {
                    args: Prisma.GuestCartItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GuestCartItemPayload>;
                };
                update: {
                    args: Prisma.GuestCartItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GuestCartItemPayload>;
                };
                deleteMany: {
                    args: Prisma.GuestCartItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.GuestCartItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.GuestCartItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GuestCartItemPayload>[];
                };
                upsert: {
                    args: Prisma.GuestCartItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GuestCartItemPayload>;
                };
                aggregate: {
                    args: Prisma.GuestCartItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateGuestCartItem>;
                };
                groupBy: {
                    args: Prisma.GuestCartItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.GuestCartItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.GuestCartItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.GuestCartItemCountAggregateOutputType> | number;
                };
            };
        };
        Voucher: {
            payload: Prisma.$VoucherPayload<ExtArgs>;
            fields: Prisma.VoucherFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.VoucherFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VoucherPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.VoucherFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VoucherPayload>;
                };
                findFirst: {
                    args: Prisma.VoucherFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VoucherPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.VoucherFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VoucherPayload>;
                };
                findMany: {
                    args: Prisma.VoucherFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VoucherPayload>[];
                };
                create: {
                    args: Prisma.VoucherCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VoucherPayload>;
                };
                createMany: {
                    args: Prisma.VoucherCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.VoucherCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VoucherPayload>[];
                };
                delete: {
                    args: Prisma.VoucherDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VoucherPayload>;
                };
                update: {
                    args: Prisma.VoucherUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VoucherPayload>;
                };
                deleteMany: {
                    args: Prisma.VoucherDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.VoucherUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.VoucherUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VoucherPayload>[];
                };
                upsert: {
                    args: Prisma.VoucherUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VoucherPayload>;
                };
                aggregate: {
                    args: Prisma.VoucherAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateVoucher>;
                };
                groupBy: {
                    args: Prisma.VoucherGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VoucherGroupByOutputType>[];
                };
                count: {
                    args: Prisma.VoucherCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VoucherCountAggregateOutputType> | number;
                };
            };
        };
        Order: {
            payload: Prisma.$OrderPayload<ExtArgs>;
            fields: Prisma.OrderFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.OrderFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>;
                };
                findFirst: {
                    args: Prisma.OrderFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>;
                };
                findMany: {
                    args: Prisma.OrderFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>[];
                };
                create: {
                    args: Prisma.OrderCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>;
                };
                createMany: {
                    args: Prisma.OrderCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.OrderCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>[];
                };
                delete: {
                    args: Prisma.OrderDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>;
                };
                update: {
                    args: Prisma.OrderUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>;
                };
                deleteMany: {
                    args: Prisma.OrderDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.OrderUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.OrderUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>[];
                };
                upsert: {
                    args: Prisma.OrderUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>;
                };
                aggregate: {
                    args: Prisma.OrderAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateOrder>;
                };
                groupBy: {
                    args: Prisma.OrderGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrderGroupByOutputType>[];
                };
                count: {
                    args: Prisma.OrderCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrderCountAggregateOutputType> | number;
                };
            };
        };
        OrderItem: {
            payload: Prisma.$OrderItemPayload<ExtArgs>;
            fields: Prisma.OrderItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.OrderItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.OrderItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderItemPayload>;
                };
                findFirst: {
                    args: Prisma.OrderItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.OrderItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderItemPayload>;
                };
                findMany: {
                    args: Prisma.OrderItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderItemPayload>[];
                };
                create: {
                    args: Prisma.OrderItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderItemPayload>;
                };
                createMany: {
                    args: Prisma.OrderItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.OrderItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderItemPayload>[];
                };
                delete: {
                    args: Prisma.OrderItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderItemPayload>;
                };
                update: {
                    args: Prisma.OrderItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderItemPayload>;
                };
                deleteMany: {
                    args: Prisma.OrderItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.OrderItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.OrderItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderItemPayload>[];
                };
                upsert: {
                    args: Prisma.OrderItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderItemPayload>;
                };
                aggregate: {
                    args: Prisma.OrderItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateOrderItem>;
                };
                groupBy: {
                    args: Prisma.OrderItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrderItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.OrderItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrderItemCountAggregateOutputType> | number;
                };
            };
        };
        OrderStatusHistory: {
            payload: Prisma.$OrderStatusHistoryPayload<ExtArgs>;
            fields: Prisma.OrderStatusHistoryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.OrderStatusHistoryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderStatusHistoryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.OrderStatusHistoryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderStatusHistoryPayload>;
                };
                findFirst: {
                    args: Prisma.OrderStatusHistoryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderStatusHistoryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.OrderStatusHistoryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderStatusHistoryPayload>;
                };
                findMany: {
                    args: Prisma.OrderStatusHistoryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderStatusHistoryPayload>[];
                };
                create: {
                    args: Prisma.OrderStatusHistoryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderStatusHistoryPayload>;
                };
                createMany: {
                    args: Prisma.OrderStatusHistoryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.OrderStatusHistoryCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderStatusHistoryPayload>[];
                };
                delete: {
                    args: Prisma.OrderStatusHistoryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderStatusHistoryPayload>;
                };
                update: {
                    args: Prisma.OrderStatusHistoryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderStatusHistoryPayload>;
                };
                deleteMany: {
                    args: Prisma.OrderStatusHistoryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.OrderStatusHistoryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.OrderStatusHistoryUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderStatusHistoryPayload>[];
                };
                upsert: {
                    args: Prisma.OrderStatusHistoryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderStatusHistoryPayload>;
                };
                aggregate: {
                    args: Prisma.OrderStatusHistoryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateOrderStatusHistory>;
                };
                groupBy: {
                    args: Prisma.OrderStatusHistoryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrderStatusHistoryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.OrderStatusHistoryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrderStatusHistoryCountAggregateOutputType> | number;
                };
            };
        };
        Payment: {
            payload: Prisma.$PaymentPayload<ExtArgs>;
            fields: Prisma.PaymentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PaymentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload>;
                };
                findFirst: {
                    args: Prisma.PaymentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload>;
                };
                findMany: {
                    args: Prisma.PaymentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload>[];
                };
                create: {
                    args: Prisma.PaymentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload>;
                };
                createMany: {
                    args: Prisma.PaymentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PaymentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload>[];
                };
                delete: {
                    args: Prisma.PaymentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload>;
                };
                update: {
                    args: Prisma.PaymentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload>;
                };
                deleteMany: {
                    args: Prisma.PaymentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PaymentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PaymentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload>[];
                };
                upsert: {
                    args: Prisma.PaymentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload>;
                };
                aggregate: {
                    args: Prisma.PaymentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePayment>;
                };
                groupBy: {
                    args: Prisma.PaymentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PaymentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PaymentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PaymentCountAggregateOutputType> | number;
                };
            };
        };
        Membership: {
            payload: Prisma.$MembershipPayload<ExtArgs>;
            fields: Prisma.MembershipFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MembershipFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MembershipFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipPayload>;
                };
                findFirst: {
                    args: Prisma.MembershipFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MembershipFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipPayload>;
                };
                findMany: {
                    args: Prisma.MembershipFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipPayload>[];
                };
                create: {
                    args: Prisma.MembershipCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipPayload>;
                };
                createMany: {
                    args: Prisma.MembershipCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MembershipCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipPayload>[];
                };
                delete: {
                    args: Prisma.MembershipDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipPayload>;
                };
                update: {
                    args: Prisma.MembershipUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipPayload>;
                };
                deleteMany: {
                    args: Prisma.MembershipDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MembershipUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MembershipUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipPayload>[];
                };
                upsert: {
                    args: Prisma.MembershipUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipPayload>;
                };
                aggregate: {
                    args: Prisma.MembershipAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMembership>;
                };
                groupBy: {
                    args: Prisma.MembershipGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MembershipGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MembershipCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MembershipCountAggregateOutputType> | number;
                };
            };
        };
        PointTransaction: {
            payload: Prisma.$PointTransactionPayload<ExtArgs>;
            fields: Prisma.PointTransactionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PointTransactionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PointTransactionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PointTransactionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PointTransactionPayload>;
                };
                findFirst: {
                    args: Prisma.PointTransactionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PointTransactionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PointTransactionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PointTransactionPayload>;
                };
                findMany: {
                    args: Prisma.PointTransactionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PointTransactionPayload>[];
                };
                create: {
                    args: Prisma.PointTransactionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PointTransactionPayload>;
                };
                createMany: {
                    args: Prisma.PointTransactionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PointTransactionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PointTransactionPayload>[];
                };
                delete: {
                    args: Prisma.PointTransactionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PointTransactionPayload>;
                };
                update: {
                    args: Prisma.PointTransactionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PointTransactionPayload>;
                };
                deleteMany: {
                    args: Prisma.PointTransactionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PointTransactionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PointTransactionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PointTransactionPayload>[];
                };
                upsert: {
                    args: Prisma.PointTransactionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PointTransactionPayload>;
                };
                aggregate: {
                    args: Prisma.PointTransactionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePointTransaction>;
                };
                groupBy: {
                    args: Prisma.PointTransactionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PointTransactionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PointTransactionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PointTransactionCountAggregateOutputType> | number;
                };
            };
        };
        BlogPost: {
            payload: Prisma.$BlogPostPayload<ExtArgs>;
            fields: Prisma.BlogPostFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.BlogPostFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlogPostPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.BlogPostFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlogPostPayload>;
                };
                findFirst: {
                    args: Prisma.BlogPostFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlogPostPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.BlogPostFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlogPostPayload>;
                };
                findMany: {
                    args: Prisma.BlogPostFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlogPostPayload>[];
                };
                create: {
                    args: Prisma.BlogPostCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlogPostPayload>;
                };
                createMany: {
                    args: Prisma.BlogPostCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.BlogPostCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlogPostPayload>[];
                };
                delete: {
                    args: Prisma.BlogPostDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlogPostPayload>;
                };
                update: {
                    args: Prisma.BlogPostUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlogPostPayload>;
                };
                deleteMany: {
                    args: Prisma.BlogPostDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.BlogPostUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.BlogPostUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlogPostPayload>[];
                };
                upsert: {
                    args: Prisma.BlogPostUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlogPostPayload>;
                };
                aggregate: {
                    args: Prisma.BlogPostAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateBlogPost>;
                };
                groupBy: {
                    args: Prisma.BlogPostGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BlogPostGroupByOutputType>[];
                };
                count: {
                    args: Prisma.BlogPostCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BlogPostCountAggregateOutputType> | number;
                };
            };
        };
        Faq: {
            payload: Prisma.$FaqPayload<ExtArgs>;
            fields: Prisma.FaqFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.FaqFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FaqPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.FaqFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FaqPayload>;
                };
                findFirst: {
                    args: Prisma.FaqFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FaqPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.FaqFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FaqPayload>;
                };
                findMany: {
                    args: Prisma.FaqFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FaqPayload>[];
                };
                create: {
                    args: Prisma.FaqCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FaqPayload>;
                };
                createMany: {
                    args: Prisma.FaqCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.FaqCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FaqPayload>[];
                };
                delete: {
                    args: Prisma.FaqDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FaqPayload>;
                };
                update: {
                    args: Prisma.FaqUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FaqPayload>;
                };
                deleteMany: {
                    args: Prisma.FaqDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.FaqUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.FaqUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FaqPayload>[];
                };
                upsert: {
                    args: Prisma.FaqUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FaqPayload>;
                };
                aggregate: {
                    args: Prisma.FaqAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFaq>;
                };
                groupBy: {
                    args: Prisma.FaqGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FaqGroupByOutputType>[];
                };
                count: {
                    args: Prisma.FaqCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FaqCountAggregateOutputType> | number;
                };
            };
        };
        Consultation: {
            payload: Prisma.$ConsultationPayload<ExtArgs>;
            fields: Prisma.ConsultationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ConsultationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConsultationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ConsultationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConsultationPayload>;
                };
                findFirst: {
                    args: Prisma.ConsultationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConsultationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ConsultationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConsultationPayload>;
                };
                findMany: {
                    args: Prisma.ConsultationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConsultationPayload>[];
                };
                create: {
                    args: Prisma.ConsultationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConsultationPayload>;
                };
                createMany: {
                    args: Prisma.ConsultationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ConsultationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConsultationPayload>[];
                };
                delete: {
                    args: Prisma.ConsultationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConsultationPayload>;
                };
                update: {
                    args: Prisma.ConsultationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConsultationPayload>;
                };
                deleteMany: {
                    args: Prisma.ConsultationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ConsultationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ConsultationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConsultationPayload>[];
                };
                upsert: {
                    args: Prisma.ConsultationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConsultationPayload>;
                };
                aggregate: {
                    args: Prisma.ConsultationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateConsultation>;
                };
                groupBy: {
                    args: Prisma.ConsultationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ConsultationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ConsultationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ConsultationCountAggregateOutputType> | number;
                };
            };
        };
        SearchAnalytic: {
            payload: Prisma.$SearchAnalyticPayload<ExtArgs>;
            fields: Prisma.SearchAnalyticFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SearchAnalyticFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SearchAnalyticPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SearchAnalyticFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SearchAnalyticPayload>;
                };
                findFirst: {
                    args: Prisma.SearchAnalyticFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SearchAnalyticPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SearchAnalyticFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SearchAnalyticPayload>;
                };
                findMany: {
                    args: Prisma.SearchAnalyticFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SearchAnalyticPayload>[];
                };
                create: {
                    args: Prisma.SearchAnalyticCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SearchAnalyticPayload>;
                };
                createMany: {
                    args: Prisma.SearchAnalyticCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SearchAnalyticCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SearchAnalyticPayload>[];
                };
                delete: {
                    args: Prisma.SearchAnalyticDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SearchAnalyticPayload>;
                };
                update: {
                    args: Prisma.SearchAnalyticUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SearchAnalyticPayload>;
                };
                deleteMany: {
                    args: Prisma.SearchAnalyticDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SearchAnalyticUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SearchAnalyticUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SearchAnalyticPayload>[];
                };
                upsert: {
                    args: Prisma.SearchAnalyticUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SearchAnalyticPayload>;
                };
                aggregate: {
                    args: Prisma.SearchAnalyticAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSearchAnalytic>;
                };
                groupBy: {
                    args: Prisma.SearchAnalyticGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SearchAnalyticGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SearchAnalyticCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SearchAnalyticCountAggregateOutputType> | number;
                };
            };
        };
        Wishlist: {
            payload: Prisma.$WishlistPayload<ExtArgs>;
            fields: Prisma.WishlistFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WishlistFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WishlistPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WishlistFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WishlistPayload>;
                };
                findFirst: {
                    args: Prisma.WishlistFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WishlistPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WishlistFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WishlistPayload>;
                };
                findMany: {
                    args: Prisma.WishlistFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WishlistPayload>[];
                };
                create: {
                    args: Prisma.WishlistCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WishlistPayload>;
                };
                createMany: {
                    args: Prisma.WishlistCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.WishlistCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WishlistPayload>[];
                };
                delete: {
                    args: Prisma.WishlistDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WishlistPayload>;
                };
                update: {
                    args: Prisma.WishlistUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WishlistPayload>;
                };
                deleteMany: {
                    args: Prisma.WishlistDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WishlistUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.WishlistUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WishlistPayload>[];
                };
                upsert: {
                    args: Prisma.WishlistUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WishlistPayload>;
                };
                aggregate: {
                    args: Prisma.WishlistAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWishlist>;
                };
                groupBy: {
                    args: Prisma.WishlistGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WishlistGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WishlistCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WishlistCountAggregateOutputType> | number;
                };
            };
        };
        PromotionLanding: {
            payload: Prisma.$PromotionLandingPayload<ExtArgs>;
            fields: Prisma.PromotionLandingFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PromotionLandingFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PromotionLandingPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PromotionLandingFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PromotionLandingPayload>;
                };
                findFirst: {
                    args: Prisma.PromotionLandingFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PromotionLandingPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PromotionLandingFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PromotionLandingPayload>;
                };
                findMany: {
                    args: Prisma.PromotionLandingFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PromotionLandingPayload>[];
                };
                create: {
                    args: Prisma.PromotionLandingCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PromotionLandingPayload>;
                };
                createMany: {
                    args: Prisma.PromotionLandingCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PromotionLandingCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PromotionLandingPayload>[];
                };
                delete: {
                    args: Prisma.PromotionLandingDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PromotionLandingPayload>;
                };
                update: {
                    args: Prisma.PromotionLandingUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PromotionLandingPayload>;
                };
                deleteMany: {
                    args: Prisma.PromotionLandingDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PromotionLandingUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PromotionLandingUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PromotionLandingPayload>[];
                };
                upsert: {
                    args: Prisma.PromotionLandingUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PromotionLandingPayload>;
                };
                aggregate: {
                    args: Prisma.PromotionLandingAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePromotionLanding>;
                };
                groupBy: {
                    args: Prisma.PromotionLandingGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PromotionLandingGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PromotionLandingCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PromotionLandingCountAggregateOutputType> | number;
                };
            };
        };
        PromotionSection: {
            payload: Prisma.$PromotionSectionPayload<ExtArgs>;
            fields: Prisma.PromotionSectionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PromotionSectionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PromotionSectionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PromotionSectionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PromotionSectionPayload>;
                };
                findFirst: {
                    args: Prisma.PromotionSectionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PromotionSectionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PromotionSectionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PromotionSectionPayload>;
                };
                findMany: {
                    args: Prisma.PromotionSectionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PromotionSectionPayload>[];
                };
                create: {
                    args: Prisma.PromotionSectionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PromotionSectionPayload>;
                };
                createMany: {
                    args: Prisma.PromotionSectionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PromotionSectionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PromotionSectionPayload>[];
                };
                delete: {
                    args: Prisma.PromotionSectionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PromotionSectionPayload>;
                };
                update: {
                    args: Prisma.PromotionSectionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PromotionSectionPayload>;
                };
                deleteMany: {
                    args: Prisma.PromotionSectionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PromotionSectionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PromotionSectionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PromotionSectionPayload>[];
                };
                upsert: {
                    args: Prisma.PromotionSectionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PromotionSectionPayload>;
                };
                aggregate: {
                    args: Prisma.PromotionSectionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePromotionSection>;
                };
                groupBy: {
                    args: Prisma.PromotionSectionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PromotionSectionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PromotionSectionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PromotionSectionCountAggregateOutputType> | number;
                };
            };
        };
        PromotionBenefit: {
            payload: Prisma.$PromotionBenefitPayload<ExtArgs>;
            fields: Prisma.PromotionBenefitFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PromotionBenefitFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PromotionBenefitPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PromotionBenefitFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PromotionBenefitPayload>;
                };
                findFirst: {
                    args: Prisma.PromotionBenefitFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PromotionBenefitPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PromotionBenefitFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PromotionBenefitPayload>;
                };
                findMany: {
                    args: Prisma.PromotionBenefitFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PromotionBenefitPayload>[];
                };
                create: {
                    args: Prisma.PromotionBenefitCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PromotionBenefitPayload>;
                };
                createMany: {
                    args: Prisma.PromotionBenefitCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PromotionBenefitCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PromotionBenefitPayload>[];
                };
                delete: {
                    args: Prisma.PromotionBenefitDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PromotionBenefitPayload>;
                };
                update: {
                    args: Prisma.PromotionBenefitUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PromotionBenefitPayload>;
                };
                deleteMany: {
                    args: Prisma.PromotionBenefitDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PromotionBenefitUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PromotionBenefitUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PromotionBenefitPayload>[];
                };
                upsert: {
                    args: Prisma.PromotionBenefitUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PromotionBenefitPayload>;
                };
                aggregate: {
                    args: Prisma.PromotionBenefitAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePromotionBenefit>;
                };
                groupBy: {
                    args: Prisma.PromotionBenefitGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PromotionBenefitGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PromotionBenefitCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PromotionBenefitCountAggregateOutputType> | number;
                };
            };
        };
        SiteSettings: {
            payload: Prisma.$SiteSettingsPayload<ExtArgs>;
            fields: Prisma.SiteSettingsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SiteSettingsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiteSettingsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SiteSettingsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiteSettingsPayload>;
                };
                findFirst: {
                    args: Prisma.SiteSettingsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiteSettingsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SiteSettingsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiteSettingsPayload>;
                };
                findMany: {
                    args: Prisma.SiteSettingsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiteSettingsPayload>[];
                };
                create: {
                    args: Prisma.SiteSettingsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiteSettingsPayload>;
                };
                createMany: {
                    args: Prisma.SiteSettingsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SiteSettingsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiteSettingsPayload>[];
                };
                delete: {
                    args: Prisma.SiteSettingsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiteSettingsPayload>;
                };
                update: {
                    args: Prisma.SiteSettingsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiteSettingsPayload>;
                };
                deleteMany: {
                    args: Prisma.SiteSettingsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SiteSettingsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SiteSettingsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiteSettingsPayload>[];
                };
                upsert: {
                    args: Prisma.SiteSettingsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SiteSettingsPayload>;
                };
                aggregate: {
                    args: Prisma.SiteSettingsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSiteSettings>;
                };
                groupBy: {
                    args: Prisma.SiteSettingsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SiteSettingsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SiteSettingsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SiteSettingsCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly email: "email";
    readonly phone: "phone";
    readonly password: "password";
    readonly role: "role";
    readonly isVerified: "isVerified";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
    readonly bannedAt: "bannedAt";
    readonly banReason: "banReason";
    readonly refreshToken: "refreshToken";
    readonly verifyToken: "verifyToken";
    readonly verifyTokenExp: "verifyTokenExp";
    readonly resetToken: "resetToken";
    readonly resetTokenExp: "resetTokenExp";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const AddressScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly label: "label";
    readonly receiverName: "receiverName";
    readonly phone: "phone";
    readonly address: "address";
    readonly notes: "notes";
    readonly cityId: "cityId";
    readonly provinceId: "provinceId";
    readonly postalCode: "postalCode";
    readonly isDefault: "isDefault";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type AddressScalarFieldEnum = (typeof AddressScalarFieldEnum)[keyof typeof AddressScalarFieldEnum];
export declare const BannerScalarFieldEnum: {
    readonly id: "id";
    readonly imageUrl: "imageUrl";
    readonly altText: "altText";
    readonly label: "label";
    readonly title: "title";
    readonly extraText: "extraText";
    readonly desc: "desc";
    readonly path: "path";
    readonly isActive: "isActive";
    readonly sortOrder: "sortOrder";
    readonly startDate: "startDate";
    readonly endDate: "endDate";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type BannerScalarFieldEnum = (typeof BannerScalarFieldEnum)[keyof typeof BannerScalarFieldEnum];
export declare const CategoryScalarFieldEnum: {
    readonly id: "id";
    readonly parentId: "parentId";
    readonly name: "name";
    readonly slug: "slug";
    readonly description: "description";
    readonly imageUrl: "imageUrl";
    readonly sortOrder: "sortOrder";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum];
export declare const ProductScalarFieldEnum: {
    readonly id: "id";
    readonly categoryId: "categoryId";
    readonly name: "name";
    readonly slug: "slug";
    readonly description: "description";
    readonly notes: "notes";
    readonly basePrice: "basePrice";
    readonly discountPrice: "discountPrice";
    readonly weight: "weight";
    readonly sku: "sku";
    readonly mainImage: "mainImage";
    readonly stock: "stock";
    readonly reservedStock: "reservedStock";
    readonly soldCount: "soldCount";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly metaTitle: "metaTitle";
    readonly metaDescription: "metaDescription";
    readonly avgRating: "avgRating";
    readonly reviewCount: "reviewCount";
    readonly deletedAt: "deletedAt";
};
export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum];
export declare const ProductImageScalarFieldEnum: {
    readonly id: "id";
    readonly productId: "productId";
    readonly imageUrl: "imageUrl";
    readonly publicId: "publicId";
    readonly altText: "altText";
    readonly imageType: "imageType";
    readonly sortOrder: "sortOrder";
    readonly isFeatured: "isFeatured";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ProductImageScalarFieldEnum = (typeof ProductImageScalarFieldEnum)[keyof typeof ProductImageScalarFieldEnum];
export declare const ProductVariantScalarFieldEnum: {
    readonly id: "id";
    readonly productId: "productId";
    readonly name: "name";
    readonly value: "value";
    readonly basePrice: "basePrice";
    readonly discountPrice: "discountPrice";
    readonly priceAdjustment: "priceAdjustment";
    readonly stock: "stock";
    readonly reservedStock: "reservedStock";
    readonly weight: "weight";
    readonly imageUrl: "imageUrl";
    readonly altText: "altText";
    readonly sku: "sku";
    readonly isActive: "isActive";
    readonly sortOrder: "sortOrder";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ProductVariantScalarFieldEnum = (typeof ProductVariantScalarFieldEnum)[keyof typeof ProductVariantScalarFieldEnum];
export declare const BundleScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly slug: "slug";
    readonly description: "description";
    readonly imageUrl: "imageUrl";
    readonly publicId: "publicId";
    readonly bundlePrice: "bundlePrice";
    readonly discountPrice: "discountPrice";
    readonly isActive: "isActive";
    readonly stock: "stock";
    readonly soldCount: "soldCount";
    readonly sortOrder: "sortOrder";
    readonly startDate: "startDate";
    readonly endDate: "endDate";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type BundleScalarFieldEnum = (typeof BundleScalarFieldEnum)[keyof typeof BundleScalarFieldEnum];
export declare const BundleItemScalarFieldEnum: {
    readonly id: "id";
    readonly bundleId: "bundleId";
    readonly productId: "productId";
    readonly quantity: "quantity";
};
export type BundleItemScalarFieldEnum = (typeof BundleItemScalarFieldEnum)[keyof typeof BundleItemScalarFieldEnum];
export declare const ProductReviewScalarFieldEnum: {
    readonly id: "id";
    readonly productId: "productId";
    readonly userId: "userId";
    readonly orderId: "orderId";
    readonly rating: "rating";
    readonly review: "review";
    readonly isVerifiedPurchase: "isVerifiedPurchase";
    readonly helpfulCount: "helpfulCount";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ProductReviewScalarFieldEnum = (typeof ProductReviewScalarFieldEnum)[keyof typeof ProductReviewScalarFieldEnum];
export declare const ProductReviewHelpfulScalarFieldEnum: {
    readonly id: "id";
    readonly reviewId: "reviewId";
    readonly userId: "userId";
    readonly isHelpful: "isHelpful";
    readonly createdAt: "createdAt";
};
export type ProductReviewHelpfulScalarFieldEnum = (typeof ProductReviewHelpfulScalarFieldEnum)[keyof typeof ProductReviewHelpfulScalarFieldEnum];
export declare const ProductReviewImageScalarFieldEnum: {
    readonly id: "id";
    readonly reviewId: "reviewId";
    readonly imageUrl: "imageUrl";
    readonly createdAt: "createdAt";
};
export type ProductReviewImageScalarFieldEnum = (typeof ProductReviewImageScalarFieldEnum)[keyof typeof ProductReviewImageScalarFieldEnum];
export declare const CartScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CartScalarFieldEnum = (typeof CartScalarFieldEnum)[keyof typeof CartScalarFieldEnum];
export declare const CartItemScalarFieldEnum: {
    readonly id: "id";
    readonly cartId: "cartId";
    readonly productId: "productId";
    readonly variantId: "variantId";
    readonly quantity: "quantity";
    readonly price: "price";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CartItemScalarFieldEnum = (typeof CartItemScalarFieldEnum)[keyof typeof CartItemScalarFieldEnum];
export declare const GuestCartScalarFieldEnum: {
    readonly id: "id";
    readonly sessionId: "sessionId";
    readonly expiresAt: "expiresAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type GuestCartScalarFieldEnum = (typeof GuestCartScalarFieldEnum)[keyof typeof GuestCartScalarFieldEnum];
export declare const GuestCartItemScalarFieldEnum: {
    readonly id: "id";
    readonly guestCartId: "guestCartId";
    readonly productId: "productId";
    readonly variantId: "variantId";
    readonly quantity: "quantity";
    readonly price: "price";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type GuestCartItemScalarFieldEnum = (typeof GuestCartItemScalarFieldEnum)[keyof typeof GuestCartItemScalarFieldEnum];
export declare const VoucherScalarFieldEnum: {
    readonly id: "id";
    readonly code: "code";
    readonly type: "type";
    readonly source: "source";
    readonly value: "value";
    readonly minPurchase: "minPurchase";
    readonly maxDiscount: "maxDiscount";
    readonly usageLimit: "usageLimit";
    readonly usedCount: "usedCount";
    readonly isActive: "isActive";
    readonly startDate: "startDate";
    readonly endDate: "endDate";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly ownerId: "ownerId";
};
export type VoucherScalarFieldEnum = (typeof VoucherScalarFieldEnum)[keyof typeof VoucherScalarFieldEnum];
export declare const OrderScalarFieldEnum: {
    readonly id: "id";
    readonly orderNumber: "orderNumber";
    readonly userId: "userId";
    readonly addressId: "addressId";
    readonly voucherId: "voucherId";
    readonly voucherShippingId: "voucherShippingId";
    readonly bundleId: "bundleId";
    readonly status: "status";
    readonly paymentStatus: "paymentStatus";
    readonly subtotal: "subtotal";
    readonly discountAmount: "discountAmount";
    readonly discountShipping: "discountShipping";
    readonly shippingCost: "shippingCost";
    readonly total: "total";
    readonly courier: "courier";
    readonly service: "service";
    readonly shippingProvider: "shippingProvider";
    readonly trackingNumber: "trackingNumber";
    readonly estimatedDelivery: "estimatedDelivery";
    readonly deliveredAt: "deliveredAt";
    readonly cancelledAt: "cancelledAt";
    readonly cancelReason: "cancelReason";
    readonly notes: "notes";
    readonly paymentDeadline: "paymentDeadline";
    readonly cancelDeadline: "cancelDeadline";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum];
export declare const OrderItemScalarFieldEnum: {
    readonly id: "id";
    readonly orderId: "orderId";
    readonly productId: "productId";
    readonly productName: "productName";
    readonly variantId: "variantId";
    readonly variantName: "variantName";
    readonly quantity: "quantity";
    readonly price: "price";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly bundleId: "bundleId";
};
export type OrderItemScalarFieldEnum = (typeof OrderItemScalarFieldEnum)[keyof typeof OrderItemScalarFieldEnum];
export declare const OrderStatusHistoryScalarFieldEnum: {
    readonly id: "id";
    readonly orderId: "orderId";
    readonly status: "status";
    readonly note: "note";
    readonly createdAt: "createdAt";
};
export type OrderStatusHistoryScalarFieldEnum = (typeof OrderStatusHistoryScalarFieldEnum)[keyof typeof OrderStatusHistoryScalarFieldEnum];
export declare const PaymentScalarFieldEnum: {
    readonly id: "id";
    readonly orderId: "orderId";
    readonly provider: "provider";
    readonly status: "status";
    readonly amount: "amount";
    readonly externalId: "externalId";
    readonly paymentMethod: "paymentMethod";
    readonly paymentUrl: "paymentUrl";
    readonly expiredAt: "expiredAt";
    readonly paidAt: "paidAt";
    readonly refundedAt: "refundedAt";
    readonly refundReason: "refundReason";
    readonly metadata: "metadata";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum];
export declare const MembershipScalarFieldEnum: {
    readonly userId: "userId";
    readonly tier: "tier";
    readonly points: "points";
    readonly totalSpent: "totalSpent";
    readonly pointsExpiredAt: "pointsExpiredAt";
    readonly lastDailyLoginAt: "lastDailyLoginAt";
    readonly lastTierUpAt: "lastTierUpAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type MembershipScalarFieldEnum = (typeof MembershipScalarFieldEnum)[keyof typeof MembershipScalarFieldEnum];
export declare const PointTransactionScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly points: "points";
    readonly type: "type";
    readonly referenceId: "referenceId";
    readonly description: "description";
    readonly expiredAt: "expiredAt";
    readonly createdAt: "createdAt";
};
export type PointTransactionScalarFieldEnum = (typeof PointTransactionScalarFieldEnum)[keyof typeof PointTransactionScalarFieldEnum];
export declare const BlogPostScalarFieldEnum: {
    readonly id: "id";
    readonly authorId: "authorId";
    readonly title: "title";
    readonly slug: "slug";
    readonly excerpt: "excerpt";
    readonly coverImage: "coverImage";
    readonly coverPublicId: "coverPublicId";
    readonly content: "content";
    readonly status: "status";
    readonly viewCount: "viewCount";
    readonly publishedAt: "publishedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type BlogPostScalarFieldEnum = (typeof BlogPostScalarFieldEnum)[keyof typeof BlogPostScalarFieldEnum];
export declare const FaqScalarFieldEnum: {
    readonly id: "id";
    readonly question: "question";
    readonly answer: "answer";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type FaqScalarFieldEnum = (typeof FaqScalarFieldEnum)[keyof typeof FaqScalarFieldEnum];
export declare const ConsultationScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly email: "email";
    readonly phone: "phone";
    readonly message: "message";
    readonly status: "status";
    readonly respondedBy: "respondedBy";
    readonly response: "response";
    readonly respondedAt: "respondedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ConsultationScalarFieldEnum = (typeof ConsultationScalarFieldEnum)[keyof typeof ConsultationScalarFieldEnum];
export declare const SearchAnalyticScalarFieldEnum: {
    readonly id: "id";
    readonly query: "query";
    readonly count: "count";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type SearchAnalyticScalarFieldEnum = (typeof SearchAnalyticScalarFieldEnum)[keyof typeof SearchAnalyticScalarFieldEnum];
export declare const WishlistScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly productId: "productId";
    readonly createdAt: "createdAt";
};
export type WishlistScalarFieldEnum = (typeof WishlistScalarFieldEnum)[keyof typeof WishlistScalarFieldEnum];
export declare const PromotionLandingScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly slug: "slug";
    readonly subtitle: "subtitle";
    readonly description: "description";
    readonly badgeText: "badgeText";
    readonly startDate: "startDate";
    readonly endDate: "endDate";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly heroBundleId: "heroBundleId";
};
export type PromotionLandingScalarFieldEnum = (typeof PromotionLandingScalarFieldEnum)[keyof typeof PromotionLandingScalarFieldEnum];
export declare const PromotionSectionScalarFieldEnum: {
    readonly id: "id";
    readonly promotionId: "promotionId";
    readonly title: "title";
    readonly subtitle: "subtitle";
    readonly sortOrder: "sortOrder";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PromotionSectionScalarFieldEnum = (typeof PromotionSectionScalarFieldEnum)[keyof typeof PromotionSectionScalarFieldEnum];
export declare const PromotionBenefitScalarFieldEnum: {
    readonly id: "id";
    readonly promotionId: "promotionId";
    readonly icon: "icon";
    readonly title: "title";
    readonly description: "description";
    readonly sortOrder: "sortOrder";
};
export type PromotionBenefitScalarFieldEnum = (typeof PromotionBenefitScalarFieldEnum)[keyof typeof PromotionBenefitScalarFieldEnum];
export declare const SiteSettingsScalarFieldEnum: {
    readonly id: "id";
    readonly siteName: "siteName";
    readonly siteDescription: "siteDescription";
    readonly contactEmail: "contactEmail";
    readonly contactPhone: "contactPhone";
    readonly contactAddress: "contactAddress";
    readonly socialInstagram: "socialInstagram";
    readonly socialTiktok: "socialTiktok";
    readonly socialFacebook: "socialFacebook";
    readonly socialWhatsapp: "socialWhatsapp";
    readonly shippingOriginCityId: "shippingOriginCityId";
    readonly taxRate: "taxRate";
    readonly currency: "currency";
    readonly maintenanceMode: "maintenanceMode";
    readonly updatedAt: "updatedAt";
};
export type SiteSettingsScalarFieldEnum = (typeof SiteSettingsScalarFieldEnum)[keyof typeof SiteSettingsScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
    readonly AnyNull: runtime.AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>;
export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>;
export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>;
export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>;
export type EnumProductStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProductStatus'>;
export type ListEnumProductStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProductStatus[]'>;
export type EnumImageTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ImageType'>;
export type ListEnumImageTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ImageType[]'>;
export type EnumVoucherTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VoucherType'>;
export type ListEnumVoucherTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VoucherType[]'>;
export type EnumVoucherSourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VoucherSource'>;
export type ListEnumVoucherSourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VoucherSource[]'>;
export type EnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus'>;
export type ListEnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus[]'>;
export type EnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus'>;
export type ListEnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus[]'>;
export type EnumPaymentProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentProvider'>;
export type ListEnumPaymentProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentProvider[]'>;
export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>;
export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>;
export type EnumMembershipTierFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MembershipTier'>;
export type ListEnumMembershipTierFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MembershipTier[]'>;
export type EnumPointTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PointTransactionType'>;
export type ListEnumPointTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PointTransactionType[]'>;
export type EnumBlogStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BlogStatus'>;
export type ListEnumBlogStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BlogStatus[]'>;
export type EnumConsultationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConsultationStatus'>;
export type ListEnumConsultationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConsultationStatus[]'>;
export type EnumPromotionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PromotionStatus'>;
export type ListEnumPromotionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PromotionStatus[]'>;
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export type PrismaClientOptions = ({
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
} | {
    accelerateUrl: string;
    adapter?: never;
}) & {
    errorFormat?: ErrorFormat;
    log?: (LogLevel | LogDefinition)[];
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    omit?: GlobalOmitConfig;
    comments?: runtime.SqlCommenterPlugin[];
    queryPlanCacheMaxSize?: number;
};
export type GlobalOmitConfig = {
    user?: Prisma.UserOmit;
    address?: Prisma.AddressOmit;
    banner?: Prisma.BannerOmit;
    category?: Prisma.CategoryOmit;
    product?: Prisma.ProductOmit;
    productImage?: Prisma.ProductImageOmit;
    productVariant?: Prisma.ProductVariantOmit;
    bundle?: Prisma.BundleOmit;
    bundleItem?: Prisma.BundleItemOmit;
    productReview?: Prisma.ProductReviewOmit;
    productReviewHelpful?: Prisma.ProductReviewHelpfulOmit;
    productReviewImage?: Prisma.ProductReviewImageOmit;
    cart?: Prisma.CartOmit;
    cartItem?: Prisma.CartItemOmit;
    guestCart?: Prisma.GuestCartOmit;
    guestCartItem?: Prisma.GuestCartItemOmit;
    voucher?: Prisma.VoucherOmit;
    order?: Prisma.OrderOmit;
    orderItem?: Prisma.OrderItemOmit;
    orderStatusHistory?: Prisma.OrderStatusHistoryOmit;
    payment?: Prisma.PaymentOmit;
    membership?: Prisma.MembershipOmit;
    pointTransaction?: Prisma.PointTransactionOmit;
    blogPost?: Prisma.BlogPostOmit;
    faq?: Prisma.FaqOmit;
    consultation?: Prisma.ConsultationOmit;
    searchAnalytic?: Prisma.SearchAnalyticOmit;
    wishlist?: Prisma.WishlistOmit;
    promotionLanding?: Prisma.PromotionLandingOmit;
    promotionSection?: Prisma.PromotionSectionOmit;
    promotionBenefit?: Prisma.PromotionBenefitOmit;
    siteSettings?: Prisma.SiteSettingsOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
