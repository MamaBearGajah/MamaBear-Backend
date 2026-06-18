import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PromotionBenefitModel = runtime.Types.Result.DefaultSelection<Prisma.$PromotionBenefitPayload>;
export type AggregatePromotionBenefit = {
    _count: PromotionBenefitCountAggregateOutputType | null;
    _avg: PromotionBenefitAvgAggregateOutputType | null;
    _sum: PromotionBenefitSumAggregateOutputType | null;
    _min: PromotionBenefitMinAggregateOutputType | null;
    _max: PromotionBenefitMaxAggregateOutputType | null;
};
export type PromotionBenefitAvgAggregateOutputType = {
    sortOrder: number | null;
};
export type PromotionBenefitSumAggregateOutputType = {
    sortOrder: number | null;
};
export type PromotionBenefitMinAggregateOutputType = {
    id: string | null;
    promotionId: string | null;
    icon: string | null;
    title: string | null;
    description: string | null;
    sortOrder: number | null;
};
export type PromotionBenefitMaxAggregateOutputType = {
    id: string | null;
    promotionId: string | null;
    icon: string | null;
    title: string | null;
    description: string | null;
    sortOrder: number | null;
};
export type PromotionBenefitCountAggregateOutputType = {
    id: number;
    promotionId: number;
    icon: number;
    title: number;
    description: number;
    sortOrder: number;
    _all: number;
};
export type PromotionBenefitAvgAggregateInputType = {
    sortOrder?: true;
};
export type PromotionBenefitSumAggregateInputType = {
    sortOrder?: true;
};
export type PromotionBenefitMinAggregateInputType = {
    id?: true;
    promotionId?: true;
    icon?: true;
    title?: true;
    description?: true;
    sortOrder?: true;
};
export type PromotionBenefitMaxAggregateInputType = {
    id?: true;
    promotionId?: true;
    icon?: true;
    title?: true;
    description?: true;
    sortOrder?: true;
};
export type PromotionBenefitCountAggregateInputType = {
    id?: true;
    promotionId?: true;
    icon?: true;
    title?: true;
    description?: true;
    sortOrder?: true;
    _all?: true;
};
export type PromotionBenefitAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PromotionBenefitWhereInput;
    orderBy?: Prisma.PromotionBenefitOrderByWithRelationInput | Prisma.PromotionBenefitOrderByWithRelationInput[];
    cursor?: Prisma.PromotionBenefitWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PromotionBenefitCountAggregateInputType;
    _avg?: PromotionBenefitAvgAggregateInputType;
    _sum?: PromotionBenefitSumAggregateInputType;
    _min?: PromotionBenefitMinAggregateInputType;
    _max?: PromotionBenefitMaxAggregateInputType;
};
export type GetPromotionBenefitAggregateType<T extends PromotionBenefitAggregateArgs> = {
    [P in keyof T & keyof AggregatePromotionBenefit]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePromotionBenefit[P]> : Prisma.GetScalarType<T[P], AggregatePromotionBenefit[P]>;
};
export type PromotionBenefitGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PromotionBenefitWhereInput;
    orderBy?: Prisma.PromotionBenefitOrderByWithAggregationInput | Prisma.PromotionBenefitOrderByWithAggregationInput[];
    by: Prisma.PromotionBenefitScalarFieldEnum[] | Prisma.PromotionBenefitScalarFieldEnum;
    having?: Prisma.PromotionBenefitScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PromotionBenefitCountAggregateInputType | true;
    _avg?: PromotionBenefitAvgAggregateInputType;
    _sum?: PromotionBenefitSumAggregateInputType;
    _min?: PromotionBenefitMinAggregateInputType;
    _max?: PromotionBenefitMaxAggregateInputType;
};
export type PromotionBenefitGroupByOutputType = {
    id: string;
    promotionId: string;
    icon: string | null;
    title: string;
    description: string;
    sortOrder: number;
    _count: PromotionBenefitCountAggregateOutputType | null;
    _avg: PromotionBenefitAvgAggregateOutputType | null;
    _sum: PromotionBenefitSumAggregateOutputType | null;
    _min: PromotionBenefitMinAggregateOutputType | null;
    _max: PromotionBenefitMaxAggregateOutputType | null;
};
export type GetPromotionBenefitGroupByPayload<T extends PromotionBenefitGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PromotionBenefitGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PromotionBenefitGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PromotionBenefitGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PromotionBenefitGroupByOutputType[P]>;
}>>;
export type PromotionBenefitWhereInput = {
    AND?: Prisma.PromotionBenefitWhereInput | Prisma.PromotionBenefitWhereInput[];
    OR?: Prisma.PromotionBenefitWhereInput[];
    NOT?: Prisma.PromotionBenefitWhereInput | Prisma.PromotionBenefitWhereInput[];
    id?: Prisma.StringFilter<"PromotionBenefit"> | string;
    promotionId?: Prisma.StringFilter<"PromotionBenefit"> | string;
    icon?: Prisma.StringNullableFilter<"PromotionBenefit"> | string | null;
    title?: Prisma.StringFilter<"PromotionBenefit"> | string;
    description?: Prisma.StringFilter<"PromotionBenefit"> | string;
    sortOrder?: Prisma.IntFilter<"PromotionBenefit"> | number;
    promotion?: Prisma.XOR<Prisma.PromotionLandingScalarRelationFilter, Prisma.PromotionLandingWhereInput>;
};
export type PromotionBenefitOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    promotionId?: Prisma.SortOrder;
    icon?: Prisma.SortOrderInput | Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    promotion?: Prisma.PromotionLandingOrderByWithRelationInput;
};
export type PromotionBenefitWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.PromotionBenefitWhereInput | Prisma.PromotionBenefitWhereInput[];
    OR?: Prisma.PromotionBenefitWhereInput[];
    NOT?: Prisma.PromotionBenefitWhereInput | Prisma.PromotionBenefitWhereInput[];
    promotionId?: Prisma.StringFilter<"PromotionBenefit"> | string;
    icon?: Prisma.StringNullableFilter<"PromotionBenefit"> | string | null;
    title?: Prisma.StringFilter<"PromotionBenefit"> | string;
    description?: Prisma.StringFilter<"PromotionBenefit"> | string;
    sortOrder?: Prisma.IntFilter<"PromotionBenefit"> | number;
    promotion?: Prisma.XOR<Prisma.PromotionLandingScalarRelationFilter, Prisma.PromotionLandingWhereInput>;
}, "id">;
export type PromotionBenefitOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    promotionId?: Prisma.SortOrder;
    icon?: Prisma.SortOrderInput | Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    _count?: Prisma.PromotionBenefitCountOrderByAggregateInput;
    _avg?: Prisma.PromotionBenefitAvgOrderByAggregateInput;
    _max?: Prisma.PromotionBenefitMaxOrderByAggregateInput;
    _min?: Prisma.PromotionBenefitMinOrderByAggregateInput;
    _sum?: Prisma.PromotionBenefitSumOrderByAggregateInput;
};
export type PromotionBenefitScalarWhereWithAggregatesInput = {
    AND?: Prisma.PromotionBenefitScalarWhereWithAggregatesInput | Prisma.PromotionBenefitScalarWhereWithAggregatesInput[];
    OR?: Prisma.PromotionBenefitScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PromotionBenefitScalarWhereWithAggregatesInput | Prisma.PromotionBenefitScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PromotionBenefit"> | string;
    promotionId?: Prisma.StringWithAggregatesFilter<"PromotionBenefit"> | string;
    icon?: Prisma.StringNullableWithAggregatesFilter<"PromotionBenefit"> | string | null;
    title?: Prisma.StringWithAggregatesFilter<"PromotionBenefit"> | string;
    description?: Prisma.StringWithAggregatesFilter<"PromotionBenefit"> | string;
    sortOrder?: Prisma.IntWithAggregatesFilter<"PromotionBenefit"> | number;
};
export type PromotionBenefitCreateInput = {
    id?: string;
    icon?: string | null;
    title: string;
    description: string;
    sortOrder?: number;
    promotion: Prisma.PromotionLandingCreateNestedOneWithoutBenefitsInput;
};
export type PromotionBenefitUncheckedCreateInput = {
    id?: string;
    promotionId: string;
    icon?: string | null;
    title: string;
    description: string;
    sortOrder?: number;
};
export type PromotionBenefitUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    promotion?: Prisma.PromotionLandingUpdateOneRequiredWithoutBenefitsNestedInput;
};
export type PromotionBenefitUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    promotionId?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type PromotionBenefitCreateManyInput = {
    id?: string;
    promotionId: string;
    icon?: string | null;
    title: string;
    description: string;
    sortOrder?: number;
};
export type PromotionBenefitUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type PromotionBenefitUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    promotionId?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type PromotionBenefitListRelationFilter = {
    every?: Prisma.PromotionBenefitWhereInput;
    some?: Prisma.PromotionBenefitWhereInput;
    none?: Prisma.PromotionBenefitWhereInput;
};
export type PromotionBenefitOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PromotionBenefitCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    promotionId?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
};
export type PromotionBenefitAvgOrderByAggregateInput = {
    sortOrder?: Prisma.SortOrder;
};
export type PromotionBenefitMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    promotionId?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
};
export type PromotionBenefitMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    promotionId?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
};
export type PromotionBenefitSumOrderByAggregateInput = {
    sortOrder?: Prisma.SortOrder;
};
export type PromotionBenefitCreateNestedManyWithoutPromotionInput = {
    create?: Prisma.XOR<Prisma.PromotionBenefitCreateWithoutPromotionInput, Prisma.PromotionBenefitUncheckedCreateWithoutPromotionInput> | Prisma.PromotionBenefitCreateWithoutPromotionInput[] | Prisma.PromotionBenefitUncheckedCreateWithoutPromotionInput[];
    connectOrCreate?: Prisma.PromotionBenefitCreateOrConnectWithoutPromotionInput | Prisma.PromotionBenefitCreateOrConnectWithoutPromotionInput[];
    createMany?: Prisma.PromotionBenefitCreateManyPromotionInputEnvelope;
    connect?: Prisma.PromotionBenefitWhereUniqueInput | Prisma.PromotionBenefitWhereUniqueInput[];
};
export type PromotionBenefitUncheckedCreateNestedManyWithoutPromotionInput = {
    create?: Prisma.XOR<Prisma.PromotionBenefitCreateWithoutPromotionInput, Prisma.PromotionBenefitUncheckedCreateWithoutPromotionInput> | Prisma.PromotionBenefitCreateWithoutPromotionInput[] | Prisma.PromotionBenefitUncheckedCreateWithoutPromotionInput[];
    connectOrCreate?: Prisma.PromotionBenefitCreateOrConnectWithoutPromotionInput | Prisma.PromotionBenefitCreateOrConnectWithoutPromotionInput[];
    createMany?: Prisma.PromotionBenefitCreateManyPromotionInputEnvelope;
    connect?: Prisma.PromotionBenefitWhereUniqueInput | Prisma.PromotionBenefitWhereUniqueInput[];
};
export type PromotionBenefitUpdateManyWithoutPromotionNestedInput = {
    create?: Prisma.XOR<Prisma.PromotionBenefitCreateWithoutPromotionInput, Prisma.PromotionBenefitUncheckedCreateWithoutPromotionInput> | Prisma.PromotionBenefitCreateWithoutPromotionInput[] | Prisma.PromotionBenefitUncheckedCreateWithoutPromotionInput[];
    connectOrCreate?: Prisma.PromotionBenefitCreateOrConnectWithoutPromotionInput | Prisma.PromotionBenefitCreateOrConnectWithoutPromotionInput[];
    upsert?: Prisma.PromotionBenefitUpsertWithWhereUniqueWithoutPromotionInput | Prisma.PromotionBenefitUpsertWithWhereUniqueWithoutPromotionInput[];
    createMany?: Prisma.PromotionBenefitCreateManyPromotionInputEnvelope;
    set?: Prisma.PromotionBenefitWhereUniqueInput | Prisma.PromotionBenefitWhereUniqueInput[];
    disconnect?: Prisma.PromotionBenefitWhereUniqueInput | Prisma.PromotionBenefitWhereUniqueInput[];
    delete?: Prisma.PromotionBenefitWhereUniqueInput | Prisma.PromotionBenefitWhereUniqueInput[];
    connect?: Prisma.PromotionBenefitWhereUniqueInput | Prisma.PromotionBenefitWhereUniqueInput[];
    update?: Prisma.PromotionBenefitUpdateWithWhereUniqueWithoutPromotionInput | Prisma.PromotionBenefitUpdateWithWhereUniqueWithoutPromotionInput[];
    updateMany?: Prisma.PromotionBenefitUpdateManyWithWhereWithoutPromotionInput | Prisma.PromotionBenefitUpdateManyWithWhereWithoutPromotionInput[];
    deleteMany?: Prisma.PromotionBenefitScalarWhereInput | Prisma.PromotionBenefitScalarWhereInput[];
};
export type PromotionBenefitUncheckedUpdateManyWithoutPromotionNestedInput = {
    create?: Prisma.XOR<Prisma.PromotionBenefitCreateWithoutPromotionInput, Prisma.PromotionBenefitUncheckedCreateWithoutPromotionInput> | Prisma.PromotionBenefitCreateWithoutPromotionInput[] | Prisma.PromotionBenefitUncheckedCreateWithoutPromotionInput[];
    connectOrCreate?: Prisma.PromotionBenefitCreateOrConnectWithoutPromotionInput | Prisma.PromotionBenefitCreateOrConnectWithoutPromotionInput[];
    upsert?: Prisma.PromotionBenefitUpsertWithWhereUniqueWithoutPromotionInput | Prisma.PromotionBenefitUpsertWithWhereUniqueWithoutPromotionInput[];
    createMany?: Prisma.PromotionBenefitCreateManyPromotionInputEnvelope;
    set?: Prisma.PromotionBenefitWhereUniqueInput | Prisma.PromotionBenefitWhereUniqueInput[];
    disconnect?: Prisma.PromotionBenefitWhereUniqueInput | Prisma.PromotionBenefitWhereUniqueInput[];
    delete?: Prisma.PromotionBenefitWhereUniqueInput | Prisma.PromotionBenefitWhereUniqueInput[];
    connect?: Prisma.PromotionBenefitWhereUniqueInput | Prisma.PromotionBenefitWhereUniqueInput[];
    update?: Prisma.PromotionBenefitUpdateWithWhereUniqueWithoutPromotionInput | Prisma.PromotionBenefitUpdateWithWhereUniqueWithoutPromotionInput[];
    updateMany?: Prisma.PromotionBenefitUpdateManyWithWhereWithoutPromotionInput | Prisma.PromotionBenefitUpdateManyWithWhereWithoutPromotionInput[];
    deleteMany?: Prisma.PromotionBenefitScalarWhereInput | Prisma.PromotionBenefitScalarWhereInput[];
};
export type PromotionBenefitCreateWithoutPromotionInput = {
    id?: string;
    icon?: string | null;
    title: string;
    description: string;
    sortOrder?: number;
};
export type PromotionBenefitUncheckedCreateWithoutPromotionInput = {
    id?: string;
    icon?: string | null;
    title: string;
    description: string;
    sortOrder?: number;
};
export type PromotionBenefitCreateOrConnectWithoutPromotionInput = {
    where: Prisma.PromotionBenefitWhereUniqueInput;
    create: Prisma.XOR<Prisma.PromotionBenefitCreateWithoutPromotionInput, Prisma.PromotionBenefitUncheckedCreateWithoutPromotionInput>;
};
export type PromotionBenefitCreateManyPromotionInputEnvelope = {
    data: Prisma.PromotionBenefitCreateManyPromotionInput | Prisma.PromotionBenefitCreateManyPromotionInput[];
    skipDuplicates?: boolean;
};
export type PromotionBenefitUpsertWithWhereUniqueWithoutPromotionInput = {
    where: Prisma.PromotionBenefitWhereUniqueInput;
    update: Prisma.XOR<Prisma.PromotionBenefitUpdateWithoutPromotionInput, Prisma.PromotionBenefitUncheckedUpdateWithoutPromotionInput>;
    create: Prisma.XOR<Prisma.PromotionBenefitCreateWithoutPromotionInput, Prisma.PromotionBenefitUncheckedCreateWithoutPromotionInput>;
};
export type PromotionBenefitUpdateWithWhereUniqueWithoutPromotionInput = {
    where: Prisma.PromotionBenefitWhereUniqueInput;
    data: Prisma.XOR<Prisma.PromotionBenefitUpdateWithoutPromotionInput, Prisma.PromotionBenefitUncheckedUpdateWithoutPromotionInput>;
};
export type PromotionBenefitUpdateManyWithWhereWithoutPromotionInput = {
    where: Prisma.PromotionBenefitScalarWhereInput;
    data: Prisma.XOR<Prisma.PromotionBenefitUpdateManyMutationInput, Prisma.PromotionBenefitUncheckedUpdateManyWithoutPromotionInput>;
};
export type PromotionBenefitScalarWhereInput = {
    AND?: Prisma.PromotionBenefitScalarWhereInput | Prisma.PromotionBenefitScalarWhereInput[];
    OR?: Prisma.PromotionBenefitScalarWhereInput[];
    NOT?: Prisma.PromotionBenefitScalarWhereInput | Prisma.PromotionBenefitScalarWhereInput[];
    id?: Prisma.StringFilter<"PromotionBenefit"> | string;
    promotionId?: Prisma.StringFilter<"PromotionBenefit"> | string;
    icon?: Prisma.StringNullableFilter<"PromotionBenefit"> | string | null;
    title?: Prisma.StringFilter<"PromotionBenefit"> | string;
    description?: Prisma.StringFilter<"PromotionBenefit"> | string;
    sortOrder?: Prisma.IntFilter<"PromotionBenefit"> | number;
};
export type PromotionBenefitCreateManyPromotionInput = {
    id?: string;
    icon?: string | null;
    title: string;
    description: string;
    sortOrder?: number;
};
export type PromotionBenefitUpdateWithoutPromotionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type PromotionBenefitUncheckedUpdateWithoutPromotionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type PromotionBenefitUncheckedUpdateManyWithoutPromotionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type PromotionBenefitSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    promotionId?: boolean;
    icon?: boolean;
    title?: boolean;
    description?: boolean;
    sortOrder?: boolean;
    promotion?: boolean | Prisma.PromotionLandingDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["promotionBenefit"]>;
export type PromotionBenefitSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    promotionId?: boolean;
    icon?: boolean;
    title?: boolean;
    description?: boolean;
    sortOrder?: boolean;
    promotion?: boolean | Prisma.PromotionLandingDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["promotionBenefit"]>;
export type PromotionBenefitSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    promotionId?: boolean;
    icon?: boolean;
    title?: boolean;
    description?: boolean;
    sortOrder?: boolean;
    promotion?: boolean | Prisma.PromotionLandingDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["promotionBenefit"]>;
export type PromotionBenefitSelectScalar = {
    id?: boolean;
    promotionId?: boolean;
    icon?: boolean;
    title?: boolean;
    description?: boolean;
    sortOrder?: boolean;
};
export type PromotionBenefitOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "promotionId" | "icon" | "title" | "description" | "sortOrder", ExtArgs["result"]["promotionBenefit"]>;
export type PromotionBenefitInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    promotion?: boolean | Prisma.PromotionLandingDefaultArgs<ExtArgs>;
};
export type PromotionBenefitIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    promotion?: boolean | Prisma.PromotionLandingDefaultArgs<ExtArgs>;
};
export type PromotionBenefitIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    promotion?: boolean | Prisma.PromotionLandingDefaultArgs<ExtArgs>;
};
export type $PromotionBenefitPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PromotionBenefit";
    objects: {
        promotion: Prisma.$PromotionLandingPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        promotionId: string;
        icon: string | null;
        title: string;
        description: string;
        sortOrder: number;
    }, ExtArgs["result"]["promotionBenefit"]>;
    composites: {};
};
export type PromotionBenefitGetPayload<S extends boolean | null | undefined | PromotionBenefitDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PromotionBenefitPayload, S>;
export type PromotionBenefitCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PromotionBenefitFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PromotionBenefitCountAggregateInputType | true;
};
export interface PromotionBenefitDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PromotionBenefit'];
        meta: {
            name: 'PromotionBenefit';
        };
    };
    findUnique<T extends PromotionBenefitFindUniqueArgs>(args: Prisma.SelectSubset<T, PromotionBenefitFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PromotionBenefitClient<runtime.Types.Result.GetResult<Prisma.$PromotionBenefitPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PromotionBenefitFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PromotionBenefitFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PromotionBenefitClient<runtime.Types.Result.GetResult<Prisma.$PromotionBenefitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PromotionBenefitFindFirstArgs>(args?: Prisma.SelectSubset<T, PromotionBenefitFindFirstArgs<ExtArgs>>): Prisma.Prisma__PromotionBenefitClient<runtime.Types.Result.GetResult<Prisma.$PromotionBenefitPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PromotionBenefitFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PromotionBenefitFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PromotionBenefitClient<runtime.Types.Result.GetResult<Prisma.$PromotionBenefitPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PromotionBenefitFindManyArgs>(args?: Prisma.SelectSubset<T, PromotionBenefitFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PromotionBenefitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PromotionBenefitCreateArgs>(args: Prisma.SelectSubset<T, PromotionBenefitCreateArgs<ExtArgs>>): Prisma.Prisma__PromotionBenefitClient<runtime.Types.Result.GetResult<Prisma.$PromotionBenefitPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PromotionBenefitCreateManyArgs>(args?: Prisma.SelectSubset<T, PromotionBenefitCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PromotionBenefitCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PromotionBenefitCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PromotionBenefitPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PromotionBenefitDeleteArgs>(args: Prisma.SelectSubset<T, PromotionBenefitDeleteArgs<ExtArgs>>): Prisma.Prisma__PromotionBenefitClient<runtime.Types.Result.GetResult<Prisma.$PromotionBenefitPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PromotionBenefitUpdateArgs>(args: Prisma.SelectSubset<T, PromotionBenefitUpdateArgs<ExtArgs>>): Prisma.Prisma__PromotionBenefitClient<runtime.Types.Result.GetResult<Prisma.$PromotionBenefitPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PromotionBenefitDeleteManyArgs>(args?: Prisma.SelectSubset<T, PromotionBenefitDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PromotionBenefitUpdateManyArgs>(args: Prisma.SelectSubset<T, PromotionBenefitUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PromotionBenefitUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PromotionBenefitUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PromotionBenefitPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PromotionBenefitUpsertArgs>(args: Prisma.SelectSubset<T, PromotionBenefitUpsertArgs<ExtArgs>>): Prisma.Prisma__PromotionBenefitClient<runtime.Types.Result.GetResult<Prisma.$PromotionBenefitPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PromotionBenefitCountArgs>(args?: Prisma.Subset<T, PromotionBenefitCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PromotionBenefitCountAggregateOutputType> : number>;
    aggregate<T extends PromotionBenefitAggregateArgs>(args: Prisma.Subset<T, PromotionBenefitAggregateArgs>): Prisma.PrismaPromise<GetPromotionBenefitAggregateType<T>>;
    groupBy<T extends PromotionBenefitGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PromotionBenefitGroupByArgs['orderBy'];
    } : {
        orderBy?: PromotionBenefitGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PromotionBenefitGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPromotionBenefitGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PromotionBenefitFieldRefs;
}
export interface Prisma__PromotionBenefitClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    promotion<T extends Prisma.PromotionLandingDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PromotionLandingDefaultArgs<ExtArgs>>): Prisma.Prisma__PromotionLandingClient<runtime.Types.Result.GetResult<Prisma.$PromotionLandingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PromotionBenefitFieldRefs {
    readonly id: Prisma.FieldRef<"PromotionBenefit", 'String'>;
    readonly promotionId: Prisma.FieldRef<"PromotionBenefit", 'String'>;
    readonly icon: Prisma.FieldRef<"PromotionBenefit", 'String'>;
    readonly title: Prisma.FieldRef<"PromotionBenefit", 'String'>;
    readonly description: Prisma.FieldRef<"PromotionBenefit", 'String'>;
    readonly sortOrder: Prisma.FieldRef<"PromotionBenefit", 'Int'>;
}
export type PromotionBenefitFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionBenefitSelect<ExtArgs> | null;
    omit?: Prisma.PromotionBenefitOmit<ExtArgs> | null;
    include?: Prisma.PromotionBenefitInclude<ExtArgs> | null;
    where: Prisma.PromotionBenefitWhereUniqueInput;
};
export type PromotionBenefitFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionBenefitSelect<ExtArgs> | null;
    omit?: Prisma.PromotionBenefitOmit<ExtArgs> | null;
    include?: Prisma.PromotionBenefitInclude<ExtArgs> | null;
    where: Prisma.PromotionBenefitWhereUniqueInput;
};
export type PromotionBenefitFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionBenefitSelect<ExtArgs> | null;
    omit?: Prisma.PromotionBenefitOmit<ExtArgs> | null;
    include?: Prisma.PromotionBenefitInclude<ExtArgs> | null;
    where?: Prisma.PromotionBenefitWhereInput;
    orderBy?: Prisma.PromotionBenefitOrderByWithRelationInput | Prisma.PromotionBenefitOrderByWithRelationInput[];
    cursor?: Prisma.PromotionBenefitWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PromotionBenefitScalarFieldEnum | Prisma.PromotionBenefitScalarFieldEnum[];
};
export type PromotionBenefitFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionBenefitSelect<ExtArgs> | null;
    omit?: Prisma.PromotionBenefitOmit<ExtArgs> | null;
    include?: Prisma.PromotionBenefitInclude<ExtArgs> | null;
    where?: Prisma.PromotionBenefitWhereInput;
    orderBy?: Prisma.PromotionBenefitOrderByWithRelationInput | Prisma.PromotionBenefitOrderByWithRelationInput[];
    cursor?: Prisma.PromotionBenefitWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PromotionBenefitScalarFieldEnum | Prisma.PromotionBenefitScalarFieldEnum[];
};
export type PromotionBenefitFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionBenefitSelect<ExtArgs> | null;
    omit?: Prisma.PromotionBenefitOmit<ExtArgs> | null;
    include?: Prisma.PromotionBenefitInclude<ExtArgs> | null;
    where?: Prisma.PromotionBenefitWhereInput;
    orderBy?: Prisma.PromotionBenefitOrderByWithRelationInput | Prisma.PromotionBenefitOrderByWithRelationInput[];
    cursor?: Prisma.PromotionBenefitWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PromotionBenefitScalarFieldEnum | Prisma.PromotionBenefitScalarFieldEnum[];
};
export type PromotionBenefitCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionBenefitSelect<ExtArgs> | null;
    omit?: Prisma.PromotionBenefitOmit<ExtArgs> | null;
    include?: Prisma.PromotionBenefitInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PromotionBenefitCreateInput, Prisma.PromotionBenefitUncheckedCreateInput>;
};
export type PromotionBenefitCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PromotionBenefitCreateManyInput | Prisma.PromotionBenefitCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PromotionBenefitCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionBenefitSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PromotionBenefitOmit<ExtArgs> | null;
    data: Prisma.PromotionBenefitCreateManyInput | Prisma.PromotionBenefitCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PromotionBenefitIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PromotionBenefitUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionBenefitSelect<ExtArgs> | null;
    omit?: Prisma.PromotionBenefitOmit<ExtArgs> | null;
    include?: Prisma.PromotionBenefitInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PromotionBenefitUpdateInput, Prisma.PromotionBenefitUncheckedUpdateInput>;
    where: Prisma.PromotionBenefitWhereUniqueInput;
};
export type PromotionBenefitUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PromotionBenefitUpdateManyMutationInput, Prisma.PromotionBenefitUncheckedUpdateManyInput>;
    where?: Prisma.PromotionBenefitWhereInput;
    limit?: number;
};
export type PromotionBenefitUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionBenefitSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PromotionBenefitOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PromotionBenefitUpdateManyMutationInput, Prisma.PromotionBenefitUncheckedUpdateManyInput>;
    where?: Prisma.PromotionBenefitWhereInput;
    limit?: number;
    include?: Prisma.PromotionBenefitIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PromotionBenefitUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionBenefitSelect<ExtArgs> | null;
    omit?: Prisma.PromotionBenefitOmit<ExtArgs> | null;
    include?: Prisma.PromotionBenefitInclude<ExtArgs> | null;
    where: Prisma.PromotionBenefitWhereUniqueInput;
    create: Prisma.XOR<Prisma.PromotionBenefitCreateInput, Prisma.PromotionBenefitUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PromotionBenefitUpdateInput, Prisma.PromotionBenefitUncheckedUpdateInput>;
};
export type PromotionBenefitDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionBenefitSelect<ExtArgs> | null;
    omit?: Prisma.PromotionBenefitOmit<ExtArgs> | null;
    include?: Prisma.PromotionBenefitInclude<ExtArgs> | null;
    where: Prisma.PromotionBenefitWhereUniqueInput;
};
export type PromotionBenefitDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PromotionBenefitWhereInput;
    limit?: number;
};
export type PromotionBenefitDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionBenefitSelect<ExtArgs> | null;
    omit?: Prisma.PromotionBenefitOmit<ExtArgs> | null;
    include?: Prisma.PromotionBenefitInclude<ExtArgs> | null;
};
