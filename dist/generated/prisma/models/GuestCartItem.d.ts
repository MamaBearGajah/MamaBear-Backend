import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type GuestCartItemModel = runtime.Types.Result.DefaultSelection<Prisma.$GuestCartItemPayload>;
export type AggregateGuestCartItem = {
    _count: GuestCartItemCountAggregateOutputType | null;
    _avg: GuestCartItemAvgAggregateOutputType | null;
    _sum: GuestCartItemSumAggregateOutputType | null;
    _min: GuestCartItemMinAggregateOutputType | null;
    _max: GuestCartItemMaxAggregateOutputType | null;
};
export type GuestCartItemAvgAggregateOutputType = {
    quantity: number | null;
    price: runtime.Decimal | null;
};
export type GuestCartItemSumAggregateOutputType = {
    quantity: number | null;
    price: runtime.Decimal | null;
};
export type GuestCartItemMinAggregateOutputType = {
    id: string | null;
    guestCartId: string | null;
    productId: string | null;
    variantId: string | null;
    quantity: number | null;
    price: runtime.Decimal | null;
    notes: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type GuestCartItemMaxAggregateOutputType = {
    id: string | null;
    guestCartId: string | null;
    productId: string | null;
    variantId: string | null;
    quantity: number | null;
    price: runtime.Decimal | null;
    notes: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type GuestCartItemCountAggregateOutputType = {
    id: number;
    guestCartId: number;
    productId: number;
    variantId: number;
    quantity: number;
    price: number;
    notes: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type GuestCartItemAvgAggregateInputType = {
    quantity?: true;
    price?: true;
};
export type GuestCartItemSumAggregateInputType = {
    quantity?: true;
    price?: true;
};
export type GuestCartItemMinAggregateInputType = {
    id?: true;
    guestCartId?: true;
    productId?: true;
    variantId?: true;
    quantity?: true;
    price?: true;
    notes?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type GuestCartItemMaxAggregateInputType = {
    id?: true;
    guestCartId?: true;
    productId?: true;
    variantId?: true;
    quantity?: true;
    price?: true;
    notes?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type GuestCartItemCountAggregateInputType = {
    id?: true;
    guestCartId?: true;
    productId?: true;
    variantId?: true;
    quantity?: true;
    price?: true;
    notes?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type GuestCartItemAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GuestCartItemWhereInput;
    orderBy?: Prisma.GuestCartItemOrderByWithRelationInput | Prisma.GuestCartItemOrderByWithRelationInput[];
    cursor?: Prisma.GuestCartItemWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | GuestCartItemCountAggregateInputType;
    _avg?: GuestCartItemAvgAggregateInputType;
    _sum?: GuestCartItemSumAggregateInputType;
    _min?: GuestCartItemMinAggregateInputType;
    _max?: GuestCartItemMaxAggregateInputType;
};
export type GetGuestCartItemAggregateType<T extends GuestCartItemAggregateArgs> = {
    [P in keyof T & keyof AggregateGuestCartItem]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateGuestCartItem[P]> : Prisma.GetScalarType<T[P], AggregateGuestCartItem[P]>;
};
export type GuestCartItemGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GuestCartItemWhereInput;
    orderBy?: Prisma.GuestCartItemOrderByWithAggregationInput | Prisma.GuestCartItemOrderByWithAggregationInput[];
    by: Prisma.GuestCartItemScalarFieldEnum[] | Prisma.GuestCartItemScalarFieldEnum;
    having?: Prisma.GuestCartItemScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: GuestCartItemCountAggregateInputType | true;
    _avg?: GuestCartItemAvgAggregateInputType;
    _sum?: GuestCartItemSumAggregateInputType;
    _min?: GuestCartItemMinAggregateInputType;
    _max?: GuestCartItemMaxAggregateInputType;
};
export type GuestCartItemGroupByOutputType = {
    id: string;
    guestCartId: string;
    productId: string;
    variantId: string | null;
    quantity: number;
    price: runtime.Decimal;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: GuestCartItemCountAggregateOutputType | null;
    _avg: GuestCartItemAvgAggregateOutputType | null;
    _sum: GuestCartItemSumAggregateOutputType | null;
    _min: GuestCartItemMinAggregateOutputType | null;
    _max: GuestCartItemMaxAggregateOutputType | null;
};
export type GetGuestCartItemGroupByPayload<T extends GuestCartItemGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<GuestCartItemGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof GuestCartItemGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], GuestCartItemGroupByOutputType[P]> : Prisma.GetScalarType<T[P], GuestCartItemGroupByOutputType[P]>;
}>>;
export type GuestCartItemWhereInput = {
    AND?: Prisma.GuestCartItemWhereInput | Prisma.GuestCartItemWhereInput[];
    OR?: Prisma.GuestCartItemWhereInput[];
    NOT?: Prisma.GuestCartItemWhereInput | Prisma.GuestCartItemWhereInput[];
    id?: Prisma.StringFilter<"GuestCartItem"> | string;
    guestCartId?: Prisma.StringFilter<"GuestCartItem"> | string;
    productId?: Prisma.StringFilter<"GuestCartItem"> | string;
    variantId?: Prisma.StringNullableFilter<"GuestCartItem"> | string | null;
    quantity?: Prisma.IntFilter<"GuestCartItem"> | number;
    price?: Prisma.DecimalFilter<"GuestCartItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.StringNullableFilter<"GuestCartItem"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"GuestCartItem"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"GuestCartItem"> | Date | string;
    guestCart?: Prisma.XOR<Prisma.GuestCartScalarRelationFilter, Prisma.GuestCartWhereInput>;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    variant?: Prisma.XOR<Prisma.ProductVariantNullableScalarRelationFilter, Prisma.ProductVariantWhereInput> | null;
};
export type GuestCartItemOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    guestCartId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    variantId?: Prisma.SortOrderInput | Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    guestCart?: Prisma.GuestCartOrderByWithRelationInput;
    product?: Prisma.ProductOrderByWithRelationInput;
    variant?: Prisma.ProductVariantOrderByWithRelationInput;
};
export type GuestCartItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.GuestCartItemWhereInput | Prisma.GuestCartItemWhereInput[];
    OR?: Prisma.GuestCartItemWhereInput[];
    NOT?: Prisma.GuestCartItemWhereInput | Prisma.GuestCartItemWhereInput[];
    guestCartId?: Prisma.StringFilter<"GuestCartItem"> | string;
    productId?: Prisma.StringFilter<"GuestCartItem"> | string;
    variantId?: Prisma.StringNullableFilter<"GuestCartItem"> | string | null;
    quantity?: Prisma.IntFilter<"GuestCartItem"> | number;
    price?: Prisma.DecimalFilter<"GuestCartItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.StringNullableFilter<"GuestCartItem"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"GuestCartItem"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"GuestCartItem"> | Date | string;
    guestCart?: Prisma.XOR<Prisma.GuestCartScalarRelationFilter, Prisma.GuestCartWhereInput>;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    variant?: Prisma.XOR<Prisma.ProductVariantNullableScalarRelationFilter, Prisma.ProductVariantWhereInput> | null;
}, "id">;
export type GuestCartItemOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    guestCartId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    variantId?: Prisma.SortOrderInput | Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.GuestCartItemCountOrderByAggregateInput;
    _avg?: Prisma.GuestCartItemAvgOrderByAggregateInput;
    _max?: Prisma.GuestCartItemMaxOrderByAggregateInput;
    _min?: Prisma.GuestCartItemMinOrderByAggregateInput;
    _sum?: Prisma.GuestCartItemSumOrderByAggregateInput;
};
export type GuestCartItemScalarWhereWithAggregatesInput = {
    AND?: Prisma.GuestCartItemScalarWhereWithAggregatesInput | Prisma.GuestCartItemScalarWhereWithAggregatesInput[];
    OR?: Prisma.GuestCartItemScalarWhereWithAggregatesInput[];
    NOT?: Prisma.GuestCartItemScalarWhereWithAggregatesInput | Prisma.GuestCartItemScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"GuestCartItem"> | string;
    guestCartId?: Prisma.StringWithAggregatesFilter<"GuestCartItem"> | string;
    productId?: Prisma.StringWithAggregatesFilter<"GuestCartItem"> | string;
    variantId?: Prisma.StringNullableWithAggregatesFilter<"GuestCartItem"> | string | null;
    quantity?: Prisma.IntWithAggregatesFilter<"GuestCartItem"> | number;
    price?: Prisma.DecimalWithAggregatesFilter<"GuestCartItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.StringNullableWithAggregatesFilter<"GuestCartItem"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"GuestCartItem"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"GuestCartItem"> | Date | string;
};
export type GuestCartItemCreateInput = {
    id?: string;
    quantity: number;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    guestCart: Prisma.GuestCartCreateNestedOneWithoutItemsInput;
    product: Prisma.ProductCreateNestedOneWithoutGuestCartItemsInput;
    variant?: Prisma.ProductVariantCreateNestedOneWithoutGuestCartItemsInput;
};
export type GuestCartItemUncheckedCreateInput = {
    id?: string;
    guestCartId: string;
    productId: string;
    variantId?: string | null;
    quantity: number;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type GuestCartItemUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    guestCart?: Prisma.GuestCartUpdateOneRequiredWithoutItemsNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutGuestCartItemsNestedInput;
    variant?: Prisma.ProductVariantUpdateOneWithoutGuestCartItemsNestedInput;
};
export type GuestCartItemUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    guestCartId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    variantId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GuestCartItemCreateManyInput = {
    id?: string;
    guestCartId: string;
    productId: string;
    variantId?: string | null;
    quantity: number;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type GuestCartItemUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GuestCartItemUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    guestCartId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    variantId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GuestCartItemListRelationFilter = {
    every?: Prisma.GuestCartItemWhereInput;
    some?: Prisma.GuestCartItemWhereInput;
    none?: Prisma.GuestCartItemWhereInput;
};
export type GuestCartItemOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type GuestCartItemCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    guestCartId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    variantId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type GuestCartItemAvgOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
};
export type GuestCartItemMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    guestCartId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    variantId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type GuestCartItemMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    guestCartId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    variantId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type GuestCartItemSumOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
};
export type GuestCartItemCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.GuestCartItemCreateWithoutProductInput, Prisma.GuestCartItemUncheckedCreateWithoutProductInput> | Prisma.GuestCartItemCreateWithoutProductInput[] | Prisma.GuestCartItemUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.GuestCartItemCreateOrConnectWithoutProductInput | Prisma.GuestCartItemCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.GuestCartItemCreateManyProductInputEnvelope;
    connect?: Prisma.GuestCartItemWhereUniqueInput | Prisma.GuestCartItemWhereUniqueInput[];
};
export type GuestCartItemUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.GuestCartItemCreateWithoutProductInput, Prisma.GuestCartItemUncheckedCreateWithoutProductInput> | Prisma.GuestCartItemCreateWithoutProductInput[] | Prisma.GuestCartItemUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.GuestCartItemCreateOrConnectWithoutProductInput | Prisma.GuestCartItemCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.GuestCartItemCreateManyProductInputEnvelope;
    connect?: Prisma.GuestCartItemWhereUniqueInput | Prisma.GuestCartItemWhereUniqueInput[];
};
export type GuestCartItemUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.GuestCartItemCreateWithoutProductInput, Prisma.GuestCartItemUncheckedCreateWithoutProductInput> | Prisma.GuestCartItemCreateWithoutProductInput[] | Prisma.GuestCartItemUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.GuestCartItemCreateOrConnectWithoutProductInput | Prisma.GuestCartItemCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.GuestCartItemUpsertWithWhereUniqueWithoutProductInput | Prisma.GuestCartItemUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.GuestCartItemCreateManyProductInputEnvelope;
    set?: Prisma.GuestCartItemWhereUniqueInput | Prisma.GuestCartItemWhereUniqueInput[];
    disconnect?: Prisma.GuestCartItemWhereUniqueInput | Prisma.GuestCartItemWhereUniqueInput[];
    delete?: Prisma.GuestCartItemWhereUniqueInput | Prisma.GuestCartItemWhereUniqueInput[];
    connect?: Prisma.GuestCartItemWhereUniqueInput | Prisma.GuestCartItemWhereUniqueInput[];
    update?: Prisma.GuestCartItemUpdateWithWhereUniqueWithoutProductInput | Prisma.GuestCartItemUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.GuestCartItemUpdateManyWithWhereWithoutProductInput | Prisma.GuestCartItemUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.GuestCartItemScalarWhereInput | Prisma.GuestCartItemScalarWhereInput[];
};
export type GuestCartItemUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.GuestCartItemCreateWithoutProductInput, Prisma.GuestCartItemUncheckedCreateWithoutProductInput> | Prisma.GuestCartItemCreateWithoutProductInput[] | Prisma.GuestCartItemUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.GuestCartItemCreateOrConnectWithoutProductInput | Prisma.GuestCartItemCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.GuestCartItemUpsertWithWhereUniqueWithoutProductInput | Prisma.GuestCartItemUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.GuestCartItemCreateManyProductInputEnvelope;
    set?: Prisma.GuestCartItemWhereUniqueInput | Prisma.GuestCartItemWhereUniqueInput[];
    disconnect?: Prisma.GuestCartItemWhereUniqueInput | Prisma.GuestCartItemWhereUniqueInput[];
    delete?: Prisma.GuestCartItemWhereUniqueInput | Prisma.GuestCartItemWhereUniqueInput[];
    connect?: Prisma.GuestCartItemWhereUniqueInput | Prisma.GuestCartItemWhereUniqueInput[];
    update?: Prisma.GuestCartItemUpdateWithWhereUniqueWithoutProductInput | Prisma.GuestCartItemUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.GuestCartItemUpdateManyWithWhereWithoutProductInput | Prisma.GuestCartItemUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.GuestCartItemScalarWhereInput | Prisma.GuestCartItemScalarWhereInput[];
};
export type GuestCartItemCreateNestedManyWithoutVariantInput = {
    create?: Prisma.XOR<Prisma.GuestCartItemCreateWithoutVariantInput, Prisma.GuestCartItemUncheckedCreateWithoutVariantInput> | Prisma.GuestCartItemCreateWithoutVariantInput[] | Prisma.GuestCartItemUncheckedCreateWithoutVariantInput[];
    connectOrCreate?: Prisma.GuestCartItemCreateOrConnectWithoutVariantInput | Prisma.GuestCartItemCreateOrConnectWithoutVariantInput[];
    createMany?: Prisma.GuestCartItemCreateManyVariantInputEnvelope;
    connect?: Prisma.GuestCartItemWhereUniqueInput | Prisma.GuestCartItemWhereUniqueInput[];
};
export type GuestCartItemUncheckedCreateNestedManyWithoutVariantInput = {
    create?: Prisma.XOR<Prisma.GuestCartItemCreateWithoutVariantInput, Prisma.GuestCartItemUncheckedCreateWithoutVariantInput> | Prisma.GuestCartItemCreateWithoutVariantInput[] | Prisma.GuestCartItemUncheckedCreateWithoutVariantInput[];
    connectOrCreate?: Prisma.GuestCartItemCreateOrConnectWithoutVariantInput | Prisma.GuestCartItemCreateOrConnectWithoutVariantInput[];
    createMany?: Prisma.GuestCartItemCreateManyVariantInputEnvelope;
    connect?: Prisma.GuestCartItemWhereUniqueInput | Prisma.GuestCartItemWhereUniqueInput[];
};
export type GuestCartItemUpdateManyWithoutVariantNestedInput = {
    create?: Prisma.XOR<Prisma.GuestCartItemCreateWithoutVariantInput, Prisma.GuestCartItemUncheckedCreateWithoutVariantInput> | Prisma.GuestCartItemCreateWithoutVariantInput[] | Prisma.GuestCartItemUncheckedCreateWithoutVariantInput[];
    connectOrCreate?: Prisma.GuestCartItemCreateOrConnectWithoutVariantInput | Prisma.GuestCartItemCreateOrConnectWithoutVariantInput[];
    upsert?: Prisma.GuestCartItemUpsertWithWhereUniqueWithoutVariantInput | Prisma.GuestCartItemUpsertWithWhereUniqueWithoutVariantInput[];
    createMany?: Prisma.GuestCartItemCreateManyVariantInputEnvelope;
    set?: Prisma.GuestCartItemWhereUniqueInput | Prisma.GuestCartItemWhereUniqueInput[];
    disconnect?: Prisma.GuestCartItemWhereUniqueInput | Prisma.GuestCartItemWhereUniqueInput[];
    delete?: Prisma.GuestCartItemWhereUniqueInput | Prisma.GuestCartItemWhereUniqueInput[];
    connect?: Prisma.GuestCartItemWhereUniqueInput | Prisma.GuestCartItemWhereUniqueInput[];
    update?: Prisma.GuestCartItemUpdateWithWhereUniqueWithoutVariantInput | Prisma.GuestCartItemUpdateWithWhereUniqueWithoutVariantInput[];
    updateMany?: Prisma.GuestCartItemUpdateManyWithWhereWithoutVariantInput | Prisma.GuestCartItemUpdateManyWithWhereWithoutVariantInput[];
    deleteMany?: Prisma.GuestCartItemScalarWhereInput | Prisma.GuestCartItemScalarWhereInput[];
};
export type GuestCartItemUncheckedUpdateManyWithoutVariantNestedInput = {
    create?: Prisma.XOR<Prisma.GuestCartItemCreateWithoutVariantInput, Prisma.GuestCartItemUncheckedCreateWithoutVariantInput> | Prisma.GuestCartItemCreateWithoutVariantInput[] | Prisma.GuestCartItemUncheckedCreateWithoutVariantInput[];
    connectOrCreate?: Prisma.GuestCartItemCreateOrConnectWithoutVariantInput | Prisma.GuestCartItemCreateOrConnectWithoutVariantInput[];
    upsert?: Prisma.GuestCartItemUpsertWithWhereUniqueWithoutVariantInput | Prisma.GuestCartItemUpsertWithWhereUniqueWithoutVariantInput[];
    createMany?: Prisma.GuestCartItemCreateManyVariantInputEnvelope;
    set?: Prisma.GuestCartItemWhereUniqueInput | Prisma.GuestCartItemWhereUniqueInput[];
    disconnect?: Prisma.GuestCartItemWhereUniqueInput | Prisma.GuestCartItemWhereUniqueInput[];
    delete?: Prisma.GuestCartItemWhereUniqueInput | Prisma.GuestCartItemWhereUniqueInput[];
    connect?: Prisma.GuestCartItemWhereUniqueInput | Prisma.GuestCartItemWhereUniqueInput[];
    update?: Prisma.GuestCartItemUpdateWithWhereUniqueWithoutVariantInput | Prisma.GuestCartItemUpdateWithWhereUniqueWithoutVariantInput[];
    updateMany?: Prisma.GuestCartItemUpdateManyWithWhereWithoutVariantInput | Prisma.GuestCartItemUpdateManyWithWhereWithoutVariantInput[];
    deleteMany?: Prisma.GuestCartItemScalarWhereInput | Prisma.GuestCartItemScalarWhereInput[];
};
export type GuestCartItemCreateNestedManyWithoutGuestCartInput = {
    create?: Prisma.XOR<Prisma.GuestCartItemCreateWithoutGuestCartInput, Prisma.GuestCartItemUncheckedCreateWithoutGuestCartInput> | Prisma.GuestCartItemCreateWithoutGuestCartInput[] | Prisma.GuestCartItemUncheckedCreateWithoutGuestCartInput[];
    connectOrCreate?: Prisma.GuestCartItemCreateOrConnectWithoutGuestCartInput | Prisma.GuestCartItemCreateOrConnectWithoutGuestCartInput[];
    createMany?: Prisma.GuestCartItemCreateManyGuestCartInputEnvelope;
    connect?: Prisma.GuestCartItemWhereUniqueInput | Prisma.GuestCartItemWhereUniqueInput[];
};
export type GuestCartItemUncheckedCreateNestedManyWithoutGuestCartInput = {
    create?: Prisma.XOR<Prisma.GuestCartItemCreateWithoutGuestCartInput, Prisma.GuestCartItemUncheckedCreateWithoutGuestCartInput> | Prisma.GuestCartItemCreateWithoutGuestCartInput[] | Prisma.GuestCartItemUncheckedCreateWithoutGuestCartInput[];
    connectOrCreate?: Prisma.GuestCartItemCreateOrConnectWithoutGuestCartInput | Prisma.GuestCartItemCreateOrConnectWithoutGuestCartInput[];
    createMany?: Prisma.GuestCartItemCreateManyGuestCartInputEnvelope;
    connect?: Prisma.GuestCartItemWhereUniqueInput | Prisma.GuestCartItemWhereUniqueInput[];
};
export type GuestCartItemUpdateManyWithoutGuestCartNestedInput = {
    create?: Prisma.XOR<Prisma.GuestCartItemCreateWithoutGuestCartInput, Prisma.GuestCartItemUncheckedCreateWithoutGuestCartInput> | Prisma.GuestCartItemCreateWithoutGuestCartInput[] | Prisma.GuestCartItemUncheckedCreateWithoutGuestCartInput[];
    connectOrCreate?: Prisma.GuestCartItemCreateOrConnectWithoutGuestCartInput | Prisma.GuestCartItemCreateOrConnectWithoutGuestCartInput[];
    upsert?: Prisma.GuestCartItemUpsertWithWhereUniqueWithoutGuestCartInput | Prisma.GuestCartItemUpsertWithWhereUniqueWithoutGuestCartInput[];
    createMany?: Prisma.GuestCartItemCreateManyGuestCartInputEnvelope;
    set?: Prisma.GuestCartItemWhereUniqueInput | Prisma.GuestCartItemWhereUniqueInput[];
    disconnect?: Prisma.GuestCartItemWhereUniqueInput | Prisma.GuestCartItemWhereUniqueInput[];
    delete?: Prisma.GuestCartItemWhereUniqueInput | Prisma.GuestCartItemWhereUniqueInput[];
    connect?: Prisma.GuestCartItemWhereUniqueInput | Prisma.GuestCartItemWhereUniqueInput[];
    update?: Prisma.GuestCartItemUpdateWithWhereUniqueWithoutGuestCartInput | Prisma.GuestCartItemUpdateWithWhereUniqueWithoutGuestCartInput[];
    updateMany?: Prisma.GuestCartItemUpdateManyWithWhereWithoutGuestCartInput | Prisma.GuestCartItemUpdateManyWithWhereWithoutGuestCartInput[];
    deleteMany?: Prisma.GuestCartItemScalarWhereInput | Prisma.GuestCartItemScalarWhereInput[];
};
export type GuestCartItemUncheckedUpdateManyWithoutGuestCartNestedInput = {
    create?: Prisma.XOR<Prisma.GuestCartItemCreateWithoutGuestCartInput, Prisma.GuestCartItemUncheckedCreateWithoutGuestCartInput> | Prisma.GuestCartItemCreateWithoutGuestCartInput[] | Prisma.GuestCartItemUncheckedCreateWithoutGuestCartInput[];
    connectOrCreate?: Prisma.GuestCartItemCreateOrConnectWithoutGuestCartInput | Prisma.GuestCartItemCreateOrConnectWithoutGuestCartInput[];
    upsert?: Prisma.GuestCartItemUpsertWithWhereUniqueWithoutGuestCartInput | Prisma.GuestCartItemUpsertWithWhereUniqueWithoutGuestCartInput[];
    createMany?: Prisma.GuestCartItemCreateManyGuestCartInputEnvelope;
    set?: Prisma.GuestCartItemWhereUniqueInput | Prisma.GuestCartItemWhereUniqueInput[];
    disconnect?: Prisma.GuestCartItemWhereUniqueInput | Prisma.GuestCartItemWhereUniqueInput[];
    delete?: Prisma.GuestCartItemWhereUniqueInput | Prisma.GuestCartItemWhereUniqueInput[];
    connect?: Prisma.GuestCartItemWhereUniqueInput | Prisma.GuestCartItemWhereUniqueInput[];
    update?: Prisma.GuestCartItemUpdateWithWhereUniqueWithoutGuestCartInput | Prisma.GuestCartItemUpdateWithWhereUniqueWithoutGuestCartInput[];
    updateMany?: Prisma.GuestCartItemUpdateManyWithWhereWithoutGuestCartInput | Prisma.GuestCartItemUpdateManyWithWhereWithoutGuestCartInput[];
    deleteMany?: Prisma.GuestCartItemScalarWhereInput | Prisma.GuestCartItemScalarWhereInput[];
};
export type GuestCartItemCreateWithoutProductInput = {
    id?: string;
    quantity: number;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    guestCart: Prisma.GuestCartCreateNestedOneWithoutItemsInput;
    variant?: Prisma.ProductVariantCreateNestedOneWithoutGuestCartItemsInput;
};
export type GuestCartItemUncheckedCreateWithoutProductInput = {
    id?: string;
    guestCartId: string;
    variantId?: string | null;
    quantity: number;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type GuestCartItemCreateOrConnectWithoutProductInput = {
    where: Prisma.GuestCartItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.GuestCartItemCreateWithoutProductInput, Prisma.GuestCartItemUncheckedCreateWithoutProductInput>;
};
export type GuestCartItemCreateManyProductInputEnvelope = {
    data: Prisma.GuestCartItemCreateManyProductInput | Prisma.GuestCartItemCreateManyProductInput[];
    skipDuplicates?: boolean;
};
export type GuestCartItemUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.GuestCartItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.GuestCartItemUpdateWithoutProductInput, Prisma.GuestCartItemUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.GuestCartItemCreateWithoutProductInput, Prisma.GuestCartItemUncheckedCreateWithoutProductInput>;
};
export type GuestCartItemUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.GuestCartItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.GuestCartItemUpdateWithoutProductInput, Prisma.GuestCartItemUncheckedUpdateWithoutProductInput>;
};
export type GuestCartItemUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.GuestCartItemScalarWhereInput;
    data: Prisma.XOR<Prisma.GuestCartItemUpdateManyMutationInput, Prisma.GuestCartItemUncheckedUpdateManyWithoutProductInput>;
};
export type GuestCartItemScalarWhereInput = {
    AND?: Prisma.GuestCartItemScalarWhereInput | Prisma.GuestCartItemScalarWhereInput[];
    OR?: Prisma.GuestCartItemScalarWhereInput[];
    NOT?: Prisma.GuestCartItemScalarWhereInput | Prisma.GuestCartItemScalarWhereInput[];
    id?: Prisma.StringFilter<"GuestCartItem"> | string;
    guestCartId?: Prisma.StringFilter<"GuestCartItem"> | string;
    productId?: Prisma.StringFilter<"GuestCartItem"> | string;
    variantId?: Prisma.StringNullableFilter<"GuestCartItem"> | string | null;
    quantity?: Prisma.IntFilter<"GuestCartItem"> | number;
    price?: Prisma.DecimalFilter<"GuestCartItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.StringNullableFilter<"GuestCartItem"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"GuestCartItem"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"GuestCartItem"> | Date | string;
};
export type GuestCartItemCreateWithoutVariantInput = {
    id?: string;
    quantity: number;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    guestCart: Prisma.GuestCartCreateNestedOneWithoutItemsInput;
    product: Prisma.ProductCreateNestedOneWithoutGuestCartItemsInput;
};
export type GuestCartItemUncheckedCreateWithoutVariantInput = {
    id?: string;
    guestCartId: string;
    productId: string;
    quantity: number;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type GuestCartItemCreateOrConnectWithoutVariantInput = {
    where: Prisma.GuestCartItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.GuestCartItemCreateWithoutVariantInput, Prisma.GuestCartItemUncheckedCreateWithoutVariantInput>;
};
export type GuestCartItemCreateManyVariantInputEnvelope = {
    data: Prisma.GuestCartItemCreateManyVariantInput | Prisma.GuestCartItemCreateManyVariantInput[];
    skipDuplicates?: boolean;
};
export type GuestCartItemUpsertWithWhereUniqueWithoutVariantInput = {
    where: Prisma.GuestCartItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.GuestCartItemUpdateWithoutVariantInput, Prisma.GuestCartItemUncheckedUpdateWithoutVariantInput>;
    create: Prisma.XOR<Prisma.GuestCartItemCreateWithoutVariantInput, Prisma.GuestCartItemUncheckedCreateWithoutVariantInput>;
};
export type GuestCartItemUpdateWithWhereUniqueWithoutVariantInput = {
    where: Prisma.GuestCartItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.GuestCartItemUpdateWithoutVariantInput, Prisma.GuestCartItemUncheckedUpdateWithoutVariantInput>;
};
export type GuestCartItemUpdateManyWithWhereWithoutVariantInput = {
    where: Prisma.GuestCartItemScalarWhereInput;
    data: Prisma.XOR<Prisma.GuestCartItemUpdateManyMutationInput, Prisma.GuestCartItemUncheckedUpdateManyWithoutVariantInput>;
};
export type GuestCartItemCreateWithoutGuestCartInput = {
    id?: string;
    quantity: number;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    product: Prisma.ProductCreateNestedOneWithoutGuestCartItemsInput;
    variant?: Prisma.ProductVariantCreateNestedOneWithoutGuestCartItemsInput;
};
export type GuestCartItemUncheckedCreateWithoutGuestCartInput = {
    id?: string;
    productId: string;
    variantId?: string | null;
    quantity: number;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type GuestCartItemCreateOrConnectWithoutGuestCartInput = {
    where: Prisma.GuestCartItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.GuestCartItemCreateWithoutGuestCartInput, Prisma.GuestCartItemUncheckedCreateWithoutGuestCartInput>;
};
export type GuestCartItemCreateManyGuestCartInputEnvelope = {
    data: Prisma.GuestCartItemCreateManyGuestCartInput | Prisma.GuestCartItemCreateManyGuestCartInput[];
    skipDuplicates?: boolean;
};
export type GuestCartItemUpsertWithWhereUniqueWithoutGuestCartInput = {
    where: Prisma.GuestCartItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.GuestCartItemUpdateWithoutGuestCartInput, Prisma.GuestCartItemUncheckedUpdateWithoutGuestCartInput>;
    create: Prisma.XOR<Prisma.GuestCartItemCreateWithoutGuestCartInput, Prisma.GuestCartItemUncheckedCreateWithoutGuestCartInput>;
};
export type GuestCartItemUpdateWithWhereUniqueWithoutGuestCartInput = {
    where: Prisma.GuestCartItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.GuestCartItemUpdateWithoutGuestCartInput, Prisma.GuestCartItemUncheckedUpdateWithoutGuestCartInput>;
};
export type GuestCartItemUpdateManyWithWhereWithoutGuestCartInput = {
    where: Prisma.GuestCartItemScalarWhereInput;
    data: Prisma.XOR<Prisma.GuestCartItemUpdateManyMutationInput, Prisma.GuestCartItemUncheckedUpdateManyWithoutGuestCartInput>;
};
export type GuestCartItemCreateManyProductInput = {
    id?: string;
    guestCartId: string;
    variantId?: string | null;
    quantity: number;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type GuestCartItemUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    guestCart?: Prisma.GuestCartUpdateOneRequiredWithoutItemsNestedInput;
    variant?: Prisma.ProductVariantUpdateOneWithoutGuestCartItemsNestedInput;
};
export type GuestCartItemUncheckedUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    guestCartId?: Prisma.StringFieldUpdateOperationsInput | string;
    variantId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GuestCartItemUncheckedUpdateManyWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    guestCartId?: Prisma.StringFieldUpdateOperationsInput | string;
    variantId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GuestCartItemCreateManyVariantInput = {
    id?: string;
    guestCartId: string;
    productId: string;
    quantity: number;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type GuestCartItemUpdateWithoutVariantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    guestCart?: Prisma.GuestCartUpdateOneRequiredWithoutItemsNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutGuestCartItemsNestedInput;
};
export type GuestCartItemUncheckedUpdateWithoutVariantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    guestCartId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GuestCartItemUncheckedUpdateManyWithoutVariantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    guestCartId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GuestCartItemCreateManyGuestCartInput = {
    id?: string;
    productId: string;
    variantId?: string | null;
    quantity: number;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type GuestCartItemUpdateWithoutGuestCartInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutGuestCartItemsNestedInput;
    variant?: Prisma.ProductVariantUpdateOneWithoutGuestCartItemsNestedInput;
};
export type GuestCartItemUncheckedUpdateWithoutGuestCartInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    variantId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GuestCartItemUncheckedUpdateManyWithoutGuestCartInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    variantId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GuestCartItemSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    guestCartId?: boolean;
    productId?: boolean;
    variantId?: boolean;
    quantity?: boolean;
    price?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    guestCart?: boolean | Prisma.GuestCartDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    variant?: boolean | Prisma.GuestCartItem$variantArgs<ExtArgs>;
}, ExtArgs["result"]["guestCartItem"]>;
export type GuestCartItemSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    guestCartId?: boolean;
    productId?: boolean;
    variantId?: boolean;
    quantity?: boolean;
    price?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    guestCart?: boolean | Prisma.GuestCartDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    variant?: boolean | Prisma.GuestCartItem$variantArgs<ExtArgs>;
}, ExtArgs["result"]["guestCartItem"]>;
export type GuestCartItemSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    guestCartId?: boolean;
    productId?: boolean;
    variantId?: boolean;
    quantity?: boolean;
    price?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    guestCart?: boolean | Prisma.GuestCartDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    variant?: boolean | Prisma.GuestCartItem$variantArgs<ExtArgs>;
}, ExtArgs["result"]["guestCartItem"]>;
export type GuestCartItemSelectScalar = {
    id?: boolean;
    guestCartId?: boolean;
    productId?: boolean;
    variantId?: boolean;
    quantity?: boolean;
    price?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type GuestCartItemOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "guestCartId" | "productId" | "variantId" | "quantity" | "price" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["guestCartItem"]>;
export type GuestCartItemInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    guestCart?: boolean | Prisma.GuestCartDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    variant?: boolean | Prisma.GuestCartItem$variantArgs<ExtArgs>;
};
export type GuestCartItemIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    guestCart?: boolean | Prisma.GuestCartDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    variant?: boolean | Prisma.GuestCartItem$variantArgs<ExtArgs>;
};
export type GuestCartItemIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    guestCart?: boolean | Prisma.GuestCartDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    variant?: boolean | Prisma.GuestCartItem$variantArgs<ExtArgs>;
};
export type $GuestCartItemPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "GuestCartItem";
    objects: {
        guestCart: Prisma.$GuestCartPayload<ExtArgs>;
        product: Prisma.$ProductPayload<ExtArgs>;
        variant: Prisma.$ProductVariantPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        guestCartId: string;
        productId: string;
        variantId: string | null;
        quantity: number;
        price: runtime.Decimal;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["guestCartItem"]>;
    composites: {};
};
export type GuestCartItemGetPayload<S extends boolean | null | undefined | GuestCartItemDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$GuestCartItemPayload, S>;
export type GuestCartItemCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<GuestCartItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: GuestCartItemCountAggregateInputType | true;
};
export interface GuestCartItemDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['GuestCartItem'];
        meta: {
            name: 'GuestCartItem';
        };
    };
    findUnique<T extends GuestCartItemFindUniqueArgs>(args: Prisma.SelectSubset<T, GuestCartItemFindUniqueArgs<ExtArgs>>): Prisma.Prisma__GuestCartItemClient<runtime.Types.Result.GetResult<Prisma.$GuestCartItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends GuestCartItemFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, GuestCartItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__GuestCartItemClient<runtime.Types.Result.GetResult<Prisma.$GuestCartItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends GuestCartItemFindFirstArgs>(args?: Prisma.SelectSubset<T, GuestCartItemFindFirstArgs<ExtArgs>>): Prisma.Prisma__GuestCartItemClient<runtime.Types.Result.GetResult<Prisma.$GuestCartItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends GuestCartItemFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, GuestCartItemFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__GuestCartItemClient<runtime.Types.Result.GetResult<Prisma.$GuestCartItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends GuestCartItemFindManyArgs>(args?: Prisma.SelectSubset<T, GuestCartItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GuestCartItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends GuestCartItemCreateArgs>(args: Prisma.SelectSubset<T, GuestCartItemCreateArgs<ExtArgs>>): Prisma.Prisma__GuestCartItemClient<runtime.Types.Result.GetResult<Prisma.$GuestCartItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends GuestCartItemCreateManyArgs>(args?: Prisma.SelectSubset<T, GuestCartItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends GuestCartItemCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, GuestCartItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GuestCartItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends GuestCartItemDeleteArgs>(args: Prisma.SelectSubset<T, GuestCartItemDeleteArgs<ExtArgs>>): Prisma.Prisma__GuestCartItemClient<runtime.Types.Result.GetResult<Prisma.$GuestCartItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends GuestCartItemUpdateArgs>(args: Prisma.SelectSubset<T, GuestCartItemUpdateArgs<ExtArgs>>): Prisma.Prisma__GuestCartItemClient<runtime.Types.Result.GetResult<Prisma.$GuestCartItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends GuestCartItemDeleteManyArgs>(args?: Prisma.SelectSubset<T, GuestCartItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends GuestCartItemUpdateManyArgs>(args: Prisma.SelectSubset<T, GuestCartItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends GuestCartItemUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, GuestCartItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GuestCartItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends GuestCartItemUpsertArgs>(args: Prisma.SelectSubset<T, GuestCartItemUpsertArgs<ExtArgs>>): Prisma.Prisma__GuestCartItemClient<runtime.Types.Result.GetResult<Prisma.$GuestCartItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends GuestCartItemCountArgs>(args?: Prisma.Subset<T, GuestCartItemCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], GuestCartItemCountAggregateOutputType> : number>;
    aggregate<T extends GuestCartItemAggregateArgs>(args: Prisma.Subset<T, GuestCartItemAggregateArgs>): Prisma.PrismaPromise<GetGuestCartItemAggregateType<T>>;
    groupBy<T extends GuestCartItemGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: GuestCartItemGroupByArgs['orderBy'];
    } : {
        orderBy?: GuestCartItemGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, GuestCartItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGuestCartItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: GuestCartItemFieldRefs;
}
export interface Prisma__GuestCartItemClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    guestCart<T extends Prisma.GuestCartDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.GuestCartDefaultArgs<ExtArgs>>): Prisma.Prisma__GuestCartClient<runtime.Types.Result.GetResult<Prisma.$GuestCartPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    variant<T extends Prisma.GuestCartItem$variantArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.GuestCartItem$variantArgs<ExtArgs>>): Prisma.Prisma__ProductVariantClient<runtime.Types.Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface GuestCartItemFieldRefs {
    readonly id: Prisma.FieldRef<"GuestCartItem", 'String'>;
    readonly guestCartId: Prisma.FieldRef<"GuestCartItem", 'String'>;
    readonly productId: Prisma.FieldRef<"GuestCartItem", 'String'>;
    readonly variantId: Prisma.FieldRef<"GuestCartItem", 'String'>;
    readonly quantity: Prisma.FieldRef<"GuestCartItem", 'Int'>;
    readonly price: Prisma.FieldRef<"GuestCartItem", 'Decimal'>;
    readonly notes: Prisma.FieldRef<"GuestCartItem", 'String'>;
    readonly createdAt: Prisma.FieldRef<"GuestCartItem", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"GuestCartItem", 'DateTime'>;
}
export type GuestCartItemFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuestCartItemSelect<ExtArgs> | null;
    omit?: Prisma.GuestCartItemOmit<ExtArgs> | null;
    include?: Prisma.GuestCartItemInclude<ExtArgs> | null;
    where: Prisma.GuestCartItemWhereUniqueInput;
};
export type GuestCartItemFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuestCartItemSelect<ExtArgs> | null;
    omit?: Prisma.GuestCartItemOmit<ExtArgs> | null;
    include?: Prisma.GuestCartItemInclude<ExtArgs> | null;
    where: Prisma.GuestCartItemWhereUniqueInput;
};
export type GuestCartItemFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuestCartItemSelect<ExtArgs> | null;
    omit?: Prisma.GuestCartItemOmit<ExtArgs> | null;
    include?: Prisma.GuestCartItemInclude<ExtArgs> | null;
    where?: Prisma.GuestCartItemWhereInput;
    orderBy?: Prisma.GuestCartItemOrderByWithRelationInput | Prisma.GuestCartItemOrderByWithRelationInput[];
    cursor?: Prisma.GuestCartItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.GuestCartItemScalarFieldEnum | Prisma.GuestCartItemScalarFieldEnum[];
};
export type GuestCartItemFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuestCartItemSelect<ExtArgs> | null;
    omit?: Prisma.GuestCartItemOmit<ExtArgs> | null;
    include?: Prisma.GuestCartItemInclude<ExtArgs> | null;
    where?: Prisma.GuestCartItemWhereInput;
    orderBy?: Prisma.GuestCartItemOrderByWithRelationInput | Prisma.GuestCartItemOrderByWithRelationInput[];
    cursor?: Prisma.GuestCartItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.GuestCartItemScalarFieldEnum | Prisma.GuestCartItemScalarFieldEnum[];
};
export type GuestCartItemFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuestCartItemSelect<ExtArgs> | null;
    omit?: Prisma.GuestCartItemOmit<ExtArgs> | null;
    include?: Prisma.GuestCartItemInclude<ExtArgs> | null;
    where?: Prisma.GuestCartItemWhereInput;
    orderBy?: Prisma.GuestCartItemOrderByWithRelationInput | Prisma.GuestCartItemOrderByWithRelationInput[];
    cursor?: Prisma.GuestCartItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.GuestCartItemScalarFieldEnum | Prisma.GuestCartItemScalarFieldEnum[];
};
export type GuestCartItemCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuestCartItemSelect<ExtArgs> | null;
    omit?: Prisma.GuestCartItemOmit<ExtArgs> | null;
    include?: Prisma.GuestCartItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.GuestCartItemCreateInput, Prisma.GuestCartItemUncheckedCreateInput>;
};
export type GuestCartItemCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.GuestCartItemCreateManyInput | Prisma.GuestCartItemCreateManyInput[];
    skipDuplicates?: boolean;
};
export type GuestCartItemCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuestCartItemSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.GuestCartItemOmit<ExtArgs> | null;
    data: Prisma.GuestCartItemCreateManyInput | Prisma.GuestCartItemCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.GuestCartItemIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type GuestCartItemUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuestCartItemSelect<ExtArgs> | null;
    omit?: Prisma.GuestCartItemOmit<ExtArgs> | null;
    include?: Prisma.GuestCartItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.GuestCartItemUpdateInput, Prisma.GuestCartItemUncheckedUpdateInput>;
    where: Prisma.GuestCartItemWhereUniqueInput;
};
export type GuestCartItemUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.GuestCartItemUpdateManyMutationInput, Prisma.GuestCartItemUncheckedUpdateManyInput>;
    where?: Prisma.GuestCartItemWhereInput;
    limit?: number;
};
export type GuestCartItemUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuestCartItemSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.GuestCartItemOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.GuestCartItemUpdateManyMutationInput, Prisma.GuestCartItemUncheckedUpdateManyInput>;
    where?: Prisma.GuestCartItemWhereInput;
    limit?: number;
    include?: Prisma.GuestCartItemIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type GuestCartItemUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuestCartItemSelect<ExtArgs> | null;
    omit?: Prisma.GuestCartItemOmit<ExtArgs> | null;
    include?: Prisma.GuestCartItemInclude<ExtArgs> | null;
    where: Prisma.GuestCartItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.GuestCartItemCreateInput, Prisma.GuestCartItemUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.GuestCartItemUpdateInput, Prisma.GuestCartItemUncheckedUpdateInput>;
};
export type GuestCartItemDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuestCartItemSelect<ExtArgs> | null;
    omit?: Prisma.GuestCartItemOmit<ExtArgs> | null;
    include?: Prisma.GuestCartItemInclude<ExtArgs> | null;
    where: Prisma.GuestCartItemWhereUniqueInput;
};
export type GuestCartItemDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GuestCartItemWhereInput;
    limit?: number;
};
export type GuestCartItem$variantArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductVariantSelect<ExtArgs> | null;
    omit?: Prisma.ProductVariantOmit<ExtArgs> | null;
    include?: Prisma.ProductVariantInclude<ExtArgs> | null;
    where?: Prisma.ProductVariantWhereInput;
};
export type GuestCartItemDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuestCartItemSelect<ExtArgs> | null;
    omit?: Prisma.GuestCartItemOmit<ExtArgs> | null;
    include?: Prisma.GuestCartItemInclude<ExtArgs> | null;
};
