import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PromotionLandingModel = runtime.Types.Result.DefaultSelection<Prisma.$PromotionLandingPayload>;
export type AggregatePromotionLanding = {
    _count: PromotionLandingCountAggregateOutputType | null;
    _min: PromotionLandingMinAggregateOutputType | null;
    _max: PromotionLandingMaxAggregateOutputType | null;
};
export type PromotionLandingMinAggregateOutputType = {
    id: string | null;
    title: string | null;
    slug: string | null;
    subtitle: string | null;
    description: string | null;
    badgeText: string | null;
    startDate: Date | null;
    endDate: Date | null;
    status: $Enums.PromotionStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    heroBundleId: string | null;
};
export type PromotionLandingMaxAggregateOutputType = {
    id: string | null;
    title: string | null;
    slug: string | null;
    subtitle: string | null;
    description: string | null;
    badgeText: string | null;
    startDate: Date | null;
    endDate: Date | null;
    status: $Enums.PromotionStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    heroBundleId: string | null;
};
export type PromotionLandingCountAggregateOutputType = {
    id: number;
    title: number;
    slug: number;
    subtitle: number;
    description: number;
    badgeText: number;
    startDate: number;
    endDate: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    heroBundleId: number;
    _all: number;
};
export type PromotionLandingMinAggregateInputType = {
    id?: true;
    title?: true;
    slug?: true;
    subtitle?: true;
    description?: true;
    badgeText?: true;
    startDate?: true;
    endDate?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    heroBundleId?: true;
};
export type PromotionLandingMaxAggregateInputType = {
    id?: true;
    title?: true;
    slug?: true;
    subtitle?: true;
    description?: true;
    badgeText?: true;
    startDate?: true;
    endDate?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    heroBundleId?: true;
};
export type PromotionLandingCountAggregateInputType = {
    id?: true;
    title?: true;
    slug?: true;
    subtitle?: true;
    description?: true;
    badgeText?: true;
    startDate?: true;
    endDate?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    heroBundleId?: true;
    _all?: true;
};
export type PromotionLandingAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PromotionLandingWhereInput;
    orderBy?: Prisma.PromotionLandingOrderByWithRelationInput | Prisma.PromotionLandingOrderByWithRelationInput[];
    cursor?: Prisma.PromotionLandingWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PromotionLandingCountAggregateInputType;
    _min?: PromotionLandingMinAggregateInputType;
    _max?: PromotionLandingMaxAggregateInputType;
};
export type GetPromotionLandingAggregateType<T extends PromotionLandingAggregateArgs> = {
    [P in keyof T & keyof AggregatePromotionLanding]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePromotionLanding[P]> : Prisma.GetScalarType<T[P], AggregatePromotionLanding[P]>;
};
export type PromotionLandingGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PromotionLandingWhereInput;
    orderBy?: Prisma.PromotionLandingOrderByWithAggregationInput | Prisma.PromotionLandingOrderByWithAggregationInput[];
    by: Prisma.PromotionLandingScalarFieldEnum[] | Prisma.PromotionLandingScalarFieldEnum;
    having?: Prisma.PromotionLandingScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PromotionLandingCountAggregateInputType | true;
    _min?: PromotionLandingMinAggregateInputType;
    _max?: PromotionLandingMaxAggregateInputType;
};
export type PromotionLandingGroupByOutputType = {
    id: string;
    title: string;
    slug: string;
    subtitle: string | null;
    description: string | null;
    badgeText: string | null;
    startDate: Date | null;
    endDate: Date | null;
    status: $Enums.PromotionStatus;
    createdAt: Date;
    updatedAt: Date;
    heroBundleId: string | null;
    _count: PromotionLandingCountAggregateOutputType | null;
    _min: PromotionLandingMinAggregateOutputType | null;
    _max: PromotionLandingMaxAggregateOutputType | null;
};
export type GetPromotionLandingGroupByPayload<T extends PromotionLandingGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PromotionLandingGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PromotionLandingGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PromotionLandingGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PromotionLandingGroupByOutputType[P]>;
}>>;
export type PromotionLandingWhereInput = {
    AND?: Prisma.PromotionLandingWhereInput | Prisma.PromotionLandingWhereInput[];
    OR?: Prisma.PromotionLandingWhereInput[];
    NOT?: Prisma.PromotionLandingWhereInput | Prisma.PromotionLandingWhereInput[];
    id?: Prisma.StringFilter<"PromotionLanding"> | string;
    title?: Prisma.StringFilter<"PromotionLanding"> | string;
    slug?: Prisma.StringFilter<"PromotionLanding"> | string;
    subtitle?: Prisma.StringNullableFilter<"PromotionLanding"> | string | null;
    description?: Prisma.StringNullableFilter<"PromotionLanding"> | string | null;
    badgeText?: Prisma.StringNullableFilter<"PromotionLanding"> | string | null;
    startDate?: Prisma.DateTimeNullableFilter<"PromotionLanding"> | Date | string | null;
    endDate?: Prisma.DateTimeNullableFilter<"PromotionLanding"> | Date | string | null;
    status?: Prisma.EnumPromotionStatusFilter<"PromotionLanding"> | $Enums.PromotionStatus;
    createdAt?: Prisma.DateTimeFilter<"PromotionLanding"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PromotionLanding"> | Date | string;
    heroBundleId?: Prisma.StringNullableFilter<"PromotionLanding"> | string | null;
    sections?: Prisma.PromotionSectionListRelationFilter;
    benefits?: Prisma.PromotionBenefitListRelationFilter;
};
export type PromotionLandingOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    subtitle?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    badgeText?: Prisma.SortOrderInput | Prisma.SortOrder;
    startDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    endDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    heroBundleId?: Prisma.SortOrderInput | Prisma.SortOrder;
    sections?: Prisma.PromotionSectionOrderByRelationAggregateInput;
    benefits?: Prisma.PromotionBenefitOrderByRelationAggregateInput;
};
export type PromotionLandingWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    slug?: string;
    AND?: Prisma.PromotionLandingWhereInput | Prisma.PromotionLandingWhereInput[];
    OR?: Prisma.PromotionLandingWhereInput[];
    NOT?: Prisma.PromotionLandingWhereInput | Prisma.PromotionLandingWhereInput[];
    title?: Prisma.StringFilter<"PromotionLanding"> | string;
    subtitle?: Prisma.StringNullableFilter<"PromotionLanding"> | string | null;
    description?: Prisma.StringNullableFilter<"PromotionLanding"> | string | null;
    badgeText?: Prisma.StringNullableFilter<"PromotionLanding"> | string | null;
    startDate?: Prisma.DateTimeNullableFilter<"PromotionLanding"> | Date | string | null;
    endDate?: Prisma.DateTimeNullableFilter<"PromotionLanding"> | Date | string | null;
    status?: Prisma.EnumPromotionStatusFilter<"PromotionLanding"> | $Enums.PromotionStatus;
    createdAt?: Prisma.DateTimeFilter<"PromotionLanding"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PromotionLanding"> | Date | string;
    heroBundleId?: Prisma.StringNullableFilter<"PromotionLanding"> | string | null;
    sections?: Prisma.PromotionSectionListRelationFilter;
    benefits?: Prisma.PromotionBenefitListRelationFilter;
}, "id" | "slug">;
export type PromotionLandingOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    subtitle?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    badgeText?: Prisma.SortOrderInput | Prisma.SortOrder;
    startDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    endDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    heroBundleId?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.PromotionLandingCountOrderByAggregateInput;
    _max?: Prisma.PromotionLandingMaxOrderByAggregateInput;
    _min?: Prisma.PromotionLandingMinOrderByAggregateInput;
};
export type PromotionLandingScalarWhereWithAggregatesInput = {
    AND?: Prisma.PromotionLandingScalarWhereWithAggregatesInput | Prisma.PromotionLandingScalarWhereWithAggregatesInput[];
    OR?: Prisma.PromotionLandingScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PromotionLandingScalarWhereWithAggregatesInput | Prisma.PromotionLandingScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PromotionLanding"> | string;
    title?: Prisma.StringWithAggregatesFilter<"PromotionLanding"> | string;
    slug?: Prisma.StringWithAggregatesFilter<"PromotionLanding"> | string;
    subtitle?: Prisma.StringNullableWithAggregatesFilter<"PromotionLanding"> | string | null;
    description?: Prisma.StringNullableWithAggregatesFilter<"PromotionLanding"> | string | null;
    badgeText?: Prisma.StringNullableWithAggregatesFilter<"PromotionLanding"> | string | null;
    startDate?: Prisma.DateTimeNullableWithAggregatesFilter<"PromotionLanding"> | Date | string | null;
    endDate?: Prisma.DateTimeNullableWithAggregatesFilter<"PromotionLanding"> | Date | string | null;
    status?: Prisma.EnumPromotionStatusWithAggregatesFilter<"PromotionLanding"> | $Enums.PromotionStatus;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PromotionLanding"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"PromotionLanding"> | Date | string;
    heroBundleId?: Prisma.StringNullableWithAggregatesFilter<"PromotionLanding"> | string | null;
};
export type PromotionLandingCreateInput = {
    id?: string;
    title: string;
    slug: string;
    subtitle?: string | null;
    description?: string | null;
    badgeText?: string | null;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    status?: $Enums.PromotionStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    heroBundleId?: string | null;
    sections?: Prisma.PromotionSectionCreateNestedManyWithoutPromotionInput;
    benefits?: Prisma.PromotionBenefitCreateNestedManyWithoutPromotionInput;
};
export type PromotionLandingUncheckedCreateInput = {
    id?: string;
    title: string;
    slug: string;
    subtitle?: string | null;
    description?: string | null;
    badgeText?: string | null;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    status?: $Enums.PromotionStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    heroBundleId?: string | null;
    sections?: Prisma.PromotionSectionUncheckedCreateNestedManyWithoutPromotionInput;
    benefits?: Prisma.PromotionBenefitUncheckedCreateNestedManyWithoutPromotionInput;
};
export type PromotionLandingUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    subtitle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    badgeText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumPromotionStatusFieldUpdateOperationsInput | $Enums.PromotionStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    heroBundleId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sections?: Prisma.PromotionSectionUpdateManyWithoutPromotionNestedInput;
    benefits?: Prisma.PromotionBenefitUpdateManyWithoutPromotionNestedInput;
};
export type PromotionLandingUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    subtitle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    badgeText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumPromotionStatusFieldUpdateOperationsInput | $Enums.PromotionStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    heroBundleId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sections?: Prisma.PromotionSectionUncheckedUpdateManyWithoutPromotionNestedInput;
    benefits?: Prisma.PromotionBenefitUncheckedUpdateManyWithoutPromotionNestedInput;
};
export type PromotionLandingCreateManyInput = {
    id?: string;
    title: string;
    slug: string;
    subtitle?: string | null;
    description?: string | null;
    badgeText?: string | null;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    status?: $Enums.PromotionStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    heroBundleId?: string | null;
};
export type PromotionLandingUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    subtitle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    badgeText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumPromotionStatusFieldUpdateOperationsInput | $Enums.PromotionStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    heroBundleId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PromotionLandingUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    subtitle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    badgeText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumPromotionStatusFieldUpdateOperationsInput | $Enums.PromotionStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    heroBundleId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PromotionLandingCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    subtitle?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    badgeText?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    heroBundleId?: Prisma.SortOrder;
};
export type PromotionLandingMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    subtitle?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    badgeText?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    heroBundleId?: Prisma.SortOrder;
};
export type PromotionLandingMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    subtitle?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    badgeText?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    heroBundleId?: Prisma.SortOrder;
};
export type PromotionLandingScalarRelationFilter = {
    is?: Prisma.PromotionLandingWhereInput;
    isNot?: Prisma.PromotionLandingWhereInput;
};
export type EnumPromotionStatusFieldUpdateOperationsInput = {
    set?: $Enums.PromotionStatus;
};
export type PromotionLandingCreateNestedOneWithoutSectionsInput = {
    create?: Prisma.XOR<Prisma.PromotionLandingCreateWithoutSectionsInput, Prisma.PromotionLandingUncheckedCreateWithoutSectionsInput>;
    connectOrCreate?: Prisma.PromotionLandingCreateOrConnectWithoutSectionsInput;
    connect?: Prisma.PromotionLandingWhereUniqueInput;
};
export type PromotionLandingUpdateOneRequiredWithoutSectionsNestedInput = {
    create?: Prisma.XOR<Prisma.PromotionLandingCreateWithoutSectionsInput, Prisma.PromotionLandingUncheckedCreateWithoutSectionsInput>;
    connectOrCreate?: Prisma.PromotionLandingCreateOrConnectWithoutSectionsInput;
    upsert?: Prisma.PromotionLandingUpsertWithoutSectionsInput;
    connect?: Prisma.PromotionLandingWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PromotionLandingUpdateToOneWithWhereWithoutSectionsInput, Prisma.PromotionLandingUpdateWithoutSectionsInput>, Prisma.PromotionLandingUncheckedUpdateWithoutSectionsInput>;
};
export type PromotionLandingCreateNestedOneWithoutBenefitsInput = {
    create?: Prisma.XOR<Prisma.PromotionLandingCreateWithoutBenefitsInput, Prisma.PromotionLandingUncheckedCreateWithoutBenefitsInput>;
    connectOrCreate?: Prisma.PromotionLandingCreateOrConnectWithoutBenefitsInput;
    connect?: Prisma.PromotionLandingWhereUniqueInput;
};
export type PromotionLandingUpdateOneRequiredWithoutBenefitsNestedInput = {
    create?: Prisma.XOR<Prisma.PromotionLandingCreateWithoutBenefitsInput, Prisma.PromotionLandingUncheckedCreateWithoutBenefitsInput>;
    connectOrCreate?: Prisma.PromotionLandingCreateOrConnectWithoutBenefitsInput;
    upsert?: Prisma.PromotionLandingUpsertWithoutBenefitsInput;
    connect?: Prisma.PromotionLandingWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PromotionLandingUpdateToOneWithWhereWithoutBenefitsInput, Prisma.PromotionLandingUpdateWithoutBenefitsInput>, Prisma.PromotionLandingUncheckedUpdateWithoutBenefitsInput>;
};
export type PromotionLandingCreateWithoutSectionsInput = {
    id?: string;
    title: string;
    slug: string;
    subtitle?: string | null;
    description?: string | null;
    badgeText?: string | null;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    status?: $Enums.PromotionStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    heroBundleId?: string | null;
    benefits?: Prisma.PromotionBenefitCreateNestedManyWithoutPromotionInput;
};
export type PromotionLandingUncheckedCreateWithoutSectionsInput = {
    id?: string;
    title: string;
    slug: string;
    subtitle?: string | null;
    description?: string | null;
    badgeText?: string | null;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    status?: $Enums.PromotionStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    heroBundleId?: string | null;
    benefits?: Prisma.PromotionBenefitUncheckedCreateNestedManyWithoutPromotionInput;
};
export type PromotionLandingCreateOrConnectWithoutSectionsInput = {
    where: Prisma.PromotionLandingWhereUniqueInput;
    create: Prisma.XOR<Prisma.PromotionLandingCreateWithoutSectionsInput, Prisma.PromotionLandingUncheckedCreateWithoutSectionsInput>;
};
export type PromotionLandingUpsertWithoutSectionsInput = {
    update: Prisma.XOR<Prisma.PromotionLandingUpdateWithoutSectionsInput, Prisma.PromotionLandingUncheckedUpdateWithoutSectionsInput>;
    create: Prisma.XOR<Prisma.PromotionLandingCreateWithoutSectionsInput, Prisma.PromotionLandingUncheckedCreateWithoutSectionsInput>;
    where?: Prisma.PromotionLandingWhereInput;
};
export type PromotionLandingUpdateToOneWithWhereWithoutSectionsInput = {
    where?: Prisma.PromotionLandingWhereInput;
    data: Prisma.XOR<Prisma.PromotionLandingUpdateWithoutSectionsInput, Prisma.PromotionLandingUncheckedUpdateWithoutSectionsInput>;
};
export type PromotionLandingUpdateWithoutSectionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    subtitle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    badgeText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumPromotionStatusFieldUpdateOperationsInput | $Enums.PromotionStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    heroBundleId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    benefits?: Prisma.PromotionBenefitUpdateManyWithoutPromotionNestedInput;
};
export type PromotionLandingUncheckedUpdateWithoutSectionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    subtitle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    badgeText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumPromotionStatusFieldUpdateOperationsInput | $Enums.PromotionStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    heroBundleId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    benefits?: Prisma.PromotionBenefitUncheckedUpdateManyWithoutPromotionNestedInput;
};
export type PromotionLandingCreateWithoutBenefitsInput = {
    id?: string;
    title: string;
    slug: string;
    subtitle?: string | null;
    description?: string | null;
    badgeText?: string | null;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    status?: $Enums.PromotionStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    heroBundleId?: string | null;
    sections?: Prisma.PromotionSectionCreateNestedManyWithoutPromotionInput;
};
export type PromotionLandingUncheckedCreateWithoutBenefitsInput = {
    id?: string;
    title: string;
    slug: string;
    subtitle?: string | null;
    description?: string | null;
    badgeText?: string | null;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    status?: $Enums.PromotionStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    heroBundleId?: string | null;
    sections?: Prisma.PromotionSectionUncheckedCreateNestedManyWithoutPromotionInput;
};
export type PromotionLandingCreateOrConnectWithoutBenefitsInput = {
    where: Prisma.PromotionLandingWhereUniqueInput;
    create: Prisma.XOR<Prisma.PromotionLandingCreateWithoutBenefitsInput, Prisma.PromotionLandingUncheckedCreateWithoutBenefitsInput>;
};
export type PromotionLandingUpsertWithoutBenefitsInput = {
    update: Prisma.XOR<Prisma.PromotionLandingUpdateWithoutBenefitsInput, Prisma.PromotionLandingUncheckedUpdateWithoutBenefitsInput>;
    create: Prisma.XOR<Prisma.PromotionLandingCreateWithoutBenefitsInput, Prisma.PromotionLandingUncheckedCreateWithoutBenefitsInput>;
    where?: Prisma.PromotionLandingWhereInput;
};
export type PromotionLandingUpdateToOneWithWhereWithoutBenefitsInput = {
    where?: Prisma.PromotionLandingWhereInput;
    data: Prisma.XOR<Prisma.PromotionLandingUpdateWithoutBenefitsInput, Prisma.PromotionLandingUncheckedUpdateWithoutBenefitsInput>;
};
export type PromotionLandingUpdateWithoutBenefitsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    subtitle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    badgeText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumPromotionStatusFieldUpdateOperationsInput | $Enums.PromotionStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    heroBundleId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sections?: Prisma.PromotionSectionUpdateManyWithoutPromotionNestedInput;
};
export type PromotionLandingUncheckedUpdateWithoutBenefitsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    subtitle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    badgeText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumPromotionStatusFieldUpdateOperationsInput | $Enums.PromotionStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    heroBundleId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sections?: Prisma.PromotionSectionUncheckedUpdateManyWithoutPromotionNestedInput;
};
export type PromotionLandingCountOutputType = {
    sections: number;
    benefits: number;
};
export type PromotionLandingCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    sections?: boolean | PromotionLandingCountOutputTypeCountSectionsArgs;
    benefits?: boolean | PromotionLandingCountOutputTypeCountBenefitsArgs;
};
export type PromotionLandingCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionLandingCountOutputTypeSelect<ExtArgs> | null;
};
export type PromotionLandingCountOutputTypeCountSectionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PromotionSectionWhereInput;
};
export type PromotionLandingCountOutputTypeCountBenefitsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PromotionBenefitWhereInput;
};
export type PromotionLandingSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    slug?: boolean;
    subtitle?: boolean;
    description?: boolean;
    badgeText?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    heroBundleId?: boolean;
    sections?: boolean | Prisma.PromotionLanding$sectionsArgs<ExtArgs>;
    benefits?: boolean | Prisma.PromotionLanding$benefitsArgs<ExtArgs>;
    _count?: boolean | Prisma.PromotionLandingCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["promotionLanding"]>;
export type PromotionLandingSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    slug?: boolean;
    subtitle?: boolean;
    description?: boolean;
    badgeText?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    heroBundleId?: boolean;
}, ExtArgs["result"]["promotionLanding"]>;
export type PromotionLandingSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    slug?: boolean;
    subtitle?: boolean;
    description?: boolean;
    badgeText?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    heroBundleId?: boolean;
}, ExtArgs["result"]["promotionLanding"]>;
export type PromotionLandingSelectScalar = {
    id?: boolean;
    title?: boolean;
    slug?: boolean;
    subtitle?: boolean;
    description?: boolean;
    badgeText?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    heroBundleId?: boolean;
};
export type PromotionLandingOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "title" | "slug" | "subtitle" | "description" | "badgeText" | "startDate" | "endDate" | "status" | "createdAt" | "updatedAt" | "heroBundleId", ExtArgs["result"]["promotionLanding"]>;
export type PromotionLandingInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    sections?: boolean | Prisma.PromotionLanding$sectionsArgs<ExtArgs>;
    benefits?: boolean | Prisma.PromotionLanding$benefitsArgs<ExtArgs>;
    _count?: boolean | Prisma.PromotionLandingCountOutputTypeDefaultArgs<ExtArgs>;
};
export type PromotionLandingIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type PromotionLandingIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $PromotionLandingPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PromotionLanding";
    objects: {
        sections: Prisma.$PromotionSectionPayload<ExtArgs>[];
        benefits: Prisma.$PromotionBenefitPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        title: string;
        slug: string;
        subtitle: string | null;
        description: string | null;
        badgeText: string | null;
        startDate: Date | null;
        endDate: Date | null;
        status: $Enums.PromotionStatus;
        createdAt: Date;
        updatedAt: Date;
        heroBundleId: string | null;
    }, ExtArgs["result"]["promotionLanding"]>;
    composites: {};
};
export type PromotionLandingGetPayload<S extends boolean | null | undefined | PromotionLandingDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PromotionLandingPayload, S>;
export type PromotionLandingCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PromotionLandingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PromotionLandingCountAggregateInputType | true;
};
export interface PromotionLandingDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PromotionLanding'];
        meta: {
            name: 'PromotionLanding';
        };
    };
    findUnique<T extends PromotionLandingFindUniqueArgs>(args: Prisma.SelectSubset<T, PromotionLandingFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PromotionLandingClient<runtime.Types.Result.GetResult<Prisma.$PromotionLandingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PromotionLandingFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PromotionLandingFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PromotionLandingClient<runtime.Types.Result.GetResult<Prisma.$PromotionLandingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PromotionLandingFindFirstArgs>(args?: Prisma.SelectSubset<T, PromotionLandingFindFirstArgs<ExtArgs>>): Prisma.Prisma__PromotionLandingClient<runtime.Types.Result.GetResult<Prisma.$PromotionLandingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PromotionLandingFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PromotionLandingFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PromotionLandingClient<runtime.Types.Result.GetResult<Prisma.$PromotionLandingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PromotionLandingFindManyArgs>(args?: Prisma.SelectSubset<T, PromotionLandingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PromotionLandingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PromotionLandingCreateArgs>(args: Prisma.SelectSubset<T, PromotionLandingCreateArgs<ExtArgs>>): Prisma.Prisma__PromotionLandingClient<runtime.Types.Result.GetResult<Prisma.$PromotionLandingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PromotionLandingCreateManyArgs>(args?: Prisma.SelectSubset<T, PromotionLandingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PromotionLandingCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PromotionLandingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PromotionLandingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PromotionLandingDeleteArgs>(args: Prisma.SelectSubset<T, PromotionLandingDeleteArgs<ExtArgs>>): Prisma.Prisma__PromotionLandingClient<runtime.Types.Result.GetResult<Prisma.$PromotionLandingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PromotionLandingUpdateArgs>(args: Prisma.SelectSubset<T, PromotionLandingUpdateArgs<ExtArgs>>): Prisma.Prisma__PromotionLandingClient<runtime.Types.Result.GetResult<Prisma.$PromotionLandingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PromotionLandingDeleteManyArgs>(args?: Prisma.SelectSubset<T, PromotionLandingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PromotionLandingUpdateManyArgs>(args: Prisma.SelectSubset<T, PromotionLandingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PromotionLandingUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PromotionLandingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PromotionLandingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PromotionLandingUpsertArgs>(args: Prisma.SelectSubset<T, PromotionLandingUpsertArgs<ExtArgs>>): Prisma.Prisma__PromotionLandingClient<runtime.Types.Result.GetResult<Prisma.$PromotionLandingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PromotionLandingCountArgs>(args?: Prisma.Subset<T, PromotionLandingCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PromotionLandingCountAggregateOutputType> : number>;
    aggregate<T extends PromotionLandingAggregateArgs>(args: Prisma.Subset<T, PromotionLandingAggregateArgs>): Prisma.PrismaPromise<GetPromotionLandingAggregateType<T>>;
    groupBy<T extends PromotionLandingGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PromotionLandingGroupByArgs['orderBy'];
    } : {
        orderBy?: PromotionLandingGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PromotionLandingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPromotionLandingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PromotionLandingFieldRefs;
}
export interface Prisma__PromotionLandingClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    sections<T extends Prisma.PromotionLanding$sectionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PromotionLanding$sectionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PromotionSectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    benefits<T extends Prisma.PromotionLanding$benefitsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PromotionLanding$benefitsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PromotionBenefitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PromotionLandingFieldRefs {
    readonly id: Prisma.FieldRef<"PromotionLanding", 'String'>;
    readonly title: Prisma.FieldRef<"PromotionLanding", 'String'>;
    readonly slug: Prisma.FieldRef<"PromotionLanding", 'String'>;
    readonly subtitle: Prisma.FieldRef<"PromotionLanding", 'String'>;
    readonly description: Prisma.FieldRef<"PromotionLanding", 'String'>;
    readonly badgeText: Prisma.FieldRef<"PromotionLanding", 'String'>;
    readonly startDate: Prisma.FieldRef<"PromotionLanding", 'DateTime'>;
    readonly endDate: Prisma.FieldRef<"PromotionLanding", 'DateTime'>;
    readonly status: Prisma.FieldRef<"PromotionLanding", 'PromotionStatus'>;
    readonly createdAt: Prisma.FieldRef<"PromotionLanding", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"PromotionLanding", 'DateTime'>;
    readonly heroBundleId: Prisma.FieldRef<"PromotionLanding", 'String'>;
}
export type PromotionLandingFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionLandingSelect<ExtArgs> | null;
    omit?: Prisma.PromotionLandingOmit<ExtArgs> | null;
    include?: Prisma.PromotionLandingInclude<ExtArgs> | null;
    where: Prisma.PromotionLandingWhereUniqueInput;
};
export type PromotionLandingFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionLandingSelect<ExtArgs> | null;
    omit?: Prisma.PromotionLandingOmit<ExtArgs> | null;
    include?: Prisma.PromotionLandingInclude<ExtArgs> | null;
    where: Prisma.PromotionLandingWhereUniqueInput;
};
export type PromotionLandingFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionLandingSelect<ExtArgs> | null;
    omit?: Prisma.PromotionLandingOmit<ExtArgs> | null;
    include?: Prisma.PromotionLandingInclude<ExtArgs> | null;
    where?: Prisma.PromotionLandingWhereInput;
    orderBy?: Prisma.PromotionLandingOrderByWithRelationInput | Prisma.PromotionLandingOrderByWithRelationInput[];
    cursor?: Prisma.PromotionLandingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PromotionLandingScalarFieldEnum | Prisma.PromotionLandingScalarFieldEnum[];
};
export type PromotionLandingFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionLandingSelect<ExtArgs> | null;
    omit?: Prisma.PromotionLandingOmit<ExtArgs> | null;
    include?: Prisma.PromotionLandingInclude<ExtArgs> | null;
    where?: Prisma.PromotionLandingWhereInput;
    orderBy?: Prisma.PromotionLandingOrderByWithRelationInput | Prisma.PromotionLandingOrderByWithRelationInput[];
    cursor?: Prisma.PromotionLandingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PromotionLandingScalarFieldEnum | Prisma.PromotionLandingScalarFieldEnum[];
};
export type PromotionLandingFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionLandingSelect<ExtArgs> | null;
    omit?: Prisma.PromotionLandingOmit<ExtArgs> | null;
    include?: Prisma.PromotionLandingInclude<ExtArgs> | null;
    where?: Prisma.PromotionLandingWhereInput;
    orderBy?: Prisma.PromotionLandingOrderByWithRelationInput | Prisma.PromotionLandingOrderByWithRelationInput[];
    cursor?: Prisma.PromotionLandingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PromotionLandingScalarFieldEnum | Prisma.PromotionLandingScalarFieldEnum[];
};
export type PromotionLandingCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionLandingSelect<ExtArgs> | null;
    omit?: Prisma.PromotionLandingOmit<ExtArgs> | null;
    include?: Prisma.PromotionLandingInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PromotionLandingCreateInput, Prisma.PromotionLandingUncheckedCreateInput>;
};
export type PromotionLandingCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PromotionLandingCreateManyInput | Prisma.PromotionLandingCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PromotionLandingCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionLandingSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PromotionLandingOmit<ExtArgs> | null;
    data: Prisma.PromotionLandingCreateManyInput | Prisma.PromotionLandingCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PromotionLandingUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionLandingSelect<ExtArgs> | null;
    omit?: Prisma.PromotionLandingOmit<ExtArgs> | null;
    include?: Prisma.PromotionLandingInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PromotionLandingUpdateInput, Prisma.PromotionLandingUncheckedUpdateInput>;
    where: Prisma.PromotionLandingWhereUniqueInput;
};
export type PromotionLandingUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PromotionLandingUpdateManyMutationInput, Prisma.PromotionLandingUncheckedUpdateManyInput>;
    where?: Prisma.PromotionLandingWhereInput;
    limit?: number;
};
export type PromotionLandingUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionLandingSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PromotionLandingOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PromotionLandingUpdateManyMutationInput, Prisma.PromotionLandingUncheckedUpdateManyInput>;
    where?: Prisma.PromotionLandingWhereInput;
    limit?: number;
};
export type PromotionLandingUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionLandingSelect<ExtArgs> | null;
    omit?: Prisma.PromotionLandingOmit<ExtArgs> | null;
    include?: Prisma.PromotionLandingInclude<ExtArgs> | null;
    where: Prisma.PromotionLandingWhereUniqueInput;
    create: Prisma.XOR<Prisma.PromotionLandingCreateInput, Prisma.PromotionLandingUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PromotionLandingUpdateInput, Prisma.PromotionLandingUncheckedUpdateInput>;
};
export type PromotionLandingDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionLandingSelect<ExtArgs> | null;
    omit?: Prisma.PromotionLandingOmit<ExtArgs> | null;
    include?: Prisma.PromotionLandingInclude<ExtArgs> | null;
    where: Prisma.PromotionLandingWhereUniqueInput;
};
export type PromotionLandingDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PromotionLandingWhereInput;
    limit?: number;
};
export type PromotionLanding$sectionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PromotionLanding$benefitsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PromotionLandingDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PromotionLandingSelect<ExtArgs> | null;
    omit?: Prisma.PromotionLandingOmit<ExtArgs> | null;
    include?: Prisma.PromotionLandingInclude<ExtArgs> | null;
};
