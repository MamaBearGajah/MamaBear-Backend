import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ProductImageModel = runtime.Types.Result.DefaultSelection<Prisma.$ProductImagePayload>;
export type AggregateProductImage = {
    _count: ProductImageCountAggregateOutputType | null;
    _avg: ProductImageAvgAggregateOutputType | null;
    _sum: ProductImageSumAggregateOutputType | null;
    _min: ProductImageMinAggregateOutputType | null;
    _max: ProductImageMaxAggregateOutputType | null;
};
export type ProductImageAvgAggregateOutputType = {
    sortOrder: number | null;
};
export type ProductImageSumAggregateOutputType = {
    sortOrder: number | null;
};
export type ProductImageMinAggregateOutputType = {
    id: string | null;
    productId: string | null;
    imageUrl: string | null;
    publicId: string | null;
    altText: string | null;
    imageType: $Enums.ImageType | null;
    sortOrder: number | null;
    isFeatured: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ProductImageMaxAggregateOutputType = {
    id: string | null;
    productId: string | null;
    imageUrl: string | null;
    publicId: string | null;
    altText: string | null;
    imageType: $Enums.ImageType | null;
    sortOrder: number | null;
    isFeatured: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ProductImageCountAggregateOutputType = {
    id: number;
    productId: number;
    imageUrl: number;
    publicId: number;
    altText: number;
    imageType: number;
    sortOrder: number;
    isFeatured: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ProductImageAvgAggregateInputType = {
    sortOrder?: true;
};
export type ProductImageSumAggregateInputType = {
    sortOrder?: true;
};
export type ProductImageMinAggregateInputType = {
    id?: true;
    productId?: true;
    imageUrl?: true;
    publicId?: true;
    altText?: true;
    imageType?: true;
    sortOrder?: true;
    isFeatured?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ProductImageMaxAggregateInputType = {
    id?: true;
    productId?: true;
    imageUrl?: true;
    publicId?: true;
    altText?: true;
    imageType?: true;
    sortOrder?: true;
    isFeatured?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ProductImageCountAggregateInputType = {
    id?: true;
    productId?: true;
    imageUrl?: true;
    publicId?: true;
    altText?: true;
    imageType?: true;
    sortOrder?: true;
    isFeatured?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ProductImageAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductImageWhereInput;
    orderBy?: Prisma.ProductImageOrderByWithRelationInput | Prisma.ProductImageOrderByWithRelationInput[];
    cursor?: Prisma.ProductImageWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProductImageCountAggregateInputType;
    _avg?: ProductImageAvgAggregateInputType;
    _sum?: ProductImageSumAggregateInputType;
    _min?: ProductImageMinAggregateInputType;
    _max?: ProductImageMaxAggregateInputType;
};
export type GetProductImageAggregateType<T extends ProductImageAggregateArgs> = {
    [P in keyof T & keyof AggregateProductImage]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProductImage[P]> : Prisma.GetScalarType<T[P], AggregateProductImage[P]>;
};
export type ProductImageGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductImageWhereInput;
    orderBy?: Prisma.ProductImageOrderByWithAggregationInput | Prisma.ProductImageOrderByWithAggregationInput[];
    by: Prisma.ProductImageScalarFieldEnum[] | Prisma.ProductImageScalarFieldEnum;
    having?: Prisma.ProductImageScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProductImageCountAggregateInputType | true;
    _avg?: ProductImageAvgAggregateInputType;
    _sum?: ProductImageSumAggregateInputType;
    _min?: ProductImageMinAggregateInputType;
    _max?: ProductImageMaxAggregateInputType;
};
export type ProductImageGroupByOutputType = {
    id: string;
    productId: string;
    imageUrl: string;
    publicId: string | null;
    altText: string | null;
    imageType: $Enums.ImageType;
    sortOrder: number;
    isFeatured: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: ProductImageCountAggregateOutputType | null;
    _avg: ProductImageAvgAggregateOutputType | null;
    _sum: ProductImageSumAggregateOutputType | null;
    _min: ProductImageMinAggregateOutputType | null;
    _max: ProductImageMaxAggregateOutputType | null;
};
export type GetProductImageGroupByPayload<T extends ProductImageGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProductImageGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProductImageGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProductImageGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProductImageGroupByOutputType[P]>;
}>>;
export type ProductImageWhereInput = {
    AND?: Prisma.ProductImageWhereInput | Prisma.ProductImageWhereInput[];
    OR?: Prisma.ProductImageWhereInput[];
    NOT?: Prisma.ProductImageWhereInput | Prisma.ProductImageWhereInput[];
    id?: Prisma.StringFilter<"ProductImage"> | string;
    productId?: Prisma.StringFilter<"ProductImage"> | string;
    imageUrl?: Prisma.StringFilter<"ProductImage"> | string;
    publicId?: Prisma.StringNullableFilter<"ProductImage"> | string | null;
    altText?: Prisma.StringNullableFilter<"ProductImage"> | string | null;
    imageType?: Prisma.EnumImageTypeFilter<"ProductImage"> | $Enums.ImageType;
    sortOrder?: Prisma.IntFilter<"ProductImage"> | number;
    isFeatured?: Prisma.BoolFilter<"ProductImage"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"ProductImage"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ProductImage"> | Date | string;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
};
export type ProductImageOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    publicId?: Prisma.SortOrderInput | Prisma.SortOrder;
    altText?: Prisma.SortOrderInput | Prisma.SortOrder;
    imageType?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    isFeatured?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    product?: Prisma.ProductOrderByWithRelationInput;
};
export type ProductImageWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ProductImageWhereInput | Prisma.ProductImageWhereInput[];
    OR?: Prisma.ProductImageWhereInput[];
    NOT?: Prisma.ProductImageWhereInput | Prisma.ProductImageWhereInput[];
    productId?: Prisma.StringFilter<"ProductImage"> | string;
    imageUrl?: Prisma.StringFilter<"ProductImage"> | string;
    publicId?: Prisma.StringNullableFilter<"ProductImage"> | string | null;
    altText?: Prisma.StringNullableFilter<"ProductImage"> | string | null;
    imageType?: Prisma.EnumImageTypeFilter<"ProductImage"> | $Enums.ImageType;
    sortOrder?: Prisma.IntFilter<"ProductImage"> | number;
    isFeatured?: Prisma.BoolFilter<"ProductImage"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"ProductImage"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ProductImage"> | Date | string;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
}, "id">;
export type ProductImageOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    publicId?: Prisma.SortOrderInput | Prisma.SortOrder;
    altText?: Prisma.SortOrderInput | Prisma.SortOrder;
    imageType?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    isFeatured?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ProductImageCountOrderByAggregateInput;
    _avg?: Prisma.ProductImageAvgOrderByAggregateInput;
    _max?: Prisma.ProductImageMaxOrderByAggregateInput;
    _min?: Prisma.ProductImageMinOrderByAggregateInput;
    _sum?: Prisma.ProductImageSumOrderByAggregateInput;
};
export type ProductImageScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProductImageScalarWhereWithAggregatesInput | Prisma.ProductImageScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProductImageScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProductImageScalarWhereWithAggregatesInput | Prisma.ProductImageScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ProductImage"> | string;
    productId?: Prisma.StringWithAggregatesFilter<"ProductImage"> | string;
    imageUrl?: Prisma.StringWithAggregatesFilter<"ProductImage"> | string;
    publicId?: Prisma.StringNullableWithAggregatesFilter<"ProductImage"> | string | null;
    altText?: Prisma.StringNullableWithAggregatesFilter<"ProductImage"> | string | null;
    imageType?: Prisma.EnumImageTypeWithAggregatesFilter<"ProductImage"> | $Enums.ImageType;
    sortOrder?: Prisma.IntWithAggregatesFilter<"ProductImage"> | number;
    isFeatured?: Prisma.BoolWithAggregatesFilter<"ProductImage"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ProductImage"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"ProductImage"> | Date | string;
};
export type ProductImageCreateInput = {
    id?: string;
    imageUrl: string;
    publicId?: string | null;
    altText?: string | null;
    imageType?: $Enums.ImageType;
    sortOrder?: number;
    isFeatured?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    product: Prisma.ProductCreateNestedOneWithoutImagesInput;
};
export type ProductImageUncheckedCreateInput = {
    id?: string;
    productId: string;
    imageUrl: string;
    publicId?: string | null;
    altText?: string | null;
    imageType?: $Enums.ImageType;
    sortOrder?: number;
    isFeatured?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProductImageUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    altText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageType?: Prisma.EnumImageTypeFieldUpdateOperationsInput | $Enums.ImageType;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    isFeatured?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutImagesNestedInput;
};
export type ProductImageUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    altText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageType?: Prisma.EnumImageTypeFieldUpdateOperationsInput | $Enums.ImageType;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    isFeatured?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductImageCreateManyInput = {
    id?: string;
    productId: string;
    imageUrl: string;
    publicId?: string | null;
    altText?: string | null;
    imageType?: $Enums.ImageType;
    sortOrder?: number;
    isFeatured?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProductImageUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    altText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageType?: Prisma.EnumImageTypeFieldUpdateOperationsInput | $Enums.ImageType;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    isFeatured?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductImageUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    altText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageType?: Prisma.EnumImageTypeFieldUpdateOperationsInput | $Enums.ImageType;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    isFeatured?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductImageListRelationFilter = {
    every?: Prisma.ProductImageWhereInput;
    some?: Prisma.ProductImageWhereInput;
    none?: Prisma.ProductImageWhereInput;
};
export type ProductImageOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProductImageCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    altText?: Prisma.SortOrder;
    imageType?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    isFeatured?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProductImageAvgOrderByAggregateInput = {
    sortOrder?: Prisma.SortOrder;
};
export type ProductImageMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    altText?: Prisma.SortOrder;
    imageType?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    isFeatured?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProductImageMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    altText?: Prisma.SortOrder;
    imageType?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    isFeatured?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProductImageSumOrderByAggregateInput = {
    sortOrder?: Prisma.SortOrder;
};
export type ProductImageCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ProductImageCreateWithoutProductInput, Prisma.ProductImageUncheckedCreateWithoutProductInput> | Prisma.ProductImageCreateWithoutProductInput[] | Prisma.ProductImageUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductImageCreateOrConnectWithoutProductInput | Prisma.ProductImageCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ProductImageCreateManyProductInputEnvelope;
    connect?: Prisma.ProductImageWhereUniqueInput | Prisma.ProductImageWhereUniqueInput[];
};
export type ProductImageUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ProductImageCreateWithoutProductInput, Prisma.ProductImageUncheckedCreateWithoutProductInput> | Prisma.ProductImageCreateWithoutProductInput[] | Prisma.ProductImageUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductImageCreateOrConnectWithoutProductInput | Prisma.ProductImageCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ProductImageCreateManyProductInputEnvelope;
    connect?: Prisma.ProductImageWhereUniqueInput | Prisma.ProductImageWhereUniqueInput[];
};
export type ProductImageUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ProductImageCreateWithoutProductInput, Prisma.ProductImageUncheckedCreateWithoutProductInput> | Prisma.ProductImageCreateWithoutProductInput[] | Prisma.ProductImageUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductImageCreateOrConnectWithoutProductInput | Prisma.ProductImageCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ProductImageUpsertWithWhereUniqueWithoutProductInput | Prisma.ProductImageUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ProductImageCreateManyProductInputEnvelope;
    set?: Prisma.ProductImageWhereUniqueInput | Prisma.ProductImageWhereUniqueInput[];
    disconnect?: Prisma.ProductImageWhereUniqueInput | Prisma.ProductImageWhereUniqueInput[];
    delete?: Prisma.ProductImageWhereUniqueInput | Prisma.ProductImageWhereUniqueInput[];
    connect?: Prisma.ProductImageWhereUniqueInput | Prisma.ProductImageWhereUniqueInput[];
    update?: Prisma.ProductImageUpdateWithWhereUniqueWithoutProductInput | Prisma.ProductImageUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ProductImageUpdateManyWithWhereWithoutProductInput | Prisma.ProductImageUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ProductImageScalarWhereInput | Prisma.ProductImageScalarWhereInput[];
};
export type ProductImageUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ProductImageCreateWithoutProductInput, Prisma.ProductImageUncheckedCreateWithoutProductInput> | Prisma.ProductImageCreateWithoutProductInput[] | Prisma.ProductImageUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductImageCreateOrConnectWithoutProductInput | Prisma.ProductImageCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ProductImageUpsertWithWhereUniqueWithoutProductInput | Prisma.ProductImageUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ProductImageCreateManyProductInputEnvelope;
    set?: Prisma.ProductImageWhereUniqueInput | Prisma.ProductImageWhereUniqueInput[];
    disconnect?: Prisma.ProductImageWhereUniqueInput | Prisma.ProductImageWhereUniqueInput[];
    delete?: Prisma.ProductImageWhereUniqueInput | Prisma.ProductImageWhereUniqueInput[];
    connect?: Prisma.ProductImageWhereUniqueInput | Prisma.ProductImageWhereUniqueInput[];
    update?: Prisma.ProductImageUpdateWithWhereUniqueWithoutProductInput | Prisma.ProductImageUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ProductImageUpdateManyWithWhereWithoutProductInput | Prisma.ProductImageUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ProductImageScalarWhereInput | Prisma.ProductImageScalarWhereInput[];
};
export type EnumImageTypeFieldUpdateOperationsInput = {
    set?: $Enums.ImageType;
};
export type ProductImageCreateWithoutProductInput = {
    id?: string;
    imageUrl: string;
    publicId?: string | null;
    altText?: string | null;
    imageType?: $Enums.ImageType;
    sortOrder?: number;
    isFeatured?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProductImageUncheckedCreateWithoutProductInput = {
    id?: string;
    imageUrl: string;
    publicId?: string | null;
    altText?: string | null;
    imageType?: $Enums.ImageType;
    sortOrder?: number;
    isFeatured?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProductImageCreateOrConnectWithoutProductInput = {
    where: Prisma.ProductImageWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductImageCreateWithoutProductInput, Prisma.ProductImageUncheckedCreateWithoutProductInput>;
};
export type ProductImageCreateManyProductInputEnvelope = {
    data: Prisma.ProductImageCreateManyProductInput | Prisma.ProductImageCreateManyProductInput[];
    skipDuplicates?: boolean;
};
export type ProductImageUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.ProductImageWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductImageUpdateWithoutProductInput, Prisma.ProductImageUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.ProductImageCreateWithoutProductInput, Prisma.ProductImageUncheckedCreateWithoutProductInput>;
};
export type ProductImageUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.ProductImageWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductImageUpdateWithoutProductInput, Prisma.ProductImageUncheckedUpdateWithoutProductInput>;
};
export type ProductImageUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.ProductImageScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductImageUpdateManyMutationInput, Prisma.ProductImageUncheckedUpdateManyWithoutProductInput>;
};
export type ProductImageScalarWhereInput = {
    AND?: Prisma.ProductImageScalarWhereInput | Prisma.ProductImageScalarWhereInput[];
    OR?: Prisma.ProductImageScalarWhereInput[];
    NOT?: Prisma.ProductImageScalarWhereInput | Prisma.ProductImageScalarWhereInput[];
    id?: Prisma.StringFilter<"ProductImage"> | string;
    productId?: Prisma.StringFilter<"ProductImage"> | string;
    imageUrl?: Prisma.StringFilter<"ProductImage"> | string;
    publicId?: Prisma.StringNullableFilter<"ProductImage"> | string | null;
    altText?: Prisma.StringNullableFilter<"ProductImage"> | string | null;
    imageType?: Prisma.EnumImageTypeFilter<"ProductImage"> | $Enums.ImageType;
    sortOrder?: Prisma.IntFilter<"ProductImage"> | number;
    isFeatured?: Prisma.BoolFilter<"ProductImage"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"ProductImage"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ProductImage"> | Date | string;
};
export type ProductImageCreateManyProductInput = {
    id?: string;
    imageUrl: string;
    publicId?: string | null;
    altText?: string | null;
    imageType?: $Enums.ImageType;
    sortOrder?: number;
    isFeatured?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProductImageUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    altText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageType?: Prisma.EnumImageTypeFieldUpdateOperationsInput | $Enums.ImageType;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    isFeatured?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductImageUncheckedUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    altText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageType?: Prisma.EnumImageTypeFieldUpdateOperationsInput | $Enums.ImageType;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    isFeatured?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductImageUncheckedUpdateManyWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    altText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageType?: Prisma.EnumImageTypeFieldUpdateOperationsInput | $Enums.ImageType;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    isFeatured?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductImageSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    productId?: boolean;
    imageUrl?: boolean;
    publicId?: boolean;
    altText?: boolean;
    imageType?: boolean;
    sortOrder?: boolean;
    isFeatured?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productImage"]>;
export type ProductImageSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    productId?: boolean;
    imageUrl?: boolean;
    publicId?: boolean;
    altText?: boolean;
    imageType?: boolean;
    sortOrder?: boolean;
    isFeatured?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productImage"]>;
export type ProductImageSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    productId?: boolean;
    imageUrl?: boolean;
    publicId?: boolean;
    altText?: boolean;
    imageType?: boolean;
    sortOrder?: boolean;
    isFeatured?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productImage"]>;
export type ProductImageSelectScalar = {
    id?: boolean;
    productId?: boolean;
    imageUrl?: boolean;
    publicId?: boolean;
    altText?: boolean;
    imageType?: boolean;
    sortOrder?: boolean;
    isFeatured?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ProductImageOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "productId" | "imageUrl" | "publicId" | "altText" | "imageType" | "sortOrder" | "isFeatured" | "createdAt" | "updatedAt", ExtArgs["result"]["productImage"]>;
export type ProductImageInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type ProductImageIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type ProductImageIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type $ProductImagePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ProductImage";
    objects: {
        product: Prisma.$ProductPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        productId: string;
        imageUrl: string;
        publicId: string | null;
        altText: string | null;
        imageType: $Enums.ImageType;
        sortOrder: number;
        isFeatured: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["productImage"]>;
    composites: {};
};
export type ProductImageGetPayload<S extends boolean | null | undefined | ProductImageDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProductImagePayload, S>;
export type ProductImageCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProductImageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProductImageCountAggregateInputType | true;
};
export interface ProductImageDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ProductImage'];
        meta: {
            name: 'ProductImage';
        };
    };
    findUnique<T extends ProductImageFindUniqueArgs>(args: Prisma.SelectSubset<T, ProductImageFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProductImageClient<runtime.Types.Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ProductImageFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProductImageFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductImageClient<runtime.Types.Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ProductImageFindFirstArgs>(args?: Prisma.SelectSubset<T, ProductImageFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProductImageClient<runtime.Types.Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ProductImageFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProductImageFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductImageClient<runtime.Types.Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ProductImageFindManyArgs>(args?: Prisma.SelectSubset<T, ProductImageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ProductImageCreateArgs>(args: Prisma.SelectSubset<T, ProductImageCreateArgs<ExtArgs>>): Prisma.Prisma__ProductImageClient<runtime.Types.Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ProductImageCreateManyArgs>(args?: Prisma.SelectSubset<T, ProductImageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ProductImageCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProductImageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ProductImageDeleteArgs>(args: Prisma.SelectSubset<T, ProductImageDeleteArgs<ExtArgs>>): Prisma.Prisma__ProductImageClient<runtime.Types.Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ProductImageUpdateArgs>(args: Prisma.SelectSubset<T, ProductImageUpdateArgs<ExtArgs>>): Prisma.Prisma__ProductImageClient<runtime.Types.Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ProductImageDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProductImageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ProductImageUpdateManyArgs>(args: Prisma.SelectSubset<T, ProductImageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ProductImageUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProductImageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ProductImageUpsertArgs>(args: Prisma.SelectSubset<T, ProductImageUpsertArgs<ExtArgs>>): Prisma.Prisma__ProductImageClient<runtime.Types.Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ProductImageCountArgs>(args?: Prisma.Subset<T, ProductImageCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProductImageCountAggregateOutputType> : number>;
    aggregate<T extends ProductImageAggregateArgs>(args: Prisma.Subset<T, ProductImageAggregateArgs>): Prisma.PrismaPromise<GetProductImageAggregateType<T>>;
    groupBy<T extends ProductImageGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProductImageGroupByArgs['orderBy'];
    } : {
        orderBy?: ProductImageGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProductImageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductImageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ProductImageFieldRefs;
}
export interface Prisma__ProductImageClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ProductImageFieldRefs {
    readonly id: Prisma.FieldRef<"ProductImage", 'String'>;
    readonly productId: Prisma.FieldRef<"ProductImage", 'String'>;
    readonly imageUrl: Prisma.FieldRef<"ProductImage", 'String'>;
    readonly publicId: Prisma.FieldRef<"ProductImage", 'String'>;
    readonly altText: Prisma.FieldRef<"ProductImage", 'String'>;
    readonly imageType: Prisma.FieldRef<"ProductImage", 'ImageType'>;
    readonly sortOrder: Prisma.FieldRef<"ProductImage", 'Int'>;
    readonly isFeatured: Prisma.FieldRef<"ProductImage", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"ProductImage", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"ProductImage", 'DateTime'>;
}
export type ProductImageFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductImageSelect<ExtArgs> | null;
    omit?: Prisma.ProductImageOmit<ExtArgs> | null;
    include?: Prisma.ProductImageInclude<ExtArgs> | null;
    where: Prisma.ProductImageWhereUniqueInput;
};
export type ProductImageFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductImageSelect<ExtArgs> | null;
    omit?: Prisma.ProductImageOmit<ExtArgs> | null;
    include?: Prisma.ProductImageInclude<ExtArgs> | null;
    where: Prisma.ProductImageWhereUniqueInput;
};
export type ProductImageFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductImageSelect<ExtArgs> | null;
    omit?: Prisma.ProductImageOmit<ExtArgs> | null;
    include?: Prisma.ProductImageInclude<ExtArgs> | null;
    where?: Prisma.ProductImageWhereInput;
    orderBy?: Prisma.ProductImageOrderByWithRelationInput | Prisma.ProductImageOrderByWithRelationInput[];
    cursor?: Prisma.ProductImageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductImageScalarFieldEnum | Prisma.ProductImageScalarFieldEnum[];
};
export type ProductImageFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductImageSelect<ExtArgs> | null;
    omit?: Prisma.ProductImageOmit<ExtArgs> | null;
    include?: Prisma.ProductImageInclude<ExtArgs> | null;
    where?: Prisma.ProductImageWhereInput;
    orderBy?: Prisma.ProductImageOrderByWithRelationInput | Prisma.ProductImageOrderByWithRelationInput[];
    cursor?: Prisma.ProductImageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductImageScalarFieldEnum | Prisma.ProductImageScalarFieldEnum[];
};
export type ProductImageFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductImageSelect<ExtArgs> | null;
    omit?: Prisma.ProductImageOmit<ExtArgs> | null;
    include?: Prisma.ProductImageInclude<ExtArgs> | null;
    where?: Prisma.ProductImageWhereInput;
    orderBy?: Prisma.ProductImageOrderByWithRelationInput | Prisma.ProductImageOrderByWithRelationInput[];
    cursor?: Prisma.ProductImageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductImageScalarFieldEnum | Prisma.ProductImageScalarFieldEnum[];
};
export type ProductImageCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductImageSelect<ExtArgs> | null;
    omit?: Prisma.ProductImageOmit<ExtArgs> | null;
    include?: Prisma.ProductImageInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductImageCreateInput, Prisma.ProductImageUncheckedCreateInput>;
};
export type ProductImageCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProductImageCreateManyInput | Prisma.ProductImageCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProductImageCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductImageSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductImageOmit<ExtArgs> | null;
    data: Prisma.ProductImageCreateManyInput | Prisma.ProductImageCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ProductImageIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ProductImageUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductImageSelect<ExtArgs> | null;
    omit?: Prisma.ProductImageOmit<ExtArgs> | null;
    include?: Prisma.ProductImageInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductImageUpdateInput, Prisma.ProductImageUncheckedUpdateInput>;
    where: Prisma.ProductImageWhereUniqueInput;
};
export type ProductImageUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProductImageUpdateManyMutationInput, Prisma.ProductImageUncheckedUpdateManyInput>;
    where?: Prisma.ProductImageWhereInput;
    limit?: number;
};
export type ProductImageUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductImageSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductImageOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductImageUpdateManyMutationInput, Prisma.ProductImageUncheckedUpdateManyInput>;
    where?: Prisma.ProductImageWhereInput;
    limit?: number;
    include?: Prisma.ProductImageIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ProductImageUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductImageSelect<ExtArgs> | null;
    omit?: Prisma.ProductImageOmit<ExtArgs> | null;
    include?: Prisma.ProductImageInclude<ExtArgs> | null;
    where: Prisma.ProductImageWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductImageCreateInput, Prisma.ProductImageUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ProductImageUpdateInput, Prisma.ProductImageUncheckedUpdateInput>;
};
export type ProductImageDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductImageSelect<ExtArgs> | null;
    omit?: Prisma.ProductImageOmit<ExtArgs> | null;
    include?: Prisma.ProductImageInclude<ExtArgs> | null;
    where: Prisma.ProductImageWhereUniqueInput;
};
export type ProductImageDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductImageWhereInput;
    limit?: number;
};
export type ProductImageDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductImageSelect<ExtArgs> | null;
    omit?: Prisma.ProductImageOmit<ExtArgs> | null;
    include?: Prisma.ProductImageInclude<ExtArgs> | null;
};
