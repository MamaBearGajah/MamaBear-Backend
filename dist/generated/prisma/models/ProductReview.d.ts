import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ProductReviewModel = runtime.Types.Result.DefaultSelection<Prisma.$ProductReviewPayload>;
export type AggregateProductReview = {
    _count: ProductReviewCountAggregateOutputType | null;
    _avg: ProductReviewAvgAggregateOutputType | null;
    _sum: ProductReviewSumAggregateOutputType | null;
    _min: ProductReviewMinAggregateOutputType | null;
    _max: ProductReviewMaxAggregateOutputType | null;
};
export type ProductReviewAvgAggregateOutputType = {
    rating: number | null;
    helpfulCount: number | null;
};
export type ProductReviewSumAggregateOutputType = {
    rating: number | null;
    helpfulCount: number | null;
};
export type ProductReviewMinAggregateOutputType = {
    id: string | null;
    productId: string | null;
    userId: string | null;
    orderId: string | null;
    rating: number | null;
    review: string | null;
    isVerifiedPurchase: boolean | null;
    helpfulCount: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ProductReviewMaxAggregateOutputType = {
    id: string | null;
    productId: string | null;
    userId: string | null;
    orderId: string | null;
    rating: number | null;
    review: string | null;
    isVerifiedPurchase: boolean | null;
    helpfulCount: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ProductReviewCountAggregateOutputType = {
    id: number;
    productId: number;
    userId: number;
    orderId: number;
    rating: number;
    review: number;
    isVerifiedPurchase: number;
    helpfulCount: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ProductReviewAvgAggregateInputType = {
    rating?: true;
    helpfulCount?: true;
};
export type ProductReviewSumAggregateInputType = {
    rating?: true;
    helpfulCount?: true;
};
export type ProductReviewMinAggregateInputType = {
    id?: true;
    productId?: true;
    userId?: true;
    orderId?: true;
    rating?: true;
    review?: true;
    isVerifiedPurchase?: true;
    helpfulCount?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ProductReviewMaxAggregateInputType = {
    id?: true;
    productId?: true;
    userId?: true;
    orderId?: true;
    rating?: true;
    review?: true;
    isVerifiedPurchase?: true;
    helpfulCount?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ProductReviewCountAggregateInputType = {
    id?: true;
    productId?: true;
    userId?: true;
    orderId?: true;
    rating?: true;
    review?: true;
    isVerifiedPurchase?: true;
    helpfulCount?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ProductReviewAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductReviewWhereInput;
    orderBy?: Prisma.ProductReviewOrderByWithRelationInput | Prisma.ProductReviewOrderByWithRelationInput[];
    cursor?: Prisma.ProductReviewWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProductReviewCountAggregateInputType;
    _avg?: ProductReviewAvgAggregateInputType;
    _sum?: ProductReviewSumAggregateInputType;
    _min?: ProductReviewMinAggregateInputType;
    _max?: ProductReviewMaxAggregateInputType;
};
export type GetProductReviewAggregateType<T extends ProductReviewAggregateArgs> = {
    [P in keyof T & keyof AggregateProductReview]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProductReview[P]> : Prisma.GetScalarType<T[P], AggregateProductReview[P]>;
};
export type ProductReviewGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductReviewWhereInput;
    orderBy?: Prisma.ProductReviewOrderByWithAggregationInput | Prisma.ProductReviewOrderByWithAggregationInput[];
    by: Prisma.ProductReviewScalarFieldEnum[] | Prisma.ProductReviewScalarFieldEnum;
    having?: Prisma.ProductReviewScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProductReviewCountAggregateInputType | true;
    _avg?: ProductReviewAvgAggregateInputType;
    _sum?: ProductReviewSumAggregateInputType;
    _min?: ProductReviewMinAggregateInputType;
    _max?: ProductReviewMaxAggregateInputType;
};
export type ProductReviewGroupByOutputType = {
    id: string;
    productId: string;
    userId: string;
    orderId: string;
    rating: number | null;
    review: string | null;
    isVerifiedPurchase: boolean;
    helpfulCount: number;
    createdAt: Date;
    updatedAt: Date;
    _count: ProductReviewCountAggregateOutputType | null;
    _avg: ProductReviewAvgAggregateOutputType | null;
    _sum: ProductReviewSumAggregateOutputType | null;
    _min: ProductReviewMinAggregateOutputType | null;
    _max: ProductReviewMaxAggregateOutputType | null;
};
export type GetProductReviewGroupByPayload<T extends ProductReviewGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProductReviewGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProductReviewGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProductReviewGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProductReviewGroupByOutputType[P]>;
}>>;
export type ProductReviewWhereInput = {
    AND?: Prisma.ProductReviewWhereInput | Prisma.ProductReviewWhereInput[];
    OR?: Prisma.ProductReviewWhereInput[];
    NOT?: Prisma.ProductReviewWhereInput | Prisma.ProductReviewWhereInput[];
    id?: Prisma.StringFilter<"ProductReview"> | string;
    productId?: Prisma.StringFilter<"ProductReview"> | string;
    userId?: Prisma.StringFilter<"ProductReview"> | string;
    orderId?: Prisma.StringFilter<"ProductReview"> | string;
    rating?: Prisma.IntNullableFilter<"ProductReview"> | number | null;
    review?: Prisma.StringNullableFilter<"ProductReview"> | string | null;
    isVerifiedPurchase?: Prisma.BoolFilter<"ProductReview"> | boolean;
    helpfulCount?: Prisma.IntFilter<"ProductReview"> | number;
    createdAt?: Prisma.DateTimeFilter<"ProductReview"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ProductReview"> | Date | string;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    order?: Prisma.XOR<Prisma.OrderScalarRelationFilter, Prisma.OrderWhereInput>;
    helpfuls?: Prisma.ProductReviewHelpfulListRelationFilter;
    images?: Prisma.ProductReviewImageListRelationFilter;
};
export type ProductReviewOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    rating?: Prisma.SortOrderInput | Prisma.SortOrder;
    review?: Prisma.SortOrderInput | Prisma.SortOrder;
    isVerifiedPurchase?: Prisma.SortOrder;
    helpfulCount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    product?: Prisma.ProductOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
    order?: Prisma.OrderOrderByWithRelationInput;
    helpfuls?: Prisma.ProductReviewHelpfulOrderByRelationAggregateInput;
    images?: Prisma.ProductReviewImageOrderByRelationAggregateInput;
};
export type ProductReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId_productId_orderId?: Prisma.ProductReviewUserIdProductIdOrderIdCompoundUniqueInput;
    AND?: Prisma.ProductReviewWhereInput | Prisma.ProductReviewWhereInput[];
    OR?: Prisma.ProductReviewWhereInput[];
    NOT?: Prisma.ProductReviewWhereInput | Prisma.ProductReviewWhereInput[];
    productId?: Prisma.StringFilter<"ProductReview"> | string;
    userId?: Prisma.StringFilter<"ProductReview"> | string;
    orderId?: Prisma.StringFilter<"ProductReview"> | string;
    rating?: Prisma.IntNullableFilter<"ProductReview"> | number | null;
    review?: Prisma.StringNullableFilter<"ProductReview"> | string | null;
    isVerifiedPurchase?: Prisma.BoolFilter<"ProductReview"> | boolean;
    helpfulCount?: Prisma.IntFilter<"ProductReview"> | number;
    createdAt?: Prisma.DateTimeFilter<"ProductReview"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ProductReview"> | Date | string;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    order?: Prisma.XOR<Prisma.OrderScalarRelationFilter, Prisma.OrderWhereInput>;
    helpfuls?: Prisma.ProductReviewHelpfulListRelationFilter;
    images?: Prisma.ProductReviewImageListRelationFilter;
}, "id" | "userId_productId_orderId">;
export type ProductReviewOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    rating?: Prisma.SortOrderInput | Prisma.SortOrder;
    review?: Prisma.SortOrderInput | Prisma.SortOrder;
    isVerifiedPurchase?: Prisma.SortOrder;
    helpfulCount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ProductReviewCountOrderByAggregateInput;
    _avg?: Prisma.ProductReviewAvgOrderByAggregateInput;
    _max?: Prisma.ProductReviewMaxOrderByAggregateInput;
    _min?: Prisma.ProductReviewMinOrderByAggregateInput;
    _sum?: Prisma.ProductReviewSumOrderByAggregateInput;
};
export type ProductReviewScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProductReviewScalarWhereWithAggregatesInput | Prisma.ProductReviewScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProductReviewScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProductReviewScalarWhereWithAggregatesInput | Prisma.ProductReviewScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ProductReview"> | string;
    productId?: Prisma.StringWithAggregatesFilter<"ProductReview"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"ProductReview"> | string;
    orderId?: Prisma.StringWithAggregatesFilter<"ProductReview"> | string;
    rating?: Prisma.IntNullableWithAggregatesFilter<"ProductReview"> | number | null;
    review?: Prisma.StringNullableWithAggregatesFilter<"ProductReview"> | string | null;
    isVerifiedPurchase?: Prisma.BoolWithAggregatesFilter<"ProductReview"> | boolean;
    helpfulCount?: Prisma.IntWithAggregatesFilter<"ProductReview"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ProductReview"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"ProductReview"> | Date | string;
};
export type ProductReviewCreateInput = {
    id?: string;
    rating?: number | null;
    review?: string | null;
    isVerifiedPurchase?: boolean;
    helpfulCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    product: Prisma.ProductCreateNestedOneWithoutReviewsInput;
    user: Prisma.UserCreateNestedOneWithoutReviewsInput;
    order: Prisma.OrderCreateNestedOneWithoutReviewsInput;
    helpfuls?: Prisma.ProductReviewHelpfulCreateNestedManyWithoutReviewInput;
    images?: Prisma.ProductReviewImageCreateNestedManyWithoutReviewInput;
};
export type ProductReviewUncheckedCreateInput = {
    id?: string;
    productId: string;
    userId: string;
    orderId: string;
    rating?: number | null;
    review?: string | null;
    isVerifiedPurchase?: boolean;
    helpfulCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    helpfuls?: Prisma.ProductReviewHelpfulUncheckedCreateNestedManyWithoutReviewInput;
    images?: Prisma.ProductReviewImageUncheckedCreateNestedManyWithoutReviewInput;
};
export type ProductReviewUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    review?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerifiedPurchase?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    helpfulCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutReviewsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutReviewsNestedInput;
    order?: Prisma.OrderUpdateOneRequiredWithoutReviewsNestedInput;
    helpfuls?: Prisma.ProductReviewHelpfulUpdateManyWithoutReviewNestedInput;
    images?: Prisma.ProductReviewImageUpdateManyWithoutReviewNestedInput;
};
export type ProductReviewUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    review?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerifiedPurchase?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    helpfulCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    helpfuls?: Prisma.ProductReviewHelpfulUncheckedUpdateManyWithoutReviewNestedInput;
    images?: Prisma.ProductReviewImageUncheckedUpdateManyWithoutReviewNestedInput;
};
export type ProductReviewCreateManyInput = {
    id?: string;
    productId: string;
    userId: string;
    orderId: string;
    rating?: number | null;
    review?: string | null;
    isVerifiedPurchase?: boolean;
    helpfulCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProductReviewUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    review?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerifiedPurchase?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    helpfulCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductReviewUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    review?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerifiedPurchase?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    helpfulCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductReviewListRelationFilter = {
    every?: Prisma.ProductReviewWhereInput;
    some?: Prisma.ProductReviewWhereInput;
    none?: Prisma.ProductReviewWhereInput;
};
export type ProductReviewOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProductReviewUserIdProductIdOrderIdCompoundUniqueInput = {
    userId: string;
    productId: string;
    orderId: string;
};
export type ProductReviewCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    review?: Prisma.SortOrder;
    isVerifiedPurchase?: Prisma.SortOrder;
    helpfulCount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProductReviewAvgOrderByAggregateInput = {
    rating?: Prisma.SortOrder;
    helpfulCount?: Prisma.SortOrder;
};
export type ProductReviewMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    review?: Prisma.SortOrder;
    isVerifiedPurchase?: Prisma.SortOrder;
    helpfulCount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProductReviewMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    review?: Prisma.SortOrder;
    isVerifiedPurchase?: Prisma.SortOrder;
    helpfulCount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProductReviewSumOrderByAggregateInput = {
    rating?: Prisma.SortOrder;
    helpfulCount?: Prisma.SortOrder;
};
export type ProductReviewScalarRelationFilter = {
    is?: Prisma.ProductReviewWhereInput;
    isNot?: Prisma.ProductReviewWhereInput;
};
export type ProductReviewCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ProductReviewCreateWithoutUserInput, Prisma.ProductReviewUncheckedCreateWithoutUserInput> | Prisma.ProductReviewCreateWithoutUserInput[] | Prisma.ProductReviewUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ProductReviewCreateOrConnectWithoutUserInput | Prisma.ProductReviewCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ProductReviewCreateManyUserInputEnvelope;
    connect?: Prisma.ProductReviewWhereUniqueInput | Prisma.ProductReviewWhereUniqueInput[];
};
export type ProductReviewUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ProductReviewCreateWithoutUserInput, Prisma.ProductReviewUncheckedCreateWithoutUserInput> | Prisma.ProductReviewCreateWithoutUserInput[] | Prisma.ProductReviewUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ProductReviewCreateOrConnectWithoutUserInput | Prisma.ProductReviewCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ProductReviewCreateManyUserInputEnvelope;
    connect?: Prisma.ProductReviewWhereUniqueInput | Prisma.ProductReviewWhereUniqueInput[];
};
export type ProductReviewUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ProductReviewCreateWithoutUserInput, Prisma.ProductReviewUncheckedCreateWithoutUserInput> | Prisma.ProductReviewCreateWithoutUserInput[] | Prisma.ProductReviewUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ProductReviewCreateOrConnectWithoutUserInput | Prisma.ProductReviewCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ProductReviewUpsertWithWhereUniqueWithoutUserInput | Prisma.ProductReviewUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ProductReviewCreateManyUserInputEnvelope;
    set?: Prisma.ProductReviewWhereUniqueInput | Prisma.ProductReviewWhereUniqueInput[];
    disconnect?: Prisma.ProductReviewWhereUniqueInput | Prisma.ProductReviewWhereUniqueInput[];
    delete?: Prisma.ProductReviewWhereUniqueInput | Prisma.ProductReviewWhereUniqueInput[];
    connect?: Prisma.ProductReviewWhereUniqueInput | Prisma.ProductReviewWhereUniqueInput[];
    update?: Prisma.ProductReviewUpdateWithWhereUniqueWithoutUserInput | Prisma.ProductReviewUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ProductReviewUpdateManyWithWhereWithoutUserInput | Prisma.ProductReviewUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ProductReviewScalarWhereInput | Prisma.ProductReviewScalarWhereInput[];
};
export type ProductReviewUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ProductReviewCreateWithoutUserInput, Prisma.ProductReviewUncheckedCreateWithoutUserInput> | Prisma.ProductReviewCreateWithoutUserInput[] | Prisma.ProductReviewUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ProductReviewCreateOrConnectWithoutUserInput | Prisma.ProductReviewCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ProductReviewUpsertWithWhereUniqueWithoutUserInput | Prisma.ProductReviewUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ProductReviewCreateManyUserInputEnvelope;
    set?: Prisma.ProductReviewWhereUniqueInput | Prisma.ProductReviewWhereUniqueInput[];
    disconnect?: Prisma.ProductReviewWhereUniqueInput | Prisma.ProductReviewWhereUniqueInput[];
    delete?: Prisma.ProductReviewWhereUniqueInput | Prisma.ProductReviewWhereUniqueInput[];
    connect?: Prisma.ProductReviewWhereUniqueInput | Prisma.ProductReviewWhereUniqueInput[];
    update?: Prisma.ProductReviewUpdateWithWhereUniqueWithoutUserInput | Prisma.ProductReviewUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ProductReviewUpdateManyWithWhereWithoutUserInput | Prisma.ProductReviewUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ProductReviewScalarWhereInput | Prisma.ProductReviewScalarWhereInput[];
};
export type ProductReviewCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ProductReviewCreateWithoutProductInput, Prisma.ProductReviewUncheckedCreateWithoutProductInput> | Prisma.ProductReviewCreateWithoutProductInput[] | Prisma.ProductReviewUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductReviewCreateOrConnectWithoutProductInput | Prisma.ProductReviewCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ProductReviewCreateManyProductInputEnvelope;
    connect?: Prisma.ProductReviewWhereUniqueInput | Prisma.ProductReviewWhereUniqueInput[];
};
export type ProductReviewUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ProductReviewCreateWithoutProductInput, Prisma.ProductReviewUncheckedCreateWithoutProductInput> | Prisma.ProductReviewCreateWithoutProductInput[] | Prisma.ProductReviewUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductReviewCreateOrConnectWithoutProductInput | Prisma.ProductReviewCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ProductReviewCreateManyProductInputEnvelope;
    connect?: Prisma.ProductReviewWhereUniqueInput | Prisma.ProductReviewWhereUniqueInput[];
};
export type ProductReviewUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ProductReviewCreateWithoutProductInput, Prisma.ProductReviewUncheckedCreateWithoutProductInput> | Prisma.ProductReviewCreateWithoutProductInput[] | Prisma.ProductReviewUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductReviewCreateOrConnectWithoutProductInput | Prisma.ProductReviewCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ProductReviewUpsertWithWhereUniqueWithoutProductInput | Prisma.ProductReviewUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ProductReviewCreateManyProductInputEnvelope;
    set?: Prisma.ProductReviewWhereUniqueInput | Prisma.ProductReviewWhereUniqueInput[];
    disconnect?: Prisma.ProductReviewWhereUniqueInput | Prisma.ProductReviewWhereUniqueInput[];
    delete?: Prisma.ProductReviewWhereUniqueInput | Prisma.ProductReviewWhereUniqueInput[];
    connect?: Prisma.ProductReviewWhereUniqueInput | Prisma.ProductReviewWhereUniqueInput[];
    update?: Prisma.ProductReviewUpdateWithWhereUniqueWithoutProductInput | Prisma.ProductReviewUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ProductReviewUpdateManyWithWhereWithoutProductInput | Prisma.ProductReviewUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ProductReviewScalarWhereInput | Prisma.ProductReviewScalarWhereInput[];
};
export type ProductReviewUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ProductReviewCreateWithoutProductInput, Prisma.ProductReviewUncheckedCreateWithoutProductInput> | Prisma.ProductReviewCreateWithoutProductInput[] | Prisma.ProductReviewUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductReviewCreateOrConnectWithoutProductInput | Prisma.ProductReviewCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ProductReviewUpsertWithWhereUniqueWithoutProductInput | Prisma.ProductReviewUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ProductReviewCreateManyProductInputEnvelope;
    set?: Prisma.ProductReviewWhereUniqueInput | Prisma.ProductReviewWhereUniqueInput[];
    disconnect?: Prisma.ProductReviewWhereUniqueInput | Prisma.ProductReviewWhereUniqueInput[];
    delete?: Prisma.ProductReviewWhereUniqueInput | Prisma.ProductReviewWhereUniqueInput[];
    connect?: Prisma.ProductReviewWhereUniqueInput | Prisma.ProductReviewWhereUniqueInput[];
    update?: Prisma.ProductReviewUpdateWithWhereUniqueWithoutProductInput | Prisma.ProductReviewUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ProductReviewUpdateManyWithWhereWithoutProductInput | Prisma.ProductReviewUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ProductReviewScalarWhereInput | Prisma.ProductReviewScalarWhereInput[];
};
export type ProductReviewCreateNestedOneWithoutHelpfulsInput = {
    create?: Prisma.XOR<Prisma.ProductReviewCreateWithoutHelpfulsInput, Prisma.ProductReviewUncheckedCreateWithoutHelpfulsInput>;
    connectOrCreate?: Prisma.ProductReviewCreateOrConnectWithoutHelpfulsInput;
    connect?: Prisma.ProductReviewWhereUniqueInput;
};
export type ProductReviewUpdateOneRequiredWithoutHelpfulsNestedInput = {
    create?: Prisma.XOR<Prisma.ProductReviewCreateWithoutHelpfulsInput, Prisma.ProductReviewUncheckedCreateWithoutHelpfulsInput>;
    connectOrCreate?: Prisma.ProductReviewCreateOrConnectWithoutHelpfulsInput;
    upsert?: Prisma.ProductReviewUpsertWithoutHelpfulsInput;
    connect?: Prisma.ProductReviewWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductReviewUpdateToOneWithWhereWithoutHelpfulsInput, Prisma.ProductReviewUpdateWithoutHelpfulsInput>, Prisma.ProductReviewUncheckedUpdateWithoutHelpfulsInput>;
};
export type ProductReviewCreateNestedOneWithoutImagesInput = {
    create?: Prisma.XOR<Prisma.ProductReviewCreateWithoutImagesInput, Prisma.ProductReviewUncheckedCreateWithoutImagesInput>;
    connectOrCreate?: Prisma.ProductReviewCreateOrConnectWithoutImagesInput;
    connect?: Prisma.ProductReviewWhereUniqueInput;
};
export type ProductReviewUpdateOneRequiredWithoutImagesNestedInput = {
    create?: Prisma.XOR<Prisma.ProductReviewCreateWithoutImagesInput, Prisma.ProductReviewUncheckedCreateWithoutImagesInput>;
    connectOrCreate?: Prisma.ProductReviewCreateOrConnectWithoutImagesInput;
    upsert?: Prisma.ProductReviewUpsertWithoutImagesInput;
    connect?: Prisma.ProductReviewWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductReviewUpdateToOneWithWhereWithoutImagesInput, Prisma.ProductReviewUpdateWithoutImagesInput>, Prisma.ProductReviewUncheckedUpdateWithoutImagesInput>;
};
export type ProductReviewCreateNestedManyWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.ProductReviewCreateWithoutOrderInput, Prisma.ProductReviewUncheckedCreateWithoutOrderInput> | Prisma.ProductReviewCreateWithoutOrderInput[] | Prisma.ProductReviewUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.ProductReviewCreateOrConnectWithoutOrderInput | Prisma.ProductReviewCreateOrConnectWithoutOrderInput[];
    createMany?: Prisma.ProductReviewCreateManyOrderInputEnvelope;
    connect?: Prisma.ProductReviewWhereUniqueInput | Prisma.ProductReviewWhereUniqueInput[];
};
export type ProductReviewUncheckedCreateNestedManyWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.ProductReviewCreateWithoutOrderInput, Prisma.ProductReviewUncheckedCreateWithoutOrderInput> | Prisma.ProductReviewCreateWithoutOrderInput[] | Prisma.ProductReviewUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.ProductReviewCreateOrConnectWithoutOrderInput | Prisma.ProductReviewCreateOrConnectWithoutOrderInput[];
    createMany?: Prisma.ProductReviewCreateManyOrderInputEnvelope;
    connect?: Prisma.ProductReviewWhereUniqueInput | Prisma.ProductReviewWhereUniqueInput[];
};
export type ProductReviewUpdateManyWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.ProductReviewCreateWithoutOrderInput, Prisma.ProductReviewUncheckedCreateWithoutOrderInput> | Prisma.ProductReviewCreateWithoutOrderInput[] | Prisma.ProductReviewUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.ProductReviewCreateOrConnectWithoutOrderInput | Prisma.ProductReviewCreateOrConnectWithoutOrderInput[];
    upsert?: Prisma.ProductReviewUpsertWithWhereUniqueWithoutOrderInput | Prisma.ProductReviewUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: Prisma.ProductReviewCreateManyOrderInputEnvelope;
    set?: Prisma.ProductReviewWhereUniqueInput | Prisma.ProductReviewWhereUniqueInput[];
    disconnect?: Prisma.ProductReviewWhereUniqueInput | Prisma.ProductReviewWhereUniqueInput[];
    delete?: Prisma.ProductReviewWhereUniqueInput | Prisma.ProductReviewWhereUniqueInput[];
    connect?: Prisma.ProductReviewWhereUniqueInput | Prisma.ProductReviewWhereUniqueInput[];
    update?: Prisma.ProductReviewUpdateWithWhereUniqueWithoutOrderInput | Prisma.ProductReviewUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?: Prisma.ProductReviewUpdateManyWithWhereWithoutOrderInput | Prisma.ProductReviewUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: Prisma.ProductReviewScalarWhereInput | Prisma.ProductReviewScalarWhereInput[];
};
export type ProductReviewUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.ProductReviewCreateWithoutOrderInput, Prisma.ProductReviewUncheckedCreateWithoutOrderInput> | Prisma.ProductReviewCreateWithoutOrderInput[] | Prisma.ProductReviewUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.ProductReviewCreateOrConnectWithoutOrderInput | Prisma.ProductReviewCreateOrConnectWithoutOrderInput[];
    upsert?: Prisma.ProductReviewUpsertWithWhereUniqueWithoutOrderInput | Prisma.ProductReviewUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: Prisma.ProductReviewCreateManyOrderInputEnvelope;
    set?: Prisma.ProductReviewWhereUniqueInput | Prisma.ProductReviewWhereUniqueInput[];
    disconnect?: Prisma.ProductReviewWhereUniqueInput | Prisma.ProductReviewWhereUniqueInput[];
    delete?: Prisma.ProductReviewWhereUniqueInput | Prisma.ProductReviewWhereUniqueInput[];
    connect?: Prisma.ProductReviewWhereUniqueInput | Prisma.ProductReviewWhereUniqueInput[];
    update?: Prisma.ProductReviewUpdateWithWhereUniqueWithoutOrderInput | Prisma.ProductReviewUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?: Prisma.ProductReviewUpdateManyWithWhereWithoutOrderInput | Prisma.ProductReviewUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: Prisma.ProductReviewScalarWhereInput | Prisma.ProductReviewScalarWhereInput[];
};
export type ProductReviewCreateWithoutUserInput = {
    id?: string;
    rating?: number | null;
    review?: string | null;
    isVerifiedPurchase?: boolean;
    helpfulCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    product: Prisma.ProductCreateNestedOneWithoutReviewsInput;
    order: Prisma.OrderCreateNestedOneWithoutReviewsInput;
    helpfuls?: Prisma.ProductReviewHelpfulCreateNestedManyWithoutReviewInput;
    images?: Prisma.ProductReviewImageCreateNestedManyWithoutReviewInput;
};
export type ProductReviewUncheckedCreateWithoutUserInput = {
    id?: string;
    productId: string;
    orderId: string;
    rating?: number | null;
    review?: string | null;
    isVerifiedPurchase?: boolean;
    helpfulCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    helpfuls?: Prisma.ProductReviewHelpfulUncheckedCreateNestedManyWithoutReviewInput;
    images?: Prisma.ProductReviewImageUncheckedCreateNestedManyWithoutReviewInput;
};
export type ProductReviewCreateOrConnectWithoutUserInput = {
    where: Prisma.ProductReviewWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductReviewCreateWithoutUserInput, Prisma.ProductReviewUncheckedCreateWithoutUserInput>;
};
export type ProductReviewCreateManyUserInputEnvelope = {
    data: Prisma.ProductReviewCreateManyUserInput | Prisma.ProductReviewCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type ProductReviewUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.ProductReviewWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductReviewUpdateWithoutUserInput, Prisma.ProductReviewUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.ProductReviewCreateWithoutUserInput, Prisma.ProductReviewUncheckedCreateWithoutUserInput>;
};
export type ProductReviewUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.ProductReviewWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductReviewUpdateWithoutUserInput, Prisma.ProductReviewUncheckedUpdateWithoutUserInput>;
};
export type ProductReviewUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.ProductReviewScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductReviewUpdateManyMutationInput, Prisma.ProductReviewUncheckedUpdateManyWithoutUserInput>;
};
export type ProductReviewScalarWhereInput = {
    AND?: Prisma.ProductReviewScalarWhereInput | Prisma.ProductReviewScalarWhereInput[];
    OR?: Prisma.ProductReviewScalarWhereInput[];
    NOT?: Prisma.ProductReviewScalarWhereInput | Prisma.ProductReviewScalarWhereInput[];
    id?: Prisma.StringFilter<"ProductReview"> | string;
    productId?: Prisma.StringFilter<"ProductReview"> | string;
    userId?: Prisma.StringFilter<"ProductReview"> | string;
    orderId?: Prisma.StringFilter<"ProductReview"> | string;
    rating?: Prisma.IntNullableFilter<"ProductReview"> | number | null;
    review?: Prisma.StringNullableFilter<"ProductReview"> | string | null;
    isVerifiedPurchase?: Prisma.BoolFilter<"ProductReview"> | boolean;
    helpfulCount?: Prisma.IntFilter<"ProductReview"> | number;
    createdAt?: Prisma.DateTimeFilter<"ProductReview"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ProductReview"> | Date | string;
};
export type ProductReviewCreateWithoutProductInput = {
    id?: string;
    rating?: number | null;
    review?: string | null;
    isVerifiedPurchase?: boolean;
    helpfulCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutReviewsInput;
    order: Prisma.OrderCreateNestedOneWithoutReviewsInput;
    helpfuls?: Prisma.ProductReviewHelpfulCreateNestedManyWithoutReviewInput;
    images?: Prisma.ProductReviewImageCreateNestedManyWithoutReviewInput;
};
export type ProductReviewUncheckedCreateWithoutProductInput = {
    id?: string;
    userId: string;
    orderId: string;
    rating?: number | null;
    review?: string | null;
    isVerifiedPurchase?: boolean;
    helpfulCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    helpfuls?: Prisma.ProductReviewHelpfulUncheckedCreateNestedManyWithoutReviewInput;
    images?: Prisma.ProductReviewImageUncheckedCreateNestedManyWithoutReviewInput;
};
export type ProductReviewCreateOrConnectWithoutProductInput = {
    where: Prisma.ProductReviewWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductReviewCreateWithoutProductInput, Prisma.ProductReviewUncheckedCreateWithoutProductInput>;
};
export type ProductReviewCreateManyProductInputEnvelope = {
    data: Prisma.ProductReviewCreateManyProductInput | Prisma.ProductReviewCreateManyProductInput[];
    skipDuplicates?: boolean;
};
export type ProductReviewUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.ProductReviewWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductReviewUpdateWithoutProductInput, Prisma.ProductReviewUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.ProductReviewCreateWithoutProductInput, Prisma.ProductReviewUncheckedCreateWithoutProductInput>;
};
export type ProductReviewUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.ProductReviewWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductReviewUpdateWithoutProductInput, Prisma.ProductReviewUncheckedUpdateWithoutProductInput>;
};
export type ProductReviewUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.ProductReviewScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductReviewUpdateManyMutationInput, Prisma.ProductReviewUncheckedUpdateManyWithoutProductInput>;
};
export type ProductReviewCreateWithoutHelpfulsInput = {
    id?: string;
    rating?: number | null;
    review?: string | null;
    isVerifiedPurchase?: boolean;
    helpfulCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    product: Prisma.ProductCreateNestedOneWithoutReviewsInput;
    user: Prisma.UserCreateNestedOneWithoutReviewsInput;
    order: Prisma.OrderCreateNestedOneWithoutReviewsInput;
    images?: Prisma.ProductReviewImageCreateNestedManyWithoutReviewInput;
};
export type ProductReviewUncheckedCreateWithoutHelpfulsInput = {
    id?: string;
    productId: string;
    userId: string;
    orderId: string;
    rating?: number | null;
    review?: string | null;
    isVerifiedPurchase?: boolean;
    helpfulCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    images?: Prisma.ProductReviewImageUncheckedCreateNestedManyWithoutReviewInput;
};
export type ProductReviewCreateOrConnectWithoutHelpfulsInput = {
    where: Prisma.ProductReviewWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductReviewCreateWithoutHelpfulsInput, Prisma.ProductReviewUncheckedCreateWithoutHelpfulsInput>;
};
export type ProductReviewUpsertWithoutHelpfulsInput = {
    update: Prisma.XOR<Prisma.ProductReviewUpdateWithoutHelpfulsInput, Prisma.ProductReviewUncheckedUpdateWithoutHelpfulsInput>;
    create: Prisma.XOR<Prisma.ProductReviewCreateWithoutHelpfulsInput, Prisma.ProductReviewUncheckedCreateWithoutHelpfulsInput>;
    where?: Prisma.ProductReviewWhereInput;
};
export type ProductReviewUpdateToOneWithWhereWithoutHelpfulsInput = {
    where?: Prisma.ProductReviewWhereInput;
    data: Prisma.XOR<Prisma.ProductReviewUpdateWithoutHelpfulsInput, Prisma.ProductReviewUncheckedUpdateWithoutHelpfulsInput>;
};
export type ProductReviewUpdateWithoutHelpfulsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    review?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerifiedPurchase?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    helpfulCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutReviewsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutReviewsNestedInput;
    order?: Prisma.OrderUpdateOneRequiredWithoutReviewsNestedInput;
    images?: Prisma.ProductReviewImageUpdateManyWithoutReviewNestedInput;
};
export type ProductReviewUncheckedUpdateWithoutHelpfulsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    review?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerifiedPurchase?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    helpfulCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    images?: Prisma.ProductReviewImageUncheckedUpdateManyWithoutReviewNestedInput;
};
export type ProductReviewCreateWithoutImagesInput = {
    id?: string;
    rating?: number | null;
    review?: string | null;
    isVerifiedPurchase?: boolean;
    helpfulCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    product: Prisma.ProductCreateNestedOneWithoutReviewsInput;
    user: Prisma.UserCreateNestedOneWithoutReviewsInput;
    order: Prisma.OrderCreateNestedOneWithoutReviewsInput;
    helpfuls?: Prisma.ProductReviewHelpfulCreateNestedManyWithoutReviewInput;
};
export type ProductReviewUncheckedCreateWithoutImagesInput = {
    id?: string;
    productId: string;
    userId: string;
    orderId: string;
    rating?: number | null;
    review?: string | null;
    isVerifiedPurchase?: boolean;
    helpfulCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    helpfuls?: Prisma.ProductReviewHelpfulUncheckedCreateNestedManyWithoutReviewInput;
};
export type ProductReviewCreateOrConnectWithoutImagesInput = {
    where: Prisma.ProductReviewWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductReviewCreateWithoutImagesInput, Prisma.ProductReviewUncheckedCreateWithoutImagesInput>;
};
export type ProductReviewUpsertWithoutImagesInput = {
    update: Prisma.XOR<Prisma.ProductReviewUpdateWithoutImagesInput, Prisma.ProductReviewUncheckedUpdateWithoutImagesInput>;
    create: Prisma.XOR<Prisma.ProductReviewCreateWithoutImagesInput, Prisma.ProductReviewUncheckedCreateWithoutImagesInput>;
    where?: Prisma.ProductReviewWhereInput;
};
export type ProductReviewUpdateToOneWithWhereWithoutImagesInput = {
    where?: Prisma.ProductReviewWhereInput;
    data: Prisma.XOR<Prisma.ProductReviewUpdateWithoutImagesInput, Prisma.ProductReviewUncheckedUpdateWithoutImagesInput>;
};
export type ProductReviewUpdateWithoutImagesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    review?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerifiedPurchase?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    helpfulCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutReviewsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutReviewsNestedInput;
    order?: Prisma.OrderUpdateOneRequiredWithoutReviewsNestedInput;
    helpfuls?: Prisma.ProductReviewHelpfulUpdateManyWithoutReviewNestedInput;
};
export type ProductReviewUncheckedUpdateWithoutImagesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    review?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerifiedPurchase?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    helpfulCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    helpfuls?: Prisma.ProductReviewHelpfulUncheckedUpdateManyWithoutReviewNestedInput;
};
export type ProductReviewCreateWithoutOrderInput = {
    id?: string;
    rating?: number | null;
    review?: string | null;
    isVerifiedPurchase?: boolean;
    helpfulCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    product: Prisma.ProductCreateNestedOneWithoutReviewsInput;
    user: Prisma.UserCreateNestedOneWithoutReviewsInput;
    helpfuls?: Prisma.ProductReviewHelpfulCreateNestedManyWithoutReviewInput;
    images?: Prisma.ProductReviewImageCreateNestedManyWithoutReviewInput;
};
export type ProductReviewUncheckedCreateWithoutOrderInput = {
    id?: string;
    productId: string;
    userId: string;
    rating?: number | null;
    review?: string | null;
    isVerifiedPurchase?: boolean;
    helpfulCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    helpfuls?: Prisma.ProductReviewHelpfulUncheckedCreateNestedManyWithoutReviewInput;
    images?: Prisma.ProductReviewImageUncheckedCreateNestedManyWithoutReviewInput;
};
export type ProductReviewCreateOrConnectWithoutOrderInput = {
    where: Prisma.ProductReviewWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductReviewCreateWithoutOrderInput, Prisma.ProductReviewUncheckedCreateWithoutOrderInput>;
};
export type ProductReviewCreateManyOrderInputEnvelope = {
    data: Prisma.ProductReviewCreateManyOrderInput | Prisma.ProductReviewCreateManyOrderInput[];
    skipDuplicates?: boolean;
};
export type ProductReviewUpsertWithWhereUniqueWithoutOrderInput = {
    where: Prisma.ProductReviewWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductReviewUpdateWithoutOrderInput, Prisma.ProductReviewUncheckedUpdateWithoutOrderInput>;
    create: Prisma.XOR<Prisma.ProductReviewCreateWithoutOrderInput, Prisma.ProductReviewUncheckedCreateWithoutOrderInput>;
};
export type ProductReviewUpdateWithWhereUniqueWithoutOrderInput = {
    where: Prisma.ProductReviewWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductReviewUpdateWithoutOrderInput, Prisma.ProductReviewUncheckedUpdateWithoutOrderInput>;
};
export type ProductReviewUpdateManyWithWhereWithoutOrderInput = {
    where: Prisma.ProductReviewScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductReviewUpdateManyMutationInput, Prisma.ProductReviewUncheckedUpdateManyWithoutOrderInput>;
};
export type ProductReviewCreateManyUserInput = {
    id?: string;
    productId: string;
    orderId: string;
    rating?: number | null;
    review?: string | null;
    isVerifiedPurchase?: boolean;
    helpfulCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProductReviewUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    review?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerifiedPurchase?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    helpfulCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutReviewsNestedInput;
    order?: Prisma.OrderUpdateOneRequiredWithoutReviewsNestedInput;
    helpfuls?: Prisma.ProductReviewHelpfulUpdateManyWithoutReviewNestedInput;
    images?: Prisma.ProductReviewImageUpdateManyWithoutReviewNestedInput;
};
export type ProductReviewUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    review?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerifiedPurchase?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    helpfulCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    helpfuls?: Prisma.ProductReviewHelpfulUncheckedUpdateManyWithoutReviewNestedInput;
    images?: Prisma.ProductReviewImageUncheckedUpdateManyWithoutReviewNestedInput;
};
export type ProductReviewUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    review?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerifiedPurchase?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    helpfulCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductReviewCreateManyProductInput = {
    id?: string;
    userId: string;
    orderId: string;
    rating?: number | null;
    review?: string | null;
    isVerifiedPurchase?: boolean;
    helpfulCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProductReviewUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    review?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerifiedPurchase?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    helpfulCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutReviewsNestedInput;
    order?: Prisma.OrderUpdateOneRequiredWithoutReviewsNestedInput;
    helpfuls?: Prisma.ProductReviewHelpfulUpdateManyWithoutReviewNestedInput;
    images?: Prisma.ProductReviewImageUpdateManyWithoutReviewNestedInput;
};
export type ProductReviewUncheckedUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    review?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerifiedPurchase?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    helpfulCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    helpfuls?: Prisma.ProductReviewHelpfulUncheckedUpdateManyWithoutReviewNestedInput;
    images?: Prisma.ProductReviewImageUncheckedUpdateManyWithoutReviewNestedInput;
};
export type ProductReviewUncheckedUpdateManyWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    review?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerifiedPurchase?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    helpfulCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductReviewCreateManyOrderInput = {
    id?: string;
    productId: string;
    userId: string;
    rating?: number | null;
    review?: string | null;
    isVerifiedPurchase?: boolean;
    helpfulCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProductReviewUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    review?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerifiedPurchase?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    helpfulCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutReviewsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutReviewsNestedInput;
    helpfuls?: Prisma.ProductReviewHelpfulUpdateManyWithoutReviewNestedInput;
    images?: Prisma.ProductReviewImageUpdateManyWithoutReviewNestedInput;
};
export type ProductReviewUncheckedUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    review?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerifiedPurchase?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    helpfulCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    helpfuls?: Prisma.ProductReviewHelpfulUncheckedUpdateManyWithoutReviewNestedInput;
    images?: Prisma.ProductReviewImageUncheckedUpdateManyWithoutReviewNestedInput;
};
export type ProductReviewUncheckedUpdateManyWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    review?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerifiedPurchase?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    helpfulCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductReviewCountOutputType = {
    helpfuls: number;
    images: number;
};
export type ProductReviewCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    helpfuls?: boolean | ProductReviewCountOutputTypeCountHelpfulsArgs;
    images?: boolean | ProductReviewCountOutputTypeCountImagesArgs;
};
export type ProductReviewCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductReviewCountOutputTypeSelect<ExtArgs> | null;
};
export type ProductReviewCountOutputTypeCountHelpfulsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductReviewHelpfulWhereInput;
};
export type ProductReviewCountOutputTypeCountImagesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductReviewImageWhereInput;
};
export type ProductReviewSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    productId?: boolean;
    userId?: boolean;
    orderId?: boolean;
    rating?: boolean;
    review?: boolean;
    isVerifiedPurchase?: boolean;
    helpfulCount?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    helpfuls?: boolean | Prisma.ProductReview$helpfulsArgs<ExtArgs>;
    images?: boolean | Prisma.ProductReview$imagesArgs<ExtArgs>;
    _count?: boolean | Prisma.ProductReviewCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productReview"]>;
export type ProductReviewSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    productId?: boolean;
    userId?: boolean;
    orderId?: boolean;
    rating?: boolean;
    review?: boolean;
    isVerifiedPurchase?: boolean;
    helpfulCount?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productReview"]>;
export type ProductReviewSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    productId?: boolean;
    userId?: boolean;
    orderId?: boolean;
    rating?: boolean;
    review?: boolean;
    isVerifiedPurchase?: boolean;
    helpfulCount?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productReview"]>;
export type ProductReviewSelectScalar = {
    id?: boolean;
    productId?: boolean;
    userId?: boolean;
    orderId?: boolean;
    rating?: boolean;
    review?: boolean;
    isVerifiedPurchase?: boolean;
    helpfulCount?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ProductReviewOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "productId" | "userId" | "orderId" | "rating" | "review" | "isVerifiedPurchase" | "helpfulCount" | "createdAt" | "updatedAt", ExtArgs["result"]["productReview"]>;
export type ProductReviewInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    helpfuls?: boolean | Prisma.ProductReview$helpfulsArgs<ExtArgs>;
    images?: boolean | Prisma.ProductReview$imagesArgs<ExtArgs>;
    _count?: boolean | Prisma.ProductReviewCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ProductReviewIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
};
export type ProductReviewIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
};
export type $ProductReviewPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ProductReview";
    objects: {
        product: Prisma.$ProductPayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
        order: Prisma.$OrderPayload<ExtArgs>;
        helpfuls: Prisma.$ProductReviewHelpfulPayload<ExtArgs>[];
        images: Prisma.$ProductReviewImagePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        productId: string;
        userId: string;
        orderId: string;
        rating: number | null;
        review: string | null;
        isVerifiedPurchase: boolean;
        helpfulCount: number;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["productReview"]>;
    composites: {};
};
export type ProductReviewGetPayload<S extends boolean | null | undefined | ProductReviewDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProductReviewPayload, S>;
export type ProductReviewCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProductReviewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProductReviewCountAggregateInputType | true;
};
export interface ProductReviewDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ProductReview'];
        meta: {
            name: 'ProductReview';
        };
    };
    findUnique<T extends ProductReviewFindUniqueArgs>(args: Prisma.SelectSubset<T, ProductReviewFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProductReviewClient<runtime.Types.Result.GetResult<Prisma.$ProductReviewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ProductReviewFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProductReviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductReviewClient<runtime.Types.Result.GetResult<Prisma.$ProductReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ProductReviewFindFirstArgs>(args?: Prisma.SelectSubset<T, ProductReviewFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProductReviewClient<runtime.Types.Result.GetResult<Prisma.$ProductReviewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ProductReviewFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProductReviewFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductReviewClient<runtime.Types.Result.GetResult<Prisma.$ProductReviewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ProductReviewFindManyArgs>(args?: Prisma.SelectSubset<T, ProductReviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ProductReviewCreateArgs>(args: Prisma.SelectSubset<T, ProductReviewCreateArgs<ExtArgs>>): Prisma.Prisma__ProductReviewClient<runtime.Types.Result.GetResult<Prisma.$ProductReviewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ProductReviewCreateManyArgs>(args?: Prisma.SelectSubset<T, ProductReviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ProductReviewCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProductReviewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductReviewPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ProductReviewDeleteArgs>(args: Prisma.SelectSubset<T, ProductReviewDeleteArgs<ExtArgs>>): Prisma.Prisma__ProductReviewClient<runtime.Types.Result.GetResult<Prisma.$ProductReviewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ProductReviewUpdateArgs>(args: Prisma.SelectSubset<T, ProductReviewUpdateArgs<ExtArgs>>): Prisma.Prisma__ProductReviewClient<runtime.Types.Result.GetResult<Prisma.$ProductReviewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ProductReviewDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProductReviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ProductReviewUpdateManyArgs>(args: Prisma.SelectSubset<T, ProductReviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ProductReviewUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProductReviewUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductReviewPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ProductReviewUpsertArgs>(args: Prisma.SelectSubset<T, ProductReviewUpsertArgs<ExtArgs>>): Prisma.Prisma__ProductReviewClient<runtime.Types.Result.GetResult<Prisma.$ProductReviewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ProductReviewCountArgs>(args?: Prisma.Subset<T, ProductReviewCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProductReviewCountAggregateOutputType> : number>;
    aggregate<T extends ProductReviewAggregateArgs>(args: Prisma.Subset<T, ProductReviewAggregateArgs>): Prisma.PrismaPromise<GetProductReviewAggregateType<T>>;
    groupBy<T extends ProductReviewGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProductReviewGroupByArgs['orderBy'];
    } : {
        orderBy?: ProductReviewGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProductReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ProductReviewFieldRefs;
}
export interface Prisma__ProductReviewClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    order<T extends Prisma.OrderDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OrderDefaultArgs<ExtArgs>>): Prisma.Prisma__OrderClient<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    helpfuls<T extends Prisma.ProductReview$helpfulsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductReview$helpfulsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductReviewHelpfulPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    images<T extends Prisma.ProductReview$imagesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductReview$imagesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductReviewImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ProductReviewFieldRefs {
    readonly id: Prisma.FieldRef<"ProductReview", 'String'>;
    readonly productId: Prisma.FieldRef<"ProductReview", 'String'>;
    readonly userId: Prisma.FieldRef<"ProductReview", 'String'>;
    readonly orderId: Prisma.FieldRef<"ProductReview", 'String'>;
    readonly rating: Prisma.FieldRef<"ProductReview", 'Int'>;
    readonly review: Prisma.FieldRef<"ProductReview", 'String'>;
    readonly isVerifiedPurchase: Prisma.FieldRef<"ProductReview", 'Boolean'>;
    readonly helpfulCount: Prisma.FieldRef<"ProductReview", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"ProductReview", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"ProductReview", 'DateTime'>;
}
export type ProductReviewFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductReviewSelect<ExtArgs> | null;
    omit?: Prisma.ProductReviewOmit<ExtArgs> | null;
    include?: Prisma.ProductReviewInclude<ExtArgs> | null;
    where: Prisma.ProductReviewWhereUniqueInput;
};
export type ProductReviewFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductReviewSelect<ExtArgs> | null;
    omit?: Prisma.ProductReviewOmit<ExtArgs> | null;
    include?: Prisma.ProductReviewInclude<ExtArgs> | null;
    where: Prisma.ProductReviewWhereUniqueInput;
};
export type ProductReviewFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductReviewSelect<ExtArgs> | null;
    omit?: Prisma.ProductReviewOmit<ExtArgs> | null;
    include?: Prisma.ProductReviewInclude<ExtArgs> | null;
    where?: Prisma.ProductReviewWhereInput;
    orderBy?: Prisma.ProductReviewOrderByWithRelationInput | Prisma.ProductReviewOrderByWithRelationInput[];
    cursor?: Prisma.ProductReviewWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductReviewScalarFieldEnum | Prisma.ProductReviewScalarFieldEnum[];
};
export type ProductReviewFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductReviewSelect<ExtArgs> | null;
    omit?: Prisma.ProductReviewOmit<ExtArgs> | null;
    include?: Prisma.ProductReviewInclude<ExtArgs> | null;
    where?: Prisma.ProductReviewWhereInput;
    orderBy?: Prisma.ProductReviewOrderByWithRelationInput | Prisma.ProductReviewOrderByWithRelationInput[];
    cursor?: Prisma.ProductReviewWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductReviewScalarFieldEnum | Prisma.ProductReviewScalarFieldEnum[];
};
export type ProductReviewFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductReviewSelect<ExtArgs> | null;
    omit?: Prisma.ProductReviewOmit<ExtArgs> | null;
    include?: Prisma.ProductReviewInclude<ExtArgs> | null;
    where?: Prisma.ProductReviewWhereInput;
    orderBy?: Prisma.ProductReviewOrderByWithRelationInput | Prisma.ProductReviewOrderByWithRelationInput[];
    cursor?: Prisma.ProductReviewWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductReviewScalarFieldEnum | Prisma.ProductReviewScalarFieldEnum[];
};
export type ProductReviewCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductReviewSelect<ExtArgs> | null;
    omit?: Prisma.ProductReviewOmit<ExtArgs> | null;
    include?: Prisma.ProductReviewInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductReviewCreateInput, Prisma.ProductReviewUncheckedCreateInput>;
};
export type ProductReviewCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProductReviewCreateManyInput | Prisma.ProductReviewCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProductReviewCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductReviewSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductReviewOmit<ExtArgs> | null;
    data: Prisma.ProductReviewCreateManyInput | Prisma.ProductReviewCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ProductReviewIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ProductReviewUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductReviewSelect<ExtArgs> | null;
    omit?: Prisma.ProductReviewOmit<ExtArgs> | null;
    include?: Prisma.ProductReviewInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductReviewUpdateInput, Prisma.ProductReviewUncheckedUpdateInput>;
    where: Prisma.ProductReviewWhereUniqueInput;
};
export type ProductReviewUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProductReviewUpdateManyMutationInput, Prisma.ProductReviewUncheckedUpdateManyInput>;
    where?: Prisma.ProductReviewWhereInput;
    limit?: number;
};
export type ProductReviewUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductReviewSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductReviewOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductReviewUpdateManyMutationInput, Prisma.ProductReviewUncheckedUpdateManyInput>;
    where?: Prisma.ProductReviewWhereInput;
    limit?: number;
    include?: Prisma.ProductReviewIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ProductReviewUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductReviewSelect<ExtArgs> | null;
    omit?: Prisma.ProductReviewOmit<ExtArgs> | null;
    include?: Prisma.ProductReviewInclude<ExtArgs> | null;
    where: Prisma.ProductReviewWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductReviewCreateInput, Prisma.ProductReviewUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ProductReviewUpdateInput, Prisma.ProductReviewUncheckedUpdateInput>;
};
export type ProductReviewDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductReviewSelect<ExtArgs> | null;
    omit?: Prisma.ProductReviewOmit<ExtArgs> | null;
    include?: Prisma.ProductReviewInclude<ExtArgs> | null;
    where: Prisma.ProductReviewWhereUniqueInput;
};
export type ProductReviewDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductReviewWhereInput;
    limit?: number;
};
export type ProductReview$helpfulsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductReviewHelpfulSelect<ExtArgs> | null;
    omit?: Prisma.ProductReviewHelpfulOmit<ExtArgs> | null;
    include?: Prisma.ProductReviewHelpfulInclude<ExtArgs> | null;
    where?: Prisma.ProductReviewHelpfulWhereInput;
    orderBy?: Prisma.ProductReviewHelpfulOrderByWithRelationInput | Prisma.ProductReviewHelpfulOrderByWithRelationInput[];
    cursor?: Prisma.ProductReviewHelpfulWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductReviewHelpfulScalarFieldEnum | Prisma.ProductReviewHelpfulScalarFieldEnum[];
};
export type ProductReview$imagesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductReviewImageSelect<ExtArgs> | null;
    omit?: Prisma.ProductReviewImageOmit<ExtArgs> | null;
    include?: Prisma.ProductReviewImageInclude<ExtArgs> | null;
    where?: Prisma.ProductReviewImageWhereInput;
    orderBy?: Prisma.ProductReviewImageOrderByWithRelationInput | Prisma.ProductReviewImageOrderByWithRelationInput[];
    cursor?: Prisma.ProductReviewImageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductReviewImageScalarFieldEnum | Prisma.ProductReviewImageScalarFieldEnum[];
};
export type ProductReviewDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductReviewSelect<ExtArgs> | null;
    omit?: Prisma.ProductReviewOmit<ExtArgs> | null;
    include?: Prisma.ProductReviewInclude<ExtArgs> | null;
};
