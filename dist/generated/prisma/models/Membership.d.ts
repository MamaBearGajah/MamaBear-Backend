import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type MembershipModel = runtime.Types.Result.DefaultSelection<Prisma.$MembershipPayload>;
export type AggregateMembership = {
    _count: MembershipCountAggregateOutputType | null;
    _avg: MembershipAvgAggregateOutputType | null;
    _sum: MembershipSumAggregateOutputType | null;
    _min: MembershipMinAggregateOutputType | null;
    _max: MembershipMaxAggregateOutputType | null;
};
export type MembershipAvgAggregateOutputType = {
    points: number | null;
    totalSpent: runtime.Decimal | null;
};
export type MembershipSumAggregateOutputType = {
    points: number | null;
    totalSpent: runtime.Decimal | null;
};
export type MembershipMinAggregateOutputType = {
    userId: string | null;
    tier: $Enums.MembershipTier | null;
    points: number | null;
    totalSpent: runtime.Decimal | null;
    pointsExpiredAt: Date | null;
    lastDailyLoginAt: Date | null;
    lastTierUpAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type MembershipMaxAggregateOutputType = {
    userId: string | null;
    tier: $Enums.MembershipTier | null;
    points: number | null;
    totalSpent: runtime.Decimal | null;
    pointsExpiredAt: Date | null;
    lastDailyLoginAt: Date | null;
    lastTierUpAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type MembershipCountAggregateOutputType = {
    userId: number;
    tier: number;
    points: number;
    totalSpent: number;
    pointsExpiredAt: number;
    lastDailyLoginAt: number;
    lastTierUpAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type MembershipAvgAggregateInputType = {
    points?: true;
    totalSpent?: true;
};
export type MembershipSumAggregateInputType = {
    points?: true;
    totalSpent?: true;
};
export type MembershipMinAggregateInputType = {
    userId?: true;
    tier?: true;
    points?: true;
    totalSpent?: true;
    pointsExpiredAt?: true;
    lastDailyLoginAt?: true;
    lastTierUpAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type MembershipMaxAggregateInputType = {
    userId?: true;
    tier?: true;
    points?: true;
    totalSpent?: true;
    pointsExpiredAt?: true;
    lastDailyLoginAt?: true;
    lastTierUpAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type MembershipCountAggregateInputType = {
    userId?: true;
    tier?: true;
    points?: true;
    totalSpent?: true;
    pointsExpiredAt?: true;
    lastDailyLoginAt?: true;
    lastTierUpAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type MembershipAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MembershipWhereInput;
    orderBy?: Prisma.MembershipOrderByWithRelationInput | Prisma.MembershipOrderByWithRelationInput[];
    cursor?: Prisma.MembershipWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | MembershipCountAggregateInputType;
    _avg?: MembershipAvgAggregateInputType;
    _sum?: MembershipSumAggregateInputType;
    _min?: MembershipMinAggregateInputType;
    _max?: MembershipMaxAggregateInputType;
};
export type GetMembershipAggregateType<T extends MembershipAggregateArgs> = {
    [P in keyof T & keyof AggregateMembership]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMembership[P]> : Prisma.GetScalarType<T[P], AggregateMembership[P]>;
};
export type MembershipGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MembershipWhereInput;
    orderBy?: Prisma.MembershipOrderByWithAggregationInput | Prisma.MembershipOrderByWithAggregationInput[];
    by: Prisma.MembershipScalarFieldEnum[] | Prisma.MembershipScalarFieldEnum;
    having?: Prisma.MembershipScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MembershipCountAggregateInputType | true;
    _avg?: MembershipAvgAggregateInputType;
    _sum?: MembershipSumAggregateInputType;
    _min?: MembershipMinAggregateInputType;
    _max?: MembershipMaxAggregateInputType;
};
export type MembershipGroupByOutputType = {
    userId: string;
    tier: $Enums.MembershipTier;
    points: number;
    totalSpent: runtime.Decimal;
    pointsExpiredAt: Date | null;
    lastDailyLoginAt: Date | null;
    lastTierUpAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: MembershipCountAggregateOutputType | null;
    _avg: MembershipAvgAggregateOutputType | null;
    _sum: MembershipSumAggregateOutputType | null;
    _min: MembershipMinAggregateOutputType | null;
    _max: MembershipMaxAggregateOutputType | null;
};
export type GetMembershipGroupByPayload<T extends MembershipGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MembershipGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MembershipGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MembershipGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MembershipGroupByOutputType[P]>;
}>>;
export type MembershipWhereInput = {
    AND?: Prisma.MembershipWhereInput | Prisma.MembershipWhereInput[];
    OR?: Prisma.MembershipWhereInput[];
    NOT?: Prisma.MembershipWhereInput | Prisma.MembershipWhereInput[];
    userId?: Prisma.StringFilter<"Membership"> | string;
    tier?: Prisma.EnumMembershipTierFilter<"Membership"> | $Enums.MembershipTier;
    points?: Prisma.IntFilter<"Membership"> | number;
    totalSpent?: Prisma.DecimalFilter<"Membership"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    pointsExpiredAt?: Prisma.DateTimeNullableFilter<"Membership"> | Date | string | null;
    lastDailyLoginAt?: Prisma.DateTimeNullableFilter<"Membership"> | Date | string | null;
    lastTierUpAt?: Prisma.DateTimeNullableFilter<"Membership"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Membership"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Membership"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type MembershipOrderByWithRelationInput = {
    userId?: Prisma.SortOrder;
    tier?: Prisma.SortOrder;
    points?: Prisma.SortOrder;
    totalSpent?: Prisma.SortOrder;
    pointsExpiredAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastDailyLoginAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastTierUpAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type MembershipWhereUniqueInput = Prisma.AtLeast<{
    userId?: string;
    AND?: Prisma.MembershipWhereInput | Prisma.MembershipWhereInput[];
    OR?: Prisma.MembershipWhereInput[];
    NOT?: Prisma.MembershipWhereInput | Prisma.MembershipWhereInput[];
    tier?: Prisma.EnumMembershipTierFilter<"Membership"> | $Enums.MembershipTier;
    points?: Prisma.IntFilter<"Membership"> | number;
    totalSpent?: Prisma.DecimalFilter<"Membership"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    pointsExpiredAt?: Prisma.DateTimeNullableFilter<"Membership"> | Date | string | null;
    lastDailyLoginAt?: Prisma.DateTimeNullableFilter<"Membership"> | Date | string | null;
    lastTierUpAt?: Prisma.DateTimeNullableFilter<"Membership"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Membership"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Membership"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "userId">;
export type MembershipOrderByWithAggregationInput = {
    userId?: Prisma.SortOrder;
    tier?: Prisma.SortOrder;
    points?: Prisma.SortOrder;
    totalSpent?: Prisma.SortOrder;
    pointsExpiredAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastDailyLoginAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastTierUpAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.MembershipCountOrderByAggregateInput;
    _avg?: Prisma.MembershipAvgOrderByAggregateInput;
    _max?: Prisma.MembershipMaxOrderByAggregateInput;
    _min?: Prisma.MembershipMinOrderByAggregateInput;
    _sum?: Prisma.MembershipSumOrderByAggregateInput;
};
export type MembershipScalarWhereWithAggregatesInput = {
    AND?: Prisma.MembershipScalarWhereWithAggregatesInput | Prisma.MembershipScalarWhereWithAggregatesInput[];
    OR?: Prisma.MembershipScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MembershipScalarWhereWithAggregatesInput | Prisma.MembershipScalarWhereWithAggregatesInput[];
    userId?: Prisma.StringWithAggregatesFilter<"Membership"> | string;
    tier?: Prisma.EnumMembershipTierWithAggregatesFilter<"Membership"> | $Enums.MembershipTier;
    points?: Prisma.IntWithAggregatesFilter<"Membership"> | number;
    totalSpent?: Prisma.DecimalWithAggregatesFilter<"Membership"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    pointsExpiredAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Membership"> | Date | string | null;
    lastDailyLoginAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Membership"> | Date | string | null;
    lastTierUpAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Membership"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Membership"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Membership"> | Date | string;
};
export type MembershipCreateInput = {
    tier?: $Enums.MembershipTier;
    points?: number;
    totalSpent?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    pointsExpiredAt?: Date | string | null;
    lastDailyLoginAt?: Date | string | null;
    lastTierUpAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutMembershipInput;
};
export type MembershipUncheckedCreateInput = {
    userId: string;
    tier?: $Enums.MembershipTier;
    points?: number;
    totalSpent?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    pointsExpiredAt?: Date | string | null;
    lastDailyLoginAt?: Date | string | null;
    lastTierUpAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MembershipUpdateInput = {
    tier?: Prisma.EnumMembershipTierFieldUpdateOperationsInput | $Enums.MembershipTier;
    points?: Prisma.IntFieldUpdateOperationsInput | number;
    totalSpent?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    pointsExpiredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastDailyLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastTierUpAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutMembershipNestedInput;
};
export type MembershipUncheckedUpdateInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    tier?: Prisma.EnumMembershipTierFieldUpdateOperationsInput | $Enums.MembershipTier;
    points?: Prisma.IntFieldUpdateOperationsInput | number;
    totalSpent?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    pointsExpiredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastDailyLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastTierUpAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MembershipCreateManyInput = {
    userId: string;
    tier?: $Enums.MembershipTier;
    points?: number;
    totalSpent?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    pointsExpiredAt?: Date | string | null;
    lastDailyLoginAt?: Date | string | null;
    lastTierUpAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MembershipUpdateManyMutationInput = {
    tier?: Prisma.EnumMembershipTierFieldUpdateOperationsInput | $Enums.MembershipTier;
    points?: Prisma.IntFieldUpdateOperationsInput | number;
    totalSpent?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    pointsExpiredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastDailyLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastTierUpAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MembershipUncheckedUpdateManyInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    tier?: Prisma.EnumMembershipTierFieldUpdateOperationsInput | $Enums.MembershipTier;
    points?: Prisma.IntFieldUpdateOperationsInput | number;
    totalSpent?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    pointsExpiredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastDailyLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastTierUpAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MembershipNullableScalarRelationFilter = {
    is?: Prisma.MembershipWhereInput | null;
    isNot?: Prisma.MembershipWhereInput | null;
};
export type MembershipCountOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    tier?: Prisma.SortOrder;
    points?: Prisma.SortOrder;
    totalSpent?: Prisma.SortOrder;
    pointsExpiredAt?: Prisma.SortOrder;
    lastDailyLoginAt?: Prisma.SortOrder;
    lastTierUpAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MembershipAvgOrderByAggregateInput = {
    points?: Prisma.SortOrder;
    totalSpent?: Prisma.SortOrder;
};
export type MembershipMaxOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    tier?: Prisma.SortOrder;
    points?: Prisma.SortOrder;
    totalSpent?: Prisma.SortOrder;
    pointsExpiredAt?: Prisma.SortOrder;
    lastDailyLoginAt?: Prisma.SortOrder;
    lastTierUpAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MembershipMinOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    tier?: Prisma.SortOrder;
    points?: Prisma.SortOrder;
    totalSpent?: Prisma.SortOrder;
    pointsExpiredAt?: Prisma.SortOrder;
    lastDailyLoginAt?: Prisma.SortOrder;
    lastTierUpAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MembershipSumOrderByAggregateInput = {
    points?: Prisma.SortOrder;
    totalSpent?: Prisma.SortOrder;
};
export type MembershipCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.MembershipCreateWithoutUserInput, Prisma.MembershipUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.MembershipCreateOrConnectWithoutUserInput;
    connect?: Prisma.MembershipWhereUniqueInput;
};
export type MembershipUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.MembershipCreateWithoutUserInput, Prisma.MembershipUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.MembershipCreateOrConnectWithoutUserInput;
    connect?: Prisma.MembershipWhereUniqueInput;
};
export type MembershipUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.MembershipCreateWithoutUserInput, Prisma.MembershipUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.MembershipCreateOrConnectWithoutUserInput;
    upsert?: Prisma.MembershipUpsertWithoutUserInput;
    disconnect?: Prisma.MembershipWhereInput | boolean;
    delete?: Prisma.MembershipWhereInput | boolean;
    connect?: Prisma.MembershipWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MembershipUpdateToOneWithWhereWithoutUserInput, Prisma.MembershipUpdateWithoutUserInput>, Prisma.MembershipUncheckedUpdateWithoutUserInput>;
};
export type MembershipUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.MembershipCreateWithoutUserInput, Prisma.MembershipUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.MembershipCreateOrConnectWithoutUserInput;
    upsert?: Prisma.MembershipUpsertWithoutUserInput;
    disconnect?: Prisma.MembershipWhereInput | boolean;
    delete?: Prisma.MembershipWhereInput | boolean;
    connect?: Prisma.MembershipWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MembershipUpdateToOneWithWhereWithoutUserInput, Prisma.MembershipUpdateWithoutUserInput>, Prisma.MembershipUncheckedUpdateWithoutUserInput>;
};
export type EnumMembershipTierFieldUpdateOperationsInput = {
    set?: $Enums.MembershipTier;
};
export type MembershipCreateWithoutUserInput = {
    tier?: $Enums.MembershipTier;
    points?: number;
    totalSpent?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    pointsExpiredAt?: Date | string | null;
    lastDailyLoginAt?: Date | string | null;
    lastTierUpAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MembershipUncheckedCreateWithoutUserInput = {
    tier?: $Enums.MembershipTier;
    points?: number;
    totalSpent?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    pointsExpiredAt?: Date | string | null;
    lastDailyLoginAt?: Date | string | null;
    lastTierUpAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MembershipCreateOrConnectWithoutUserInput = {
    where: Prisma.MembershipWhereUniqueInput;
    create: Prisma.XOR<Prisma.MembershipCreateWithoutUserInput, Prisma.MembershipUncheckedCreateWithoutUserInput>;
};
export type MembershipUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.MembershipUpdateWithoutUserInput, Prisma.MembershipUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.MembershipCreateWithoutUserInput, Prisma.MembershipUncheckedCreateWithoutUserInput>;
    where?: Prisma.MembershipWhereInput;
};
export type MembershipUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.MembershipWhereInput;
    data: Prisma.XOR<Prisma.MembershipUpdateWithoutUserInput, Prisma.MembershipUncheckedUpdateWithoutUserInput>;
};
export type MembershipUpdateWithoutUserInput = {
    tier?: Prisma.EnumMembershipTierFieldUpdateOperationsInput | $Enums.MembershipTier;
    points?: Prisma.IntFieldUpdateOperationsInput | number;
    totalSpent?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    pointsExpiredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastDailyLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastTierUpAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MembershipUncheckedUpdateWithoutUserInput = {
    tier?: Prisma.EnumMembershipTierFieldUpdateOperationsInput | $Enums.MembershipTier;
    points?: Prisma.IntFieldUpdateOperationsInput | number;
    totalSpent?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    pointsExpiredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastDailyLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastTierUpAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MembershipSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    userId?: boolean;
    tier?: boolean;
    points?: boolean;
    totalSpent?: boolean;
    pointsExpiredAt?: boolean;
    lastDailyLoginAt?: boolean;
    lastTierUpAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["membership"]>;
export type MembershipSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    userId?: boolean;
    tier?: boolean;
    points?: boolean;
    totalSpent?: boolean;
    pointsExpiredAt?: boolean;
    lastDailyLoginAt?: boolean;
    lastTierUpAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["membership"]>;
export type MembershipSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    userId?: boolean;
    tier?: boolean;
    points?: boolean;
    totalSpent?: boolean;
    pointsExpiredAt?: boolean;
    lastDailyLoginAt?: boolean;
    lastTierUpAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["membership"]>;
export type MembershipSelectScalar = {
    userId?: boolean;
    tier?: boolean;
    points?: boolean;
    totalSpent?: boolean;
    pointsExpiredAt?: boolean;
    lastDailyLoginAt?: boolean;
    lastTierUpAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type MembershipOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"userId" | "tier" | "points" | "totalSpent" | "pointsExpiredAt" | "lastDailyLoginAt" | "lastTierUpAt" | "createdAt" | "updatedAt", ExtArgs["result"]["membership"]>;
export type MembershipInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type MembershipIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type MembershipIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $MembershipPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Membership";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        userId: string;
        tier: $Enums.MembershipTier;
        points: number;
        totalSpent: runtime.Decimal;
        pointsExpiredAt: Date | null;
        lastDailyLoginAt: Date | null;
        lastTierUpAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["membership"]>;
    composites: {};
};
export type MembershipGetPayload<S extends boolean | null | undefined | MembershipDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MembershipPayload, S>;
export type MembershipCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MembershipFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MembershipCountAggregateInputType | true;
};
export interface MembershipDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Membership'];
        meta: {
            name: 'Membership';
        };
    };
    findUnique<T extends MembershipFindUniqueArgs>(args: Prisma.SelectSubset<T, MembershipFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MembershipClient<runtime.Types.Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends MembershipFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MembershipFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MembershipClient<runtime.Types.Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends MembershipFindFirstArgs>(args?: Prisma.SelectSubset<T, MembershipFindFirstArgs<ExtArgs>>): Prisma.Prisma__MembershipClient<runtime.Types.Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends MembershipFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MembershipFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MembershipClient<runtime.Types.Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends MembershipFindManyArgs>(args?: Prisma.SelectSubset<T, MembershipFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends MembershipCreateArgs>(args: Prisma.SelectSubset<T, MembershipCreateArgs<ExtArgs>>): Prisma.Prisma__MembershipClient<runtime.Types.Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends MembershipCreateManyArgs>(args?: Prisma.SelectSubset<T, MembershipCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends MembershipCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MembershipCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends MembershipDeleteArgs>(args: Prisma.SelectSubset<T, MembershipDeleteArgs<ExtArgs>>): Prisma.Prisma__MembershipClient<runtime.Types.Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends MembershipUpdateArgs>(args: Prisma.SelectSubset<T, MembershipUpdateArgs<ExtArgs>>): Prisma.Prisma__MembershipClient<runtime.Types.Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends MembershipDeleteManyArgs>(args?: Prisma.SelectSubset<T, MembershipDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends MembershipUpdateManyArgs>(args: Prisma.SelectSubset<T, MembershipUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends MembershipUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MembershipUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends MembershipUpsertArgs>(args: Prisma.SelectSubset<T, MembershipUpsertArgs<ExtArgs>>): Prisma.Prisma__MembershipClient<runtime.Types.Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends MembershipCountArgs>(args?: Prisma.Subset<T, MembershipCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MembershipCountAggregateOutputType> : number>;
    aggregate<T extends MembershipAggregateArgs>(args: Prisma.Subset<T, MembershipAggregateArgs>): Prisma.PrismaPromise<GetMembershipAggregateType<T>>;
    groupBy<T extends MembershipGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MembershipGroupByArgs['orderBy'];
    } : {
        orderBy?: MembershipGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MembershipGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMembershipGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: MembershipFieldRefs;
}
export interface Prisma__MembershipClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface MembershipFieldRefs {
    readonly userId: Prisma.FieldRef<"Membership", 'String'>;
    readonly tier: Prisma.FieldRef<"Membership", 'MembershipTier'>;
    readonly points: Prisma.FieldRef<"Membership", 'Int'>;
    readonly totalSpent: Prisma.FieldRef<"Membership", 'Decimal'>;
    readonly pointsExpiredAt: Prisma.FieldRef<"Membership", 'DateTime'>;
    readonly lastDailyLoginAt: Prisma.FieldRef<"Membership", 'DateTime'>;
    readonly lastTierUpAt: Prisma.FieldRef<"Membership", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Membership", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Membership", 'DateTime'>;
}
export type MembershipFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MembershipSelect<ExtArgs> | null;
    omit?: Prisma.MembershipOmit<ExtArgs> | null;
    include?: Prisma.MembershipInclude<ExtArgs> | null;
    where: Prisma.MembershipWhereUniqueInput;
};
export type MembershipFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MembershipSelect<ExtArgs> | null;
    omit?: Prisma.MembershipOmit<ExtArgs> | null;
    include?: Prisma.MembershipInclude<ExtArgs> | null;
    where: Prisma.MembershipWhereUniqueInput;
};
export type MembershipFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MembershipSelect<ExtArgs> | null;
    omit?: Prisma.MembershipOmit<ExtArgs> | null;
    include?: Prisma.MembershipInclude<ExtArgs> | null;
    where?: Prisma.MembershipWhereInput;
    orderBy?: Prisma.MembershipOrderByWithRelationInput | Prisma.MembershipOrderByWithRelationInput[];
    cursor?: Prisma.MembershipWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MembershipScalarFieldEnum | Prisma.MembershipScalarFieldEnum[];
};
export type MembershipFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MembershipSelect<ExtArgs> | null;
    omit?: Prisma.MembershipOmit<ExtArgs> | null;
    include?: Prisma.MembershipInclude<ExtArgs> | null;
    where?: Prisma.MembershipWhereInput;
    orderBy?: Prisma.MembershipOrderByWithRelationInput | Prisma.MembershipOrderByWithRelationInput[];
    cursor?: Prisma.MembershipWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MembershipScalarFieldEnum | Prisma.MembershipScalarFieldEnum[];
};
export type MembershipFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MembershipSelect<ExtArgs> | null;
    omit?: Prisma.MembershipOmit<ExtArgs> | null;
    include?: Prisma.MembershipInclude<ExtArgs> | null;
    where?: Prisma.MembershipWhereInput;
    orderBy?: Prisma.MembershipOrderByWithRelationInput | Prisma.MembershipOrderByWithRelationInput[];
    cursor?: Prisma.MembershipWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MembershipScalarFieldEnum | Prisma.MembershipScalarFieldEnum[];
};
export type MembershipCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MembershipSelect<ExtArgs> | null;
    omit?: Prisma.MembershipOmit<ExtArgs> | null;
    include?: Prisma.MembershipInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MembershipCreateInput, Prisma.MembershipUncheckedCreateInput>;
};
export type MembershipCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.MembershipCreateManyInput | Prisma.MembershipCreateManyInput[];
    skipDuplicates?: boolean;
};
export type MembershipCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MembershipSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MembershipOmit<ExtArgs> | null;
    data: Prisma.MembershipCreateManyInput | Prisma.MembershipCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.MembershipIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type MembershipUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MembershipSelect<ExtArgs> | null;
    omit?: Prisma.MembershipOmit<ExtArgs> | null;
    include?: Prisma.MembershipInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MembershipUpdateInput, Prisma.MembershipUncheckedUpdateInput>;
    where: Prisma.MembershipWhereUniqueInput;
};
export type MembershipUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.MembershipUpdateManyMutationInput, Prisma.MembershipUncheckedUpdateManyInput>;
    where?: Prisma.MembershipWhereInput;
    limit?: number;
};
export type MembershipUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MembershipSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MembershipOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MembershipUpdateManyMutationInput, Prisma.MembershipUncheckedUpdateManyInput>;
    where?: Prisma.MembershipWhereInput;
    limit?: number;
    include?: Prisma.MembershipIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type MembershipUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MembershipSelect<ExtArgs> | null;
    omit?: Prisma.MembershipOmit<ExtArgs> | null;
    include?: Prisma.MembershipInclude<ExtArgs> | null;
    where: Prisma.MembershipWhereUniqueInput;
    create: Prisma.XOR<Prisma.MembershipCreateInput, Prisma.MembershipUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.MembershipUpdateInput, Prisma.MembershipUncheckedUpdateInput>;
};
export type MembershipDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MembershipSelect<ExtArgs> | null;
    omit?: Prisma.MembershipOmit<ExtArgs> | null;
    include?: Prisma.MembershipInclude<ExtArgs> | null;
    where: Prisma.MembershipWhereUniqueInput;
};
export type MembershipDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MembershipWhereInput;
    limit?: number;
};
export type MembershipDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MembershipSelect<ExtArgs> | null;
    omit?: Prisma.MembershipOmit<ExtArgs> | null;
    include?: Prisma.MembershipInclude<ExtArgs> | null;
};
