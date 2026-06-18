import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PointTransactionModel = runtime.Types.Result.DefaultSelection<Prisma.$PointTransactionPayload>;
export type AggregatePointTransaction = {
    _count: PointTransactionCountAggregateOutputType | null;
    _avg: PointTransactionAvgAggregateOutputType | null;
    _sum: PointTransactionSumAggregateOutputType | null;
    _min: PointTransactionMinAggregateOutputType | null;
    _max: PointTransactionMaxAggregateOutputType | null;
};
export type PointTransactionAvgAggregateOutputType = {
    points: number | null;
};
export type PointTransactionSumAggregateOutputType = {
    points: number | null;
};
export type PointTransactionMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    points: number | null;
    type: $Enums.PointTransactionType | null;
    referenceId: string | null;
    description: string | null;
    expiredAt: Date | null;
    createdAt: Date | null;
};
export type PointTransactionMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    points: number | null;
    type: $Enums.PointTransactionType | null;
    referenceId: string | null;
    description: string | null;
    expiredAt: Date | null;
    createdAt: Date | null;
};
export type PointTransactionCountAggregateOutputType = {
    id: number;
    userId: number;
    points: number;
    type: number;
    referenceId: number;
    description: number;
    expiredAt: number;
    createdAt: number;
    _all: number;
};
export type PointTransactionAvgAggregateInputType = {
    points?: true;
};
export type PointTransactionSumAggregateInputType = {
    points?: true;
};
export type PointTransactionMinAggregateInputType = {
    id?: true;
    userId?: true;
    points?: true;
    type?: true;
    referenceId?: true;
    description?: true;
    expiredAt?: true;
    createdAt?: true;
};
export type PointTransactionMaxAggregateInputType = {
    id?: true;
    userId?: true;
    points?: true;
    type?: true;
    referenceId?: true;
    description?: true;
    expiredAt?: true;
    createdAt?: true;
};
export type PointTransactionCountAggregateInputType = {
    id?: true;
    userId?: true;
    points?: true;
    type?: true;
    referenceId?: true;
    description?: true;
    expiredAt?: true;
    createdAt?: true;
    _all?: true;
};
export type PointTransactionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PointTransactionWhereInput;
    orderBy?: Prisma.PointTransactionOrderByWithRelationInput | Prisma.PointTransactionOrderByWithRelationInput[];
    cursor?: Prisma.PointTransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PointTransactionCountAggregateInputType;
    _avg?: PointTransactionAvgAggregateInputType;
    _sum?: PointTransactionSumAggregateInputType;
    _min?: PointTransactionMinAggregateInputType;
    _max?: PointTransactionMaxAggregateInputType;
};
export type GetPointTransactionAggregateType<T extends PointTransactionAggregateArgs> = {
    [P in keyof T & keyof AggregatePointTransaction]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePointTransaction[P]> : Prisma.GetScalarType<T[P], AggregatePointTransaction[P]>;
};
export type PointTransactionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PointTransactionWhereInput;
    orderBy?: Prisma.PointTransactionOrderByWithAggregationInput | Prisma.PointTransactionOrderByWithAggregationInput[];
    by: Prisma.PointTransactionScalarFieldEnum[] | Prisma.PointTransactionScalarFieldEnum;
    having?: Prisma.PointTransactionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PointTransactionCountAggregateInputType | true;
    _avg?: PointTransactionAvgAggregateInputType;
    _sum?: PointTransactionSumAggregateInputType;
    _min?: PointTransactionMinAggregateInputType;
    _max?: PointTransactionMaxAggregateInputType;
};
export type PointTransactionGroupByOutputType = {
    id: string;
    userId: string;
    points: number;
    type: $Enums.PointTransactionType;
    referenceId: string | null;
    description: string | null;
    expiredAt: Date | null;
    createdAt: Date;
    _count: PointTransactionCountAggregateOutputType | null;
    _avg: PointTransactionAvgAggregateOutputType | null;
    _sum: PointTransactionSumAggregateOutputType | null;
    _min: PointTransactionMinAggregateOutputType | null;
    _max: PointTransactionMaxAggregateOutputType | null;
};
export type GetPointTransactionGroupByPayload<T extends PointTransactionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PointTransactionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PointTransactionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PointTransactionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PointTransactionGroupByOutputType[P]>;
}>>;
export type PointTransactionWhereInput = {
    AND?: Prisma.PointTransactionWhereInput | Prisma.PointTransactionWhereInput[];
    OR?: Prisma.PointTransactionWhereInput[];
    NOT?: Prisma.PointTransactionWhereInput | Prisma.PointTransactionWhereInput[];
    id?: Prisma.StringFilter<"PointTransaction"> | string;
    userId?: Prisma.StringFilter<"PointTransaction"> | string;
    points?: Prisma.IntFilter<"PointTransaction"> | number;
    type?: Prisma.EnumPointTransactionTypeFilter<"PointTransaction"> | $Enums.PointTransactionType;
    referenceId?: Prisma.StringNullableFilter<"PointTransaction"> | string | null;
    description?: Prisma.StringNullableFilter<"PointTransaction"> | string | null;
    expiredAt?: Prisma.DateTimeNullableFilter<"PointTransaction"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"PointTransaction"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type PointTransactionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    points?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    referenceId?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    expiredAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type PointTransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.PointTransactionWhereInput | Prisma.PointTransactionWhereInput[];
    OR?: Prisma.PointTransactionWhereInput[];
    NOT?: Prisma.PointTransactionWhereInput | Prisma.PointTransactionWhereInput[];
    userId?: Prisma.StringFilter<"PointTransaction"> | string;
    points?: Prisma.IntFilter<"PointTransaction"> | number;
    type?: Prisma.EnumPointTransactionTypeFilter<"PointTransaction"> | $Enums.PointTransactionType;
    referenceId?: Prisma.StringNullableFilter<"PointTransaction"> | string | null;
    description?: Prisma.StringNullableFilter<"PointTransaction"> | string | null;
    expiredAt?: Prisma.DateTimeNullableFilter<"PointTransaction"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"PointTransaction"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type PointTransactionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    points?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    referenceId?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    expiredAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.PointTransactionCountOrderByAggregateInput;
    _avg?: Prisma.PointTransactionAvgOrderByAggregateInput;
    _max?: Prisma.PointTransactionMaxOrderByAggregateInput;
    _min?: Prisma.PointTransactionMinOrderByAggregateInput;
    _sum?: Prisma.PointTransactionSumOrderByAggregateInput;
};
export type PointTransactionScalarWhereWithAggregatesInput = {
    AND?: Prisma.PointTransactionScalarWhereWithAggregatesInput | Prisma.PointTransactionScalarWhereWithAggregatesInput[];
    OR?: Prisma.PointTransactionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PointTransactionScalarWhereWithAggregatesInput | Prisma.PointTransactionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PointTransaction"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"PointTransaction"> | string;
    points?: Prisma.IntWithAggregatesFilter<"PointTransaction"> | number;
    type?: Prisma.EnumPointTransactionTypeWithAggregatesFilter<"PointTransaction"> | $Enums.PointTransactionType;
    referenceId?: Prisma.StringNullableWithAggregatesFilter<"PointTransaction"> | string | null;
    description?: Prisma.StringNullableWithAggregatesFilter<"PointTransaction"> | string | null;
    expiredAt?: Prisma.DateTimeNullableWithAggregatesFilter<"PointTransaction"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PointTransaction"> | Date | string;
};
export type PointTransactionCreateInput = {
    id?: string;
    points: number;
    type: $Enums.PointTransactionType;
    referenceId?: string | null;
    description?: string | null;
    expiredAt?: Date | string | null;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutPointTransactionsInput;
};
export type PointTransactionUncheckedCreateInput = {
    id?: string;
    userId: string;
    points: number;
    type: $Enums.PointTransactionType;
    referenceId?: string | null;
    description?: string | null;
    expiredAt?: Date | string | null;
    createdAt?: Date | string;
};
export type PointTransactionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    points?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumPointTransactionTypeFieldUpdateOperationsInput | $Enums.PointTransactionType;
    referenceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutPointTransactionsNestedInput;
};
export type PointTransactionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    points?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumPointTransactionTypeFieldUpdateOperationsInput | $Enums.PointTransactionType;
    referenceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PointTransactionCreateManyInput = {
    id?: string;
    userId: string;
    points: number;
    type: $Enums.PointTransactionType;
    referenceId?: string | null;
    description?: string | null;
    expiredAt?: Date | string | null;
    createdAt?: Date | string;
};
export type PointTransactionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    points?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumPointTransactionTypeFieldUpdateOperationsInput | $Enums.PointTransactionType;
    referenceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PointTransactionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    points?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumPointTransactionTypeFieldUpdateOperationsInput | $Enums.PointTransactionType;
    referenceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PointTransactionListRelationFilter = {
    every?: Prisma.PointTransactionWhereInput;
    some?: Prisma.PointTransactionWhereInput;
    none?: Prisma.PointTransactionWhereInput;
};
export type PointTransactionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PointTransactionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    points?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    referenceId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    expiredAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PointTransactionAvgOrderByAggregateInput = {
    points?: Prisma.SortOrder;
};
export type PointTransactionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    points?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    referenceId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    expiredAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PointTransactionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    points?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    referenceId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    expiredAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PointTransactionSumOrderByAggregateInput = {
    points?: Prisma.SortOrder;
};
export type PointTransactionCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PointTransactionCreateWithoutUserInput, Prisma.PointTransactionUncheckedCreateWithoutUserInput> | Prisma.PointTransactionCreateWithoutUserInput[] | Prisma.PointTransactionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PointTransactionCreateOrConnectWithoutUserInput | Prisma.PointTransactionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PointTransactionCreateManyUserInputEnvelope;
    connect?: Prisma.PointTransactionWhereUniqueInput | Prisma.PointTransactionWhereUniqueInput[];
};
export type PointTransactionUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PointTransactionCreateWithoutUserInput, Prisma.PointTransactionUncheckedCreateWithoutUserInput> | Prisma.PointTransactionCreateWithoutUserInput[] | Prisma.PointTransactionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PointTransactionCreateOrConnectWithoutUserInput | Prisma.PointTransactionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PointTransactionCreateManyUserInputEnvelope;
    connect?: Prisma.PointTransactionWhereUniqueInput | Prisma.PointTransactionWhereUniqueInput[];
};
export type PointTransactionUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PointTransactionCreateWithoutUserInput, Prisma.PointTransactionUncheckedCreateWithoutUserInput> | Prisma.PointTransactionCreateWithoutUserInput[] | Prisma.PointTransactionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PointTransactionCreateOrConnectWithoutUserInput | Prisma.PointTransactionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PointTransactionUpsertWithWhereUniqueWithoutUserInput | Prisma.PointTransactionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PointTransactionCreateManyUserInputEnvelope;
    set?: Prisma.PointTransactionWhereUniqueInput | Prisma.PointTransactionWhereUniqueInput[];
    disconnect?: Prisma.PointTransactionWhereUniqueInput | Prisma.PointTransactionWhereUniqueInput[];
    delete?: Prisma.PointTransactionWhereUniqueInput | Prisma.PointTransactionWhereUniqueInput[];
    connect?: Prisma.PointTransactionWhereUniqueInput | Prisma.PointTransactionWhereUniqueInput[];
    update?: Prisma.PointTransactionUpdateWithWhereUniqueWithoutUserInput | Prisma.PointTransactionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PointTransactionUpdateManyWithWhereWithoutUserInput | Prisma.PointTransactionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PointTransactionScalarWhereInput | Prisma.PointTransactionScalarWhereInput[];
};
export type PointTransactionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PointTransactionCreateWithoutUserInput, Prisma.PointTransactionUncheckedCreateWithoutUserInput> | Prisma.PointTransactionCreateWithoutUserInput[] | Prisma.PointTransactionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PointTransactionCreateOrConnectWithoutUserInput | Prisma.PointTransactionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PointTransactionUpsertWithWhereUniqueWithoutUserInput | Prisma.PointTransactionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PointTransactionCreateManyUserInputEnvelope;
    set?: Prisma.PointTransactionWhereUniqueInput | Prisma.PointTransactionWhereUniqueInput[];
    disconnect?: Prisma.PointTransactionWhereUniqueInput | Prisma.PointTransactionWhereUniqueInput[];
    delete?: Prisma.PointTransactionWhereUniqueInput | Prisma.PointTransactionWhereUniqueInput[];
    connect?: Prisma.PointTransactionWhereUniqueInput | Prisma.PointTransactionWhereUniqueInput[];
    update?: Prisma.PointTransactionUpdateWithWhereUniqueWithoutUserInput | Prisma.PointTransactionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PointTransactionUpdateManyWithWhereWithoutUserInput | Prisma.PointTransactionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PointTransactionScalarWhereInput | Prisma.PointTransactionScalarWhereInput[];
};
export type EnumPointTransactionTypeFieldUpdateOperationsInput = {
    set?: $Enums.PointTransactionType;
};
export type PointTransactionCreateWithoutUserInput = {
    id?: string;
    points: number;
    type: $Enums.PointTransactionType;
    referenceId?: string | null;
    description?: string | null;
    expiredAt?: Date | string | null;
    createdAt?: Date | string;
};
export type PointTransactionUncheckedCreateWithoutUserInput = {
    id?: string;
    points: number;
    type: $Enums.PointTransactionType;
    referenceId?: string | null;
    description?: string | null;
    expiredAt?: Date | string | null;
    createdAt?: Date | string;
};
export type PointTransactionCreateOrConnectWithoutUserInput = {
    where: Prisma.PointTransactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.PointTransactionCreateWithoutUserInput, Prisma.PointTransactionUncheckedCreateWithoutUserInput>;
};
export type PointTransactionCreateManyUserInputEnvelope = {
    data: Prisma.PointTransactionCreateManyUserInput | Prisma.PointTransactionCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type PointTransactionUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.PointTransactionWhereUniqueInput;
    update: Prisma.XOR<Prisma.PointTransactionUpdateWithoutUserInput, Prisma.PointTransactionUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.PointTransactionCreateWithoutUserInput, Prisma.PointTransactionUncheckedCreateWithoutUserInput>;
};
export type PointTransactionUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.PointTransactionWhereUniqueInput;
    data: Prisma.XOR<Prisma.PointTransactionUpdateWithoutUserInput, Prisma.PointTransactionUncheckedUpdateWithoutUserInput>;
};
export type PointTransactionUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.PointTransactionScalarWhereInput;
    data: Prisma.XOR<Prisma.PointTransactionUpdateManyMutationInput, Prisma.PointTransactionUncheckedUpdateManyWithoutUserInput>;
};
export type PointTransactionScalarWhereInput = {
    AND?: Prisma.PointTransactionScalarWhereInput | Prisma.PointTransactionScalarWhereInput[];
    OR?: Prisma.PointTransactionScalarWhereInput[];
    NOT?: Prisma.PointTransactionScalarWhereInput | Prisma.PointTransactionScalarWhereInput[];
    id?: Prisma.StringFilter<"PointTransaction"> | string;
    userId?: Prisma.StringFilter<"PointTransaction"> | string;
    points?: Prisma.IntFilter<"PointTransaction"> | number;
    type?: Prisma.EnumPointTransactionTypeFilter<"PointTransaction"> | $Enums.PointTransactionType;
    referenceId?: Prisma.StringNullableFilter<"PointTransaction"> | string | null;
    description?: Prisma.StringNullableFilter<"PointTransaction"> | string | null;
    expiredAt?: Prisma.DateTimeNullableFilter<"PointTransaction"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"PointTransaction"> | Date | string;
};
export type PointTransactionCreateManyUserInput = {
    id?: string;
    points: number;
    type: $Enums.PointTransactionType;
    referenceId?: string | null;
    description?: string | null;
    expiredAt?: Date | string | null;
    createdAt?: Date | string;
};
export type PointTransactionUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    points?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumPointTransactionTypeFieldUpdateOperationsInput | $Enums.PointTransactionType;
    referenceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PointTransactionUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    points?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumPointTransactionTypeFieldUpdateOperationsInput | $Enums.PointTransactionType;
    referenceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PointTransactionUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    points?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumPointTransactionTypeFieldUpdateOperationsInput | $Enums.PointTransactionType;
    referenceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PointTransactionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    points?: boolean;
    type?: boolean;
    referenceId?: boolean;
    description?: boolean;
    expiredAt?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pointTransaction"]>;
export type PointTransactionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    points?: boolean;
    type?: boolean;
    referenceId?: boolean;
    description?: boolean;
    expiredAt?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pointTransaction"]>;
export type PointTransactionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    points?: boolean;
    type?: boolean;
    referenceId?: boolean;
    description?: boolean;
    expiredAt?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pointTransaction"]>;
export type PointTransactionSelectScalar = {
    id?: boolean;
    userId?: boolean;
    points?: boolean;
    type?: boolean;
    referenceId?: boolean;
    description?: boolean;
    expiredAt?: boolean;
    createdAt?: boolean;
};
export type PointTransactionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "points" | "type" | "referenceId" | "description" | "expiredAt" | "createdAt", ExtArgs["result"]["pointTransaction"]>;
export type PointTransactionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type PointTransactionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type PointTransactionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $PointTransactionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PointTransaction";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        points: number;
        type: $Enums.PointTransactionType;
        referenceId: string | null;
        description: string | null;
        expiredAt: Date | null;
        createdAt: Date;
    }, ExtArgs["result"]["pointTransaction"]>;
    composites: {};
};
export type PointTransactionGetPayload<S extends boolean | null | undefined | PointTransactionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PointTransactionPayload, S>;
export type PointTransactionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PointTransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PointTransactionCountAggregateInputType | true;
};
export interface PointTransactionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PointTransaction'];
        meta: {
            name: 'PointTransaction';
        };
    };
    findUnique<T extends PointTransactionFindUniqueArgs>(args: Prisma.SelectSubset<T, PointTransactionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PointTransactionClient<runtime.Types.Result.GetResult<Prisma.$PointTransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PointTransactionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PointTransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PointTransactionClient<runtime.Types.Result.GetResult<Prisma.$PointTransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PointTransactionFindFirstArgs>(args?: Prisma.SelectSubset<T, PointTransactionFindFirstArgs<ExtArgs>>): Prisma.Prisma__PointTransactionClient<runtime.Types.Result.GetResult<Prisma.$PointTransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PointTransactionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PointTransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PointTransactionClient<runtime.Types.Result.GetResult<Prisma.$PointTransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PointTransactionFindManyArgs>(args?: Prisma.SelectSubset<T, PointTransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PointTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PointTransactionCreateArgs>(args: Prisma.SelectSubset<T, PointTransactionCreateArgs<ExtArgs>>): Prisma.Prisma__PointTransactionClient<runtime.Types.Result.GetResult<Prisma.$PointTransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PointTransactionCreateManyArgs>(args?: Prisma.SelectSubset<T, PointTransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PointTransactionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PointTransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PointTransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PointTransactionDeleteArgs>(args: Prisma.SelectSubset<T, PointTransactionDeleteArgs<ExtArgs>>): Prisma.Prisma__PointTransactionClient<runtime.Types.Result.GetResult<Prisma.$PointTransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PointTransactionUpdateArgs>(args: Prisma.SelectSubset<T, PointTransactionUpdateArgs<ExtArgs>>): Prisma.Prisma__PointTransactionClient<runtime.Types.Result.GetResult<Prisma.$PointTransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PointTransactionDeleteManyArgs>(args?: Prisma.SelectSubset<T, PointTransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PointTransactionUpdateManyArgs>(args: Prisma.SelectSubset<T, PointTransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PointTransactionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PointTransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PointTransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PointTransactionUpsertArgs>(args: Prisma.SelectSubset<T, PointTransactionUpsertArgs<ExtArgs>>): Prisma.Prisma__PointTransactionClient<runtime.Types.Result.GetResult<Prisma.$PointTransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PointTransactionCountArgs>(args?: Prisma.Subset<T, PointTransactionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PointTransactionCountAggregateOutputType> : number>;
    aggregate<T extends PointTransactionAggregateArgs>(args: Prisma.Subset<T, PointTransactionAggregateArgs>): Prisma.PrismaPromise<GetPointTransactionAggregateType<T>>;
    groupBy<T extends PointTransactionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PointTransactionGroupByArgs['orderBy'];
    } : {
        orderBy?: PointTransactionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PointTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPointTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PointTransactionFieldRefs;
}
export interface Prisma__PointTransactionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PointTransactionFieldRefs {
    readonly id: Prisma.FieldRef<"PointTransaction", 'String'>;
    readonly userId: Prisma.FieldRef<"PointTransaction", 'String'>;
    readonly points: Prisma.FieldRef<"PointTransaction", 'Int'>;
    readonly type: Prisma.FieldRef<"PointTransaction", 'PointTransactionType'>;
    readonly referenceId: Prisma.FieldRef<"PointTransaction", 'String'>;
    readonly description: Prisma.FieldRef<"PointTransaction", 'String'>;
    readonly expiredAt: Prisma.FieldRef<"PointTransaction", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"PointTransaction", 'DateTime'>;
}
export type PointTransactionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PointTransactionSelect<ExtArgs> | null;
    omit?: Prisma.PointTransactionOmit<ExtArgs> | null;
    include?: Prisma.PointTransactionInclude<ExtArgs> | null;
    where: Prisma.PointTransactionWhereUniqueInput;
};
export type PointTransactionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PointTransactionSelect<ExtArgs> | null;
    omit?: Prisma.PointTransactionOmit<ExtArgs> | null;
    include?: Prisma.PointTransactionInclude<ExtArgs> | null;
    where: Prisma.PointTransactionWhereUniqueInput;
};
export type PointTransactionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PointTransactionSelect<ExtArgs> | null;
    omit?: Prisma.PointTransactionOmit<ExtArgs> | null;
    include?: Prisma.PointTransactionInclude<ExtArgs> | null;
    where?: Prisma.PointTransactionWhereInput;
    orderBy?: Prisma.PointTransactionOrderByWithRelationInput | Prisma.PointTransactionOrderByWithRelationInput[];
    cursor?: Prisma.PointTransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PointTransactionScalarFieldEnum | Prisma.PointTransactionScalarFieldEnum[];
};
export type PointTransactionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PointTransactionSelect<ExtArgs> | null;
    omit?: Prisma.PointTransactionOmit<ExtArgs> | null;
    include?: Prisma.PointTransactionInclude<ExtArgs> | null;
    where?: Prisma.PointTransactionWhereInput;
    orderBy?: Prisma.PointTransactionOrderByWithRelationInput | Prisma.PointTransactionOrderByWithRelationInput[];
    cursor?: Prisma.PointTransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PointTransactionScalarFieldEnum | Prisma.PointTransactionScalarFieldEnum[];
};
export type PointTransactionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PointTransactionSelect<ExtArgs> | null;
    omit?: Prisma.PointTransactionOmit<ExtArgs> | null;
    include?: Prisma.PointTransactionInclude<ExtArgs> | null;
    where?: Prisma.PointTransactionWhereInput;
    orderBy?: Prisma.PointTransactionOrderByWithRelationInput | Prisma.PointTransactionOrderByWithRelationInput[];
    cursor?: Prisma.PointTransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PointTransactionScalarFieldEnum | Prisma.PointTransactionScalarFieldEnum[];
};
export type PointTransactionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PointTransactionSelect<ExtArgs> | null;
    omit?: Prisma.PointTransactionOmit<ExtArgs> | null;
    include?: Prisma.PointTransactionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PointTransactionCreateInput, Prisma.PointTransactionUncheckedCreateInput>;
};
export type PointTransactionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PointTransactionCreateManyInput | Prisma.PointTransactionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PointTransactionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PointTransactionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PointTransactionOmit<ExtArgs> | null;
    data: Prisma.PointTransactionCreateManyInput | Prisma.PointTransactionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PointTransactionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PointTransactionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PointTransactionSelect<ExtArgs> | null;
    omit?: Prisma.PointTransactionOmit<ExtArgs> | null;
    include?: Prisma.PointTransactionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PointTransactionUpdateInput, Prisma.PointTransactionUncheckedUpdateInput>;
    where: Prisma.PointTransactionWhereUniqueInput;
};
export type PointTransactionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PointTransactionUpdateManyMutationInput, Prisma.PointTransactionUncheckedUpdateManyInput>;
    where?: Prisma.PointTransactionWhereInput;
    limit?: number;
};
export type PointTransactionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PointTransactionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PointTransactionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PointTransactionUpdateManyMutationInput, Prisma.PointTransactionUncheckedUpdateManyInput>;
    where?: Prisma.PointTransactionWhereInput;
    limit?: number;
    include?: Prisma.PointTransactionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PointTransactionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PointTransactionSelect<ExtArgs> | null;
    omit?: Prisma.PointTransactionOmit<ExtArgs> | null;
    include?: Prisma.PointTransactionInclude<ExtArgs> | null;
    where: Prisma.PointTransactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.PointTransactionCreateInput, Prisma.PointTransactionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PointTransactionUpdateInput, Prisma.PointTransactionUncheckedUpdateInput>;
};
export type PointTransactionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PointTransactionSelect<ExtArgs> | null;
    omit?: Prisma.PointTransactionOmit<ExtArgs> | null;
    include?: Prisma.PointTransactionInclude<ExtArgs> | null;
    where: Prisma.PointTransactionWhereUniqueInput;
};
export type PointTransactionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PointTransactionWhereInput;
    limit?: number;
};
export type PointTransactionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PointTransactionSelect<ExtArgs> | null;
    omit?: Prisma.PointTransactionOmit<ExtArgs> | null;
    include?: Prisma.PointTransactionInclude<ExtArgs> | null;
};
