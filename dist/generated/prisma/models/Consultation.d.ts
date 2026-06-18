import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ConsultationModel = runtime.Types.Result.DefaultSelection<Prisma.$ConsultationPayload>;
export type AggregateConsultation = {
    _count: ConsultationCountAggregateOutputType | null;
    _min: ConsultationMinAggregateOutputType | null;
    _max: ConsultationMaxAggregateOutputType | null;
};
export type ConsultationMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    email: string | null;
    phone: string | null;
    message: string | null;
    status: $Enums.ConsultationStatus | null;
    respondedBy: string | null;
    response: string | null;
    respondedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ConsultationMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    email: string | null;
    phone: string | null;
    message: string | null;
    status: $Enums.ConsultationStatus | null;
    respondedBy: string | null;
    response: string | null;
    respondedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ConsultationCountAggregateOutputType = {
    id: number;
    name: number;
    email: number;
    phone: number;
    message: number;
    status: number;
    respondedBy: number;
    response: number;
    respondedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ConsultationMinAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    phone?: true;
    message?: true;
    status?: true;
    respondedBy?: true;
    response?: true;
    respondedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ConsultationMaxAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    phone?: true;
    message?: true;
    status?: true;
    respondedBy?: true;
    response?: true;
    respondedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ConsultationCountAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    phone?: true;
    message?: true;
    status?: true;
    respondedBy?: true;
    response?: true;
    respondedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ConsultationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConsultationWhereInput;
    orderBy?: Prisma.ConsultationOrderByWithRelationInput | Prisma.ConsultationOrderByWithRelationInput[];
    cursor?: Prisma.ConsultationWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ConsultationCountAggregateInputType;
    _min?: ConsultationMinAggregateInputType;
    _max?: ConsultationMaxAggregateInputType;
};
export type GetConsultationAggregateType<T extends ConsultationAggregateArgs> = {
    [P in keyof T & keyof AggregateConsultation]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateConsultation[P]> : Prisma.GetScalarType<T[P], AggregateConsultation[P]>;
};
export type ConsultationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConsultationWhereInput;
    orderBy?: Prisma.ConsultationOrderByWithAggregationInput | Prisma.ConsultationOrderByWithAggregationInput[];
    by: Prisma.ConsultationScalarFieldEnum[] | Prisma.ConsultationScalarFieldEnum;
    having?: Prisma.ConsultationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ConsultationCountAggregateInputType | true;
    _min?: ConsultationMinAggregateInputType;
    _max?: ConsultationMaxAggregateInputType;
};
export type ConsultationGroupByOutputType = {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    message: string;
    status: $Enums.ConsultationStatus;
    respondedBy: string | null;
    response: string | null;
    respondedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: ConsultationCountAggregateOutputType | null;
    _min: ConsultationMinAggregateOutputType | null;
    _max: ConsultationMaxAggregateOutputType | null;
};
export type GetConsultationGroupByPayload<T extends ConsultationGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ConsultationGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ConsultationGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ConsultationGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ConsultationGroupByOutputType[P]>;
}>>;
export type ConsultationWhereInput = {
    AND?: Prisma.ConsultationWhereInput | Prisma.ConsultationWhereInput[];
    OR?: Prisma.ConsultationWhereInput[];
    NOT?: Prisma.ConsultationWhereInput | Prisma.ConsultationWhereInput[];
    id?: Prisma.StringFilter<"Consultation"> | string;
    name?: Prisma.StringFilter<"Consultation"> | string;
    email?: Prisma.StringFilter<"Consultation"> | string;
    phone?: Prisma.StringNullableFilter<"Consultation"> | string | null;
    message?: Prisma.StringFilter<"Consultation"> | string;
    status?: Prisma.EnumConsultationStatusFilter<"Consultation"> | $Enums.ConsultationStatus;
    respondedBy?: Prisma.StringNullableFilter<"Consultation"> | string | null;
    response?: Prisma.StringNullableFilter<"Consultation"> | string | null;
    respondedAt?: Prisma.DateTimeNullableFilter<"Consultation"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Consultation"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Consultation"> | Date | string;
    admin?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
};
export type ConsultationOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    message?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    respondedBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    response?: Prisma.SortOrderInput | Prisma.SortOrder;
    respondedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    admin?: Prisma.UserOrderByWithRelationInput;
};
export type ConsultationWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    phone?: string;
    AND?: Prisma.ConsultationWhereInput | Prisma.ConsultationWhereInput[];
    OR?: Prisma.ConsultationWhereInput[];
    NOT?: Prisma.ConsultationWhereInput | Prisma.ConsultationWhereInput[];
    name?: Prisma.StringFilter<"Consultation"> | string;
    email?: Prisma.StringFilter<"Consultation"> | string;
    message?: Prisma.StringFilter<"Consultation"> | string;
    status?: Prisma.EnumConsultationStatusFilter<"Consultation"> | $Enums.ConsultationStatus;
    respondedBy?: Prisma.StringNullableFilter<"Consultation"> | string | null;
    response?: Prisma.StringNullableFilter<"Consultation"> | string | null;
    respondedAt?: Prisma.DateTimeNullableFilter<"Consultation"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Consultation"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Consultation"> | Date | string;
    admin?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
}, "id" | "phone">;
export type ConsultationOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    message?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    respondedBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    response?: Prisma.SortOrderInput | Prisma.SortOrder;
    respondedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ConsultationCountOrderByAggregateInput;
    _max?: Prisma.ConsultationMaxOrderByAggregateInput;
    _min?: Prisma.ConsultationMinOrderByAggregateInput;
};
export type ConsultationScalarWhereWithAggregatesInput = {
    AND?: Prisma.ConsultationScalarWhereWithAggregatesInput | Prisma.ConsultationScalarWhereWithAggregatesInput[];
    OR?: Prisma.ConsultationScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ConsultationScalarWhereWithAggregatesInput | Prisma.ConsultationScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Consultation"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Consultation"> | string;
    email?: Prisma.StringWithAggregatesFilter<"Consultation"> | string;
    phone?: Prisma.StringNullableWithAggregatesFilter<"Consultation"> | string | null;
    message?: Prisma.StringWithAggregatesFilter<"Consultation"> | string;
    status?: Prisma.EnumConsultationStatusWithAggregatesFilter<"Consultation"> | $Enums.ConsultationStatus;
    respondedBy?: Prisma.StringNullableWithAggregatesFilter<"Consultation"> | string | null;
    response?: Prisma.StringNullableWithAggregatesFilter<"Consultation"> | string | null;
    respondedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Consultation"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Consultation"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Consultation"> | Date | string;
};
export type ConsultationCreateInput = {
    id?: string;
    name: string;
    email: string;
    phone?: string | null;
    message: string;
    status?: $Enums.ConsultationStatus;
    response?: string | null;
    respondedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    admin?: Prisma.UserCreateNestedOneWithoutConsultationRepliesInput;
};
export type ConsultationUncheckedCreateInput = {
    id?: string;
    name: string;
    email: string;
    phone?: string | null;
    message: string;
    status?: $Enums.ConsultationStatus;
    respondedBy?: string | null;
    response?: string | null;
    respondedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ConsultationUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumConsultationStatusFieldUpdateOperationsInput | $Enums.ConsultationStatus;
    response?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    admin?: Prisma.UserUpdateOneWithoutConsultationRepliesNestedInput;
};
export type ConsultationUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumConsultationStatusFieldUpdateOperationsInput | $Enums.ConsultationStatus;
    respondedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    response?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConsultationCreateManyInput = {
    id?: string;
    name: string;
    email: string;
    phone?: string | null;
    message: string;
    status?: $Enums.ConsultationStatus;
    respondedBy?: string | null;
    response?: string | null;
    respondedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ConsultationUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumConsultationStatusFieldUpdateOperationsInput | $Enums.ConsultationStatus;
    response?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConsultationUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumConsultationStatusFieldUpdateOperationsInput | $Enums.ConsultationStatus;
    respondedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    response?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConsultationListRelationFilter = {
    every?: Prisma.ConsultationWhereInput;
    some?: Prisma.ConsultationWhereInput;
    none?: Prisma.ConsultationWhereInput;
};
export type ConsultationOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ConsultationCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    respondedBy?: Prisma.SortOrder;
    response?: Prisma.SortOrder;
    respondedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ConsultationMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    respondedBy?: Prisma.SortOrder;
    response?: Prisma.SortOrder;
    respondedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ConsultationMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    respondedBy?: Prisma.SortOrder;
    response?: Prisma.SortOrder;
    respondedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ConsultationCreateNestedManyWithoutAdminInput = {
    create?: Prisma.XOR<Prisma.ConsultationCreateWithoutAdminInput, Prisma.ConsultationUncheckedCreateWithoutAdminInput> | Prisma.ConsultationCreateWithoutAdminInput[] | Prisma.ConsultationUncheckedCreateWithoutAdminInput[];
    connectOrCreate?: Prisma.ConsultationCreateOrConnectWithoutAdminInput | Prisma.ConsultationCreateOrConnectWithoutAdminInput[];
    createMany?: Prisma.ConsultationCreateManyAdminInputEnvelope;
    connect?: Prisma.ConsultationWhereUniqueInput | Prisma.ConsultationWhereUniqueInput[];
};
export type ConsultationUncheckedCreateNestedManyWithoutAdminInput = {
    create?: Prisma.XOR<Prisma.ConsultationCreateWithoutAdminInput, Prisma.ConsultationUncheckedCreateWithoutAdminInput> | Prisma.ConsultationCreateWithoutAdminInput[] | Prisma.ConsultationUncheckedCreateWithoutAdminInput[];
    connectOrCreate?: Prisma.ConsultationCreateOrConnectWithoutAdminInput | Prisma.ConsultationCreateOrConnectWithoutAdminInput[];
    createMany?: Prisma.ConsultationCreateManyAdminInputEnvelope;
    connect?: Prisma.ConsultationWhereUniqueInput | Prisma.ConsultationWhereUniqueInput[];
};
export type ConsultationUpdateManyWithoutAdminNestedInput = {
    create?: Prisma.XOR<Prisma.ConsultationCreateWithoutAdminInput, Prisma.ConsultationUncheckedCreateWithoutAdminInput> | Prisma.ConsultationCreateWithoutAdminInput[] | Prisma.ConsultationUncheckedCreateWithoutAdminInput[];
    connectOrCreate?: Prisma.ConsultationCreateOrConnectWithoutAdminInput | Prisma.ConsultationCreateOrConnectWithoutAdminInput[];
    upsert?: Prisma.ConsultationUpsertWithWhereUniqueWithoutAdminInput | Prisma.ConsultationUpsertWithWhereUniqueWithoutAdminInput[];
    createMany?: Prisma.ConsultationCreateManyAdminInputEnvelope;
    set?: Prisma.ConsultationWhereUniqueInput | Prisma.ConsultationWhereUniqueInput[];
    disconnect?: Prisma.ConsultationWhereUniqueInput | Prisma.ConsultationWhereUniqueInput[];
    delete?: Prisma.ConsultationWhereUniqueInput | Prisma.ConsultationWhereUniqueInput[];
    connect?: Prisma.ConsultationWhereUniqueInput | Prisma.ConsultationWhereUniqueInput[];
    update?: Prisma.ConsultationUpdateWithWhereUniqueWithoutAdminInput | Prisma.ConsultationUpdateWithWhereUniqueWithoutAdminInput[];
    updateMany?: Prisma.ConsultationUpdateManyWithWhereWithoutAdminInput | Prisma.ConsultationUpdateManyWithWhereWithoutAdminInput[];
    deleteMany?: Prisma.ConsultationScalarWhereInput | Prisma.ConsultationScalarWhereInput[];
};
export type ConsultationUncheckedUpdateManyWithoutAdminNestedInput = {
    create?: Prisma.XOR<Prisma.ConsultationCreateWithoutAdminInput, Prisma.ConsultationUncheckedCreateWithoutAdminInput> | Prisma.ConsultationCreateWithoutAdminInput[] | Prisma.ConsultationUncheckedCreateWithoutAdminInput[];
    connectOrCreate?: Prisma.ConsultationCreateOrConnectWithoutAdminInput | Prisma.ConsultationCreateOrConnectWithoutAdminInput[];
    upsert?: Prisma.ConsultationUpsertWithWhereUniqueWithoutAdminInput | Prisma.ConsultationUpsertWithWhereUniqueWithoutAdminInput[];
    createMany?: Prisma.ConsultationCreateManyAdminInputEnvelope;
    set?: Prisma.ConsultationWhereUniqueInput | Prisma.ConsultationWhereUniqueInput[];
    disconnect?: Prisma.ConsultationWhereUniqueInput | Prisma.ConsultationWhereUniqueInput[];
    delete?: Prisma.ConsultationWhereUniqueInput | Prisma.ConsultationWhereUniqueInput[];
    connect?: Prisma.ConsultationWhereUniqueInput | Prisma.ConsultationWhereUniqueInput[];
    update?: Prisma.ConsultationUpdateWithWhereUniqueWithoutAdminInput | Prisma.ConsultationUpdateWithWhereUniqueWithoutAdminInput[];
    updateMany?: Prisma.ConsultationUpdateManyWithWhereWithoutAdminInput | Prisma.ConsultationUpdateManyWithWhereWithoutAdminInput[];
    deleteMany?: Prisma.ConsultationScalarWhereInput | Prisma.ConsultationScalarWhereInput[];
};
export type EnumConsultationStatusFieldUpdateOperationsInput = {
    set?: $Enums.ConsultationStatus;
};
export type ConsultationCreateWithoutAdminInput = {
    id?: string;
    name: string;
    email: string;
    phone?: string | null;
    message: string;
    status?: $Enums.ConsultationStatus;
    response?: string | null;
    respondedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ConsultationUncheckedCreateWithoutAdminInput = {
    id?: string;
    name: string;
    email: string;
    phone?: string | null;
    message: string;
    status?: $Enums.ConsultationStatus;
    response?: string | null;
    respondedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ConsultationCreateOrConnectWithoutAdminInput = {
    where: Prisma.ConsultationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConsultationCreateWithoutAdminInput, Prisma.ConsultationUncheckedCreateWithoutAdminInput>;
};
export type ConsultationCreateManyAdminInputEnvelope = {
    data: Prisma.ConsultationCreateManyAdminInput | Prisma.ConsultationCreateManyAdminInput[];
    skipDuplicates?: boolean;
};
export type ConsultationUpsertWithWhereUniqueWithoutAdminInput = {
    where: Prisma.ConsultationWhereUniqueInput;
    update: Prisma.XOR<Prisma.ConsultationUpdateWithoutAdminInput, Prisma.ConsultationUncheckedUpdateWithoutAdminInput>;
    create: Prisma.XOR<Prisma.ConsultationCreateWithoutAdminInput, Prisma.ConsultationUncheckedCreateWithoutAdminInput>;
};
export type ConsultationUpdateWithWhereUniqueWithoutAdminInput = {
    where: Prisma.ConsultationWhereUniqueInput;
    data: Prisma.XOR<Prisma.ConsultationUpdateWithoutAdminInput, Prisma.ConsultationUncheckedUpdateWithoutAdminInput>;
};
export type ConsultationUpdateManyWithWhereWithoutAdminInput = {
    where: Prisma.ConsultationScalarWhereInput;
    data: Prisma.XOR<Prisma.ConsultationUpdateManyMutationInput, Prisma.ConsultationUncheckedUpdateManyWithoutAdminInput>;
};
export type ConsultationScalarWhereInput = {
    AND?: Prisma.ConsultationScalarWhereInput | Prisma.ConsultationScalarWhereInput[];
    OR?: Prisma.ConsultationScalarWhereInput[];
    NOT?: Prisma.ConsultationScalarWhereInput | Prisma.ConsultationScalarWhereInput[];
    id?: Prisma.StringFilter<"Consultation"> | string;
    name?: Prisma.StringFilter<"Consultation"> | string;
    email?: Prisma.StringFilter<"Consultation"> | string;
    phone?: Prisma.StringNullableFilter<"Consultation"> | string | null;
    message?: Prisma.StringFilter<"Consultation"> | string;
    status?: Prisma.EnumConsultationStatusFilter<"Consultation"> | $Enums.ConsultationStatus;
    respondedBy?: Prisma.StringNullableFilter<"Consultation"> | string | null;
    response?: Prisma.StringNullableFilter<"Consultation"> | string | null;
    respondedAt?: Prisma.DateTimeNullableFilter<"Consultation"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Consultation"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Consultation"> | Date | string;
};
export type ConsultationCreateManyAdminInput = {
    id?: string;
    name: string;
    email: string;
    phone?: string | null;
    message: string;
    status?: $Enums.ConsultationStatus;
    response?: string | null;
    respondedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ConsultationUpdateWithoutAdminInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumConsultationStatusFieldUpdateOperationsInput | $Enums.ConsultationStatus;
    response?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConsultationUncheckedUpdateWithoutAdminInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumConsultationStatusFieldUpdateOperationsInput | $Enums.ConsultationStatus;
    response?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConsultationUncheckedUpdateManyWithoutAdminInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumConsultationStatusFieldUpdateOperationsInput | $Enums.ConsultationStatus;
    response?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConsultationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    email?: boolean;
    phone?: boolean;
    message?: boolean;
    status?: boolean;
    respondedBy?: boolean;
    response?: boolean;
    respondedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    admin?: boolean | Prisma.Consultation$adminArgs<ExtArgs>;
}, ExtArgs["result"]["consultation"]>;
export type ConsultationSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    email?: boolean;
    phone?: boolean;
    message?: boolean;
    status?: boolean;
    respondedBy?: boolean;
    response?: boolean;
    respondedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    admin?: boolean | Prisma.Consultation$adminArgs<ExtArgs>;
}, ExtArgs["result"]["consultation"]>;
export type ConsultationSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    email?: boolean;
    phone?: boolean;
    message?: boolean;
    status?: boolean;
    respondedBy?: boolean;
    response?: boolean;
    respondedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    admin?: boolean | Prisma.Consultation$adminArgs<ExtArgs>;
}, ExtArgs["result"]["consultation"]>;
export type ConsultationSelectScalar = {
    id?: boolean;
    name?: boolean;
    email?: boolean;
    phone?: boolean;
    message?: boolean;
    status?: boolean;
    respondedBy?: boolean;
    response?: boolean;
    respondedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ConsultationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "email" | "phone" | "message" | "status" | "respondedBy" | "response" | "respondedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["consultation"]>;
export type ConsultationInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    admin?: boolean | Prisma.Consultation$adminArgs<ExtArgs>;
};
export type ConsultationIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    admin?: boolean | Prisma.Consultation$adminArgs<ExtArgs>;
};
export type ConsultationIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    admin?: boolean | Prisma.Consultation$adminArgs<ExtArgs>;
};
export type $ConsultationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Consultation";
    objects: {
        admin: Prisma.$UserPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        email: string;
        phone: string | null;
        message: string;
        status: $Enums.ConsultationStatus;
        respondedBy: string | null;
        response: string | null;
        respondedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["consultation"]>;
    composites: {};
};
export type ConsultationGetPayload<S extends boolean | null | undefined | ConsultationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ConsultationPayload, S>;
export type ConsultationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ConsultationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ConsultationCountAggregateInputType | true;
};
export interface ConsultationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Consultation'];
        meta: {
            name: 'Consultation';
        };
    };
    findUnique<T extends ConsultationFindUniqueArgs>(args: Prisma.SelectSubset<T, ConsultationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ConsultationClient<runtime.Types.Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ConsultationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ConsultationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ConsultationClient<runtime.Types.Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ConsultationFindFirstArgs>(args?: Prisma.SelectSubset<T, ConsultationFindFirstArgs<ExtArgs>>): Prisma.Prisma__ConsultationClient<runtime.Types.Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ConsultationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ConsultationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ConsultationClient<runtime.Types.Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ConsultationFindManyArgs>(args?: Prisma.SelectSubset<T, ConsultationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ConsultationCreateArgs>(args: Prisma.SelectSubset<T, ConsultationCreateArgs<ExtArgs>>): Prisma.Prisma__ConsultationClient<runtime.Types.Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ConsultationCreateManyArgs>(args?: Prisma.SelectSubset<T, ConsultationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ConsultationCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ConsultationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ConsultationDeleteArgs>(args: Prisma.SelectSubset<T, ConsultationDeleteArgs<ExtArgs>>): Prisma.Prisma__ConsultationClient<runtime.Types.Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ConsultationUpdateArgs>(args: Prisma.SelectSubset<T, ConsultationUpdateArgs<ExtArgs>>): Prisma.Prisma__ConsultationClient<runtime.Types.Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ConsultationDeleteManyArgs>(args?: Prisma.SelectSubset<T, ConsultationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ConsultationUpdateManyArgs>(args: Prisma.SelectSubset<T, ConsultationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ConsultationUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ConsultationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ConsultationUpsertArgs>(args: Prisma.SelectSubset<T, ConsultationUpsertArgs<ExtArgs>>): Prisma.Prisma__ConsultationClient<runtime.Types.Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ConsultationCountArgs>(args?: Prisma.Subset<T, ConsultationCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ConsultationCountAggregateOutputType> : number>;
    aggregate<T extends ConsultationAggregateArgs>(args: Prisma.Subset<T, ConsultationAggregateArgs>): Prisma.PrismaPromise<GetConsultationAggregateType<T>>;
    groupBy<T extends ConsultationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ConsultationGroupByArgs['orderBy'];
    } : {
        orderBy?: ConsultationGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ConsultationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConsultationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ConsultationFieldRefs;
}
export interface Prisma__ConsultationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    admin<T extends Prisma.Consultation$adminArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Consultation$adminArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ConsultationFieldRefs {
    readonly id: Prisma.FieldRef<"Consultation", 'String'>;
    readonly name: Prisma.FieldRef<"Consultation", 'String'>;
    readonly email: Prisma.FieldRef<"Consultation", 'String'>;
    readonly phone: Prisma.FieldRef<"Consultation", 'String'>;
    readonly message: Prisma.FieldRef<"Consultation", 'String'>;
    readonly status: Prisma.FieldRef<"Consultation", 'ConsultationStatus'>;
    readonly respondedBy: Prisma.FieldRef<"Consultation", 'String'>;
    readonly response: Prisma.FieldRef<"Consultation", 'String'>;
    readonly respondedAt: Prisma.FieldRef<"Consultation", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Consultation", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Consultation", 'DateTime'>;
}
export type ConsultationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsultationSelect<ExtArgs> | null;
    omit?: Prisma.ConsultationOmit<ExtArgs> | null;
    include?: Prisma.ConsultationInclude<ExtArgs> | null;
    where: Prisma.ConsultationWhereUniqueInput;
};
export type ConsultationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsultationSelect<ExtArgs> | null;
    omit?: Prisma.ConsultationOmit<ExtArgs> | null;
    include?: Prisma.ConsultationInclude<ExtArgs> | null;
    where: Prisma.ConsultationWhereUniqueInput;
};
export type ConsultationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsultationSelect<ExtArgs> | null;
    omit?: Prisma.ConsultationOmit<ExtArgs> | null;
    include?: Prisma.ConsultationInclude<ExtArgs> | null;
    where?: Prisma.ConsultationWhereInput;
    orderBy?: Prisma.ConsultationOrderByWithRelationInput | Prisma.ConsultationOrderByWithRelationInput[];
    cursor?: Prisma.ConsultationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ConsultationScalarFieldEnum | Prisma.ConsultationScalarFieldEnum[];
};
export type ConsultationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsultationSelect<ExtArgs> | null;
    omit?: Prisma.ConsultationOmit<ExtArgs> | null;
    include?: Prisma.ConsultationInclude<ExtArgs> | null;
    where?: Prisma.ConsultationWhereInput;
    orderBy?: Prisma.ConsultationOrderByWithRelationInput | Prisma.ConsultationOrderByWithRelationInput[];
    cursor?: Prisma.ConsultationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ConsultationScalarFieldEnum | Prisma.ConsultationScalarFieldEnum[];
};
export type ConsultationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsultationSelect<ExtArgs> | null;
    omit?: Prisma.ConsultationOmit<ExtArgs> | null;
    include?: Prisma.ConsultationInclude<ExtArgs> | null;
    where?: Prisma.ConsultationWhereInput;
    orderBy?: Prisma.ConsultationOrderByWithRelationInput | Prisma.ConsultationOrderByWithRelationInput[];
    cursor?: Prisma.ConsultationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ConsultationScalarFieldEnum | Prisma.ConsultationScalarFieldEnum[];
};
export type ConsultationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsultationSelect<ExtArgs> | null;
    omit?: Prisma.ConsultationOmit<ExtArgs> | null;
    include?: Prisma.ConsultationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ConsultationCreateInput, Prisma.ConsultationUncheckedCreateInput>;
};
export type ConsultationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ConsultationCreateManyInput | Prisma.ConsultationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ConsultationCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsultationSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ConsultationOmit<ExtArgs> | null;
    data: Prisma.ConsultationCreateManyInput | Prisma.ConsultationCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ConsultationIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ConsultationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsultationSelect<ExtArgs> | null;
    omit?: Prisma.ConsultationOmit<ExtArgs> | null;
    include?: Prisma.ConsultationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ConsultationUpdateInput, Prisma.ConsultationUncheckedUpdateInput>;
    where: Prisma.ConsultationWhereUniqueInput;
};
export type ConsultationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ConsultationUpdateManyMutationInput, Prisma.ConsultationUncheckedUpdateManyInput>;
    where?: Prisma.ConsultationWhereInput;
    limit?: number;
};
export type ConsultationUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsultationSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ConsultationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ConsultationUpdateManyMutationInput, Prisma.ConsultationUncheckedUpdateManyInput>;
    where?: Prisma.ConsultationWhereInput;
    limit?: number;
    include?: Prisma.ConsultationIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ConsultationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsultationSelect<ExtArgs> | null;
    omit?: Prisma.ConsultationOmit<ExtArgs> | null;
    include?: Prisma.ConsultationInclude<ExtArgs> | null;
    where: Prisma.ConsultationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConsultationCreateInput, Prisma.ConsultationUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ConsultationUpdateInput, Prisma.ConsultationUncheckedUpdateInput>;
};
export type ConsultationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsultationSelect<ExtArgs> | null;
    omit?: Prisma.ConsultationOmit<ExtArgs> | null;
    include?: Prisma.ConsultationInclude<ExtArgs> | null;
    where: Prisma.ConsultationWhereUniqueInput;
};
export type ConsultationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConsultationWhereInput;
    limit?: number;
};
export type Consultation$adminArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type ConsultationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsultationSelect<ExtArgs> | null;
    omit?: Prisma.ConsultationOmit<ExtArgs> | null;
    include?: Prisma.ConsultationInclude<ExtArgs> | null;
};
