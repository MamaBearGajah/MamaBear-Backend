import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PromotionSectionModel = runtime.Types.Result.DefaultSelection<Prisma.$PromotionSectionPayload>;
export type AggregatePromotionSection = {
    _count: PromotionSectionCountAggregateOutputType | null;
    _avg: PromotionSectionAvgAggregateOutputType | null;
    _sum: PromotionSectionSumAggregateOutputType | null;
    _min: PromotionSectionMinAggregateOutputType | null;
    _max: PromotionSectionMaxAggregateOutputType | null;
};
export type PromotionSectionAvgAggregateOutputType = {
    sortOrder: number | null;
};
export type PromotionSectionSumAggregateOutputType = {
    sortOrder: number | null;
};
export type PromotionSectionMinAggregateOutputType = {
    id: string | null;
    promotionId: string | null;
    title: string | null;
    subtitle: string | null;
    sortOrder: number | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PromotionSectionMaxAggregateOutputType = {
    id: string | null;
    promotionId: string | null;
    title: string | null;
    subtitle: string | null;
    sortOrder: number | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PromotionSectionCountAggregateOutputType = {
    id: number;
    promotionId: number;
    title: number;
    subtitle: number;
    sortOrder: number;
    isActive: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type PromotionSectionAvgAggregateInputType = {
    sortOrder?: true;
};
export type PromotionSectionSumAggregateInputType = {
    sortOrder?: true;
};
export type PromotionSectionMinAggregateInputType = {
    id?: true;
    promotionId?: true;
    title?: true;
    subtitle?: true;
    sortOrder?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PromotionSectionMaxAggregateInputType = {
    id?: true;
    promotionId?: true;
    title?: true;
    subtitle?: true;
    sortOrder?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PromotionSectionCountAggregateInputType = {
    id?: true;
    promotionId?: true;
    title?: true;
    subtitle?: true;
    sortOrder?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type PromotionSectionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PromotionSectionWhereInput;
    orderBy?: Prisma.PromotionSectionOrderByWithRelationInput | Prisma.PromotionSectionOrderByWithRelationInput[];
    cursor?: Prisma.PromotionSectionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PromotionSectionCountAggregateInputType;
    _avg?: PromotionSectionAvgAggregateInputType;
    _sum?: PromotionSectionSumAggregateInputType;
    _min?: PromotionSectionMinAggregateInputType;
    _max?: PromotionSectionMaxAggregateInputType;
};
export type GetPromotionSectionAggregateType<T extends PromotionSectionAggregateArgs> = {
    [P in keyof T & keyof AggregatePromotionSection]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePromotionSection[P]> : Prisma.GetScalarType<T[P], AggregatePromotionSection[P]>;
};
export type PromotionSectionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PromotionSectionWhereInput;
    orderBy?: Prisma.PromotionSectionOrderByWithAggregationInput | Prisma.PromotionSectionOrderByWithAggregationInput[];
    by: Prisma.PromotionSectionScalarFieldEnum[] | Prisma.PromotionSectionScalarFieldEnum;
    having?: Prisma.PromotionSectionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PromotionSectionCountAggregateInputType | true;
    _avg?: PromotionSectionAvgAggregateInputType;
    _sum?: PromotionSectionSumAggregateInputType;
    _min?: PromotionSectionMinAggregateInputType;
    _max?: PromotionSectionMaxAggregateInputType;
};
export type PromotionSectionGroupByOutputType = {
    id: string;
    promotionId: string;
    title: string;
    subtitle: string | null;
    sortOrder: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: PromotionSectionCountAggregateOutputType | null;
    _avg: PromotionSectionAvgAggregateOutputType | null;
    _sum: PromotionSectionSumAggregateOutputType | null;
    _min: PromotionSectionMinAggregateOutputType | null;
    _max: PromotionSectionMaxAggregateOutputType | null;
};
export type GetPromotionSectionGroupByPayload<T extends PromotionSectionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PromotionSectionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PromotionSectionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PromotionSectionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PromotionSectionGroupByOutputType[P]>;
}>>;
export type PromotionSectionWhereInput = {
    AND?: Prisma.PromotionSectionWhereInput | Prisma.PromotionSectionWhereInput[];
    OR?: Prisma.PromotionSectionWhereInput[];
    NOT?: Prisma.PromotionSectionWhereInput | Prisma.PromotionSectionWhereInput[];
    id?: Prisma.StringFilter<"PromotionSection"> | string;
    promotionId?: Prisma.StringFilter<"PromotionSection"> | string;
    title?: Prisma.StringFilter<"PromotionSection"> | string;
    subtitle?: Prisma.StringNullableFilter<"PromotionSection"> | string | null;
    sortOrder?: Prisma.IntFilter<"PromotionSection"> | number;
    isActive?: Prisma.BoolFilter<"PromotionSection"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"PromotionSection"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PromotionSection"> | Date | string;
    promotion?: Prisma.XOR<Prisma.PromotionLandingScalarRelationFilter, Prisma.PromotionLandingWhereInput>;
};
export type PromotionSectionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    promotionId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    subtitle?: Prisma.SortOrderInput | Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    promotion?: Prisma.PromotionLandingOrderByWithRelationInput;
};
export type PromotionSectionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.PromotionSectionWhereInput | Prisma.PromotionSectionWhereInput[];
    OR?: Prisma.PromotionSectionWhereInput[];
    NOT?: Prisma.PromotionSectionWhereInput | Prisma.PromotionSectionWhereInput[];
    promotionId?: Prisma.StringFilter<"PromotionSection"> | string;
    title?: Prisma.StringFilter<"PromotionSection"> | string;
    subtitle?: Prisma.StringNullableFilter<"PromotionSection"> | string | null;
    sortOrder?: Prisma.IntFilter<"PromotionSection"> | number;
    isActive?: Prisma.BoolFilter<"PromotionSection"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"PromotionSection"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PromotionSection"> | Date | string;
    promotion?: Prisma.XOR<Prisma.PromotionLandingScalarRelationFilter, Prisma.PromotionLandingWhereInput>;
}, "id">;
export type PromotionSectionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    promotionId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    subtitle?: Prisma.SortOrderInput | Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.PromotionSectionCountOrderByAggregateInput;
    _avg?: Prisma.PromotionSectionAvgOrderByAggregateInput;
    _max?: Prisma.PromotionSectionMaxOrderByAggregateInput;
    _min?: Prisma.PromotionSectionMinOrderByAggregateInput;
    _sum?: Prisma.PromotionSectionSumOrderByAggregateInput;
};
export type PromotionSectionScalarWhereWithAggregatesInput = {
    AND?: Prisma.PromotionSectionScalarWhereWithAggregatesInput | Prisma.PromotionSectionScalarWhereWithAggregatesInput[];
    OR?: Prisma.PromotionSectionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PromotionSectionScalarWhereWithAggregatesInput | Prisma.PromotionSectionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PromotionSection"> | string;
    promotionId?: Prisma.StringWithAggregatesFilter<"PromotionSection"> | string;
    title?: Prisma.StringWithAggregatesFilter<"PromotionSection"> | string;
    subtitle?: Prisma.StringNullableWithAggregatesFilter<"PromotionSection"> | string | null;
    sortOrder?: Prisma.IntWithAggregatesFilter<"PromotionSection"> | number;
    isActive?: Prisma.BoolWithAggregatesFilter<"PromotionSection"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PromotionSection"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"PromotionSection"> | Date | string;
};
export type PromotionSectionCreateInput = {
    id?: string;
    title: string;
    subtitle?: string | null;
    sortOrder?: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    promotion: Prisma.PromotionLandingCreateNestedOneWithoutSectionsInput;
};
export type PromotionSectionUncheckedCreateInput = {
    id?: string;
    promotionId: string;
    title: string;
    subtitle?: string | null;
    sortOrder?: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PromotionSectionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    subtitle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    promotion?: Prisma.PromotionLandingUpdateOneRequiredWithoutSectionsNestedInput;
};
export type PromotionSectionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    promotionId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    subtitle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PromotionSectionCreateManyInput = {
    id?: string;
    promotionId: string;
    title: string;
    subtitle?: string | null;
    sortOrder?: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PromotionSectionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    subtitle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PromotionSectionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    promotionId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    subtitle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PromotionSectionListRelationFilter = {
    every?: Prisma.PromotionSectionWhereInput;
    some?: Prisma.PromotionSectionWhereInput;
    none?: Prisma.PromotionSectionWhereInput;
};
export type PromotionSectionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PromotionSectionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    promotionId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    subtitle?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PromotionSectionAvgOrderByAggregateInput = {
    sortOrder?: Prisma.SortOrder;
};
export type PromotionSectionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    promotionId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    subtitle?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PromotionSectionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    promotionId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    subtitle?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PromotionSectionSumOrderByAggregateInput = {
    sortOrder?: Prisma.SortOrder;
};
export type PromotionSectionCreateNestedManyWithoutPromotionInput = {
    create?: Prisma.XOR<Prisma.PromotionSectionCreateWithoutPromotionInput, Prisma.PromotionSectionUncheckedCreateWithoutPromotionInput> | Prisma.PromotionSectionCreateWithoutPromotionInput[] | Prisma.PromotionSectionUncheckedCreateWithoutPromotionInput[];
    connectOrCreate?: Prisma.PromotionSectionCreateOrConnectWithoutPromotionInput | Prisma.PromotionSectionCreateOrConnectWithoutPromotionInput[];
    createMany?: Prisma.PromotionSectionCreateManyPromotionInputEnvelope;
    connect?: Prisma.PromotionSectionWhereUniqueInput | Prisma.PromotionSectionWhereUniqueInput[];
};
export type PromotionSectionUncheckedCreateNestedManyWithoutPromotionInput = {
    create?: Prisma.XOR<Prisma.PromotionSectionCreateWithoutPromotionInput, Prisma.PromotionSectionUncheckedCreateWithoutPromotionInput> | Prisma.PromotionSectionCreateWithoutPromotionInput[] | Prisma.PromotionSectionUncheckedCreateWithoutPromotionInput[];
    connectOrCreate?: Prisma.PromotionSectionCreateOrConnectWithoutPromotionInput | Prisma.PromotionSectionCreateOrConnectWithoutPromotionInput[];
    createMany?: Prisma.PromotionSectionCreateManyPromotionInputEnvelope;
    connect?: Prisma.PromotionSectionWhereUniqueInput | Prisma.PromotionSectionWhereUniqueInput[];
};
export type PromotionSectionUpdateManyWithoutPromotionNestedInput = {
    create?: Prisma.XOR<Prisma.PromotionSectionCreateWithoutPromotionInput, Prisma.PromotionSectionUncheckedCreateWithoutPromotionInput> | Prisma.PromotionSectionCreateWithoutPromotionInput[] | Prisma.PromotionSectionUncheckedCreateWithoutPromotionInput[];
    connectOrCreate?: Prisma.PromotionSectionCreateOrConnectWithoutPromotionInput | Prisma.PromotionSectionCreateOrConnectWithoutPromotionInput[];
    upsert?: Prisma.PromotionSectionUpsertWithWhereUniqueWithoutPromotionInput | Prisma.PromotionSectionUpsertWithWhereUniqueWithoutPromotionInput[];
    createMany?: Prisma.PromotionSectionCreateManyPromotionInputEnvelope;
    set?: Prisma.PromotionSectionWhereUniqueInput | Prisma.PromotionSectionWhereUniqueInput[];
    disconnect?: Prisma.PromotionSectionWhereUniqueInput | Prisma.PromotionSectionWhereUniqueInput[];
    delete?: Prisma.PromotionSectionWhereUniqueInput | Prisma.PromotionSectionWhereUniqueInput[];
    connect?: Prisma.PromotionSectionWhereUniqueInput | Prisma.PromotionSectionWhereUniqueInput[];
    update?: Prisma.PromotionSectionUpdateWithWhereUniqueWithoutPromotionInput | Prisma.PromotionSectionUpdateWithWhereUniqueWithoutPromotionInput[];
    updateMany?: Prisma.PromotionSectionUpdateManyWithWhereWithoutPromotionInput | Prisma.PromotionSectionUpdateManyWithWhereWithoutPromotionInput[];
    deleteMany?: Prisma.PromotionSectionScalarWhereInput | Prisma.PromotionSectionScalarWhereInput[];
};
export type PromotionSectionUncheckedUpdateManyWithoutPromotionNestedInput = {
    create?: Prisma.XOR<Prisma.PromotionSectionCreateWithoutPromotionInput, Prisma.PromotionSectionUncheckedCreateWithoutPromotionInput> | Prisma.PromotionSectionCreateWithoutPromotionInput[] | Prisma.PromotionSectionUncheckedCreateWithoutPromotionInput[];
    connectOrCreate?: Prisma.PromotionSectionCreateOrConnectWithoutPromotionInput | Prisma.PromotionSectionCreateOrConnectWithoutPromotionInput[];
    upsert?: Prisma.PromotionSectionUpsertWithWhereUniqueWithoutPromotionInput | Prisma.PromotionSectionUpsertWithWhereUniqueWithoutPromotionInput[];
    createMany?: Prisma.PromotionSectionCreateManyPromotionInputEnvelope;
    set?: Prisma.PromotionSectionWhereUniqueInput | Prisma.PromotionSectionWhereUniqueInput[];
    disconnect?: Prisma.PromotionSectionWhereUniqueInput | Prisma.PromotionSectionWhereUniqueInput[];
    delete?: Prisma.PromotionSectionWhereUniqueInput | Prisma.PromotionSectionWhereUniqueInput[];
    connect?: Prisma.PromotionSectionWhereUniqueInput | Prisma.PromotionSectionWhereUniqueInput[];
    update?: Prisma.PromotionSectionUpdateWithWhereUniqueWithoutPromotionInput | Prisma.PromotionSectionUpdateWithWhereUniqueWithoutPromotionInput[];
    updateMany?: Prisma.PromotionSectionUpdateManyWithWhereWithoutPromotionInput | Prisma.PromotionSectionUpdateManyWithWhereWithoutPromotionInput[];
    deleteMany?: Prisma.PromotionSectionScalarWhereInput | Prisma.PromotionSectionScalarWhereInput[];
};
export type PromotionSectionCreateWithoutPromotionInput = {
    id?: string;
    title: string;
    subtitle?: string | null;
    sortOrder?: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PromotionSectionUncheckedCreateWithoutPromotionInput = {
    id?: string;
    title: string;
    subtitle?: string | null;
    sortOrder?: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PromotionSectionCreateOrConnectWithoutPromotionInput = {
    where: Prisma.PromotionSectionWhereUniqueInput;
    create: Prisma.XOR<Prisma.PromotionSectionCreateWithoutPromotionInput, Prisma.PromotionSectionUncheckedCreateWithoutPromotionInput>;
};
export type PromotionSectionCreateManyPromotionInputEnvelope = {
    data: Prisma.PromotionSectionCreateManyPromotionInput | Prisma.PromotionSectionCreateManyPromotionInput[];
    skipDuplicates?: boolean;
};
export type PromotionSectionUpsertWithWhereUniqueWithoutPromotionInput = {
    where: Prisma.PromotionSectionWhereUniqueInput;
    update: Prisma.XOR<Prisma.PromotionSectionUpdateWithoutPromotionInput, Prisma.PromotionSectionUncheckedUpdateWithoutPromotionInput>;
    create: Prisma.XOR<Prisma.PromotionSectionCreateWithoutPromotionInput, Prisma.PromotionSectionUncheckedCreateWithoutPromotionInput>;
};
export type PromotionSectionUpdateWithWhereUniqueWithoutPromotionInput = {
    where: Prisma.PromotionSectionWhereUniqueInput;
    data: Prisma.XOR<Prisma.PromotionSectionUpdateWithoutPromotionInput, Prisma.PromotionSectionUncheckedUpdateWithoutPromotionInput>;
};
export type PromotionSectionUpdateManyWithWhereWithoutPromotionInput = {
    where: Prisma.PromotionSectionScalarWhereInput;
    data: Prisma.XOR<Prisma.PromotionSectionUpdateManyMutationInput, Prisma.PromotionSectionUncheckedUpdateManyWithoutPromotionInput>;
};
export type PromotionSectionScalarWhereInput = {
    AND?: Prisma.PromotionSectionScalarWhereInput | Prisma.PromotionSectionScalarWhereInput[];
    OR?: Prisma.PromotionSectionScalarWhereInput[];
    NOT?: Prisma.PromotionSectionScalarWhereInput | Prisma.PromotionSectionScalarWhereInput[];
    id?: Prisma.StringFilter<"PromotionSection"> | string;
    promotionId?: Prisma.StringFilter<"PromotionSection"> | string;
    title?: Prisma.StringFilter<"PromotionSection"> | string;
    subtitle?: Prisma.StringNullableFilter<"PromotionSection"> | string | null;
    sortOrder?: Prisma.IntFilter<"PromotionSection"> | number;
    isActive?: Prisma.BoolFilter<"PromotionSection"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"PromotionSection"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PromotionSection"> | Date | string;
};
export type PromotionSectionCreateManyPromotionInput = {
    id?: string;
    title: string;
    subtitle?: string | null;
    sortOrder?: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PromotionSectionUpdateWithoutPromotionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    subtitle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PromotionSectionUncheckedUpdateWithoutPromotionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    subtitle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PromotionSectionUncheckedUpdateManyWithoutPromotionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    subtitle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PromotionSectionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    promotionId?: boolean;
    title?: boolean;
    subtitle?: boolean;
    sortOrder?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    promotion?: boolean | Prisma.PromotionLandingDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["promotionSection"]>;
export type PromotionSectionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    promotionId?: boolean;
    title?: boolean;
    subtitle?: boolean;
    sortOrder?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    promotion?: boolean | Prisma.PromotionLandingDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["promotionSection"]>;
export type PromotionSectionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    promotionId?: boolean;
    title?: boolean;
    subtitle?: boolean;
    sortOrder?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    promotion?: boolean | Prisma.PromotionLandingDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["promotionSection"]>;
export type PromotionSectionSelectScalar = {
    id?: boolean;
    promotionId?: boolean;
    title?: boolean;
    subtitle?: boolean;
    sortOrder?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type PromotionSectionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "promotionId" | "title" | "subtitle" | "sortOrder" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["promotionSection"]>;
export type PromotionSectionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    promotion?: boolean | Prisma.PromotionLandingDefaultArgs<ExtArgs>;
};
export type PromotionSectionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    promotion?: boolean | Prisma.PromotionLandingDefaultArgs<ExtArgs>;
};
export type PromotionSectionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    promotion?: boolean | Prisma.PromotionLandingDefaultArgs<ExtArgs>;
};
export type $PromotionSectionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PromotionSection";
    objects: {
        promotion: Prisma.$PromotionLandingPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        promotionId: string;
        title: string;
        subtitle: string | null;
        sortOrder: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["promotionSection"]>;
    composites: {};
};
export type PromotionSectionGetPayload<S extends boolean | null | undefined | PromotionSectionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PromotionSectionPayload, S>;
export type PromotionSectionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PromotionSectionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PromotionSectionCountAggregateInputType | true;
};
export interface PromotionSectionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PromotionSection'];
        meta: {
            name: 'PromotionSection';
        };
    };
    findUnique<T extends PromotionSectionFindUniqueArgs>(args: Prisma.SelectSubset<T, PromotionSectionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PromotionSectionClient<runtime.Types.Result.GetResult<Prisma.$PromotionSectionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PromotionSectionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PromotionSectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PromotionSectionClient<runtime.Types.Result.GetResult<Prisma.$PromotionSectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PromotionSectionFindFirstArgs>(args?: Prisma.SelectSubset<T, PromotionSectionFindFirstArgs<ExtArgs>>): Prisma.Prisma__PromotionSectionClient<runtime.Types.Result.GetResult<Prisma.$PromotionSectionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PromotionSectionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PromotionSectionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PromotionSectionClient<runtime.Types.Result.GetResult<Prisma.$PromotionSectionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PromotionSectionFindManyArgs>(args?: Prisma.SelectSubset<T, PromotionSectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PromotionSectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PromotionSectionCreateArgs>(args: Prisma.SelectSubset<T, PromotionSectionCreateArgs<ExtArgs>>): Prisma.Prisma__PromotionSectionClient<runtime.Types.Result.GetResult<Prisma.$PromotionSectionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PromotionSectionCreateManyArgs>(args?: Prisma.SelectSubset<T, PromotionSectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PromotionSectionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PromotionSectionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PromotionSectionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PromotionSectionDeleteArgs>(args: Prisma.SelectSubset<T, PromotionSectionDeleteArgs<ExtArgs>>): Prisma.Prisma__PromotionSectionClient<runtime.Types.Result.GetResult<Prisma.$PromotionSectionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PromotionSectionUpdateArgs>(args: Prisma.SelectSubset<T, PromotionSectionUpdateArgs<ExtArgs>>): Prisma.Prisma__PromotionSectionClient<runtime.Types.Result.GetResult<Prisma.$PromotionSectionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PromotionSectionDeleteManyArgs>(args?: Prisma.SelectSubset<T, PromotionSectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PromotionSectionUpdateManyArgs>(args: Prisma.SelectSubset<T, PromotionSectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PromotionSectionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PromotionSectionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PromotionSectionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PromotionSectionUpsertArgs>(args: Prisma.SelectSubset<T, PromotionSectionUpsertArgs<ExtArgs>>): Prisma.Prisma__PromotionSectionClient<runtime.Types.Result.GetResult<Prisma.$PromotionSectionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PromotionSectionCountArgs>(args?: Prisma.Subset<T, PromotionSectionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PromotionSectionCountAggregateOutputType> : number>;
    aggregate<T extends PromotionSectionAggregateArgs>(args: Prisma.Subset<T, PromotionSectionAggregateArgs>): Prisma.PrismaPromise<GetPromotionSectionAggregateType<T>>;
    groupBy<T extends PromotionSectionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PromotionSectionGroupByArgs['orderBy'];
    } : {
        orderBy?: PromotionSectionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PromotionSectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPromotionSectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PromotionSectionFieldRefs;
}
export interface Prisma__PromotionSectionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    promotion<T extends Prisma.PromotionLandingDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PromotionLandingDefaultArgs<ExtArgs>>): Prisma.Prisma__PromotionLandingClient<runtime.Types.Result.GetResult<Prisma.$PromotionLandingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PromotionSectionFieldRefs {
    readonly id: Prisma.FieldRef<"PromotionSection", 'String'>;
    readonly promotionId: Prisma.FieldRef<"PromotionSection", 'String'>;
    readonly title: Prisma.FieldRef<"PromotionSection", 'String'>;
    readonly subtitle: Prisma.FieldRef<"PromotionSection", 'String'>;
    readonly sortOrder: Prisma.FieldRef<"PromotionSection", 'Int'>;
    readonly isActive: Prisma.FieldRef<"PromotionSection", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"PromotionSection", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"PromotionSection", 'DateTime'>;
}
export type PromotionSectionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionSectionSelect<ExtArgs> | null;
    omit?: Prisma.PromotionSectionOmit<ExtArgs> | null;
    include?: Prisma.PromotionSectionInclude<ExtArgs> | null;
    where: Prisma.PromotionSectionWhereUniqueInput;
};
export type PromotionSectionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionSectionSelect<ExtArgs> | null;
    omit?: Prisma.PromotionSectionOmit<ExtArgs> | null;
    include?: Prisma.PromotionSectionInclude<ExtArgs> | null;
    where: Prisma.PromotionSectionWhereUniqueInput;
};
export type PromotionSectionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionSectionSelect<ExtArgs> | null;
    omit?: Prisma.PromotionSectionOmit<ExtArgs> | null;
    include?: Prisma.PromotionSectionInclude<ExtArgs> | null;
    where?: Prisma.PromotionSectionWhereInput;
    orderBy?: Prisma.PromotionSectionOrderByWithRelationInput | Prisma.PromotionSectionOrderByWithRelationInput[];
    cursor?: Prisma.PromotionSectionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PromotionSectionScalarFieldEnum | Prisma.PromotionSectionScalarFieldEnum[];
};
export type PromotionSectionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionSectionSelect<ExtArgs> | null;
    omit?: Prisma.PromotionSectionOmit<ExtArgs> | null;
    include?: Prisma.PromotionSectionInclude<ExtArgs> | null;
    where?: Prisma.PromotionSectionWhereInput;
    orderBy?: Prisma.PromotionSectionOrderByWithRelationInput | Prisma.PromotionSectionOrderByWithRelationInput[];
    cursor?: Prisma.PromotionSectionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PromotionSectionScalarFieldEnum | Prisma.PromotionSectionScalarFieldEnum[];
};
export type PromotionSectionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionSectionSelect<ExtArgs> | null;
    omit?: Prisma.PromotionSectionOmit<ExtArgs> | null;
    include?: Prisma.PromotionSectionInclude<ExtArgs> | null;
    where?: Prisma.PromotionSectionWhereInput;
    orderBy?: Prisma.PromotionSectionOrderByWithRelationInput | Prisma.PromotionSectionOrderByWithRelationInput[];
    cursor?: Prisma.PromotionSectionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PromotionSectionScalarFieldEnum | Prisma.PromotionSectionScalarFieldEnum[];
};
export type PromotionSectionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionSectionSelect<ExtArgs> | null;
    omit?: Prisma.PromotionSectionOmit<ExtArgs> | null;
    include?: Prisma.PromotionSectionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PromotionSectionCreateInput, Prisma.PromotionSectionUncheckedCreateInput>;
};
export type PromotionSectionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PromotionSectionCreateManyInput | Prisma.PromotionSectionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PromotionSectionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionSectionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PromotionSectionOmit<ExtArgs> | null;
    data: Prisma.PromotionSectionCreateManyInput | Prisma.PromotionSectionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PromotionSectionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PromotionSectionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionSectionSelect<ExtArgs> | null;
    omit?: Prisma.PromotionSectionOmit<ExtArgs> | null;
    include?: Prisma.PromotionSectionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PromotionSectionUpdateInput, Prisma.PromotionSectionUncheckedUpdateInput>;
    where: Prisma.PromotionSectionWhereUniqueInput;
};
export type PromotionSectionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PromotionSectionUpdateManyMutationInput, Prisma.PromotionSectionUncheckedUpdateManyInput>;
    where?: Prisma.PromotionSectionWhereInput;
    limit?: number;
};
export type PromotionSectionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionSectionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PromotionSectionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PromotionSectionUpdateManyMutationInput, Prisma.PromotionSectionUncheckedUpdateManyInput>;
    where?: Prisma.PromotionSectionWhereInput;
    limit?: number;
    include?: Prisma.PromotionSectionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PromotionSectionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionSectionSelect<ExtArgs> | null;
    omit?: Prisma.PromotionSectionOmit<ExtArgs> | null;
    include?: Prisma.PromotionSectionInclude<ExtArgs> | null;
    where: Prisma.PromotionSectionWhereUniqueInput;
    create: Prisma.XOR<Prisma.PromotionSectionCreateInput, Prisma.PromotionSectionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PromotionSectionUpdateInput, Prisma.PromotionSectionUncheckedUpdateInput>;
};
export type PromotionSectionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionSectionSelect<ExtArgs> | null;
    omit?: Prisma.PromotionSectionOmit<ExtArgs> | null;
    include?: Prisma.PromotionSectionInclude<ExtArgs> | null;
    where: Prisma.PromotionSectionWhereUniqueInput;
};
export type PromotionSectionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PromotionSectionWhereInput;
    limit?: number;
};
export type PromotionSectionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionSectionSelect<ExtArgs> | null;
    omit?: Prisma.PromotionSectionOmit<ExtArgs> | null;
    include?: Prisma.PromotionSectionInclude<ExtArgs> | null;
};
