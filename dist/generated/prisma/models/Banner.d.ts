import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type BannerModel = runtime.Types.Result.DefaultSelection<Prisma.$BannerPayload>;
export type AggregateBanner = {
    _count: BannerCountAggregateOutputType | null;
    _avg: BannerAvgAggregateOutputType | null;
    _sum: BannerSumAggregateOutputType | null;
    _min: BannerMinAggregateOutputType | null;
    _max: BannerMaxAggregateOutputType | null;
};
export type BannerAvgAggregateOutputType = {
    sortOrder: number | null;
};
export type BannerSumAggregateOutputType = {
    sortOrder: number | null;
};
export type BannerMinAggregateOutputType = {
    id: string | null;
    imageUrl: string | null;
    altText: string | null;
    label: string | null;
    title: string | null;
    desc: string | null;
    path: string | null;
    isActive: boolean | null;
    sortOrder: number | null;
    startDate: Date | null;
    endDate: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type BannerMaxAggregateOutputType = {
    id: string | null;
    imageUrl: string | null;
    altText: string | null;
    label: string | null;
    title: string | null;
    desc: string | null;
    path: string | null;
    isActive: boolean | null;
    sortOrder: number | null;
    startDate: Date | null;
    endDate: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type BannerCountAggregateOutputType = {
    id: number;
    imageUrl: number;
    altText: number;
    label: number;
    title: number;
    desc: number;
    path: number;
    isActive: number;
    sortOrder: number;
    startDate: number;
    endDate: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type BannerAvgAggregateInputType = {
    sortOrder?: true;
};
export type BannerSumAggregateInputType = {
    sortOrder?: true;
};
export type BannerMinAggregateInputType = {
    id?: true;
    imageUrl?: true;
    altText?: true;
    label?: true;
    title?: true;
    desc?: true;
    path?: true;
    isActive?: true;
    sortOrder?: true;
    startDate?: true;
    endDate?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type BannerMaxAggregateInputType = {
    id?: true;
    imageUrl?: true;
    altText?: true;
    label?: true;
    title?: true;
    desc?: true;
    path?: true;
    isActive?: true;
    sortOrder?: true;
    startDate?: true;
    endDate?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type BannerCountAggregateInputType = {
    id?: true;
    imageUrl?: true;
    altText?: true;
    label?: true;
    title?: true;
    desc?: true;
    path?: true;
    isActive?: true;
    sortOrder?: true;
    startDate?: true;
    endDate?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type BannerAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BannerWhereInput;
    orderBy?: Prisma.BannerOrderByWithRelationInput | Prisma.BannerOrderByWithRelationInput[];
    cursor?: Prisma.BannerWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | BannerCountAggregateInputType;
    _avg?: BannerAvgAggregateInputType;
    _sum?: BannerSumAggregateInputType;
    _min?: BannerMinAggregateInputType;
    _max?: BannerMaxAggregateInputType;
};
export type GetBannerAggregateType<T extends BannerAggregateArgs> = {
    [P in keyof T & keyof AggregateBanner]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBanner[P]> : Prisma.GetScalarType<T[P], AggregateBanner[P]>;
};
export type BannerGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BannerWhereInput;
    orderBy?: Prisma.BannerOrderByWithAggregationInput | Prisma.BannerOrderByWithAggregationInput[];
    by: Prisma.BannerScalarFieldEnum[] | Prisma.BannerScalarFieldEnum;
    having?: Prisma.BannerScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BannerCountAggregateInputType | true;
    _avg?: BannerAvgAggregateInputType;
    _sum?: BannerSumAggregateInputType;
    _min?: BannerMinAggregateInputType;
    _max?: BannerMaxAggregateInputType;
};
export type BannerGroupByOutputType = {
    id: string;
    imageUrl: string;
    altText: string | null;
    label: string | null;
    title: string | null;
    desc: string | null;
    path: string | null;
    isActive: boolean;
    sortOrder: number;
    startDate: Date | null;
    endDate: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: BannerCountAggregateOutputType | null;
    _avg: BannerAvgAggregateOutputType | null;
    _sum: BannerSumAggregateOutputType | null;
    _min: BannerMinAggregateOutputType | null;
    _max: BannerMaxAggregateOutputType | null;
};
export type GetBannerGroupByPayload<T extends BannerGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BannerGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BannerGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BannerGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BannerGroupByOutputType[P]>;
}>>;
export type BannerWhereInput = {
    AND?: Prisma.BannerWhereInput | Prisma.BannerWhereInput[];
    OR?: Prisma.BannerWhereInput[];
    NOT?: Prisma.BannerWhereInput | Prisma.BannerWhereInput[];
    id?: Prisma.StringFilter<"Banner"> | string;
    imageUrl?: Prisma.StringFilter<"Banner"> | string;
    altText?: Prisma.StringNullableFilter<"Banner"> | string | null;
    label?: Prisma.StringNullableFilter<"Banner"> | string | null;
    title?: Prisma.StringNullableFilter<"Banner"> | string | null;
    desc?: Prisma.StringNullableFilter<"Banner"> | string | null;
    path?: Prisma.StringNullableFilter<"Banner"> | string | null;
    isActive?: Prisma.BoolFilter<"Banner"> | boolean;
    sortOrder?: Prisma.IntFilter<"Banner"> | number;
    startDate?: Prisma.DateTimeNullableFilter<"Banner"> | Date | string | null;
    endDate?: Prisma.DateTimeNullableFilter<"Banner"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Banner"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Banner"> | Date | string;
};
export type BannerOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    altText?: Prisma.SortOrderInput | Prisma.SortOrder;
    label?: Prisma.SortOrderInput | Prisma.SortOrder;
    title?: Prisma.SortOrderInput | Prisma.SortOrder;
    desc?: Prisma.SortOrderInput | Prisma.SortOrder;
    path?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    startDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    endDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BannerWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.BannerWhereInput | Prisma.BannerWhereInput[];
    OR?: Prisma.BannerWhereInput[];
    NOT?: Prisma.BannerWhereInput | Prisma.BannerWhereInput[];
    imageUrl?: Prisma.StringFilter<"Banner"> | string;
    altText?: Prisma.StringNullableFilter<"Banner"> | string | null;
    label?: Prisma.StringNullableFilter<"Banner"> | string | null;
    title?: Prisma.StringNullableFilter<"Banner"> | string | null;
    desc?: Prisma.StringNullableFilter<"Banner"> | string | null;
    path?: Prisma.StringNullableFilter<"Banner"> | string | null;
    isActive?: Prisma.BoolFilter<"Banner"> | boolean;
    sortOrder?: Prisma.IntFilter<"Banner"> | number;
    startDate?: Prisma.DateTimeNullableFilter<"Banner"> | Date | string | null;
    endDate?: Prisma.DateTimeNullableFilter<"Banner"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Banner"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Banner"> | Date | string;
}, "id">;
export type BannerOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    altText?: Prisma.SortOrderInput | Prisma.SortOrder;
    label?: Prisma.SortOrderInput | Prisma.SortOrder;
    title?: Prisma.SortOrderInput | Prisma.SortOrder;
    desc?: Prisma.SortOrderInput | Prisma.SortOrder;
    path?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    startDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    endDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.BannerCountOrderByAggregateInput;
    _avg?: Prisma.BannerAvgOrderByAggregateInput;
    _max?: Prisma.BannerMaxOrderByAggregateInput;
    _min?: Prisma.BannerMinOrderByAggregateInput;
    _sum?: Prisma.BannerSumOrderByAggregateInput;
};
export type BannerScalarWhereWithAggregatesInput = {
    AND?: Prisma.BannerScalarWhereWithAggregatesInput | Prisma.BannerScalarWhereWithAggregatesInput[];
    OR?: Prisma.BannerScalarWhereWithAggregatesInput[];
    NOT?: Prisma.BannerScalarWhereWithAggregatesInput | Prisma.BannerScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Banner"> | string;
    imageUrl?: Prisma.StringWithAggregatesFilter<"Banner"> | string;
    altText?: Prisma.StringNullableWithAggregatesFilter<"Banner"> | string | null;
    label?: Prisma.StringNullableWithAggregatesFilter<"Banner"> | string | null;
    title?: Prisma.StringNullableWithAggregatesFilter<"Banner"> | string | null;
    desc?: Prisma.StringNullableWithAggregatesFilter<"Banner"> | string | null;
    path?: Prisma.StringNullableWithAggregatesFilter<"Banner"> | string | null;
    isActive?: Prisma.BoolWithAggregatesFilter<"Banner"> | boolean;
    sortOrder?: Prisma.IntWithAggregatesFilter<"Banner"> | number;
    startDate?: Prisma.DateTimeNullableWithAggregatesFilter<"Banner"> | Date | string | null;
    endDate?: Prisma.DateTimeNullableWithAggregatesFilter<"Banner"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Banner"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Banner"> | Date | string;
};
export type BannerCreateInput = {
    id?: string;
    imageUrl: string;
    altText?: string | null;
    label?: string | null;
    title?: string | null;
    desc?: string | null;
    path?: string | null;
    isActive?: boolean;
    sortOrder?: number;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BannerUncheckedCreateInput = {
    id?: string;
    imageUrl: string;
    altText?: string | null;
    label?: string | null;
    title?: string | null;
    desc?: string | null;
    path?: string | null;
    isActive?: boolean;
    sortOrder?: number;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BannerUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    altText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    label?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    desc?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    path?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BannerUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    altText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    label?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    desc?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    path?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BannerCreateManyInput = {
    id?: string;
    imageUrl: string;
    altText?: string | null;
    label?: string | null;
    title?: string | null;
    desc?: string | null;
    path?: string | null;
    isActive?: boolean;
    sortOrder?: number;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BannerUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    altText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    label?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    desc?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    path?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BannerUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    altText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    label?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    desc?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    path?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BannerCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    altText?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    desc?: Prisma.SortOrder;
    path?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BannerAvgOrderByAggregateInput = {
    sortOrder?: Prisma.SortOrder;
};
export type BannerMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    altText?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    desc?: Prisma.SortOrder;
    path?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BannerMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    altText?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    desc?: Prisma.SortOrder;
    path?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BannerSumOrderByAggregateInput = {
    sortOrder?: Prisma.SortOrder;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type BannerSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    imageUrl?: boolean;
    altText?: boolean;
    label?: boolean;
    title?: boolean;
    desc?: boolean;
    path?: boolean;
    isActive?: boolean;
    sortOrder?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["banner"]>;
export type BannerSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    imageUrl?: boolean;
    altText?: boolean;
    label?: boolean;
    title?: boolean;
    desc?: boolean;
    path?: boolean;
    isActive?: boolean;
    sortOrder?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["banner"]>;
export type BannerSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    imageUrl?: boolean;
    altText?: boolean;
    label?: boolean;
    title?: boolean;
    desc?: boolean;
    path?: boolean;
    isActive?: boolean;
    sortOrder?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["banner"]>;
export type BannerSelectScalar = {
    id?: boolean;
    imageUrl?: boolean;
    altText?: boolean;
    label?: boolean;
    title?: boolean;
    desc?: boolean;
    path?: boolean;
    isActive?: boolean;
    sortOrder?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type BannerOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "imageUrl" | "altText" | "label" | "title" | "desc" | "path" | "isActive" | "sortOrder" | "startDate" | "endDate" | "createdAt" | "updatedAt", ExtArgs["result"]["banner"]>;
export type $BannerPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Banner";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        imageUrl: string;
        altText: string | null;
        label: string | null;
        title: string | null;
        desc: string | null;
        path: string | null;
        isActive: boolean;
        sortOrder: number;
        startDate: Date | null;
        endDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["banner"]>;
    composites: {};
};
export type BannerGetPayload<S extends boolean | null | undefined | BannerDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$BannerPayload, S>;
export type BannerCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<BannerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BannerCountAggregateInputType | true;
};
export interface BannerDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Banner'];
        meta: {
            name: 'Banner';
        };
    };
    findUnique<T extends BannerFindUniqueArgs>(args: Prisma.SelectSubset<T, BannerFindUniqueArgs<ExtArgs>>): Prisma.Prisma__BannerClient<runtime.Types.Result.GetResult<Prisma.$BannerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends BannerFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, BannerFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__BannerClient<runtime.Types.Result.GetResult<Prisma.$BannerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends BannerFindFirstArgs>(args?: Prisma.SelectSubset<T, BannerFindFirstArgs<ExtArgs>>): Prisma.Prisma__BannerClient<runtime.Types.Result.GetResult<Prisma.$BannerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends BannerFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, BannerFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__BannerClient<runtime.Types.Result.GetResult<Prisma.$BannerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends BannerFindManyArgs>(args?: Prisma.SelectSubset<T, BannerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BannerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends BannerCreateArgs>(args: Prisma.SelectSubset<T, BannerCreateArgs<ExtArgs>>): Prisma.Prisma__BannerClient<runtime.Types.Result.GetResult<Prisma.$BannerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends BannerCreateManyArgs>(args?: Prisma.SelectSubset<T, BannerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends BannerCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, BannerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BannerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends BannerDeleteArgs>(args: Prisma.SelectSubset<T, BannerDeleteArgs<ExtArgs>>): Prisma.Prisma__BannerClient<runtime.Types.Result.GetResult<Prisma.$BannerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends BannerUpdateArgs>(args: Prisma.SelectSubset<T, BannerUpdateArgs<ExtArgs>>): Prisma.Prisma__BannerClient<runtime.Types.Result.GetResult<Prisma.$BannerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends BannerDeleteManyArgs>(args?: Prisma.SelectSubset<T, BannerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends BannerUpdateManyArgs>(args: Prisma.SelectSubset<T, BannerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends BannerUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, BannerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BannerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends BannerUpsertArgs>(args: Prisma.SelectSubset<T, BannerUpsertArgs<ExtArgs>>): Prisma.Prisma__BannerClient<runtime.Types.Result.GetResult<Prisma.$BannerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends BannerCountArgs>(args?: Prisma.Subset<T, BannerCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BannerCountAggregateOutputType> : number>;
    aggregate<T extends BannerAggregateArgs>(args: Prisma.Subset<T, BannerAggregateArgs>): Prisma.PrismaPromise<GetBannerAggregateType<T>>;
    groupBy<T extends BannerGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: BannerGroupByArgs['orderBy'];
    } : {
        orderBy?: BannerGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, BannerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBannerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: BannerFieldRefs;
}
export interface Prisma__BannerClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface BannerFieldRefs {
    readonly id: Prisma.FieldRef<"Banner", 'String'>;
    readonly imageUrl: Prisma.FieldRef<"Banner", 'String'>;
    readonly altText: Prisma.FieldRef<"Banner", 'String'>;
    readonly label: Prisma.FieldRef<"Banner", 'String'>;
    readonly title: Prisma.FieldRef<"Banner", 'String'>;
    readonly desc: Prisma.FieldRef<"Banner", 'String'>;
    readonly path: Prisma.FieldRef<"Banner", 'String'>;
    readonly isActive: Prisma.FieldRef<"Banner", 'Boolean'>;
    readonly sortOrder: Prisma.FieldRef<"Banner", 'Int'>;
    readonly startDate: Prisma.FieldRef<"Banner", 'DateTime'>;
    readonly endDate: Prisma.FieldRef<"Banner", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Banner", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Banner", 'DateTime'>;
}
export type BannerFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BannerSelect<ExtArgs> | null;
    omit?: Prisma.BannerOmit<ExtArgs> | null;
    where: Prisma.BannerWhereUniqueInput;
};
export type BannerFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BannerSelect<ExtArgs> | null;
    omit?: Prisma.BannerOmit<ExtArgs> | null;
    where: Prisma.BannerWhereUniqueInput;
};
export type BannerFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BannerSelect<ExtArgs> | null;
    omit?: Prisma.BannerOmit<ExtArgs> | null;
    where?: Prisma.BannerWhereInput;
    orderBy?: Prisma.BannerOrderByWithRelationInput | Prisma.BannerOrderByWithRelationInput[];
    cursor?: Prisma.BannerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BannerScalarFieldEnum | Prisma.BannerScalarFieldEnum[];
};
export type BannerFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BannerSelect<ExtArgs> | null;
    omit?: Prisma.BannerOmit<ExtArgs> | null;
    where?: Prisma.BannerWhereInput;
    orderBy?: Prisma.BannerOrderByWithRelationInput | Prisma.BannerOrderByWithRelationInput[];
    cursor?: Prisma.BannerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BannerScalarFieldEnum | Prisma.BannerScalarFieldEnum[];
};
export type BannerFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BannerSelect<ExtArgs> | null;
    omit?: Prisma.BannerOmit<ExtArgs> | null;
    where?: Prisma.BannerWhereInput;
    orderBy?: Prisma.BannerOrderByWithRelationInput | Prisma.BannerOrderByWithRelationInput[];
    cursor?: Prisma.BannerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BannerScalarFieldEnum | Prisma.BannerScalarFieldEnum[];
};
export type BannerCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BannerSelect<ExtArgs> | null;
    omit?: Prisma.BannerOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BannerCreateInput, Prisma.BannerUncheckedCreateInput>;
};
export type BannerCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.BannerCreateManyInput | Prisma.BannerCreateManyInput[];
    skipDuplicates?: boolean;
};
export type BannerCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BannerSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BannerOmit<ExtArgs> | null;
    data: Prisma.BannerCreateManyInput | Prisma.BannerCreateManyInput[];
    skipDuplicates?: boolean;
};
export type BannerUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BannerSelect<ExtArgs> | null;
    omit?: Prisma.BannerOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BannerUpdateInput, Prisma.BannerUncheckedUpdateInput>;
    where: Prisma.BannerWhereUniqueInput;
};
export type BannerUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.BannerUpdateManyMutationInput, Prisma.BannerUncheckedUpdateManyInput>;
    where?: Prisma.BannerWhereInput;
    limit?: number;
};
export type BannerUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BannerSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BannerOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BannerUpdateManyMutationInput, Prisma.BannerUncheckedUpdateManyInput>;
    where?: Prisma.BannerWhereInput;
    limit?: number;
};
export type BannerUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BannerSelect<ExtArgs> | null;
    omit?: Prisma.BannerOmit<ExtArgs> | null;
    where: Prisma.BannerWhereUniqueInput;
    create: Prisma.XOR<Prisma.BannerCreateInput, Prisma.BannerUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.BannerUpdateInput, Prisma.BannerUncheckedUpdateInput>;
};
export type BannerDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BannerSelect<ExtArgs> | null;
    omit?: Prisma.BannerOmit<ExtArgs> | null;
    where: Prisma.BannerWhereUniqueInput;
};
export type BannerDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BannerWhereInput;
    limit?: number;
};
export type BannerDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BannerSelect<ExtArgs> | null;
    omit?: Prisma.BannerOmit<ExtArgs> | null;
};
