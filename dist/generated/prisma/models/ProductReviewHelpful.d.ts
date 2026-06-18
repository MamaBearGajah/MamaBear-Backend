import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ProductReviewHelpfulModel = runtime.Types.Result.DefaultSelection<Prisma.$ProductReviewHelpfulPayload>;
export type AggregateProductReviewHelpful = {
    _count: ProductReviewHelpfulCountAggregateOutputType | null;
    _min: ProductReviewHelpfulMinAggregateOutputType | null;
    _max: ProductReviewHelpfulMaxAggregateOutputType | null;
};
export type ProductReviewHelpfulMinAggregateOutputType = {
    id: string | null;
    reviewId: string | null;
    userId: string | null;
    isHelpful: boolean | null;
    createdAt: Date | null;
};
export type ProductReviewHelpfulMaxAggregateOutputType = {
    id: string | null;
    reviewId: string | null;
    userId: string | null;
    isHelpful: boolean | null;
    createdAt: Date | null;
};
export type ProductReviewHelpfulCountAggregateOutputType = {
    id: number;
    reviewId: number;
    userId: number;
    isHelpful: number;
    createdAt: number;
    _all: number;
};
export type ProductReviewHelpfulMinAggregateInputType = {
    id?: true;
    reviewId?: true;
    userId?: true;
    isHelpful?: true;
    createdAt?: true;
};
export type ProductReviewHelpfulMaxAggregateInputType = {
    id?: true;
    reviewId?: true;
    userId?: true;
    isHelpful?: true;
    createdAt?: true;
};
export type ProductReviewHelpfulCountAggregateInputType = {
    id?: true;
    reviewId?: true;
    userId?: true;
    isHelpful?: true;
    createdAt?: true;
    _all?: true;
};
export type ProductReviewHelpfulAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductReviewHelpfulWhereInput;
    orderBy?: Prisma.ProductReviewHelpfulOrderByWithRelationInput | Prisma.ProductReviewHelpfulOrderByWithRelationInput[];
    cursor?: Prisma.ProductReviewHelpfulWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProductReviewHelpfulCountAggregateInputType;
    _min?: ProductReviewHelpfulMinAggregateInputType;
    _max?: ProductReviewHelpfulMaxAggregateInputType;
};
export type GetProductReviewHelpfulAggregateType<T extends ProductReviewHelpfulAggregateArgs> = {
    [P in keyof T & keyof AggregateProductReviewHelpful]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProductReviewHelpful[P]> : Prisma.GetScalarType<T[P], AggregateProductReviewHelpful[P]>;
};
export type ProductReviewHelpfulGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductReviewHelpfulWhereInput;
    orderBy?: Prisma.ProductReviewHelpfulOrderByWithAggregationInput | Prisma.ProductReviewHelpfulOrderByWithAggregationInput[];
    by: Prisma.ProductReviewHelpfulScalarFieldEnum[] | Prisma.ProductReviewHelpfulScalarFieldEnum;
    having?: Prisma.ProductReviewHelpfulScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProductReviewHelpfulCountAggregateInputType | true;
    _min?: ProductReviewHelpfulMinAggregateInputType;
    _max?: ProductReviewHelpfulMaxAggregateInputType;
};
export type ProductReviewHelpfulGroupByOutputType = {
    id: string;
    reviewId: string;
    userId: string;
    isHelpful: boolean;
    createdAt: Date;
    _count: ProductReviewHelpfulCountAggregateOutputType | null;
    _min: ProductReviewHelpfulMinAggregateOutputType | null;
    _max: ProductReviewHelpfulMaxAggregateOutputType | null;
};
export type GetProductReviewHelpfulGroupByPayload<T extends ProductReviewHelpfulGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProductReviewHelpfulGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProductReviewHelpfulGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProductReviewHelpfulGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProductReviewHelpfulGroupByOutputType[P]>;
}>>;
export type ProductReviewHelpfulWhereInput = {
    AND?: Prisma.ProductReviewHelpfulWhereInput | Prisma.ProductReviewHelpfulWhereInput[];
    OR?: Prisma.ProductReviewHelpfulWhereInput[];
    NOT?: Prisma.ProductReviewHelpfulWhereInput | Prisma.ProductReviewHelpfulWhereInput[];
    id?: Prisma.StringFilter<"ProductReviewHelpful"> | string;
    reviewId?: Prisma.StringFilter<"ProductReviewHelpful"> | string;
    userId?: Prisma.StringFilter<"ProductReviewHelpful"> | string;
    isHelpful?: Prisma.BoolFilter<"ProductReviewHelpful"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"ProductReviewHelpful"> | Date | string;
    review?: Prisma.XOR<Prisma.ProductReviewScalarRelationFilter, Prisma.ProductReviewWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type ProductReviewHelpfulOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    reviewId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    isHelpful?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    review?: Prisma.ProductReviewOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type ProductReviewHelpfulWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    reviewId_userId?: Prisma.ProductReviewHelpfulReviewIdUserIdCompoundUniqueInput;
    AND?: Prisma.ProductReviewHelpfulWhereInput | Prisma.ProductReviewHelpfulWhereInput[];
    OR?: Prisma.ProductReviewHelpfulWhereInput[];
    NOT?: Prisma.ProductReviewHelpfulWhereInput | Prisma.ProductReviewHelpfulWhereInput[];
    reviewId?: Prisma.StringFilter<"ProductReviewHelpful"> | string;
    userId?: Prisma.StringFilter<"ProductReviewHelpful"> | string;
    isHelpful?: Prisma.BoolFilter<"ProductReviewHelpful"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"ProductReviewHelpful"> | Date | string;
    review?: Prisma.XOR<Prisma.ProductReviewScalarRelationFilter, Prisma.ProductReviewWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "reviewId_userId">;
export type ProductReviewHelpfulOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    reviewId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    isHelpful?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ProductReviewHelpfulCountOrderByAggregateInput;
    _max?: Prisma.ProductReviewHelpfulMaxOrderByAggregateInput;
    _min?: Prisma.ProductReviewHelpfulMinOrderByAggregateInput;
};
export type ProductReviewHelpfulScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProductReviewHelpfulScalarWhereWithAggregatesInput | Prisma.ProductReviewHelpfulScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProductReviewHelpfulScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProductReviewHelpfulScalarWhereWithAggregatesInput | Prisma.ProductReviewHelpfulScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ProductReviewHelpful"> | string;
    reviewId?: Prisma.StringWithAggregatesFilter<"ProductReviewHelpful"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"ProductReviewHelpful"> | string;
    isHelpful?: Prisma.BoolWithAggregatesFilter<"ProductReviewHelpful"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ProductReviewHelpful"> | Date | string;
};
export type ProductReviewHelpfulCreateInput = {
    id?: string;
    isHelpful: boolean;
    createdAt?: Date | string;
    review: Prisma.ProductReviewCreateNestedOneWithoutHelpfulsInput;
    user: Prisma.UserCreateNestedOneWithoutReviewHelpfulsInput;
};
export type ProductReviewHelpfulUncheckedCreateInput = {
    id?: string;
    reviewId: string;
    userId: string;
    isHelpful: boolean;
    createdAt?: Date | string;
};
export type ProductReviewHelpfulUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    isHelpful?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    review?: Prisma.ProductReviewUpdateOneRequiredWithoutHelpfulsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutReviewHelpfulsNestedInput;
};
export type ProductReviewHelpfulUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    isHelpful?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductReviewHelpfulCreateManyInput = {
    id?: string;
    reviewId: string;
    userId: string;
    isHelpful: boolean;
    createdAt?: Date | string;
};
export type ProductReviewHelpfulUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    isHelpful?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductReviewHelpfulUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    isHelpful?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductReviewHelpfulListRelationFilter = {
    every?: Prisma.ProductReviewHelpfulWhereInput;
    some?: Prisma.ProductReviewHelpfulWhereInput;
    none?: Prisma.ProductReviewHelpfulWhereInput;
};
export type ProductReviewHelpfulOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProductReviewHelpfulReviewIdUserIdCompoundUniqueInput = {
    reviewId: string;
    userId: string;
};
export type ProductReviewHelpfulCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    reviewId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    isHelpful?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ProductReviewHelpfulMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    reviewId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    isHelpful?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ProductReviewHelpfulMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    reviewId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    isHelpful?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ProductReviewHelpfulCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ProductReviewHelpfulCreateWithoutUserInput, Prisma.ProductReviewHelpfulUncheckedCreateWithoutUserInput> | Prisma.ProductReviewHelpfulCreateWithoutUserInput[] | Prisma.ProductReviewHelpfulUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ProductReviewHelpfulCreateOrConnectWithoutUserInput | Prisma.ProductReviewHelpfulCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ProductReviewHelpfulCreateManyUserInputEnvelope;
    connect?: Prisma.ProductReviewHelpfulWhereUniqueInput | Prisma.ProductReviewHelpfulWhereUniqueInput[];
};
export type ProductReviewHelpfulUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ProductReviewHelpfulCreateWithoutUserInput, Prisma.ProductReviewHelpfulUncheckedCreateWithoutUserInput> | Prisma.ProductReviewHelpfulCreateWithoutUserInput[] | Prisma.ProductReviewHelpfulUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ProductReviewHelpfulCreateOrConnectWithoutUserInput | Prisma.ProductReviewHelpfulCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ProductReviewHelpfulCreateManyUserInputEnvelope;
    connect?: Prisma.ProductReviewHelpfulWhereUniqueInput | Prisma.ProductReviewHelpfulWhereUniqueInput[];
};
export type ProductReviewHelpfulUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ProductReviewHelpfulCreateWithoutUserInput, Prisma.ProductReviewHelpfulUncheckedCreateWithoutUserInput> | Prisma.ProductReviewHelpfulCreateWithoutUserInput[] | Prisma.ProductReviewHelpfulUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ProductReviewHelpfulCreateOrConnectWithoutUserInput | Prisma.ProductReviewHelpfulCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ProductReviewHelpfulUpsertWithWhereUniqueWithoutUserInput | Prisma.ProductReviewHelpfulUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ProductReviewHelpfulCreateManyUserInputEnvelope;
    set?: Prisma.ProductReviewHelpfulWhereUniqueInput | Prisma.ProductReviewHelpfulWhereUniqueInput[];
    disconnect?: Prisma.ProductReviewHelpfulWhereUniqueInput | Prisma.ProductReviewHelpfulWhereUniqueInput[];
    delete?: Prisma.ProductReviewHelpfulWhereUniqueInput | Prisma.ProductReviewHelpfulWhereUniqueInput[];
    connect?: Prisma.ProductReviewHelpfulWhereUniqueInput | Prisma.ProductReviewHelpfulWhereUniqueInput[];
    update?: Prisma.ProductReviewHelpfulUpdateWithWhereUniqueWithoutUserInput | Prisma.ProductReviewHelpfulUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ProductReviewHelpfulUpdateManyWithWhereWithoutUserInput | Prisma.ProductReviewHelpfulUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ProductReviewHelpfulScalarWhereInput | Prisma.ProductReviewHelpfulScalarWhereInput[];
};
export type ProductReviewHelpfulUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ProductReviewHelpfulCreateWithoutUserInput, Prisma.ProductReviewHelpfulUncheckedCreateWithoutUserInput> | Prisma.ProductReviewHelpfulCreateWithoutUserInput[] | Prisma.ProductReviewHelpfulUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ProductReviewHelpfulCreateOrConnectWithoutUserInput | Prisma.ProductReviewHelpfulCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ProductReviewHelpfulUpsertWithWhereUniqueWithoutUserInput | Prisma.ProductReviewHelpfulUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ProductReviewHelpfulCreateManyUserInputEnvelope;
    set?: Prisma.ProductReviewHelpfulWhereUniqueInput | Prisma.ProductReviewHelpfulWhereUniqueInput[];
    disconnect?: Prisma.ProductReviewHelpfulWhereUniqueInput | Prisma.ProductReviewHelpfulWhereUniqueInput[];
    delete?: Prisma.ProductReviewHelpfulWhereUniqueInput | Prisma.ProductReviewHelpfulWhereUniqueInput[];
    connect?: Prisma.ProductReviewHelpfulWhereUniqueInput | Prisma.ProductReviewHelpfulWhereUniqueInput[];
    update?: Prisma.ProductReviewHelpfulUpdateWithWhereUniqueWithoutUserInput | Prisma.ProductReviewHelpfulUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ProductReviewHelpfulUpdateManyWithWhereWithoutUserInput | Prisma.ProductReviewHelpfulUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ProductReviewHelpfulScalarWhereInput | Prisma.ProductReviewHelpfulScalarWhereInput[];
};
export type ProductReviewHelpfulCreateNestedManyWithoutReviewInput = {
    create?: Prisma.XOR<Prisma.ProductReviewHelpfulCreateWithoutReviewInput, Prisma.ProductReviewHelpfulUncheckedCreateWithoutReviewInput> | Prisma.ProductReviewHelpfulCreateWithoutReviewInput[] | Prisma.ProductReviewHelpfulUncheckedCreateWithoutReviewInput[];
    connectOrCreate?: Prisma.ProductReviewHelpfulCreateOrConnectWithoutReviewInput | Prisma.ProductReviewHelpfulCreateOrConnectWithoutReviewInput[];
    createMany?: Prisma.ProductReviewHelpfulCreateManyReviewInputEnvelope;
    connect?: Prisma.ProductReviewHelpfulWhereUniqueInput | Prisma.ProductReviewHelpfulWhereUniqueInput[];
};
export type ProductReviewHelpfulUncheckedCreateNestedManyWithoutReviewInput = {
    create?: Prisma.XOR<Prisma.ProductReviewHelpfulCreateWithoutReviewInput, Prisma.ProductReviewHelpfulUncheckedCreateWithoutReviewInput> | Prisma.ProductReviewHelpfulCreateWithoutReviewInput[] | Prisma.ProductReviewHelpfulUncheckedCreateWithoutReviewInput[];
    connectOrCreate?: Prisma.ProductReviewHelpfulCreateOrConnectWithoutReviewInput | Prisma.ProductReviewHelpfulCreateOrConnectWithoutReviewInput[];
    createMany?: Prisma.ProductReviewHelpfulCreateManyReviewInputEnvelope;
    connect?: Prisma.ProductReviewHelpfulWhereUniqueInput | Prisma.ProductReviewHelpfulWhereUniqueInput[];
};
export type ProductReviewHelpfulUpdateManyWithoutReviewNestedInput = {
    create?: Prisma.XOR<Prisma.ProductReviewHelpfulCreateWithoutReviewInput, Prisma.ProductReviewHelpfulUncheckedCreateWithoutReviewInput> | Prisma.ProductReviewHelpfulCreateWithoutReviewInput[] | Prisma.ProductReviewHelpfulUncheckedCreateWithoutReviewInput[];
    connectOrCreate?: Prisma.ProductReviewHelpfulCreateOrConnectWithoutReviewInput | Prisma.ProductReviewHelpfulCreateOrConnectWithoutReviewInput[];
    upsert?: Prisma.ProductReviewHelpfulUpsertWithWhereUniqueWithoutReviewInput | Prisma.ProductReviewHelpfulUpsertWithWhereUniqueWithoutReviewInput[];
    createMany?: Prisma.ProductReviewHelpfulCreateManyReviewInputEnvelope;
    set?: Prisma.ProductReviewHelpfulWhereUniqueInput | Prisma.ProductReviewHelpfulWhereUniqueInput[];
    disconnect?: Prisma.ProductReviewHelpfulWhereUniqueInput | Prisma.ProductReviewHelpfulWhereUniqueInput[];
    delete?: Prisma.ProductReviewHelpfulWhereUniqueInput | Prisma.ProductReviewHelpfulWhereUniqueInput[];
    connect?: Prisma.ProductReviewHelpfulWhereUniqueInput | Prisma.ProductReviewHelpfulWhereUniqueInput[];
    update?: Prisma.ProductReviewHelpfulUpdateWithWhereUniqueWithoutReviewInput | Prisma.ProductReviewHelpfulUpdateWithWhereUniqueWithoutReviewInput[];
    updateMany?: Prisma.ProductReviewHelpfulUpdateManyWithWhereWithoutReviewInput | Prisma.ProductReviewHelpfulUpdateManyWithWhereWithoutReviewInput[];
    deleteMany?: Prisma.ProductReviewHelpfulScalarWhereInput | Prisma.ProductReviewHelpfulScalarWhereInput[];
};
export type ProductReviewHelpfulUncheckedUpdateManyWithoutReviewNestedInput = {
    create?: Prisma.XOR<Prisma.ProductReviewHelpfulCreateWithoutReviewInput, Prisma.ProductReviewHelpfulUncheckedCreateWithoutReviewInput> | Prisma.ProductReviewHelpfulCreateWithoutReviewInput[] | Prisma.ProductReviewHelpfulUncheckedCreateWithoutReviewInput[];
    connectOrCreate?: Prisma.ProductReviewHelpfulCreateOrConnectWithoutReviewInput | Prisma.ProductReviewHelpfulCreateOrConnectWithoutReviewInput[];
    upsert?: Prisma.ProductReviewHelpfulUpsertWithWhereUniqueWithoutReviewInput | Prisma.ProductReviewHelpfulUpsertWithWhereUniqueWithoutReviewInput[];
    createMany?: Prisma.ProductReviewHelpfulCreateManyReviewInputEnvelope;
    set?: Prisma.ProductReviewHelpfulWhereUniqueInput | Prisma.ProductReviewHelpfulWhereUniqueInput[];
    disconnect?: Prisma.ProductReviewHelpfulWhereUniqueInput | Prisma.ProductReviewHelpfulWhereUniqueInput[];
    delete?: Prisma.ProductReviewHelpfulWhereUniqueInput | Prisma.ProductReviewHelpfulWhereUniqueInput[];
    connect?: Prisma.ProductReviewHelpfulWhereUniqueInput | Prisma.ProductReviewHelpfulWhereUniqueInput[];
    update?: Prisma.ProductReviewHelpfulUpdateWithWhereUniqueWithoutReviewInput | Prisma.ProductReviewHelpfulUpdateWithWhereUniqueWithoutReviewInput[];
    updateMany?: Prisma.ProductReviewHelpfulUpdateManyWithWhereWithoutReviewInput | Prisma.ProductReviewHelpfulUpdateManyWithWhereWithoutReviewInput[];
    deleteMany?: Prisma.ProductReviewHelpfulScalarWhereInput | Prisma.ProductReviewHelpfulScalarWhereInput[];
};
export type ProductReviewHelpfulCreateWithoutUserInput = {
    id?: string;
    isHelpful: boolean;
    createdAt?: Date | string;
    review: Prisma.ProductReviewCreateNestedOneWithoutHelpfulsInput;
};
export type ProductReviewHelpfulUncheckedCreateWithoutUserInput = {
    id?: string;
    reviewId: string;
    isHelpful: boolean;
    createdAt?: Date | string;
};
export type ProductReviewHelpfulCreateOrConnectWithoutUserInput = {
    where: Prisma.ProductReviewHelpfulWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductReviewHelpfulCreateWithoutUserInput, Prisma.ProductReviewHelpfulUncheckedCreateWithoutUserInput>;
};
export type ProductReviewHelpfulCreateManyUserInputEnvelope = {
    data: Prisma.ProductReviewHelpfulCreateManyUserInput | Prisma.ProductReviewHelpfulCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type ProductReviewHelpfulUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.ProductReviewHelpfulWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductReviewHelpfulUpdateWithoutUserInput, Prisma.ProductReviewHelpfulUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.ProductReviewHelpfulCreateWithoutUserInput, Prisma.ProductReviewHelpfulUncheckedCreateWithoutUserInput>;
};
export type ProductReviewHelpfulUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.ProductReviewHelpfulWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductReviewHelpfulUpdateWithoutUserInput, Prisma.ProductReviewHelpfulUncheckedUpdateWithoutUserInput>;
};
export type ProductReviewHelpfulUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.ProductReviewHelpfulScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductReviewHelpfulUpdateManyMutationInput, Prisma.ProductReviewHelpfulUncheckedUpdateManyWithoutUserInput>;
};
export type ProductReviewHelpfulScalarWhereInput = {
    AND?: Prisma.ProductReviewHelpfulScalarWhereInput | Prisma.ProductReviewHelpfulScalarWhereInput[];
    OR?: Prisma.ProductReviewHelpfulScalarWhereInput[];
    NOT?: Prisma.ProductReviewHelpfulScalarWhereInput | Prisma.ProductReviewHelpfulScalarWhereInput[];
    id?: Prisma.StringFilter<"ProductReviewHelpful"> | string;
    reviewId?: Prisma.StringFilter<"ProductReviewHelpful"> | string;
    userId?: Prisma.StringFilter<"ProductReviewHelpful"> | string;
    isHelpful?: Prisma.BoolFilter<"ProductReviewHelpful"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"ProductReviewHelpful"> | Date | string;
};
export type ProductReviewHelpfulCreateWithoutReviewInput = {
    id?: string;
    isHelpful: boolean;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutReviewHelpfulsInput;
};
export type ProductReviewHelpfulUncheckedCreateWithoutReviewInput = {
    id?: string;
    userId: string;
    isHelpful: boolean;
    createdAt?: Date | string;
};
export type ProductReviewHelpfulCreateOrConnectWithoutReviewInput = {
    where: Prisma.ProductReviewHelpfulWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductReviewHelpfulCreateWithoutReviewInput, Prisma.ProductReviewHelpfulUncheckedCreateWithoutReviewInput>;
};
export type ProductReviewHelpfulCreateManyReviewInputEnvelope = {
    data: Prisma.ProductReviewHelpfulCreateManyReviewInput | Prisma.ProductReviewHelpfulCreateManyReviewInput[];
    skipDuplicates?: boolean;
};
export type ProductReviewHelpfulUpsertWithWhereUniqueWithoutReviewInput = {
    where: Prisma.ProductReviewHelpfulWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductReviewHelpfulUpdateWithoutReviewInput, Prisma.ProductReviewHelpfulUncheckedUpdateWithoutReviewInput>;
    create: Prisma.XOR<Prisma.ProductReviewHelpfulCreateWithoutReviewInput, Prisma.ProductReviewHelpfulUncheckedCreateWithoutReviewInput>;
};
export type ProductReviewHelpfulUpdateWithWhereUniqueWithoutReviewInput = {
    where: Prisma.ProductReviewHelpfulWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductReviewHelpfulUpdateWithoutReviewInput, Prisma.ProductReviewHelpfulUncheckedUpdateWithoutReviewInput>;
};
export type ProductReviewHelpfulUpdateManyWithWhereWithoutReviewInput = {
    where: Prisma.ProductReviewHelpfulScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductReviewHelpfulUpdateManyMutationInput, Prisma.ProductReviewHelpfulUncheckedUpdateManyWithoutReviewInput>;
};
export type ProductReviewHelpfulCreateManyUserInput = {
    id?: string;
    reviewId: string;
    isHelpful: boolean;
    createdAt?: Date | string;
};
export type ProductReviewHelpfulUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    isHelpful?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    review?: Prisma.ProductReviewUpdateOneRequiredWithoutHelpfulsNestedInput;
};
export type ProductReviewHelpfulUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewId?: Prisma.StringFieldUpdateOperationsInput | string;
    isHelpful?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductReviewHelpfulUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewId?: Prisma.StringFieldUpdateOperationsInput | string;
    isHelpful?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductReviewHelpfulCreateManyReviewInput = {
    id?: string;
    userId: string;
    isHelpful: boolean;
    createdAt?: Date | string;
};
export type ProductReviewHelpfulUpdateWithoutReviewInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    isHelpful?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutReviewHelpfulsNestedInput;
};
export type ProductReviewHelpfulUncheckedUpdateWithoutReviewInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    isHelpful?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductReviewHelpfulUncheckedUpdateManyWithoutReviewInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    isHelpful?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductReviewHelpfulSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    reviewId?: boolean;
    userId?: boolean;
    isHelpful?: boolean;
    createdAt?: boolean;
    review?: boolean | Prisma.ProductReviewDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productReviewHelpful"]>;
export type ProductReviewHelpfulSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    reviewId?: boolean;
    userId?: boolean;
    isHelpful?: boolean;
    createdAt?: boolean;
    review?: boolean | Prisma.ProductReviewDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productReviewHelpful"]>;
export type ProductReviewHelpfulSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    reviewId?: boolean;
    userId?: boolean;
    isHelpful?: boolean;
    createdAt?: boolean;
    review?: boolean | Prisma.ProductReviewDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productReviewHelpful"]>;
export type ProductReviewHelpfulSelectScalar = {
    id?: boolean;
    reviewId?: boolean;
    userId?: boolean;
    isHelpful?: boolean;
    createdAt?: boolean;
};
export type ProductReviewHelpfulOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "reviewId" | "userId" | "isHelpful" | "createdAt", ExtArgs["result"]["productReviewHelpful"]>;
export type ProductReviewHelpfulInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    review?: boolean | Prisma.ProductReviewDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ProductReviewHelpfulIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    review?: boolean | Prisma.ProductReviewDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ProductReviewHelpfulIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    review?: boolean | Prisma.ProductReviewDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $ProductReviewHelpfulPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ProductReviewHelpful";
    objects: {
        review: Prisma.$ProductReviewPayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        reviewId: string;
        userId: string;
        isHelpful: boolean;
        createdAt: Date;
    }, ExtArgs["result"]["productReviewHelpful"]>;
    composites: {};
};
export type ProductReviewHelpfulGetPayload<S extends boolean | null | undefined | ProductReviewHelpfulDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProductReviewHelpfulPayload, S>;
export type ProductReviewHelpfulCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProductReviewHelpfulFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProductReviewHelpfulCountAggregateInputType | true;
};
export interface ProductReviewHelpfulDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ProductReviewHelpful'];
        meta: {
            name: 'ProductReviewHelpful';
        };
    };
    findUnique<T extends ProductReviewHelpfulFindUniqueArgs>(args: Prisma.SelectSubset<T, ProductReviewHelpfulFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProductReviewHelpfulClient<runtime.Types.Result.GetResult<Prisma.$ProductReviewHelpfulPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ProductReviewHelpfulFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProductReviewHelpfulFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductReviewHelpfulClient<runtime.Types.Result.GetResult<Prisma.$ProductReviewHelpfulPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ProductReviewHelpfulFindFirstArgs>(args?: Prisma.SelectSubset<T, ProductReviewHelpfulFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProductReviewHelpfulClient<runtime.Types.Result.GetResult<Prisma.$ProductReviewHelpfulPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ProductReviewHelpfulFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProductReviewHelpfulFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductReviewHelpfulClient<runtime.Types.Result.GetResult<Prisma.$ProductReviewHelpfulPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ProductReviewHelpfulFindManyArgs>(args?: Prisma.SelectSubset<T, ProductReviewHelpfulFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductReviewHelpfulPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ProductReviewHelpfulCreateArgs>(args: Prisma.SelectSubset<T, ProductReviewHelpfulCreateArgs<ExtArgs>>): Prisma.Prisma__ProductReviewHelpfulClient<runtime.Types.Result.GetResult<Prisma.$ProductReviewHelpfulPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ProductReviewHelpfulCreateManyArgs>(args?: Prisma.SelectSubset<T, ProductReviewHelpfulCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ProductReviewHelpfulCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProductReviewHelpfulCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductReviewHelpfulPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ProductReviewHelpfulDeleteArgs>(args: Prisma.SelectSubset<T, ProductReviewHelpfulDeleteArgs<ExtArgs>>): Prisma.Prisma__ProductReviewHelpfulClient<runtime.Types.Result.GetResult<Prisma.$ProductReviewHelpfulPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ProductReviewHelpfulUpdateArgs>(args: Prisma.SelectSubset<T, ProductReviewHelpfulUpdateArgs<ExtArgs>>): Prisma.Prisma__ProductReviewHelpfulClient<runtime.Types.Result.GetResult<Prisma.$ProductReviewHelpfulPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ProductReviewHelpfulDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProductReviewHelpfulDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ProductReviewHelpfulUpdateManyArgs>(args: Prisma.SelectSubset<T, ProductReviewHelpfulUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ProductReviewHelpfulUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProductReviewHelpfulUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductReviewHelpfulPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ProductReviewHelpfulUpsertArgs>(args: Prisma.SelectSubset<T, ProductReviewHelpfulUpsertArgs<ExtArgs>>): Prisma.Prisma__ProductReviewHelpfulClient<runtime.Types.Result.GetResult<Prisma.$ProductReviewHelpfulPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ProductReviewHelpfulCountArgs>(args?: Prisma.Subset<T, ProductReviewHelpfulCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProductReviewHelpfulCountAggregateOutputType> : number>;
    aggregate<T extends ProductReviewHelpfulAggregateArgs>(args: Prisma.Subset<T, ProductReviewHelpfulAggregateArgs>): Prisma.PrismaPromise<GetProductReviewHelpfulAggregateType<T>>;
    groupBy<T extends ProductReviewHelpfulGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProductReviewHelpfulGroupByArgs['orderBy'];
    } : {
        orderBy?: ProductReviewHelpfulGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProductReviewHelpfulGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductReviewHelpfulGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ProductReviewHelpfulFieldRefs;
}
export interface Prisma__ProductReviewHelpfulClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    review<T extends Prisma.ProductReviewDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductReviewDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductReviewClient<runtime.Types.Result.GetResult<Prisma.$ProductReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ProductReviewHelpfulFieldRefs {
    readonly id: Prisma.FieldRef<"ProductReviewHelpful", 'String'>;
    readonly reviewId: Prisma.FieldRef<"ProductReviewHelpful", 'String'>;
    readonly userId: Prisma.FieldRef<"ProductReviewHelpful", 'String'>;
    readonly isHelpful: Prisma.FieldRef<"ProductReviewHelpful", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"ProductReviewHelpful", 'DateTime'>;
}
export type ProductReviewHelpfulFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductReviewHelpfulSelect<ExtArgs> | null;
    omit?: Prisma.ProductReviewHelpfulOmit<ExtArgs> | null;
    include?: Prisma.ProductReviewHelpfulInclude<ExtArgs> | null;
    where: Prisma.ProductReviewHelpfulWhereUniqueInput;
};
export type ProductReviewHelpfulFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductReviewHelpfulSelect<ExtArgs> | null;
    omit?: Prisma.ProductReviewHelpfulOmit<ExtArgs> | null;
    include?: Prisma.ProductReviewHelpfulInclude<ExtArgs> | null;
    where: Prisma.ProductReviewHelpfulWhereUniqueInput;
};
export type ProductReviewHelpfulFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProductReviewHelpfulFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProductReviewHelpfulFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProductReviewHelpfulCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductReviewHelpfulSelect<ExtArgs> | null;
    omit?: Prisma.ProductReviewHelpfulOmit<ExtArgs> | null;
    include?: Prisma.ProductReviewHelpfulInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductReviewHelpfulCreateInput, Prisma.ProductReviewHelpfulUncheckedCreateInput>;
};
export type ProductReviewHelpfulCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProductReviewHelpfulCreateManyInput | Prisma.ProductReviewHelpfulCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProductReviewHelpfulCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductReviewHelpfulSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductReviewHelpfulOmit<ExtArgs> | null;
    data: Prisma.ProductReviewHelpfulCreateManyInput | Prisma.ProductReviewHelpfulCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ProductReviewHelpfulIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ProductReviewHelpfulUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductReviewHelpfulSelect<ExtArgs> | null;
    omit?: Prisma.ProductReviewHelpfulOmit<ExtArgs> | null;
    include?: Prisma.ProductReviewHelpfulInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductReviewHelpfulUpdateInput, Prisma.ProductReviewHelpfulUncheckedUpdateInput>;
    where: Prisma.ProductReviewHelpfulWhereUniqueInput;
};
export type ProductReviewHelpfulUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProductReviewHelpfulUpdateManyMutationInput, Prisma.ProductReviewHelpfulUncheckedUpdateManyInput>;
    where?: Prisma.ProductReviewHelpfulWhereInput;
    limit?: number;
};
export type ProductReviewHelpfulUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductReviewHelpfulSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductReviewHelpfulOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductReviewHelpfulUpdateManyMutationInput, Prisma.ProductReviewHelpfulUncheckedUpdateManyInput>;
    where?: Prisma.ProductReviewHelpfulWhereInput;
    limit?: number;
    include?: Prisma.ProductReviewHelpfulIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ProductReviewHelpfulUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductReviewHelpfulSelect<ExtArgs> | null;
    omit?: Prisma.ProductReviewHelpfulOmit<ExtArgs> | null;
    include?: Prisma.ProductReviewHelpfulInclude<ExtArgs> | null;
    where: Prisma.ProductReviewHelpfulWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductReviewHelpfulCreateInput, Prisma.ProductReviewHelpfulUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ProductReviewHelpfulUpdateInput, Prisma.ProductReviewHelpfulUncheckedUpdateInput>;
};
export type ProductReviewHelpfulDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductReviewHelpfulSelect<ExtArgs> | null;
    omit?: Prisma.ProductReviewHelpfulOmit<ExtArgs> | null;
    include?: Prisma.ProductReviewHelpfulInclude<ExtArgs> | null;
    where: Prisma.ProductReviewHelpfulWhereUniqueInput;
};
export type ProductReviewHelpfulDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductReviewHelpfulWhereInput;
    limit?: number;
};
export type ProductReviewHelpfulDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductReviewHelpfulSelect<ExtArgs> | null;
    omit?: Prisma.ProductReviewHelpfulOmit<ExtArgs> | null;
    include?: Prisma.ProductReviewHelpfulInclude<ExtArgs> | null;
};
