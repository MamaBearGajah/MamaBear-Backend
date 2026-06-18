import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ProductReviewImageModel = runtime.Types.Result.DefaultSelection<Prisma.$ProductReviewImagePayload>;
export type AggregateProductReviewImage = {
    _count: ProductReviewImageCountAggregateOutputType | null;
    _min: ProductReviewImageMinAggregateOutputType | null;
    _max: ProductReviewImageMaxAggregateOutputType | null;
};
export type ProductReviewImageMinAggregateOutputType = {
    id: string | null;
    reviewId: string | null;
    imageUrl: string | null;
    createdAt: Date | null;
};
export type ProductReviewImageMaxAggregateOutputType = {
    id: string | null;
    reviewId: string | null;
    imageUrl: string | null;
    createdAt: Date | null;
};
export type ProductReviewImageCountAggregateOutputType = {
    id: number;
    reviewId: number;
    imageUrl: number;
    createdAt: number;
    _all: number;
};
export type ProductReviewImageMinAggregateInputType = {
    id?: true;
    reviewId?: true;
    imageUrl?: true;
    createdAt?: true;
};
export type ProductReviewImageMaxAggregateInputType = {
    id?: true;
    reviewId?: true;
    imageUrl?: true;
    createdAt?: true;
};
export type ProductReviewImageCountAggregateInputType = {
    id?: true;
    reviewId?: true;
    imageUrl?: true;
    createdAt?: true;
    _all?: true;
};
export type ProductReviewImageAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductReviewImageWhereInput;
    orderBy?: Prisma.ProductReviewImageOrderByWithRelationInput | Prisma.ProductReviewImageOrderByWithRelationInput[];
    cursor?: Prisma.ProductReviewImageWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProductReviewImageCountAggregateInputType;
    _min?: ProductReviewImageMinAggregateInputType;
    _max?: ProductReviewImageMaxAggregateInputType;
};
export type GetProductReviewImageAggregateType<T extends ProductReviewImageAggregateArgs> = {
    [P in keyof T & keyof AggregateProductReviewImage]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProductReviewImage[P]> : Prisma.GetScalarType<T[P], AggregateProductReviewImage[P]>;
};
export type ProductReviewImageGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductReviewImageWhereInput;
    orderBy?: Prisma.ProductReviewImageOrderByWithAggregationInput | Prisma.ProductReviewImageOrderByWithAggregationInput[];
    by: Prisma.ProductReviewImageScalarFieldEnum[] | Prisma.ProductReviewImageScalarFieldEnum;
    having?: Prisma.ProductReviewImageScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProductReviewImageCountAggregateInputType | true;
    _min?: ProductReviewImageMinAggregateInputType;
    _max?: ProductReviewImageMaxAggregateInputType;
};
export type ProductReviewImageGroupByOutputType = {
    id: string;
    reviewId: string;
    imageUrl: string;
    createdAt: Date;
    _count: ProductReviewImageCountAggregateOutputType | null;
    _min: ProductReviewImageMinAggregateOutputType | null;
    _max: ProductReviewImageMaxAggregateOutputType | null;
};
export type GetProductReviewImageGroupByPayload<T extends ProductReviewImageGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProductReviewImageGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProductReviewImageGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProductReviewImageGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProductReviewImageGroupByOutputType[P]>;
}>>;
export type ProductReviewImageWhereInput = {
    AND?: Prisma.ProductReviewImageWhereInput | Prisma.ProductReviewImageWhereInput[];
    OR?: Prisma.ProductReviewImageWhereInput[];
    NOT?: Prisma.ProductReviewImageWhereInput | Prisma.ProductReviewImageWhereInput[];
    id?: Prisma.StringFilter<"ProductReviewImage"> | string;
    reviewId?: Prisma.StringFilter<"ProductReviewImage"> | string;
    imageUrl?: Prisma.StringFilter<"ProductReviewImage"> | string;
    createdAt?: Prisma.DateTimeFilter<"ProductReviewImage"> | Date | string;
    review?: Prisma.XOR<Prisma.ProductReviewScalarRelationFilter, Prisma.ProductReviewWhereInput>;
};
export type ProductReviewImageOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    reviewId?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    review?: Prisma.ProductReviewOrderByWithRelationInput;
};
export type ProductReviewImageWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ProductReviewImageWhereInput | Prisma.ProductReviewImageWhereInput[];
    OR?: Prisma.ProductReviewImageWhereInput[];
    NOT?: Prisma.ProductReviewImageWhereInput | Prisma.ProductReviewImageWhereInput[];
    reviewId?: Prisma.StringFilter<"ProductReviewImage"> | string;
    imageUrl?: Prisma.StringFilter<"ProductReviewImage"> | string;
    createdAt?: Prisma.DateTimeFilter<"ProductReviewImage"> | Date | string;
    review?: Prisma.XOR<Prisma.ProductReviewScalarRelationFilter, Prisma.ProductReviewWhereInput>;
}, "id">;
export type ProductReviewImageOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    reviewId?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ProductReviewImageCountOrderByAggregateInput;
    _max?: Prisma.ProductReviewImageMaxOrderByAggregateInput;
    _min?: Prisma.ProductReviewImageMinOrderByAggregateInput;
};
export type ProductReviewImageScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProductReviewImageScalarWhereWithAggregatesInput | Prisma.ProductReviewImageScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProductReviewImageScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProductReviewImageScalarWhereWithAggregatesInput | Prisma.ProductReviewImageScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ProductReviewImage"> | string;
    reviewId?: Prisma.StringWithAggregatesFilter<"ProductReviewImage"> | string;
    imageUrl?: Prisma.StringWithAggregatesFilter<"ProductReviewImage"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ProductReviewImage"> | Date | string;
};
export type ProductReviewImageCreateInput = {
    id?: string;
    imageUrl: string;
    createdAt?: Date | string;
    review: Prisma.ProductReviewCreateNestedOneWithoutImagesInput;
};
export type ProductReviewImageUncheckedCreateInput = {
    id?: string;
    reviewId: string;
    imageUrl: string;
    createdAt?: Date | string;
};
export type ProductReviewImageUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    review?: Prisma.ProductReviewUpdateOneRequiredWithoutImagesNestedInput;
};
export type ProductReviewImageUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewId?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductReviewImageCreateManyInput = {
    id?: string;
    reviewId: string;
    imageUrl: string;
    createdAt?: Date | string;
};
export type ProductReviewImageUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductReviewImageUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewId?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductReviewImageListRelationFilter = {
    every?: Prisma.ProductReviewImageWhereInput;
    some?: Prisma.ProductReviewImageWhereInput;
    none?: Prisma.ProductReviewImageWhereInput;
};
export type ProductReviewImageOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProductReviewImageCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    reviewId?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ProductReviewImageMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    reviewId?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ProductReviewImageMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    reviewId?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ProductReviewImageCreateNestedManyWithoutReviewInput = {
    create?: Prisma.XOR<Prisma.ProductReviewImageCreateWithoutReviewInput, Prisma.ProductReviewImageUncheckedCreateWithoutReviewInput> | Prisma.ProductReviewImageCreateWithoutReviewInput[] | Prisma.ProductReviewImageUncheckedCreateWithoutReviewInput[];
    connectOrCreate?: Prisma.ProductReviewImageCreateOrConnectWithoutReviewInput | Prisma.ProductReviewImageCreateOrConnectWithoutReviewInput[];
    createMany?: Prisma.ProductReviewImageCreateManyReviewInputEnvelope;
    connect?: Prisma.ProductReviewImageWhereUniqueInput | Prisma.ProductReviewImageWhereUniqueInput[];
};
export type ProductReviewImageUncheckedCreateNestedManyWithoutReviewInput = {
    create?: Prisma.XOR<Prisma.ProductReviewImageCreateWithoutReviewInput, Prisma.ProductReviewImageUncheckedCreateWithoutReviewInput> | Prisma.ProductReviewImageCreateWithoutReviewInput[] | Prisma.ProductReviewImageUncheckedCreateWithoutReviewInput[];
    connectOrCreate?: Prisma.ProductReviewImageCreateOrConnectWithoutReviewInput | Prisma.ProductReviewImageCreateOrConnectWithoutReviewInput[];
    createMany?: Prisma.ProductReviewImageCreateManyReviewInputEnvelope;
    connect?: Prisma.ProductReviewImageWhereUniqueInput | Prisma.ProductReviewImageWhereUniqueInput[];
};
export type ProductReviewImageUpdateManyWithoutReviewNestedInput = {
    create?: Prisma.XOR<Prisma.ProductReviewImageCreateWithoutReviewInput, Prisma.ProductReviewImageUncheckedCreateWithoutReviewInput> | Prisma.ProductReviewImageCreateWithoutReviewInput[] | Prisma.ProductReviewImageUncheckedCreateWithoutReviewInput[];
    connectOrCreate?: Prisma.ProductReviewImageCreateOrConnectWithoutReviewInput | Prisma.ProductReviewImageCreateOrConnectWithoutReviewInput[];
    upsert?: Prisma.ProductReviewImageUpsertWithWhereUniqueWithoutReviewInput | Prisma.ProductReviewImageUpsertWithWhereUniqueWithoutReviewInput[];
    createMany?: Prisma.ProductReviewImageCreateManyReviewInputEnvelope;
    set?: Prisma.ProductReviewImageWhereUniqueInput | Prisma.ProductReviewImageWhereUniqueInput[];
    disconnect?: Prisma.ProductReviewImageWhereUniqueInput | Prisma.ProductReviewImageWhereUniqueInput[];
    delete?: Prisma.ProductReviewImageWhereUniqueInput | Prisma.ProductReviewImageWhereUniqueInput[];
    connect?: Prisma.ProductReviewImageWhereUniqueInput | Prisma.ProductReviewImageWhereUniqueInput[];
    update?: Prisma.ProductReviewImageUpdateWithWhereUniqueWithoutReviewInput | Prisma.ProductReviewImageUpdateWithWhereUniqueWithoutReviewInput[];
    updateMany?: Prisma.ProductReviewImageUpdateManyWithWhereWithoutReviewInput | Prisma.ProductReviewImageUpdateManyWithWhereWithoutReviewInput[];
    deleteMany?: Prisma.ProductReviewImageScalarWhereInput | Prisma.ProductReviewImageScalarWhereInput[];
};
export type ProductReviewImageUncheckedUpdateManyWithoutReviewNestedInput = {
    create?: Prisma.XOR<Prisma.ProductReviewImageCreateWithoutReviewInput, Prisma.ProductReviewImageUncheckedCreateWithoutReviewInput> | Prisma.ProductReviewImageCreateWithoutReviewInput[] | Prisma.ProductReviewImageUncheckedCreateWithoutReviewInput[];
    connectOrCreate?: Prisma.ProductReviewImageCreateOrConnectWithoutReviewInput | Prisma.ProductReviewImageCreateOrConnectWithoutReviewInput[];
    upsert?: Prisma.ProductReviewImageUpsertWithWhereUniqueWithoutReviewInput | Prisma.ProductReviewImageUpsertWithWhereUniqueWithoutReviewInput[];
    createMany?: Prisma.ProductReviewImageCreateManyReviewInputEnvelope;
    set?: Prisma.ProductReviewImageWhereUniqueInput | Prisma.ProductReviewImageWhereUniqueInput[];
    disconnect?: Prisma.ProductReviewImageWhereUniqueInput | Prisma.ProductReviewImageWhereUniqueInput[];
    delete?: Prisma.ProductReviewImageWhereUniqueInput | Prisma.ProductReviewImageWhereUniqueInput[];
    connect?: Prisma.ProductReviewImageWhereUniqueInput | Prisma.ProductReviewImageWhereUniqueInput[];
    update?: Prisma.ProductReviewImageUpdateWithWhereUniqueWithoutReviewInput | Prisma.ProductReviewImageUpdateWithWhereUniqueWithoutReviewInput[];
    updateMany?: Prisma.ProductReviewImageUpdateManyWithWhereWithoutReviewInput | Prisma.ProductReviewImageUpdateManyWithWhereWithoutReviewInput[];
    deleteMany?: Prisma.ProductReviewImageScalarWhereInput | Prisma.ProductReviewImageScalarWhereInput[];
};
export type ProductReviewImageCreateWithoutReviewInput = {
    id?: string;
    imageUrl: string;
    createdAt?: Date | string;
};
export type ProductReviewImageUncheckedCreateWithoutReviewInput = {
    id?: string;
    imageUrl: string;
    createdAt?: Date | string;
};
export type ProductReviewImageCreateOrConnectWithoutReviewInput = {
    where: Prisma.ProductReviewImageWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductReviewImageCreateWithoutReviewInput, Prisma.ProductReviewImageUncheckedCreateWithoutReviewInput>;
};
export type ProductReviewImageCreateManyReviewInputEnvelope = {
    data: Prisma.ProductReviewImageCreateManyReviewInput | Prisma.ProductReviewImageCreateManyReviewInput[];
    skipDuplicates?: boolean;
};
export type ProductReviewImageUpsertWithWhereUniqueWithoutReviewInput = {
    where: Prisma.ProductReviewImageWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductReviewImageUpdateWithoutReviewInput, Prisma.ProductReviewImageUncheckedUpdateWithoutReviewInput>;
    create: Prisma.XOR<Prisma.ProductReviewImageCreateWithoutReviewInput, Prisma.ProductReviewImageUncheckedCreateWithoutReviewInput>;
};
export type ProductReviewImageUpdateWithWhereUniqueWithoutReviewInput = {
    where: Prisma.ProductReviewImageWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductReviewImageUpdateWithoutReviewInput, Prisma.ProductReviewImageUncheckedUpdateWithoutReviewInput>;
};
export type ProductReviewImageUpdateManyWithWhereWithoutReviewInput = {
    where: Prisma.ProductReviewImageScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductReviewImageUpdateManyMutationInput, Prisma.ProductReviewImageUncheckedUpdateManyWithoutReviewInput>;
};
export type ProductReviewImageScalarWhereInput = {
    AND?: Prisma.ProductReviewImageScalarWhereInput | Prisma.ProductReviewImageScalarWhereInput[];
    OR?: Prisma.ProductReviewImageScalarWhereInput[];
    NOT?: Prisma.ProductReviewImageScalarWhereInput | Prisma.ProductReviewImageScalarWhereInput[];
    id?: Prisma.StringFilter<"ProductReviewImage"> | string;
    reviewId?: Prisma.StringFilter<"ProductReviewImage"> | string;
    imageUrl?: Prisma.StringFilter<"ProductReviewImage"> | string;
    createdAt?: Prisma.DateTimeFilter<"ProductReviewImage"> | Date | string;
};
export type ProductReviewImageCreateManyReviewInput = {
    id?: string;
    imageUrl: string;
    createdAt?: Date | string;
};
export type ProductReviewImageUpdateWithoutReviewInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductReviewImageUncheckedUpdateWithoutReviewInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductReviewImageUncheckedUpdateManyWithoutReviewInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductReviewImageSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    reviewId?: boolean;
    imageUrl?: boolean;
    createdAt?: boolean;
    review?: boolean | Prisma.ProductReviewDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productReviewImage"]>;
export type ProductReviewImageSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    reviewId?: boolean;
    imageUrl?: boolean;
    createdAt?: boolean;
    review?: boolean | Prisma.ProductReviewDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productReviewImage"]>;
export type ProductReviewImageSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    reviewId?: boolean;
    imageUrl?: boolean;
    createdAt?: boolean;
    review?: boolean | Prisma.ProductReviewDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productReviewImage"]>;
export type ProductReviewImageSelectScalar = {
    id?: boolean;
    reviewId?: boolean;
    imageUrl?: boolean;
    createdAt?: boolean;
};
export type ProductReviewImageOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "reviewId" | "imageUrl" | "createdAt", ExtArgs["result"]["productReviewImage"]>;
export type ProductReviewImageInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    review?: boolean | Prisma.ProductReviewDefaultArgs<ExtArgs>;
};
export type ProductReviewImageIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    review?: boolean | Prisma.ProductReviewDefaultArgs<ExtArgs>;
};
export type ProductReviewImageIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    review?: boolean | Prisma.ProductReviewDefaultArgs<ExtArgs>;
};
export type $ProductReviewImagePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ProductReviewImage";
    objects: {
        review: Prisma.$ProductReviewPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        reviewId: string;
        imageUrl: string;
        createdAt: Date;
    }, ExtArgs["result"]["productReviewImage"]>;
    composites: {};
};
export type ProductReviewImageGetPayload<S extends boolean | null | undefined | ProductReviewImageDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProductReviewImagePayload, S>;
export type ProductReviewImageCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProductReviewImageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProductReviewImageCountAggregateInputType | true;
};
export interface ProductReviewImageDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ProductReviewImage'];
        meta: {
            name: 'ProductReviewImage';
        };
    };
    findUnique<T extends ProductReviewImageFindUniqueArgs>(args: Prisma.SelectSubset<T, ProductReviewImageFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProductReviewImageClient<runtime.Types.Result.GetResult<Prisma.$ProductReviewImagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ProductReviewImageFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProductReviewImageFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductReviewImageClient<runtime.Types.Result.GetResult<Prisma.$ProductReviewImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ProductReviewImageFindFirstArgs>(args?: Prisma.SelectSubset<T, ProductReviewImageFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProductReviewImageClient<runtime.Types.Result.GetResult<Prisma.$ProductReviewImagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ProductReviewImageFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProductReviewImageFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductReviewImageClient<runtime.Types.Result.GetResult<Prisma.$ProductReviewImagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ProductReviewImageFindManyArgs>(args?: Prisma.SelectSubset<T, ProductReviewImageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductReviewImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ProductReviewImageCreateArgs>(args: Prisma.SelectSubset<T, ProductReviewImageCreateArgs<ExtArgs>>): Prisma.Prisma__ProductReviewImageClient<runtime.Types.Result.GetResult<Prisma.$ProductReviewImagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ProductReviewImageCreateManyArgs>(args?: Prisma.SelectSubset<T, ProductReviewImageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ProductReviewImageCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProductReviewImageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductReviewImagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ProductReviewImageDeleteArgs>(args: Prisma.SelectSubset<T, ProductReviewImageDeleteArgs<ExtArgs>>): Prisma.Prisma__ProductReviewImageClient<runtime.Types.Result.GetResult<Prisma.$ProductReviewImagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ProductReviewImageUpdateArgs>(args: Prisma.SelectSubset<T, ProductReviewImageUpdateArgs<ExtArgs>>): Prisma.Prisma__ProductReviewImageClient<runtime.Types.Result.GetResult<Prisma.$ProductReviewImagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ProductReviewImageDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProductReviewImageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ProductReviewImageUpdateManyArgs>(args: Prisma.SelectSubset<T, ProductReviewImageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ProductReviewImageUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProductReviewImageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductReviewImagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ProductReviewImageUpsertArgs>(args: Prisma.SelectSubset<T, ProductReviewImageUpsertArgs<ExtArgs>>): Prisma.Prisma__ProductReviewImageClient<runtime.Types.Result.GetResult<Prisma.$ProductReviewImagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ProductReviewImageCountArgs>(args?: Prisma.Subset<T, ProductReviewImageCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProductReviewImageCountAggregateOutputType> : number>;
    aggregate<T extends ProductReviewImageAggregateArgs>(args: Prisma.Subset<T, ProductReviewImageAggregateArgs>): Prisma.PrismaPromise<GetProductReviewImageAggregateType<T>>;
    groupBy<T extends ProductReviewImageGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProductReviewImageGroupByArgs['orderBy'];
    } : {
        orderBy?: ProductReviewImageGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProductReviewImageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductReviewImageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ProductReviewImageFieldRefs;
}
export interface Prisma__ProductReviewImageClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    review<T extends Prisma.ProductReviewDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductReviewDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductReviewClient<runtime.Types.Result.GetResult<Prisma.$ProductReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ProductReviewImageFieldRefs {
    readonly id: Prisma.FieldRef<"ProductReviewImage", 'String'>;
    readonly reviewId: Prisma.FieldRef<"ProductReviewImage", 'String'>;
    readonly imageUrl: Prisma.FieldRef<"ProductReviewImage", 'String'>;
    readonly createdAt: Prisma.FieldRef<"ProductReviewImage", 'DateTime'>;
}
export type ProductReviewImageFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductReviewImageSelect<ExtArgs> | null;
    omit?: Prisma.ProductReviewImageOmit<ExtArgs> | null;
    include?: Prisma.ProductReviewImageInclude<ExtArgs> | null;
    where: Prisma.ProductReviewImageWhereUniqueInput;
};
export type ProductReviewImageFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductReviewImageSelect<ExtArgs> | null;
    omit?: Prisma.ProductReviewImageOmit<ExtArgs> | null;
    include?: Prisma.ProductReviewImageInclude<ExtArgs> | null;
    where: Prisma.ProductReviewImageWhereUniqueInput;
};
export type ProductReviewImageFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductReviewImageSelect<ExtArgs> | null;
    omit?: Prisma.ProductReviewImageOmit<ExtArgs> | null;
    include?: Prisma.ProductReviewImageInclude<ExtArgs> | null;
    where?: Prisma.ProductReviewImageWhereInput;
    orderBy?: Prisma.ProductReviewImageOrderByWithRelationInput | Prisma.ProductReviewImageOrderByWithRelationInput[];
    cursor?: Prisma.ProductReviewImageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductReviewImageScalarFieldEnum | Prisma.ProductReviewImageScalarFieldEnum[];
};
export type ProductReviewImageFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductReviewImageSelect<ExtArgs> | null;
    omit?: Prisma.ProductReviewImageOmit<ExtArgs> | null;
    include?: Prisma.ProductReviewImageInclude<ExtArgs> | null;
    where?: Prisma.ProductReviewImageWhereInput;
    orderBy?: Prisma.ProductReviewImageOrderByWithRelationInput | Prisma.ProductReviewImageOrderByWithRelationInput[];
    cursor?: Prisma.ProductReviewImageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductReviewImageScalarFieldEnum | Prisma.ProductReviewImageScalarFieldEnum[];
};
export type ProductReviewImageFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductReviewImageSelect<ExtArgs> | null;
    omit?: Prisma.ProductReviewImageOmit<ExtArgs> | null;
    include?: Prisma.ProductReviewImageInclude<ExtArgs> | null;
    where?: Prisma.ProductReviewImageWhereInput;
    orderBy?: Prisma.ProductReviewImageOrderByWithRelationInput | Prisma.ProductReviewImageOrderByWithRelationInput[];
    cursor?: Prisma.ProductReviewImageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductReviewImageScalarFieldEnum | Prisma.ProductReviewImageScalarFieldEnum[];
};
export type ProductReviewImageCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductReviewImageSelect<ExtArgs> | null;
    omit?: Prisma.ProductReviewImageOmit<ExtArgs> | null;
    include?: Prisma.ProductReviewImageInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductReviewImageCreateInput, Prisma.ProductReviewImageUncheckedCreateInput>;
};
export type ProductReviewImageCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProductReviewImageCreateManyInput | Prisma.ProductReviewImageCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProductReviewImageCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductReviewImageSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductReviewImageOmit<ExtArgs> | null;
    data: Prisma.ProductReviewImageCreateManyInput | Prisma.ProductReviewImageCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ProductReviewImageIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ProductReviewImageUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductReviewImageSelect<ExtArgs> | null;
    omit?: Prisma.ProductReviewImageOmit<ExtArgs> | null;
    include?: Prisma.ProductReviewImageInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductReviewImageUpdateInput, Prisma.ProductReviewImageUncheckedUpdateInput>;
    where: Prisma.ProductReviewImageWhereUniqueInput;
};
export type ProductReviewImageUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProductReviewImageUpdateManyMutationInput, Prisma.ProductReviewImageUncheckedUpdateManyInput>;
    where?: Prisma.ProductReviewImageWhereInput;
    limit?: number;
};
export type ProductReviewImageUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductReviewImageSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductReviewImageOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductReviewImageUpdateManyMutationInput, Prisma.ProductReviewImageUncheckedUpdateManyInput>;
    where?: Prisma.ProductReviewImageWhereInput;
    limit?: number;
    include?: Prisma.ProductReviewImageIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ProductReviewImageUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductReviewImageSelect<ExtArgs> | null;
    omit?: Prisma.ProductReviewImageOmit<ExtArgs> | null;
    include?: Prisma.ProductReviewImageInclude<ExtArgs> | null;
    where: Prisma.ProductReviewImageWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductReviewImageCreateInput, Prisma.ProductReviewImageUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ProductReviewImageUpdateInput, Prisma.ProductReviewImageUncheckedUpdateInput>;
};
export type ProductReviewImageDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductReviewImageSelect<ExtArgs> | null;
    omit?: Prisma.ProductReviewImageOmit<ExtArgs> | null;
    include?: Prisma.ProductReviewImageInclude<ExtArgs> | null;
    where: Prisma.ProductReviewImageWhereUniqueInput;
};
export type ProductReviewImageDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductReviewImageWhereInput;
    limit?: number;
};
export type ProductReviewImageDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductReviewImageSelect<ExtArgs> | null;
    omit?: Prisma.ProductReviewImageOmit<ExtArgs> | null;
    include?: Prisma.ProductReviewImageInclude<ExtArgs> | null;
};
