import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type VoucherModel = runtime.Types.Result.DefaultSelection<Prisma.$VoucherPayload>;
export type AggregateVoucher = {
    _count: VoucherCountAggregateOutputType | null;
    _avg: VoucherAvgAggregateOutputType | null;
    _sum: VoucherSumAggregateOutputType | null;
    _min: VoucherMinAggregateOutputType | null;
    _max: VoucherMaxAggregateOutputType | null;
};
export type VoucherAvgAggregateOutputType = {
    value: runtime.Decimal | null;
    minPurchase: runtime.Decimal | null;
    maxDiscount: runtime.Decimal | null;
    usageLimit: number | null;
    usedCount: number | null;
};
export type VoucherSumAggregateOutputType = {
    value: runtime.Decimal | null;
    minPurchase: runtime.Decimal | null;
    maxDiscount: runtime.Decimal | null;
    usageLimit: number | null;
    usedCount: number | null;
};
export type VoucherMinAggregateOutputType = {
    id: string | null;
    code: string | null;
    type: $Enums.VoucherType | null;
    source: $Enums.VoucherSource | null;
    value: runtime.Decimal | null;
    minPurchase: runtime.Decimal | null;
    maxDiscount: runtime.Decimal | null;
    usageLimit: number | null;
    usedCount: number | null;
    isActive: boolean | null;
    startDate: Date | null;
    endDate: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    ownerId: string | null;
};
export type VoucherMaxAggregateOutputType = {
    id: string | null;
    code: string | null;
    type: $Enums.VoucherType | null;
    source: $Enums.VoucherSource | null;
    value: runtime.Decimal | null;
    minPurchase: runtime.Decimal | null;
    maxDiscount: runtime.Decimal | null;
    usageLimit: number | null;
    usedCount: number | null;
    isActive: boolean | null;
    startDate: Date | null;
    endDate: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    ownerId: string | null;
};
export type VoucherCountAggregateOutputType = {
    id: number;
    code: number;
    type: number;
    source: number;
    value: number;
    minPurchase: number;
    maxDiscount: number;
    usageLimit: number;
    usedCount: number;
    isActive: number;
    startDate: number;
    endDate: number;
    createdAt: number;
    updatedAt: number;
    ownerId: number;
    _all: number;
};
export type VoucherAvgAggregateInputType = {
    value?: true;
    minPurchase?: true;
    maxDiscount?: true;
    usageLimit?: true;
    usedCount?: true;
};
export type VoucherSumAggregateInputType = {
    value?: true;
    minPurchase?: true;
    maxDiscount?: true;
    usageLimit?: true;
    usedCount?: true;
};
export type VoucherMinAggregateInputType = {
    id?: true;
    code?: true;
    type?: true;
    source?: true;
    value?: true;
    minPurchase?: true;
    maxDiscount?: true;
    usageLimit?: true;
    usedCount?: true;
    isActive?: true;
    startDate?: true;
    endDate?: true;
    createdAt?: true;
    updatedAt?: true;
    ownerId?: true;
};
export type VoucherMaxAggregateInputType = {
    id?: true;
    code?: true;
    type?: true;
    source?: true;
    value?: true;
    minPurchase?: true;
    maxDiscount?: true;
    usageLimit?: true;
    usedCount?: true;
    isActive?: true;
    startDate?: true;
    endDate?: true;
    createdAt?: true;
    updatedAt?: true;
    ownerId?: true;
};
export type VoucherCountAggregateInputType = {
    id?: true;
    code?: true;
    type?: true;
    source?: true;
    value?: true;
    minPurchase?: true;
    maxDiscount?: true;
    usageLimit?: true;
    usedCount?: true;
    isActive?: true;
    startDate?: true;
    endDate?: true;
    createdAt?: true;
    updatedAt?: true;
    ownerId?: true;
    _all?: true;
};
export type VoucherAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VoucherWhereInput;
    orderBy?: Prisma.VoucherOrderByWithRelationInput | Prisma.VoucherOrderByWithRelationInput[];
    cursor?: Prisma.VoucherWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | VoucherCountAggregateInputType;
    _avg?: VoucherAvgAggregateInputType;
    _sum?: VoucherSumAggregateInputType;
    _min?: VoucherMinAggregateInputType;
    _max?: VoucherMaxAggregateInputType;
};
export type GetVoucherAggregateType<T extends VoucherAggregateArgs> = {
    [P in keyof T & keyof AggregateVoucher]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateVoucher[P]> : Prisma.GetScalarType<T[P], AggregateVoucher[P]>;
};
export type VoucherGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VoucherWhereInput;
    orderBy?: Prisma.VoucherOrderByWithAggregationInput | Prisma.VoucherOrderByWithAggregationInput[];
    by: Prisma.VoucherScalarFieldEnum[] | Prisma.VoucherScalarFieldEnum;
    having?: Prisma.VoucherScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: VoucherCountAggregateInputType | true;
    _avg?: VoucherAvgAggregateInputType;
    _sum?: VoucherSumAggregateInputType;
    _min?: VoucherMinAggregateInputType;
    _max?: VoucherMaxAggregateInputType;
};
export type VoucherGroupByOutputType = {
    id: string;
    code: string;
    type: $Enums.VoucherType;
    source: $Enums.VoucherSource;
    value: runtime.Decimal;
    minPurchase: runtime.Decimal;
    maxDiscount: runtime.Decimal | null;
    usageLimit: number | null;
    usedCount: number;
    isActive: boolean;
    startDate: Date | null;
    endDate: Date | null;
    createdAt: Date;
    updatedAt: Date;
    ownerId: string | null;
    _count: VoucherCountAggregateOutputType | null;
    _avg: VoucherAvgAggregateOutputType | null;
    _sum: VoucherSumAggregateOutputType | null;
    _min: VoucherMinAggregateOutputType | null;
    _max: VoucherMaxAggregateOutputType | null;
};
export type GetVoucherGroupByPayload<T extends VoucherGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<VoucherGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof VoucherGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], VoucherGroupByOutputType[P]> : Prisma.GetScalarType<T[P], VoucherGroupByOutputType[P]>;
}>>;
export type VoucherWhereInput = {
    AND?: Prisma.VoucherWhereInput | Prisma.VoucherWhereInput[];
    OR?: Prisma.VoucherWhereInput[];
    NOT?: Prisma.VoucherWhereInput | Prisma.VoucherWhereInput[];
    id?: Prisma.StringFilter<"Voucher"> | string;
    code?: Prisma.StringFilter<"Voucher"> | string;
    type?: Prisma.EnumVoucherTypeFilter<"Voucher"> | $Enums.VoucherType;
    source?: Prisma.EnumVoucherSourceFilter<"Voucher"> | $Enums.VoucherSource;
    value?: Prisma.DecimalFilter<"Voucher"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    minPurchase?: Prisma.DecimalFilter<"Voucher"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    maxDiscount?: Prisma.DecimalNullableFilter<"Voucher"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    usageLimit?: Prisma.IntNullableFilter<"Voucher"> | number | null;
    usedCount?: Prisma.IntFilter<"Voucher"> | number;
    isActive?: Prisma.BoolFilter<"Voucher"> | boolean;
    startDate?: Prisma.DateTimeNullableFilter<"Voucher"> | Date | string | null;
    endDate?: Prisma.DateTimeNullableFilter<"Voucher"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Voucher"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Voucher"> | Date | string;
    ownerId?: Prisma.StringNullableFilter<"Voucher"> | string | null;
    owner?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    orders?: Prisma.OrderListRelationFilter;
};
export type VoucherOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    minPurchase?: Prisma.SortOrder;
    maxDiscount?: Prisma.SortOrderInput | Prisma.SortOrder;
    usageLimit?: Prisma.SortOrderInput | Prisma.SortOrder;
    usedCount?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    startDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    endDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    ownerId?: Prisma.SortOrderInput | Prisma.SortOrder;
    owner?: Prisma.UserOrderByWithRelationInput;
    orders?: Prisma.OrderOrderByRelationAggregateInput;
};
export type VoucherWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    code?: string;
    AND?: Prisma.VoucherWhereInput | Prisma.VoucherWhereInput[];
    OR?: Prisma.VoucherWhereInput[];
    NOT?: Prisma.VoucherWhereInput | Prisma.VoucherWhereInput[];
    type?: Prisma.EnumVoucherTypeFilter<"Voucher"> | $Enums.VoucherType;
    source?: Prisma.EnumVoucherSourceFilter<"Voucher"> | $Enums.VoucherSource;
    value?: Prisma.DecimalFilter<"Voucher"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    minPurchase?: Prisma.DecimalFilter<"Voucher"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    maxDiscount?: Prisma.DecimalNullableFilter<"Voucher"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    usageLimit?: Prisma.IntNullableFilter<"Voucher"> | number | null;
    usedCount?: Prisma.IntFilter<"Voucher"> | number;
    isActive?: Prisma.BoolFilter<"Voucher"> | boolean;
    startDate?: Prisma.DateTimeNullableFilter<"Voucher"> | Date | string | null;
    endDate?: Prisma.DateTimeNullableFilter<"Voucher"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Voucher"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Voucher"> | Date | string;
    ownerId?: Prisma.StringNullableFilter<"Voucher"> | string | null;
    owner?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    orders?: Prisma.OrderListRelationFilter;
}, "id" | "code">;
export type VoucherOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    minPurchase?: Prisma.SortOrder;
    maxDiscount?: Prisma.SortOrderInput | Prisma.SortOrder;
    usageLimit?: Prisma.SortOrderInput | Prisma.SortOrder;
    usedCount?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    startDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    endDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    ownerId?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.VoucherCountOrderByAggregateInput;
    _avg?: Prisma.VoucherAvgOrderByAggregateInput;
    _max?: Prisma.VoucherMaxOrderByAggregateInput;
    _min?: Prisma.VoucherMinOrderByAggregateInput;
    _sum?: Prisma.VoucherSumOrderByAggregateInput;
};
export type VoucherScalarWhereWithAggregatesInput = {
    AND?: Prisma.VoucherScalarWhereWithAggregatesInput | Prisma.VoucherScalarWhereWithAggregatesInput[];
    OR?: Prisma.VoucherScalarWhereWithAggregatesInput[];
    NOT?: Prisma.VoucherScalarWhereWithAggregatesInput | Prisma.VoucherScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Voucher"> | string;
    code?: Prisma.StringWithAggregatesFilter<"Voucher"> | string;
    type?: Prisma.EnumVoucherTypeWithAggregatesFilter<"Voucher"> | $Enums.VoucherType;
    source?: Prisma.EnumVoucherSourceWithAggregatesFilter<"Voucher"> | $Enums.VoucherSource;
    value?: Prisma.DecimalWithAggregatesFilter<"Voucher"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    minPurchase?: Prisma.DecimalWithAggregatesFilter<"Voucher"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    maxDiscount?: Prisma.DecimalNullableWithAggregatesFilter<"Voucher"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    usageLimit?: Prisma.IntNullableWithAggregatesFilter<"Voucher"> | number | null;
    usedCount?: Prisma.IntWithAggregatesFilter<"Voucher"> | number;
    isActive?: Prisma.BoolWithAggregatesFilter<"Voucher"> | boolean;
    startDate?: Prisma.DateTimeNullableWithAggregatesFilter<"Voucher"> | Date | string | null;
    endDate?: Prisma.DateTimeNullableWithAggregatesFilter<"Voucher"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Voucher"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Voucher"> | Date | string;
    ownerId?: Prisma.StringNullableWithAggregatesFilter<"Voucher"> | string | null;
};
export type VoucherCreateInput = {
    id?: string;
    code: string;
    type: $Enums.VoucherType;
    source?: $Enums.VoucherSource;
    value: runtime.Decimal | runtime.DecimalJsLike | number | string;
    minPurchase?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    maxDiscount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    usageLimit?: number | null;
    usedCount?: number;
    isActive?: boolean;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    owner?: Prisma.UserCreateNestedOneWithoutVouchersInput;
    orders?: Prisma.OrderCreateNestedManyWithoutVoucherInput;
};
export type VoucherUncheckedCreateInput = {
    id?: string;
    code: string;
    type: $Enums.VoucherType;
    source?: $Enums.VoucherSource;
    value: runtime.Decimal | runtime.DecimalJsLike | number | string;
    minPurchase?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    maxDiscount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    usageLimit?: number | null;
    usedCount?: number;
    isActive?: boolean;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    ownerId?: string | null;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutVoucherInput;
};
export type VoucherUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumVoucherTypeFieldUpdateOperationsInput | $Enums.VoucherType;
    source?: Prisma.EnumVoucherSourceFieldUpdateOperationsInput | $Enums.VoucherSource;
    value?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    minPurchase?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    maxDiscount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    usageLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    owner?: Prisma.UserUpdateOneWithoutVouchersNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutVoucherNestedInput;
};
export type VoucherUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumVoucherTypeFieldUpdateOperationsInput | $Enums.VoucherType;
    source?: Prisma.EnumVoucherSourceFieldUpdateOperationsInput | $Enums.VoucherSource;
    value?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    minPurchase?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    maxDiscount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    usageLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ownerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutVoucherNestedInput;
};
export type VoucherCreateManyInput = {
    id?: string;
    code: string;
    type: $Enums.VoucherType;
    source?: $Enums.VoucherSource;
    value: runtime.Decimal | runtime.DecimalJsLike | number | string;
    minPurchase?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    maxDiscount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    usageLimit?: number | null;
    usedCount?: number;
    isActive?: boolean;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    ownerId?: string | null;
};
export type VoucherUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumVoucherTypeFieldUpdateOperationsInput | $Enums.VoucherType;
    source?: Prisma.EnumVoucherSourceFieldUpdateOperationsInput | $Enums.VoucherSource;
    value?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    minPurchase?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    maxDiscount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    usageLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VoucherUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumVoucherTypeFieldUpdateOperationsInput | $Enums.VoucherType;
    source?: Prisma.EnumVoucherSourceFieldUpdateOperationsInput | $Enums.VoucherSource;
    value?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    minPurchase?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    maxDiscount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    usageLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ownerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type VoucherListRelationFilter = {
    every?: Prisma.VoucherWhereInput;
    some?: Prisma.VoucherWhereInput;
    none?: Prisma.VoucherWhereInput;
};
export type VoucherOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type VoucherCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    minPurchase?: Prisma.SortOrder;
    maxDiscount?: Prisma.SortOrder;
    usageLimit?: Prisma.SortOrder;
    usedCount?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    ownerId?: Prisma.SortOrder;
};
export type VoucherAvgOrderByAggregateInput = {
    value?: Prisma.SortOrder;
    minPurchase?: Prisma.SortOrder;
    maxDiscount?: Prisma.SortOrder;
    usageLimit?: Prisma.SortOrder;
    usedCount?: Prisma.SortOrder;
};
export type VoucherMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    minPurchase?: Prisma.SortOrder;
    maxDiscount?: Prisma.SortOrder;
    usageLimit?: Prisma.SortOrder;
    usedCount?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    ownerId?: Prisma.SortOrder;
};
export type VoucherMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    minPurchase?: Prisma.SortOrder;
    maxDiscount?: Prisma.SortOrder;
    usageLimit?: Prisma.SortOrder;
    usedCount?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    ownerId?: Prisma.SortOrder;
};
export type VoucherSumOrderByAggregateInput = {
    value?: Prisma.SortOrder;
    minPurchase?: Prisma.SortOrder;
    maxDiscount?: Prisma.SortOrder;
    usageLimit?: Prisma.SortOrder;
    usedCount?: Prisma.SortOrder;
};
export type VoucherNullableScalarRelationFilter = {
    is?: Prisma.VoucherWhereInput | null;
    isNot?: Prisma.VoucherWhereInput | null;
};
export type VoucherCreateNestedManyWithoutOwnerInput = {
    create?: Prisma.XOR<Prisma.VoucherCreateWithoutOwnerInput, Prisma.VoucherUncheckedCreateWithoutOwnerInput> | Prisma.VoucherCreateWithoutOwnerInput[] | Prisma.VoucherUncheckedCreateWithoutOwnerInput[];
    connectOrCreate?: Prisma.VoucherCreateOrConnectWithoutOwnerInput | Prisma.VoucherCreateOrConnectWithoutOwnerInput[];
    createMany?: Prisma.VoucherCreateManyOwnerInputEnvelope;
    connect?: Prisma.VoucherWhereUniqueInput | Prisma.VoucherWhereUniqueInput[];
};
export type VoucherUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: Prisma.XOR<Prisma.VoucherCreateWithoutOwnerInput, Prisma.VoucherUncheckedCreateWithoutOwnerInput> | Prisma.VoucherCreateWithoutOwnerInput[] | Prisma.VoucherUncheckedCreateWithoutOwnerInput[];
    connectOrCreate?: Prisma.VoucherCreateOrConnectWithoutOwnerInput | Prisma.VoucherCreateOrConnectWithoutOwnerInput[];
    createMany?: Prisma.VoucherCreateManyOwnerInputEnvelope;
    connect?: Prisma.VoucherWhereUniqueInput | Prisma.VoucherWhereUniqueInput[];
};
export type VoucherUpdateManyWithoutOwnerNestedInput = {
    create?: Prisma.XOR<Prisma.VoucherCreateWithoutOwnerInput, Prisma.VoucherUncheckedCreateWithoutOwnerInput> | Prisma.VoucherCreateWithoutOwnerInput[] | Prisma.VoucherUncheckedCreateWithoutOwnerInput[];
    connectOrCreate?: Prisma.VoucherCreateOrConnectWithoutOwnerInput | Prisma.VoucherCreateOrConnectWithoutOwnerInput[];
    upsert?: Prisma.VoucherUpsertWithWhereUniqueWithoutOwnerInput | Prisma.VoucherUpsertWithWhereUniqueWithoutOwnerInput[];
    createMany?: Prisma.VoucherCreateManyOwnerInputEnvelope;
    set?: Prisma.VoucherWhereUniqueInput | Prisma.VoucherWhereUniqueInput[];
    disconnect?: Prisma.VoucherWhereUniqueInput | Prisma.VoucherWhereUniqueInput[];
    delete?: Prisma.VoucherWhereUniqueInput | Prisma.VoucherWhereUniqueInput[];
    connect?: Prisma.VoucherWhereUniqueInput | Prisma.VoucherWhereUniqueInput[];
    update?: Prisma.VoucherUpdateWithWhereUniqueWithoutOwnerInput | Prisma.VoucherUpdateWithWhereUniqueWithoutOwnerInput[];
    updateMany?: Prisma.VoucherUpdateManyWithWhereWithoutOwnerInput | Prisma.VoucherUpdateManyWithWhereWithoutOwnerInput[];
    deleteMany?: Prisma.VoucherScalarWhereInput | Prisma.VoucherScalarWhereInput[];
};
export type VoucherUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: Prisma.XOR<Prisma.VoucherCreateWithoutOwnerInput, Prisma.VoucherUncheckedCreateWithoutOwnerInput> | Prisma.VoucherCreateWithoutOwnerInput[] | Prisma.VoucherUncheckedCreateWithoutOwnerInput[];
    connectOrCreate?: Prisma.VoucherCreateOrConnectWithoutOwnerInput | Prisma.VoucherCreateOrConnectWithoutOwnerInput[];
    upsert?: Prisma.VoucherUpsertWithWhereUniqueWithoutOwnerInput | Prisma.VoucherUpsertWithWhereUniqueWithoutOwnerInput[];
    createMany?: Prisma.VoucherCreateManyOwnerInputEnvelope;
    set?: Prisma.VoucherWhereUniqueInput | Prisma.VoucherWhereUniqueInput[];
    disconnect?: Prisma.VoucherWhereUniqueInput | Prisma.VoucherWhereUniqueInput[];
    delete?: Prisma.VoucherWhereUniqueInput | Prisma.VoucherWhereUniqueInput[];
    connect?: Prisma.VoucherWhereUniqueInput | Prisma.VoucherWhereUniqueInput[];
    update?: Prisma.VoucherUpdateWithWhereUniqueWithoutOwnerInput | Prisma.VoucherUpdateWithWhereUniqueWithoutOwnerInput[];
    updateMany?: Prisma.VoucherUpdateManyWithWhereWithoutOwnerInput | Prisma.VoucherUpdateManyWithWhereWithoutOwnerInput[];
    deleteMany?: Prisma.VoucherScalarWhereInput | Prisma.VoucherScalarWhereInput[];
};
export type EnumVoucherTypeFieldUpdateOperationsInput = {
    set?: $Enums.VoucherType;
};
export type EnumVoucherSourceFieldUpdateOperationsInput = {
    set?: $Enums.VoucherSource;
};
export type VoucherCreateNestedOneWithoutOrdersInput = {
    create?: Prisma.XOR<Prisma.VoucherCreateWithoutOrdersInput, Prisma.VoucherUncheckedCreateWithoutOrdersInput>;
    connectOrCreate?: Prisma.VoucherCreateOrConnectWithoutOrdersInput;
    connect?: Prisma.VoucherWhereUniqueInput;
};
export type VoucherUpdateOneWithoutOrdersNestedInput = {
    create?: Prisma.XOR<Prisma.VoucherCreateWithoutOrdersInput, Prisma.VoucherUncheckedCreateWithoutOrdersInput>;
    connectOrCreate?: Prisma.VoucherCreateOrConnectWithoutOrdersInput;
    upsert?: Prisma.VoucherUpsertWithoutOrdersInput;
    disconnect?: Prisma.VoucherWhereInput | boolean;
    delete?: Prisma.VoucherWhereInput | boolean;
    connect?: Prisma.VoucherWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.VoucherUpdateToOneWithWhereWithoutOrdersInput, Prisma.VoucherUpdateWithoutOrdersInput>, Prisma.VoucherUncheckedUpdateWithoutOrdersInput>;
};
export type VoucherCreateWithoutOwnerInput = {
    id?: string;
    code: string;
    type: $Enums.VoucherType;
    source?: $Enums.VoucherSource;
    value: runtime.Decimal | runtime.DecimalJsLike | number | string;
    minPurchase?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    maxDiscount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    usageLimit?: number | null;
    usedCount?: number;
    isActive?: boolean;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    orders?: Prisma.OrderCreateNestedManyWithoutVoucherInput;
};
export type VoucherUncheckedCreateWithoutOwnerInput = {
    id?: string;
    code: string;
    type: $Enums.VoucherType;
    source?: $Enums.VoucherSource;
    value: runtime.Decimal | runtime.DecimalJsLike | number | string;
    minPurchase?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    maxDiscount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    usageLimit?: number | null;
    usedCount?: number;
    isActive?: boolean;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutVoucherInput;
};
export type VoucherCreateOrConnectWithoutOwnerInput = {
    where: Prisma.VoucherWhereUniqueInput;
    create: Prisma.XOR<Prisma.VoucherCreateWithoutOwnerInput, Prisma.VoucherUncheckedCreateWithoutOwnerInput>;
};
export type VoucherCreateManyOwnerInputEnvelope = {
    data: Prisma.VoucherCreateManyOwnerInput | Prisma.VoucherCreateManyOwnerInput[];
    skipDuplicates?: boolean;
};
export type VoucherUpsertWithWhereUniqueWithoutOwnerInput = {
    where: Prisma.VoucherWhereUniqueInput;
    update: Prisma.XOR<Prisma.VoucherUpdateWithoutOwnerInput, Prisma.VoucherUncheckedUpdateWithoutOwnerInput>;
    create: Prisma.XOR<Prisma.VoucherCreateWithoutOwnerInput, Prisma.VoucherUncheckedCreateWithoutOwnerInput>;
};
export type VoucherUpdateWithWhereUniqueWithoutOwnerInput = {
    where: Prisma.VoucherWhereUniqueInput;
    data: Prisma.XOR<Prisma.VoucherUpdateWithoutOwnerInput, Prisma.VoucherUncheckedUpdateWithoutOwnerInput>;
};
export type VoucherUpdateManyWithWhereWithoutOwnerInput = {
    where: Prisma.VoucherScalarWhereInput;
    data: Prisma.XOR<Prisma.VoucherUpdateManyMutationInput, Prisma.VoucherUncheckedUpdateManyWithoutOwnerInput>;
};
export type VoucherScalarWhereInput = {
    AND?: Prisma.VoucherScalarWhereInput | Prisma.VoucherScalarWhereInput[];
    OR?: Prisma.VoucherScalarWhereInput[];
    NOT?: Prisma.VoucherScalarWhereInput | Prisma.VoucherScalarWhereInput[];
    id?: Prisma.StringFilter<"Voucher"> | string;
    code?: Prisma.StringFilter<"Voucher"> | string;
    type?: Prisma.EnumVoucherTypeFilter<"Voucher"> | $Enums.VoucherType;
    source?: Prisma.EnumVoucherSourceFilter<"Voucher"> | $Enums.VoucherSource;
    value?: Prisma.DecimalFilter<"Voucher"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    minPurchase?: Prisma.DecimalFilter<"Voucher"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    maxDiscount?: Prisma.DecimalNullableFilter<"Voucher"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    usageLimit?: Prisma.IntNullableFilter<"Voucher"> | number | null;
    usedCount?: Prisma.IntFilter<"Voucher"> | number;
    isActive?: Prisma.BoolFilter<"Voucher"> | boolean;
    startDate?: Prisma.DateTimeNullableFilter<"Voucher"> | Date | string | null;
    endDate?: Prisma.DateTimeNullableFilter<"Voucher"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Voucher"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Voucher"> | Date | string;
    ownerId?: Prisma.StringNullableFilter<"Voucher"> | string | null;
};
export type VoucherCreateWithoutOrdersInput = {
    id?: string;
    code: string;
    type: $Enums.VoucherType;
    source?: $Enums.VoucherSource;
    value: runtime.Decimal | runtime.DecimalJsLike | number | string;
    minPurchase?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    maxDiscount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    usageLimit?: number | null;
    usedCount?: number;
    isActive?: boolean;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    owner?: Prisma.UserCreateNestedOneWithoutVouchersInput;
};
export type VoucherUncheckedCreateWithoutOrdersInput = {
    id?: string;
    code: string;
    type: $Enums.VoucherType;
    source?: $Enums.VoucherSource;
    value: runtime.Decimal | runtime.DecimalJsLike | number | string;
    minPurchase?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    maxDiscount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    usageLimit?: number | null;
    usedCount?: number;
    isActive?: boolean;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    ownerId?: string | null;
};
export type VoucherCreateOrConnectWithoutOrdersInput = {
    where: Prisma.VoucherWhereUniqueInput;
    create: Prisma.XOR<Prisma.VoucherCreateWithoutOrdersInput, Prisma.VoucherUncheckedCreateWithoutOrdersInput>;
};
export type VoucherUpsertWithoutOrdersInput = {
    update: Prisma.XOR<Prisma.VoucherUpdateWithoutOrdersInput, Prisma.VoucherUncheckedUpdateWithoutOrdersInput>;
    create: Prisma.XOR<Prisma.VoucherCreateWithoutOrdersInput, Prisma.VoucherUncheckedCreateWithoutOrdersInput>;
    where?: Prisma.VoucherWhereInput;
};
export type VoucherUpdateToOneWithWhereWithoutOrdersInput = {
    where?: Prisma.VoucherWhereInput;
    data: Prisma.XOR<Prisma.VoucherUpdateWithoutOrdersInput, Prisma.VoucherUncheckedUpdateWithoutOrdersInput>;
};
export type VoucherUpdateWithoutOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumVoucherTypeFieldUpdateOperationsInput | $Enums.VoucherType;
    source?: Prisma.EnumVoucherSourceFieldUpdateOperationsInput | $Enums.VoucherSource;
    value?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    minPurchase?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    maxDiscount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    usageLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    owner?: Prisma.UserUpdateOneWithoutVouchersNestedInput;
};
export type VoucherUncheckedUpdateWithoutOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumVoucherTypeFieldUpdateOperationsInput | $Enums.VoucherType;
    source?: Prisma.EnumVoucherSourceFieldUpdateOperationsInput | $Enums.VoucherSource;
    value?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    minPurchase?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    maxDiscount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    usageLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ownerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type VoucherCreateManyOwnerInput = {
    id?: string;
    code: string;
    type: $Enums.VoucherType;
    source?: $Enums.VoucherSource;
    value: runtime.Decimal | runtime.DecimalJsLike | number | string;
    minPurchase?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    maxDiscount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    usageLimit?: number | null;
    usedCount?: number;
    isActive?: boolean;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type VoucherUpdateWithoutOwnerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumVoucherTypeFieldUpdateOperationsInput | $Enums.VoucherType;
    source?: Prisma.EnumVoucherSourceFieldUpdateOperationsInput | $Enums.VoucherSource;
    value?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    minPurchase?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    maxDiscount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    usageLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    orders?: Prisma.OrderUpdateManyWithoutVoucherNestedInput;
};
export type VoucherUncheckedUpdateWithoutOwnerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumVoucherTypeFieldUpdateOperationsInput | $Enums.VoucherType;
    source?: Prisma.EnumVoucherSourceFieldUpdateOperationsInput | $Enums.VoucherSource;
    value?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    minPurchase?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    maxDiscount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    usageLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutVoucherNestedInput;
};
export type VoucherUncheckedUpdateManyWithoutOwnerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumVoucherTypeFieldUpdateOperationsInput | $Enums.VoucherType;
    source?: Prisma.EnumVoucherSourceFieldUpdateOperationsInput | $Enums.VoucherSource;
    value?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    minPurchase?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    maxDiscount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    usageLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VoucherCountOutputType = {
    orders: number;
};
export type VoucherCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    orders?: boolean | VoucherCountOutputTypeCountOrdersArgs;
};
export type VoucherCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VoucherCountOutputTypeSelect<ExtArgs> | null;
};
export type VoucherCountOutputTypeCountOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderWhereInput;
};
export type VoucherSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    type?: boolean;
    source?: boolean;
    value?: boolean;
    minPurchase?: boolean;
    maxDiscount?: boolean;
    usageLimit?: boolean;
    usedCount?: boolean;
    isActive?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    ownerId?: boolean;
    owner?: boolean | Prisma.Voucher$ownerArgs<ExtArgs>;
    orders?: boolean | Prisma.Voucher$ordersArgs<ExtArgs>;
    _count?: boolean | Prisma.VoucherCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["voucher"]>;
export type VoucherSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    type?: boolean;
    source?: boolean;
    value?: boolean;
    minPurchase?: boolean;
    maxDiscount?: boolean;
    usageLimit?: boolean;
    usedCount?: boolean;
    isActive?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    ownerId?: boolean;
    owner?: boolean | Prisma.Voucher$ownerArgs<ExtArgs>;
}, ExtArgs["result"]["voucher"]>;
export type VoucherSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    type?: boolean;
    source?: boolean;
    value?: boolean;
    minPurchase?: boolean;
    maxDiscount?: boolean;
    usageLimit?: boolean;
    usedCount?: boolean;
    isActive?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    ownerId?: boolean;
    owner?: boolean | Prisma.Voucher$ownerArgs<ExtArgs>;
}, ExtArgs["result"]["voucher"]>;
export type VoucherSelectScalar = {
    id?: boolean;
    code?: boolean;
    type?: boolean;
    source?: boolean;
    value?: boolean;
    minPurchase?: boolean;
    maxDiscount?: boolean;
    usageLimit?: boolean;
    usedCount?: boolean;
    isActive?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    ownerId?: boolean;
};
export type VoucherOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "code" | "type" | "source" | "value" | "minPurchase" | "maxDiscount" | "usageLimit" | "usedCount" | "isActive" | "startDate" | "endDate" | "createdAt" | "updatedAt" | "ownerId", ExtArgs["result"]["voucher"]>;
export type VoucherInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    owner?: boolean | Prisma.Voucher$ownerArgs<ExtArgs>;
    orders?: boolean | Prisma.Voucher$ordersArgs<ExtArgs>;
    _count?: boolean | Prisma.VoucherCountOutputTypeDefaultArgs<ExtArgs>;
};
export type VoucherIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    owner?: boolean | Prisma.Voucher$ownerArgs<ExtArgs>;
};
export type VoucherIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    owner?: boolean | Prisma.Voucher$ownerArgs<ExtArgs>;
};
export type $VoucherPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Voucher";
    objects: {
        owner: Prisma.$UserPayload<ExtArgs> | null;
        orders: Prisma.$OrderPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        code: string;
        type: $Enums.VoucherType;
        source: $Enums.VoucherSource;
        value: runtime.Decimal;
        minPurchase: runtime.Decimal;
        maxDiscount: runtime.Decimal | null;
        usageLimit: number | null;
        usedCount: number;
        isActive: boolean;
        startDate: Date | null;
        endDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        ownerId: string | null;
    }, ExtArgs["result"]["voucher"]>;
    composites: {};
};
export type VoucherGetPayload<S extends boolean | null | undefined | VoucherDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$VoucherPayload, S>;
export type VoucherCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<VoucherFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: VoucherCountAggregateInputType | true;
};
export interface VoucherDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Voucher'];
        meta: {
            name: 'Voucher';
        };
    };
    findUnique<T extends VoucherFindUniqueArgs>(args: Prisma.SelectSubset<T, VoucherFindUniqueArgs<ExtArgs>>): Prisma.Prisma__VoucherClient<runtime.Types.Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends VoucherFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, VoucherFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__VoucherClient<runtime.Types.Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends VoucherFindFirstArgs>(args?: Prisma.SelectSubset<T, VoucherFindFirstArgs<ExtArgs>>): Prisma.Prisma__VoucherClient<runtime.Types.Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends VoucherFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, VoucherFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__VoucherClient<runtime.Types.Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends VoucherFindManyArgs>(args?: Prisma.SelectSubset<T, VoucherFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends VoucherCreateArgs>(args: Prisma.SelectSubset<T, VoucherCreateArgs<ExtArgs>>): Prisma.Prisma__VoucherClient<runtime.Types.Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends VoucherCreateManyArgs>(args?: Prisma.SelectSubset<T, VoucherCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends VoucherCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, VoucherCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends VoucherDeleteArgs>(args: Prisma.SelectSubset<T, VoucherDeleteArgs<ExtArgs>>): Prisma.Prisma__VoucherClient<runtime.Types.Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends VoucherUpdateArgs>(args: Prisma.SelectSubset<T, VoucherUpdateArgs<ExtArgs>>): Prisma.Prisma__VoucherClient<runtime.Types.Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends VoucherDeleteManyArgs>(args?: Prisma.SelectSubset<T, VoucherDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends VoucherUpdateManyArgs>(args: Prisma.SelectSubset<T, VoucherUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends VoucherUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, VoucherUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends VoucherUpsertArgs>(args: Prisma.SelectSubset<T, VoucherUpsertArgs<ExtArgs>>): Prisma.Prisma__VoucherClient<runtime.Types.Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends VoucherCountArgs>(args?: Prisma.Subset<T, VoucherCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], VoucherCountAggregateOutputType> : number>;
    aggregate<T extends VoucherAggregateArgs>(args: Prisma.Subset<T, VoucherAggregateArgs>): Prisma.PrismaPromise<GetVoucherAggregateType<T>>;
    groupBy<T extends VoucherGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: VoucherGroupByArgs['orderBy'];
    } : {
        orderBy?: VoucherGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, VoucherGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVoucherGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: VoucherFieldRefs;
}
export interface Prisma__VoucherClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    owner<T extends Prisma.Voucher$ownerArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Voucher$ownerArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    orders<T extends Prisma.Voucher$ordersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Voucher$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface VoucherFieldRefs {
    readonly id: Prisma.FieldRef<"Voucher", 'String'>;
    readonly code: Prisma.FieldRef<"Voucher", 'String'>;
    readonly type: Prisma.FieldRef<"Voucher", 'VoucherType'>;
    readonly source: Prisma.FieldRef<"Voucher", 'VoucherSource'>;
    readonly value: Prisma.FieldRef<"Voucher", 'Decimal'>;
    readonly minPurchase: Prisma.FieldRef<"Voucher", 'Decimal'>;
    readonly maxDiscount: Prisma.FieldRef<"Voucher", 'Decimal'>;
    readonly usageLimit: Prisma.FieldRef<"Voucher", 'Int'>;
    readonly usedCount: Prisma.FieldRef<"Voucher", 'Int'>;
    readonly isActive: Prisma.FieldRef<"Voucher", 'Boolean'>;
    readonly startDate: Prisma.FieldRef<"Voucher", 'DateTime'>;
    readonly endDate: Prisma.FieldRef<"Voucher", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Voucher", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Voucher", 'DateTime'>;
    readonly ownerId: Prisma.FieldRef<"Voucher", 'String'>;
}
export type VoucherFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VoucherSelect<ExtArgs> | null;
    omit?: Prisma.VoucherOmit<ExtArgs> | null;
    include?: Prisma.VoucherInclude<ExtArgs> | null;
    where: Prisma.VoucherWhereUniqueInput;
};
export type VoucherFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VoucherSelect<ExtArgs> | null;
    omit?: Prisma.VoucherOmit<ExtArgs> | null;
    include?: Prisma.VoucherInclude<ExtArgs> | null;
    where: Prisma.VoucherWhereUniqueInput;
};
export type VoucherFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VoucherSelect<ExtArgs> | null;
    omit?: Prisma.VoucherOmit<ExtArgs> | null;
    include?: Prisma.VoucherInclude<ExtArgs> | null;
    where?: Prisma.VoucherWhereInput;
    orderBy?: Prisma.VoucherOrderByWithRelationInput | Prisma.VoucherOrderByWithRelationInput[];
    cursor?: Prisma.VoucherWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VoucherScalarFieldEnum | Prisma.VoucherScalarFieldEnum[];
};
export type VoucherFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VoucherSelect<ExtArgs> | null;
    omit?: Prisma.VoucherOmit<ExtArgs> | null;
    include?: Prisma.VoucherInclude<ExtArgs> | null;
    where?: Prisma.VoucherWhereInput;
    orderBy?: Prisma.VoucherOrderByWithRelationInput | Prisma.VoucherOrderByWithRelationInput[];
    cursor?: Prisma.VoucherWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VoucherScalarFieldEnum | Prisma.VoucherScalarFieldEnum[];
};
export type VoucherFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VoucherSelect<ExtArgs> | null;
    omit?: Prisma.VoucherOmit<ExtArgs> | null;
    include?: Prisma.VoucherInclude<ExtArgs> | null;
    where?: Prisma.VoucherWhereInput;
    orderBy?: Prisma.VoucherOrderByWithRelationInput | Prisma.VoucherOrderByWithRelationInput[];
    cursor?: Prisma.VoucherWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VoucherScalarFieldEnum | Prisma.VoucherScalarFieldEnum[];
};
export type VoucherCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VoucherSelect<ExtArgs> | null;
    omit?: Prisma.VoucherOmit<ExtArgs> | null;
    include?: Prisma.VoucherInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VoucherCreateInput, Prisma.VoucherUncheckedCreateInput>;
};
export type VoucherCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.VoucherCreateManyInput | Prisma.VoucherCreateManyInput[];
    skipDuplicates?: boolean;
};
export type VoucherCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VoucherSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.VoucherOmit<ExtArgs> | null;
    data: Prisma.VoucherCreateManyInput | Prisma.VoucherCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.VoucherIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type VoucherUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VoucherSelect<ExtArgs> | null;
    omit?: Prisma.VoucherOmit<ExtArgs> | null;
    include?: Prisma.VoucherInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VoucherUpdateInput, Prisma.VoucherUncheckedUpdateInput>;
    where: Prisma.VoucherWhereUniqueInput;
};
export type VoucherUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.VoucherUpdateManyMutationInput, Prisma.VoucherUncheckedUpdateManyInput>;
    where?: Prisma.VoucherWhereInput;
    limit?: number;
};
export type VoucherUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VoucherSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.VoucherOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VoucherUpdateManyMutationInput, Prisma.VoucherUncheckedUpdateManyInput>;
    where?: Prisma.VoucherWhereInput;
    limit?: number;
    include?: Prisma.VoucherIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type VoucherUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VoucherSelect<ExtArgs> | null;
    omit?: Prisma.VoucherOmit<ExtArgs> | null;
    include?: Prisma.VoucherInclude<ExtArgs> | null;
    where: Prisma.VoucherWhereUniqueInput;
    create: Prisma.XOR<Prisma.VoucherCreateInput, Prisma.VoucherUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.VoucherUpdateInput, Prisma.VoucherUncheckedUpdateInput>;
};
export type VoucherDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VoucherSelect<ExtArgs> | null;
    omit?: Prisma.VoucherOmit<ExtArgs> | null;
    include?: Prisma.VoucherInclude<ExtArgs> | null;
    where: Prisma.VoucherWhereUniqueInput;
};
export type VoucherDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VoucherWhereInput;
    limit?: number;
};
export type Voucher$ownerArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type Voucher$ordersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderSelect<ExtArgs> | null;
    omit?: Prisma.OrderOmit<ExtArgs> | null;
    include?: Prisma.OrderInclude<ExtArgs> | null;
    where?: Prisma.OrderWhereInput;
    orderBy?: Prisma.OrderOrderByWithRelationInput | Prisma.OrderOrderByWithRelationInput[];
    cursor?: Prisma.OrderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrderScalarFieldEnum | Prisma.OrderScalarFieldEnum[];
};
export type VoucherDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VoucherSelect<ExtArgs> | null;
    omit?: Prisma.VoucherOmit<ExtArgs> | null;
    include?: Prisma.VoucherInclude<ExtArgs> | null;
};
