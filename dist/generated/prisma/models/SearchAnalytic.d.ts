import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type SearchAnalyticModel = runtime.Types.Result.DefaultSelection<Prisma.$SearchAnalyticPayload>;
export type AggregateSearchAnalytic = {
    _count: SearchAnalyticCountAggregateOutputType | null;
    _avg: SearchAnalyticAvgAggregateOutputType | null;
    _sum: SearchAnalyticSumAggregateOutputType | null;
    _min: SearchAnalyticMinAggregateOutputType | null;
    _max: SearchAnalyticMaxAggregateOutputType | null;
};
export type SearchAnalyticAvgAggregateOutputType = {
    count: number | null;
};
export type SearchAnalyticSumAggregateOutputType = {
    count: number | null;
};
export type SearchAnalyticMinAggregateOutputType = {
    id: string | null;
    query: string | null;
    count: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type SearchAnalyticMaxAggregateOutputType = {
    id: string | null;
    query: string | null;
    count: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type SearchAnalyticCountAggregateOutputType = {
    id: number;
    query: number;
    count: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type SearchAnalyticAvgAggregateInputType = {
    count?: true;
};
export type SearchAnalyticSumAggregateInputType = {
    count?: true;
};
export type SearchAnalyticMinAggregateInputType = {
    id?: true;
    query?: true;
    count?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type SearchAnalyticMaxAggregateInputType = {
    id?: true;
    query?: true;
    count?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type SearchAnalyticCountAggregateInputType = {
    id?: true;
    query?: true;
    count?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type SearchAnalyticAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SearchAnalyticWhereInput;
    orderBy?: Prisma.SearchAnalyticOrderByWithRelationInput | Prisma.SearchAnalyticOrderByWithRelationInput[];
    cursor?: Prisma.SearchAnalyticWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SearchAnalyticCountAggregateInputType;
    _avg?: SearchAnalyticAvgAggregateInputType;
    _sum?: SearchAnalyticSumAggregateInputType;
    _min?: SearchAnalyticMinAggregateInputType;
    _max?: SearchAnalyticMaxAggregateInputType;
};
export type GetSearchAnalyticAggregateType<T extends SearchAnalyticAggregateArgs> = {
    [P in keyof T & keyof AggregateSearchAnalytic]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSearchAnalytic[P]> : Prisma.GetScalarType<T[P], AggregateSearchAnalytic[P]>;
};
export type SearchAnalyticGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SearchAnalyticWhereInput;
    orderBy?: Prisma.SearchAnalyticOrderByWithAggregationInput | Prisma.SearchAnalyticOrderByWithAggregationInput[];
    by: Prisma.SearchAnalyticScalarFieldEnum[] | Prisma.SearchAnalyticScalarFieldEnum;
    having?: Prisma.SearchAnalyticScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SearchAnalyticCountAggregateInputType | true;
    _avg?: SearchAnalyticAvgAggregateInputType;
    _sum?: SearchAnalyticSumAggregateInputType;
    _min?: SearchAnalyticMinAggregateInputType;
    _max?: SearchAnalyticMaxAggregateInputType;
};
export type SearchAnalyticGroupByOutputType = {
    id: string;
    query: string;
    count: number;
    createdAt: Date;
    updatedAt: Date;
    _count: SearchAnalyticCountAggregateOutputType | null;
    _avg: SearchAnalyticAvgAggregateOutputType | null;
    _sum: SearchAnalyticSumAggregateOutputType | null;
    _min: SearchAnalyticMinAggregateOutputType | null;
    _max: SearchAnalyticMaxAggregateOutputType | null;
};
export type GetSearchAnalyticGroupByPayload<T extends SearchAnalyticGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SearchAnalyticGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SearchAnalyticGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SearchAnalyticGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SearchAnalyticGroupByOutputType[P]>;
}>>;
export type SearchAnalyticWhereInput = {
    AND?: Prisma.SearchAnalyticWhereInput | Prisma.SearchAnalyticWhereInput[];
    OR?: Prisma.SearchAnalyticWhereInput[];
    NOT?: Prisma.SearchAnalyticWhereInput | Prisma.SearchAnalyticWhereInput[];
    id?: Prisma.StringFilter<"SearchAnalytic"> | string;
    query?: Prisma.StringFilter<"SearchAnalytic"> | string;
    count?: Prisma.IntFilter<"SearchAnalytic"> | number;
    createdAt?: Prisma.DateTimeFilter<"SearchAnalytic"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"SearchAnalytic"> | Date | string;
};
export type SearchAnalyticOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    query?: Prisma.SortOrder;
    count?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SearchAnalyticWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    query?: string;
    AND?: Prisma.SearchAnalyticWhereInput | Prisma.SearchAnalyticWhereInput[];
    OR?: Prisma.SearchAnalyticWhereInput[];
    NOT?: Prisma.SearchAnalyticWhereInput | Prisma.SearchAnalyticWhereInput[];
    count?: Prisma.IntFilter<"SearchAnalytic"> | number;
    createdAt?: Prisma.DateTimeFilter<"SearchAnalytic"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"SearchAnalytic"> | Date | string;
}, "id" | "query">;
export type SearchAnalyticOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    query?: Prisma.SortOrder;
    count?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.SearchAnalyticCountOrderByAggregateInput;
    _avg?: Prisma.SearchAnalyticAvgOrderByAggregateInput;
    _max?: Prisma.SearchAnalyticMaxOrderByAggregateInput;
    _min?: Prisma.SearchAnalyticMinOrderByAggregateInput;
    _sum?: Prisma.SearchAnalyticSumOrderByAggregateInput;
};
export type SearchAnalyticScalarWhereWithAggregatesInput = {
    AND?: Prisma.SearchAnalyticScalarWhereWithAggregatesInput | Prisma.SearchAnalyticScalarWhereWithAggregatesInput[];
    OR?: Prisma.SearchAnalyticScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SearchAnalyticScalarWhereWithAggregatesInput | Prisma.SearchAnalyticScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"SearchAnalytic"> | string;
    query?: Prisma.StringWithAggregatesFilter<"SearchAnalytic"> | string;
    count?: Prisma.IntWithAggregatesFilter<"SearchAnalytic"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"SearchAnalytic"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"SearchAnalytic"> | Date | string;
};
export type SearchAnalyticCreateInput = {
    id?: string;
    query: string;
    count?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SearchAnalyticUncheckedCreateInput = {
    id?: string;
    query: string;
    count?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SearchAnalyticUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    query?: Prisma.StringFieldUpdateOperationsInput | string;
    count?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SearchAnalyticUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    query?: Prisma.StringFieldUpdateOperationsInput | string;
    count?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SearchAnalyticCreateManyInput = {
    id?: string;
    query: string;
    count?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SearchAnalyticUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    query?: Prisma.StringFieldUpdateOperationsInput | string;
    count?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SearchAnalyticUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    query?: Prisma.StringFieldUpdateOperationsInput | string;
    count?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SearchAnalyticCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    query?: Prisma.SortOrder;
    count?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SearchAnalyticAvgOrderByAggregateInput = {
    count?: Prisma.SortOrder;
};
export type SearchAnalyticMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    query?: Prisma.SortOrder;
    count?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SearchAnalyticMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    query?: Prisma.SortOrder;
    count?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SearchAnalyticSumOrderByAggregateInput = {
    count?: Prisma.SortOrder;
};
export type SearchAnalyticSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    query?: boolean;
    count?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["searchAnalytic"]>;
export type SearchAnalyticSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    query?: boolean;
    count?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["searchAnalytic"]>;
export type SearchAnalyticSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    query?: boolean;
    count?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["searchAnalytic"]>;
export type SearchAnalyticSelectScalar = {
    id?: boolean;
    query?: boolean;
    count?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type SearchAnalyticOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "query" | "count" | "createdAt" | "updatedAt", ExtArgs["result"]["searchAnalytic"]>;
export type $SearchAnalyticPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "SearchAnalytic";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        query: string;
        count: number;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["searchAnalytic"]>;
    composites: {};
};
export type SearchAnalyticGetPayload<S extends boolean | null | undefined | SearchAnalyticDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SearchAnalyticPayload, S>;
export type SearchAnalyticCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SearchAnalyticFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SearchAnalyticCountAggregateInputType | true;
};
export interface SearchAnalyticDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['SearchAnalytic'];
        meta: {
            name: 'SearchAnalytic';
        };
    };
    findUnique<T extends SearchAnalyticFindUniqueArgs>(args: Prisma.SelectSubset<T, SearchAnalyticFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SearchAnalyticClient<runtime.Types.Result.GetResult<Prisma.$SearchAnalyticPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SearchAnalyticFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SearchAnalyticFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SearchAnalyticClient<runtime.Types.Result.GetResult<Prisma.$SearchAnalyticPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SearchAnalyticFindFirstArgs>(args?: Prisma.SelectSubset<T, SearchAnalyticFindFirstArgs<ExtArgs>>): Prisma.Prisma__SearchAnalyticClient<runtime.Types.Result.GetResult<Prisma.$SearchAnalyticPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SearchAnalyticFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SearchAnalyticFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SearchAnalyticClient<runtime.Types.Result.GetResult<Prisma.$SearchAnalyticPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SearchAnalyticFindManyArgs>(args?: Prisma.SelectSubset<T, SearchAnalyticFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SearchAnalyticPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SearchAnalyticCreateArgs>(args: Prisma.SelectSubset<T, SearchAnalyticCreateArgs<ExtArgs>>): Prisma.Prisma__SearchAnalyticClient<runtime.Types.Result.GetResult<Prisma.$SearchAnalyticPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SearchAnalyticCreateManyArgs>(args?: Prisma.SelectSubset<T, SearchAnalyticCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends SearchAnalyticCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SearchAnalyticCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SearchAnalyticPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends SearchAnalyticDeleteArgs>(args: Prisma.SelectSubset<T, SearchAnalyticDeleteArgs<ExtArgs>>): Prisma.Prisma__SearchAnalyticClient<runtime.Types.Result.GetResult<Prisma.$SearchAnalyticPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SearchAnalyticUpdateArgs>(args: Prisma.SelectSubset<T, SearchAnalyticUpdateArgs<ExtArgs>>): Prisma.Prisma__SearchAnalyticClient<runtime.Types.Result.GetResult<Prisma.$SearchAnalyticPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SearchAnalyticDeleteManyArgs>(args?: Prisma.SelectSubset<T, SearchAnalyticDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SearchAnalyticUpdateManyArgs>(args: Prisma.SelectSubset<T, SearchAnalyticUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends SearchAnalyticUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SearchAnalyticUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SearchAnalyticPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends SearchAnalyticUpsertArgs>(args: Prisma.SelectSubset<T, SearchAnalyticUpsertArgs<ExtArgs>>): Prisma.Prisma__SearchAnalyticClient<runtime.Types.Result.GetResult<Prisma.$SearchAnalyticPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SearchAnalyticCountArgs>(args?: Prisma.Subset<T, SearchAnalyticCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SearchAnalyticCountAggregateOutputType> : number>;
    aggregate<T extends SearchAnalyticAggregateArgs>(args: Prisma.Subset<T, SearchAnalyticAggregateArgs>): Prisma.PrismaPromise<GetSearchAnalyticAggregateType<T>>;
    groupBy<T extends SearchAnalyticGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SearchAnalyticGroupByArgs['orderBy'];
    } : {
        orderBy?: SearchAnalyticGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SearchAnalyticGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSearchAnalyticGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SearchAnalyticFieldRefs;
}
export interface Prisma__SearchAnalyticClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SearchAnalyticFieldRefs {
    readonly id: Prisma.FieldRef<"SearchAnalytic", 'String'>;
    readonly query: Prisma.FieldRef<"SearchAnalytic", 'String'>;
    readonly count: Prisma.FieldRef<"SearchAnalytic", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"SearchAnalytic", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"SearchAnalytic", 'DateTime'>;
}
export type SearchAnalyticFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SearchAnalyticSelect<ExtArgs> | null;
    omit?: Prisma.SearchAnalyticOmit<ExtArgs> | null;
    where: Prisma.SearchAnalyticWhereUniqueInput;
};
export type SearchAnalyticFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SearchAnalyticSelect<ExtArgs> | null;
    omit?: Prisma.SearchAnalyticOmit<ExtArgs> | null;
    where: Prisma.SearchAnalyticWhereUniqueInput;
};
export type SearchAnalyticFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SearchAnalyticSelect<ExtArgs> | null;
    omit?: Prisma.SearchAnalyticOmit<ExtArgs> | null;
    where?: Prisma.SearchAnalyticWhereInput;
    orderBy?: Prisma.SearchAnalyticOrderByWithRelationInput | Prisma.SearchAnalyticOrderByWithRelationInput[];
    cursor?: Prisma.SearchAnalyticWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SearchAnalyticScalarFieldEnum | Prisma.SearchAnalyticScalarFieldEnum[];
};
export type SearchAnalyticFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SearchAnalyticSelect<ExtArgs> | null;
    omit?: Prisma.SearchAnalyticOmit<ExtArgs> | null;
    where?: Prisma.SearchAnalyticWhereInput;
    orderBy?: Prisma.SearchAnalyticOrderByWithRelationInput | Prisma.SearchAnalyticOrderByWithRelationInput[];
    cursor?: Prisma.SearchAnalyticWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SearchAnalyticScalarFieldEnum | Prisma.SearchAnalyticScalarFieldEnum[];
};
export type SearchAnalyticFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SearchAnalyticSelect<ExtArgs> | null;
    omit?: Prisma.SearchAnalyticOmit<ExtArgs> | null;
    where?: Prisma.SearchAnalyticWhereInput;
    orderBy?: Prisma.SearchAnalyticOrderByWithRelationInput | Prisma.SearchAnalyticOrderByWithRelationInput[];
    cursor?: Prisma.SearchAnalyticWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SearchAnalyticScalarFieldEnum | Prisma.SearchAnalyticScalarFieldEnum[];
};
export type SearchAnalyticCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SearchAnalyticSelect<ExtArgs> | null;
    omit?: Prisma.SearchAnalyticOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SearchAnalyticCreateInput, Prisma.SearchAnalyticUncheckedCreateInput>;
};
export type SearchAnalyticCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SearchAnalyticCreateManyInput | Prisma.SearchAnalyticCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SearchAnalyticCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SearchAnalyticSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SearchAnalyticOmit<ExtArgs> | null;
    data: Prisma.SearchAnalyticCreateManyInput | Prisma.SearchAnalyticCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SearchAnalyticUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SearchAnalyticSelect<ExtArgs> | null;
    omit?: Prisma.SearchAnalyticOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SearchAnalyticUpdateInput, Prisma.SearchAnalyticUncheckedUpdateInput>;
    where: Prisma.SearchAnalyticWhereUniqueInput;
};
export type SearchAnalyticUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SearchAnalyticUpdateManyMutationInput, Prisma.SearchAnalyticUncheckedUpdateManyInput>;
    where?: Prisma.SearchAnalyticWhereInput;
    limit?: number;
};
export type SearchAnalyticUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SearchAnalyticSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SearchAnalyticOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SearchAnalyticUpdateManyMutationInput, Prisma.SearchAnalyticUncheckedUpdateManyInput>;
    where?: Prisma.SearchAnalyticWhereInput;
    limit?: number;
};
export type SearchAnalyticUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SearchAnalyticSelect<ExtArgs> | null;
    omit?: Prisma.SearchAnalyticOmit<ExtArgs> | null;
    where: Prisma.SearchAnalyticWhereUniqueInput;
    create: Prisma.XOR<Prisma.SearchAnalyticCreateInput, Prisma.SearchAnalyticUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SearchAnalyticUpdateInput, Prisma.SearchAnalyticUncheckedUpdateInput>;
};
export type SearchAnalyticDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SearchAnalyticSelect<ExtArgs> | null;
    omit?: Prisma.SearchAnalyticOmit<ExtArgs> | null;
    where: Prisma.SearchAnalyticWhereUniqueInput;
};
export type SearchAnalyticDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SearchAnalyticWhereInput;
    limit?: number;
};
export type SearchAnalyticDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SearchAnalyticSelect<ExtArgs> | null;
    omit?: Prisma.SearchAnalyticOmit<ExtArgs> | null;
};
