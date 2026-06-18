import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type BundleItemModel = runtime.Types.Result.DefaultSelection<Prisma.$BundleItemPayload>;
export type AggregateBundleItem = {
    _count: BundleItemCountAggregateOutputType | null;
    _avg: BundleItemAvgAggregateOutputType | null;
    _sum: BundleItemSumAggregateOutputType | null;
    _min: BundleItemMinAggregateOutputType | null;
    _max: BundleItemMaxAggregateOutputType | null;
};
export type BundleItemAvgAggregateOutputType = {
    quantity: number | null;
};
export type BundleItemSumAggregateOutputType = {
    quantity: number | null;
};
export type BundleItemMinAggregateOutputType = {
    id: string | null;
    bundleId: string | null;
    productId: string | null;
    quantity: number | null;
};
export type BundleItemMaxAggregateOutputType = {
    id: string | null;
    bundleId: string | null;
    productId: string | null;
    quantity: number | null;
};
export type BundleItemCountAggregateOutputType = {
    id: number;
    bundleId: number;
    productId: number;
    quantity: number;
    _all: number;
};
export type BundleItemAvgAggregateInputType = {
    quantity?: true;
};
export type BundleItemSumAggregateInputType = {
    quantity?: true;
};
export type BundleItemMinAggregateInputType = {
    id?: true;
    bundleId?: true;
    productId?: true;
    quantity?: true;
};
export type BundleItemMaxAggregateInputType = {
    id?: true;
    bundleId?: true;
    productId?: true;
    quantity?: true;
};
export type BundleItemCountAggregateInputType = {
    id?: true;
    bundleId?: true;
    productId?: true;
    quantity?: true;
    _all?: true;
};
export type BundleItemAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BundleItemWhereInput;
    orderBy?: Prisma.BundleItemOrderByWithRelationInput | Prisma.BundleItemOrderByWithRelationInput[];
    cursor?: Prisma.BundleItemWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | BundleItemCountAggregateInputType;
    _avg?: BundleItemAvgAggregateInputType;
    _sum?: BundleItemSumAggregateInputType;
    _min?: BundleItemMinAggregateInputType;
    _max?: BundleItemMaxAggregateInputType;
};
export type GetBundleItemAggregateType<T extends BundleItemAggregateArgs> = {
    [P in keyof T & keyof AggregateBundleItem]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBundleItem[P]> : Prisma.GetScalarType<T[P], AggregateBundleItem[P]>;
};
export type BundleItemGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BundleItemWhereInput;
    orderBy?: Prisma.BundleItemOrderByWithAggregationInput | Prisma.BundleItemOrderByWithAggregationInput[];
    by: Prisma.BundleItemScalarFieldEnum[] | Prisma.BundleItemScalarFieldEnum;
    having?: Prisma.BundleItemScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BundleItemCountAggregateInputType | true;
    _avg?: BundleItemAvgAggregateInputType;
    _sum?: BundleItemSumAggregateInputType;
    _min?: BundleItemMinAggregateInputType;
    _max?: BundleItemMaxAggregateInputType;
};
export type BundleItemGroupByOutputType = {
    id: string;
    bundleId: string;
    productId: string;
    quantity: number;
    _count: BundleItemCountAggregateOutputType | null;
    _avg: BundleItemAvgAggregateOutputType | null;
    _sum: BundleItemSumAggregateOutputType | null;
    _min: BundleItemMinAggregateOutputType | null;
    _max: BundleItemMaxAggregateOutputType | null;
};
export type GetBundleItemGroupByPayload<T extends BundleItemGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BundleItemGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BundleItemGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BundleItemGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BundleItemGroupByOutputType[P]>;
}>>;
export type BundleItemWhereInput = {
    AND?: Prisma.BundleItemWhereInput | Prisma.BundleItemWhereInput[];
    OR?: Prisma.BundleItemWhereInput[];
    NOT?: Prisma.BundleItemWhereInput | Prisma.BundleItemWhereInput[];
    id?: Prisma.StringFilter<"BundleItem"> | string;
    bundleId?: Prisma.StringFilter<"BundleItem"> | string;
    productId?: Prisma.StringFilter<"BundleItem"> | string;
    quantity?: Prisma.IntFilter<"BundleItem"> | number;
    bundle?: Prisma.XOR<Prisma.BundleScalarRelationFilter, Prisma.BundleWhereInput>;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
};
export type BundleItemOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    bundleId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    bundle?: Prisma.BundleOrderByWithRelationInput;
    product?: Prisma.ProductOrderByWithRelationInput;
};
export type BundleItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    bundleId_productId?: Prisma.BundleItemBundleIdProductIdCompoundUniqueInput;
    AND?: Prisma.BundleItemWhereInput | Prisma.BundleItemWhereInput[];
    OR?: Prisma.BundleItemWhereInput[];
    NOT?: Prisma.BundleItemWhereInput | Prisma.BundleItemWhereInput[];
    bundleId?: Prisma.StringFilter<"BundleItem"> | string;
    productId?: Prisma.StringFilter<"BundleItem"> | string;
    quantity?: Prisma.IntFilter<"BundleItem"> | number;
    bundle?: Prisma.XOR<Prisma.BundleScalarRelationFilter, Prisma.BundleWhereInput>;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
}, "id" | "bundleId_productId">;
export type BundleItemOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    bundleId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    _count?: Prisma.BundleItemCountOrderByAggregateInput;
    _avg?: Prisma.BundleItemAvgOrderByAggregateInput;
    _max?: Prisma.BundleItemMaxOrderByAggregateInput;
    _min?: Prisma.BundleItemMinOrderByAggregateInput;
    _sum?: Prisma.BundleItemSumOrderByAggregateInput;
};
export type BundleItemScalarWhereWithAggregatesInput = {
    AND?: Prisma.BundleItemScalarWhereWithAggregatesInput | Prisma.BundleItemScalarWhereWithAggregatesInput[];
    OR?: Prisma.BundleItemScalarWhereWithAggregatesInput[];
    NOT?: Prisma.BundleItemScalarWhereWithAggregatesInput | Prisma.BundleItemScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"BundleItem"> | string;
    bundleId?: Prisma.StringWithAggregatesFilter<"BundleItem"> | string;
    productId?: Prisma.StringWithAggregatesFilter<"BundleItem"> | string;
    quantity?: Prisma.IntWithAggregatesFilter<"BundleItem"> | number;
};
export type BundleItemCreateInput = {
    id?: string;
    quantity?: number;
    bundle: Prisma.BundleCreateNestedOneWithoutItemsInput;
    product: Prisma.ProductCreateNestedOneWithoutBundleItemsInput;
};
export type BundleItemUncheckedCreateInput = {
    id?: string;
    bundleId: string;
    productId: string;
    quantity?: number;
};
export type BundleItemUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    bundle?: Prisma.BundleUpdateOneRequiredWithoutItemsNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutBundleItemsNestedInput;
};
export type BundleItemUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bundleId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type BundleItemCreateManyInput = {
    id?: string;
    bundleId: string;
    productId: string;
    quantity?: number;
};
export type BundleItemUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type BundleItemUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bundleId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type BundleItemListRelationFilter = {
    every?: Prisma.BundleItemWhereInput;
    some?: Prisma.BundleItemWhereInput;
    none?: Prisma.BundleItemWhereInput;
};
export type BundleItemOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type BundleItemBundleIdProductIdCompoundUniqueInput = {
    bundleId: string;
    productId: string;
};
export type BundleItemCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    bundleId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
};
export type BundleItemAvgOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
};
export type BundleItemMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    bundleId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
};
export type BundleItemMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    bundleId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
};
export type BundleItemSumOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
};
export type BundleItemCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.BundleItemCreateWithoutProductInput, Prisma.BundleItemUncheckedCreateWithoutProductInput> | Prisma.BundleItemCreateWithoutProductInput[] | Prisma.BundleItemUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.BundleItemCreateOrConnectWithoutProductInput | Prisma.BundleItemCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.BundleItemCreateManyProductInputEnvelope;
    connect?: Prisma.BundleItemWhereUniqueInput | Prisma.BundleItemWhereUniqueInput[];
};
export type BundleItemUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.BundleItemCreateWithoutProductInput, Prisma.BundleItemUncheckedCreateWithoutProductInput> | Prisma.BundleItemCreateWithoutProductInput[] | Prisma.BundleItemUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.BundleItemCreateOrConnectWithoutProductInput | Prisma.BundleItemCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.BundleItemCreateManyProductInputEnvelope;
    connect?: Prisma.BundleItemWhereUniqueInput | Prisma.BundleItemWhereUniqueInput[];
};
export type BundleItemUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.BundleItemCreateWithoutProductInput, Prisma.BundleItemUncheckedCreateWithoutProductInput> | Prisma.BundleItemCreateWithoutProductInput[] | Prisma.BundleItemUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.BundleItemCreateOrConnectWithoutProductInput | Prisma.BundleItemCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.BundleItemUpsertWithWhereUniqueWithoutProductInput | Prisma.BundleItemUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.BundleItemCreateManyProductInputEnvelope;
    set?: Prisma.BundleItemWhereUniqueInput | Prisma.BundleItemWhereUniqueInput[];
    disconnect?: Prisma.BundleItemWhereUniqueInput | Prisma.BundleItemWhereUniqueInput[];
    delete?: Prisma.BundleItemWhereUniqueInput | Prisma.BundleItemWhereUniqueInput[];
    connect?: Prisma.BundleItemWhereUniqueInput | Prisma.BundleItemWhereUniqueInput[];
    update?: Prisma.BundleItemUpdateWithWhereUniqueWithoutProductInput | Prisma.BundleItemUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.BundleItemUpdateManyWithWhereWithoutProductInput | Prisma.BundleItemUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.BundleItemScalarWhereInput | Prisma.BundleItemScalarWhereInput[];
};
export type BundleItemUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.BundleItemCreateWithoutProductInput, Prisma.BundleItemUncheckedCreateWithoutProductInput> | Prisma.BundleItemCreateWithoutProductInput[] | Prisma.BundleItemUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.BundleItemCreateOrConnectWithoutProductInput | Prisma.BundleItemCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.BundleItemUpsertWithWhereUniqueWithoutProductInput | Prisma.BundleItemUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.BundleItemCreateManyProductInputEnvelope;
    set?: Prisma.BundleItemWhereUniqueInput | Prisma.BundleItemWhereUniqueInput[];
    disconnect?: Prisma.BundleItemWhereUniqueInput | Prisma.BundleItemWhereUniqueInput[];
    delete?: Prisma.BundleItemWhereUniqueInput | Prisma.BundleItemWhereUniqueInput[];
    connect?: Prisma.BundleItemWhereUniqueInput | Prisma.BundleItemWhereUniqueInput[];
    update?: Prisma.BundleItemUpdateWithWhereUniqueWithoutProductInput | Prisma.BundleItemUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.BundleItemUpdateManyWithWhereWithoutProductInput | Prisma.BundleItemUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.BundleItemScalarWhereInput | Prisma.BundleItemScalarWhereInput[];
};
export type BundleItemCreateNestedManyWithoutBundleInput = {
    create?: Prisma.XOR<Prisma.BundleItemCreateWithoutBundleInput, Prisma.BundleItemUncheckedCreateWithoutBundleInput> | Prisma.BundleItemCreateWithoutBundleInput[] | Prisma.BundleItemUncheckedCreateWithoutBundleInput[];
    connectOrCreate?: Prisma.BundleItemCreateOrConnectWithoutBundleInput | Prisma.BundleItemCreateOrConnectWithoutBundleInput[];
    createMany?: Prisma.BundleItemCreateManyBundleInputEnvelope;
    connect?: Prisma.BundleItemWhereUniqueInput | Prisma.BundleItemWhereUniqueInput[];
};
export type BundleItemUncheckedCreateNestedManyWithoutBundleInput = {
    create?: Prisma.XOR<Prisma.BundleItemCreateWithoutBundleInput, Prisma.BundleItemUncheckedCreateWithoutBundleInput> | Prisma.BundleItemCreateWithoutBundleInput[] | Prisma.BundleItemUncheckedCreateWithoutBundleInput[];
    connectOrCreate?: Prisma.BundleItemCreateOrConnectWithoutBundleInput | Prisma.BundleItemCreateOrConnectWithoutBundleInput[];
    createMany?: Prisma.BundleItemCreateManyBundleInputEnvelope;
    connect?: Prisma.BundleItemWhereUniqueInput | Prisma.BundleItemWhereUniqueInput[];
};
export type BundleItemUpdateManyWithoutBundleNestedInput = {
    create?: Prisma.XOR<Prisma.BundleItemCreateWithoutBundleInput, Prisma.BundleItemUncheckedCreateWithoutBundleInput> | Prisma.BundleItemCreateWithoutBundleInput[] | Prisma.BundleItemUncheckedCreateWithoutBundleInput[];
    connectOrCreate?: Prisma.BundleItemCreateOrConnectWithoutBundleInput | Prisma.BundleItemCreateOrConnectWithoutBundleInput[];
    upsert?: Prisma.BundleItemUpsertWithWhereUniqueWithoutBundleInput | Prisma.BundleItemUpsertWithWhereUniqueWithoutBundleInput[];
    createMany?: Prisma.BundleItemCreateManyBundleInputEnvelope;
    set?: Prisma.BundleItemWhereUniqueInput | Prisma.BundleItemWhereUniqueInput[];
    disconnect?: Prisma.BundleItemWhereUniqueInput | Prisma.BundleItemWhereUniqueInput[];
    delete?: Prisma.BundleItemWhereUniqueInput | Prisma.BundleItemWhereUniqueInput[];
    connect?: Prisma.BundleItemWhereUniqueInput | Prisma.BundleItemWhereUniqueInput[];
    update?: Prisma.BundleItemUpdateWithWhereUniqueWithoutBundleInput | Prisma.BundleItemUpdateWithWhereUniqueWithoutBundleInput[];
    updateMany?: Prisma.BundleItemUpdateManyWithWhereWithoutBundleInput | Prisma.BundleItemUpdateManyWithWhereWithoutBundleInput[];
    deleteMany?: Prisma.BundleItemScalarWhereInput | Prisma.BundleItemScalarWhereInput[];
};
export type BundleItemUncheckedUpdateManyWithoutBundleNestedInput = {
    create?: Prisma.XOR<Prisma.BundleItemCreateWithoutBundleInput, Prisma.BundleItemUncheckedCreateWithoutBundleInput> | Prisma.BundleItemCreateWithoutBundleInput[] | Prisma.BundleItemUncheckedCreateWithoutBundleInput[];
    connectOrCreate?: Prisma.BundleItemCreateOrConnectWithoutBundleInput | Prisma.BundleItemCreateOrConnectWithoutBundleInput[];
    upsert?: Prisma.BundleItemUpsertWithWhereUniqueWithoutBundleInput | Prisma.BundleItemUpsertWithWhereUniqueWithoutBundleInput[];
    createMany?: Prisma.BundleItemCreateManyBundleInputEnvelope;
    set?: Prisma.BundleItemWhereUniqueInput | Prisma.BundleItemWhereUniqueInput[];
    disconnect?: Prisma.BundleItemWhereUniqueInput | Prisma.BundleItemWhereUniqueInput[];
    delete?: Prisma.BundleItemWhereUniqueInput | Prisma.BundleItemWhereUniqueInput[];
    connect?: Prisma.BundleItemWhereUniqueInput | Prisma.BundleItemWhereUniqueInput[];
    update?: Prisma.BundleItemUpdateWithWhereUniqueWithoutBundleInput | Prisma.BundleItemUpdateWithWhereUniqueWithoutBundleInput[];
    updateMany?: Prisma.BundleItemUpdateManyWithWhereWithoutBundleInput | Prisma.BundleItemUpdateManyWithWhereWithoutBundleInput[];
    deleteMany?: Prisma.BundleItemScalarWhereInput | Prisma.BundleItemScalarWhereInput[];
};
export type BundleItemCreateWithoutProductInput = {
    id?: string;
    quantity?: number;
    bundle: Prisma.BundleCreateNestedOneWithoutItemsInput;
};
export type BundleItemUncheckedCreateWithoutProductInput = {
    id?: string;
    bundleId: string;
    quantity?: number;
};
export type BundleItemCreateOrConnectWithoutProductInput = {
    where: Prisma.BundleItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.BundleItemCreateWithoutProductInput, Prisma.BundleItemUncheckedCreateWithoutProductInput>;
};
export type BundleItemCreateManyProductInputEnvelope = {
    data: Prisma.BundleItemCreateManyProductInput | Prisma.BundleItemCreateManyProductInput[];
    skipDuplicates?: boolean;
};
export type BundleItemUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.BundleItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.BundleItemUpdateWithoutProductInput, Prisma.BundleItemUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.BundleItemCreateWithoutProductInput, Prisma.BundleItemUncheckedCreateWithoutProductInput>;
};
export type BundleItemUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.BundleItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.BundleItemUpdateWithoutProductInput, Prisma.BundleItemUncheckedUpdateWithoutProductInput>;
};
export type BundleItemUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.BundleItemScalarWhereInput;
    data: Prisma.XOR<Prisma.BundleItemUpdateManyMutationInput, Prisma.BundleItemUncheckedUpdateManyWithoutProductInput>;
};
export type BundleItemScalarWhereInput = {
    AND?: Prisma.BundleItemScalarWhereInput | Prisma.BundleItemScalarWhereInput[];
    OR?: Prisma.BundleItemScalarWhereInput[];
    NOT?: Prisma.BundleItemScalarWhereInput | Prisma.BundleItemScalarWhereInput[];
    id?: Prisma.StringFilter<"BundleItem"> | string;
    bundleId?: Prisma.StringFilter<"BundleItem"> | string;
    productId?: Prisma.StringFilter<"BundleItem"> | string;
    quantity?: Prisma.IntFilter<"BundleItem"> | number;
};
export type BundleItemCreateWithoutBundleInput = {
    id?: string;
    quantity?: number;
    product: Prisma.ProductCreateNestedOneWithoutBundleItemsInput;
};
export type BundleItemUncheckedCreateWithoutBundleInput = {
    id?: string;
    productId: string;
    quantity?: number;
};
export type BundleItemCreateOrConnectWithoutBundleInput = {
    where: Prisma.BundleItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.BundleItemCreateWithoutBundleInput, Prisma.BundleItemUncheckedCreateWithoutBundleInput>;
};
export type BundleItemCreateManyBundleInputEnvelope = {
    data: Prisma.BundleItemCreateManyBundleInput | Prisma.BundleItemCreateManyBundleInput[];
    skipDuplicates?: boolean;
};
export type BundleItemUpsertWithWhereUniqueWithoutBundleInput = {
    where: Prisma.BundleItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.BundleItemUpdateWithoutBundleInput, Prisma.BundleItemUncheckedUpdateWithoutBundleInput>;
    create: Prisma.XOR<Prisma.BundleItemCreateWithoutBundleInput, Prisma.BundleItemUncheckedCreateWithoutBundleInput>;
};
export type BundleItemUpdateWithWhereUniqueWithoutBundleInput = {
    where: Prisma.BundleItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.BundleItemUpdateWithoutBundleInput, Prisma.BundleItemUncheckedUpdateWithoutBundleInput>;
};
export type BundleItemUpdateManyWithWhereWithoutBundleInput = {
    where: Prisma.BundleItemScalarWhereInput;
    data: Prisma.XOR<Prisma.BundleItemUpdateManyMutationInput, Prisma.BundleItemUncheckedUpdateManyWithoutBundleInput>;
};
export type BundleItemCreateManyProductInput = {
    id?: string;
    bundleId: string;
    quantity?: number;
};
export type BundleItemUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    bundle?: Prisma.BundleUpdateOneRequiredWithoutItemsNestedInput;
};
export type BundleItemUncheckedUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bundleId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type BundleItemUncheckedUpdateManyWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bundleId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type BundleItemCreateManyBundleInput = {
    id?: string;
    productId: string;
    quantity?: number;
};
export type BundleItemUpdateWithoutBundleInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    product?: Prisma.ProductUpdateOneRequiredWithoutBundleItemsNestedInput;
};
export type BundleItemUncheckedUpdateWithoutBundleInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type BundleItemUncheckedUpdateManyWithoutBundleInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type BundleItemSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    bundleId?: boolean;
    productId?: boolean;
    quantity?: boolean;
    bundle?: boolean | Prisma.BundleDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["bundleItem"]>;
export type BundleItemSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    bundleId?: boolean;
    productId?: boolean;
    quantity?: boolean;
    bundle?: boolean | Prisma.BundleDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["bundleItem"]>;
export type BundleItemSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    bundleId?: boolean;
    productId?: boolean;
    quantity?: boolean;
    bundle?: boolean | Prisma.BundleDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["bundleItem"]>;
export type BundleItemSelectScalar = {
    id?: boolean;
    bundleId?: boolean;
    productId?: boolean;
    quantity?: boolean;
};
export type BundleItemOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "bundleId" | "productId" | "quantity", ExtArgs["result"]["bundleItem"]>;
export type BundleItemInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    bundle?: boolean | Prisma.BundleDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type BundleItemIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    bundle?: boolean | Prisma.BundleDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type BundleItemIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    bundle?: boolean | Prisma.BundleDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type $BundleItemPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "BundleItem";
    objects: {
        bundle: Prisma.$BundlePayload<ExtArgs>;
        product: Prisma.$ProductPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        bundleId: string;
        productId: string;
        quantity: number;
    }, ExtArgs["result"]["bundleItem"]>;
    composites: {};
};
export type BundleItemGetPayload<S extends boolean | null | undefined | BundleItemDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$BundleItemPayload, S>;
export type BundleItemCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<BundleItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BundleItemCountAggregateInputType | true;
};
export interface BundleItemDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['BundleItem'];
        meta: {
            name: 'BundleItem';
        };
    };
    findUnique<T extends BundleItemFindUniqueArgs>(args: Prisma.SelectSubset<T, BundleItemFindUniqueArgs<ExtArgs>>): Prisma.Prisma__BundleItemClient<runtime.Types.Result.GetResult<Prisma.$BundleItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends BundleItemFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, BundleItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__BundleItemClient<runtime.Types.Result.GetResult<Prisma.$BundleItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends BundleItemFindFirstArgs>(args?: Prisma.SelectSubset<T, BundleItemFindFirstArgs<ExtArgs>>): Prisma.Prisma__BundleItemClient<runtime.Types.Result.GetResult<Prisma.$BundleItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends BundleItemFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, BundleItemFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__BundleItemClient<runtime.Types.Result.GetResult<Prisma.$BundleItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends BundleItemFindManyArgs>(args?: Prisma.SelectSubset<T, BundleItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BundleItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends BundleItemCreateArgs>(args: Prisma.SelectSubset<T, BundleItemCreateArgs<ExtArgs>>): Prisma.Prisma__BundleItemClient<runtime.Types.Result.GetResult<Prisma.$BundleItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends BundleItemCreateManyArgs>(args?: Prisma.SelectSubset<T, BundleItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends BundleItemCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, BundleItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BundleItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends BundleItemDeleteArgs>(args: Prisma.SelectSubset<T, BundleItemDeleteArgs<ExtArgs>>): Prisma.Prisma__BundleItemClient<runtime.Types.Result.GetResult<Prisma.$BundleItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends BundleItemUpdateArgs>(args: Prisma.SelectSubset<T, BundleItemUpdateArgs<ExtArgs>>): Prisma.Prisma__BundleItemClient<runtime.Types.Result.GetResult<Prisma.$BundleItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends BundleItemDeleteManyArgs>(args?: Prisma.SelectSubset<T, BundleItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends BundleItemUpdateManyArgs>(args: Prisma.SelectSubset<T, BundleItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends BundleItemUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, BundleItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BundleItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends BundleItemUpsertArgs>(args: Prisma.SelectSubset<T, BundleItemUpsertArgs<ExtArgs>>): Prisma.Prisma__BundleItemClient<runtime.Types.Result.GetResult<Prisma.$BundleItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends BundleItemCountArgs>(args?: Prisma.Subset<T, BundleItemCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BundleItemCountAggregateOutputType> : number>;
    aggregate<T extends BundleItemAggregateArgs>(args: Prisma.Subset<T, BundleItemAggregateArgs>): Prisma.PrismaPromise<GetBundleItemAggregateType<T>>;
    groupBy<T extends BundleItemGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: BundleItemGroupByArgs['orderBy'];
    } : {
        orderBy?: BundleItemGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, BundleItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBundleItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: BundleItemFieldRefs;
}
export interface Prisma__BundleItemClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    bundle<T extends Prisma.BundleDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.BundleDefaultArgs<ExtArgs>>): Prisma.Prisma__BundleClient<runtime.Types.Result.GetResult<Prisma.$BundlePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface BundleItemFieldRefs {
    readonly id: Prisma.FieldRef<"BundleItem", 'String'>;
    readonly bundleId: Prisma.FieldRef<"BundleItem", 'String'>;
    readonly productId: Prisma.FieldRef<"BundleItem", 'String'>;
    readonly quantity: Prisma.FieldRef<"BundleItem", 'Int'>;
}
export type BundleItemFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BundleItemSelect<ExtArgs> | null;
    omit?: Prisma.BundleItemOmit<ExtArgs> | null;
    include?: Prisma.BundleItemInclude<ExtArgs> | null;
    where: Prisma.BundleItemWhereUniqueInput;
};
export type BundleItemFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BundleItemSelect<ExtArgs> | null;
    omit?: Prisma.BundleItemOmit<ExtArgs> | null;
    include?: Prisma.BundleItemInclude<ExtArgs> | null;
    where: Prisma.BundleItemWhereUniqueInput;
};
export type BundleItemFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BundleItemSelect<ExtArgs> | null;
    omit?: Prisma.BundleItemOmit<ExtArgs> | null;
    include?: Prisma.BundleItemInclude<ExtArgs> | null;
    where?: Prisma.BundleItemWhereInput;
    orderBy?: Prisma.BundleItemOrderByWithRelationInput | Prisma.BundleItemOrderByWithRelationInput[];
    cursor?: Prisma.BundleItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BundleItemScalarFieldEnum | Prisma.BundleItemScalarFieldEnum[];
};
export type BundleItemFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BundleItemSelect<ExtArgs> | null;
    omit?: Prisma.BundleItemOmit<ExtArgs> | null;
    include?: Prisma.BundleItemInclude<ExtArgs> | null;
    where?: Prisma.BundleItemWhereInput;
    orderBy?: Prisma.BundleItemOrderByWithRelationInput | Prisma.BundleItemOrderByWithRelationInput[];
    cursor?: Prisma.BundleItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BundleItemScalarFieldEnum | Prisma.BundleItemScalarFieldEnum[];
};
export type BundleItemFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BundleItemSelect<ExtArgs> | null;
    omit?: Prisma.BundleItemOmit<ExtArgs> | null;
    include?: Prisma.BundleItemInclude<ExtArgs> | null;
    where?: Prisma.BundleItemWhereInput;
    orderBy?: Prisma.BundleItemOrderByWithRelationInput | Prisma.BundleItemOrderByWithRelationInput[];
    cursor?: Prisma.BundleItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BundleItemScalarFieldEnum | Prisma.BundleItemScalarFieldEnum[];
};
export type BundleItemCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BundleItemSelect<ExtArgs> | null;
    omit?: Prisma.BundleItemOmit<ExtArgs> | null;
    include?: Prisma.BundleItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BundleItemCreateInput, Prisma.BundleItemUncheckedCreateInput>;
};
export type BundleItemCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.BundleItemCreateManyInput | Prisma.BundleItemCreateManyInput[];
    skipDuplicates?: boolean;
};
export type BundleItemCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BundleItemSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BundleItemOmit<ExtArgs> | null;
    data: Prisma.BundleItemCreateManyInput | Prisma.BundleItemCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.BundleItemIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type BundleItemUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BundleItemSelect<ExtArgs> | null;
    omit?: Prisma.BundleItemOmit<ExtArgs> | null;
    include?: Prisma.BundleItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BundleItemUpdateInput, Prisma.BundleItemUncheckedUpdateInput>;
    where: Prisma.BundleItemWhereUniqueInput;
};
export type BundleItemUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.BundleItemUpdateManyMutationInput, Prisma.BundleItemUncheckedUpdateManyInput>;
    where?: Prisma.BundleItemWhereInput;
    limit?: number;
};
export type BundleItemUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BundleItemSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BundleItemOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BundleItemUpdateManyMutationInput, Prisma.BundleItemUncheckedUpdateManyInput>;
    where?: Prisma.BundleItemWhereInput;
    limit?: number;
    include?: Prisma.BundleItemIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type BundleItemUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BundleItemSelect<ExtArgs> | null;
    omit?: Prisma.BundleItemOmit<ExtArgs> | null;
    include?: Prisma.BundleItemInclude<ExtArgs> | null;
    where: Prisma.BundleItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.BundleItemCreateInput, Prisma.BundleItemUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.BundleItemUpdateInput, Prisma.BundleItemUncheckedUpdateInput>;
};
export type BundleItemDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BundleItemSelect<ExtArgs> | null;
    omit?: Prisma.BundleItemOmit<ExtArgs> | null;
    include?: Prisma.BundleItemInclude<ExtArgs> | null;
    where: Prisma.BundleItemWhereUniqueInput;
};
export type BundleItemDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BundleItemWhereInput;
    limit?: number;
};
export type BundleItemDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BundleItemSelect<ExtArgs> | null;
    omit?: Prisma.BundleItemOmit<ExtArgs> | null;
    include?: Prisma.BundleItemInclude<ExtArgs> | null;
};
