import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type FaqModel = runtime.Types.Result.DefaultSelection<Prisma.$FaqPayload>;
export type AggregateFaq = {
    _count: FaqCountAggregateOutputType | null;
    _min: FaqMinAggregateOutputType | null;
    _max: FaqMaxAggregateOutputType | null;
};
export type FaqMinAggregateOutputType = {
    id: string | null;
    question: string | null;
    answer: string | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type FaqMaxAggregateOutputType = {
    id: string | null;
    question: string | null;
    answer: string | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type FaqCountAggregateOutputType = {
    id: number;
    question: number;
    answer: number;
    isActive: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type FaqMinAggregateInputType = {
    id?: true;
    question?: true;
    answer?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type FaqMaxAggregateInputType = {
    id?: true;
    question?: true;
    answer?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type FaqCountAggregateInputType = {
    id?: true;
    question?: true;
    answer?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type FaqAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FaqWhereInput;
    orderBy?: Prisma.FaqOrderByWithRelationInput | Prisma.FaqOrderByWithRelationInput[];
    cursor?: Prisma.FaqWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | FaqCountAggregateInputType;
    _min?: FaqMinAggregateInputType;
    _max?: FaqMaxAggregateInputType;
};
export type GetFaqAggregateType<T extends FaqAggregateArgs> = {
    [P in keyof T & keyof AggregateFaq]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFaq[P]> : Prisma.GetScalarType<T[P], AggregateFaq[P]>;
};
export type FaqGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FaqWhereInput;
    orderBy?: Prisma.FaqOrderByWithAggregationInput | Prisma.FaqOrderByWithAggregationInput[];
    by: Prisma.FaqScalarFieldEnum[] | Prisma.FaqScalarFieldEnum;
    having?: Prisma.FaqScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FaqCountAggregateInputType | true;
    _min?: FaqMinAggregateInputType;
    _max?: FaqMaxAggregateInputType;
};
export type FaqGroupByOutputType = {
    id: string;
    question: string;
    answer: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: FaqCountAggregateOutputType | null;
    _min: FaqMinAggregateOutputType | null;
    _max: FaqMaxAggregateOutputType | null;
};
export type GetFaqGroupByPayload<T extends FaqGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FaqGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FaqGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FaqGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FaqGroupByOutputType[P]>;
}>>;
export type FaqWhereInput = {
    AND?: Prisma.FaqWhereInput | Prisma.FaqWhereInput[];
    OR?: Prisma.FaqWhereInput[];
    NOT?: Prisma.FaqWhereInput | Prisma.FaqWhereInput[];
    id?: Prisma.StringFilter<"Faq"> | string;
    question?: Prisma.StringFilter<"Faq"> | string;
    answer?: Prisma.StringFilter<"Faq"> | string;
    isActive?: Prisma.BoolFilter<"Faq"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Faq"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Faq"> | Date | string;
};
export type FaqOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    question?: Prisma.SortOrder;
    answer?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FaqWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.FaqWhereInput | Prisma.FaqWhereInput[];
    OR?: Prisma.FaqWhereInput[];
    NOT?: Prisma.FaqWhereInput | Prisma.FaqWhereInput[];
    question?: Prisma.StringFilter<"Faq"> | string;
    answer?: Prisma.StringFilter<"Faq"> | string;
    isActive?: Prisma.BoolFilter<"Faq"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Faq"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Faq"> | Date | string;
}, "id">;
export type FaqOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    question?: Prisma.SortOrder;
    answer?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.FaqCountOrderByAggregateInput;
    _max?: Prisma.FaqMaxOrderByAggregateInput;
    _min?: Prisma.FaqMinOrderByAggregateInput;
};
export type FaqScalarWhereWithAggregatesInput = {
    AND?: Prisma.FaqScalarWhereWithAggregatesInput | Prisma.FaqScalarWhereWithAggregatesInput[];
    OR?: Prisma.FaqScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FaqScalarWhereWithAggregatesInput | Prisma.FaqScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Faq"> | string;
    question?: Prisma.StringWithAggregatesFilter<"Faq"> | string;
    answer?: Prisma.StringWithAggregatesFilter<"Faq"> | string;
    isActive?: Prisma.BoolWithAggregatesFilter<"Faq"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Faq"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Faq"> | Date | string;
};
export type FaqCreateInput = {
    id?: string;
    question: string;
    answer: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FaqUncheckedCreateInput = {
    id?: string;
    question: string;
    answer: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FaqUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    question?: Prisma.StringFieldUpdateOperationsInput | string;
    answer?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FaqUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    question?: Prisma.StringFieldUpdateOperationsInput | string;
    answer?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FaqCreateManyInput = {
    id?: string;
    question: string;
    answer: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FaqUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    question?: Prisma.StringFieldUpdateOperationsInput | string;
    answer?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FaqUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    question?: Prisma.StringFieldUpdateOperationsInput | string;
    answer?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FaqCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    question?: Prisma.SortOrder;
    answer?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FaqMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    question?: Prisma.SortOrder;
    answer?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FaqMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    question?: Prisma.SortOrder;
    answer?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FaqSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    question?: boolean;
    answer?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["faq"]>;
export type FaqSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    question?: boolean;
    answer?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["faq"]>;
export type FaqSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    question?: boolean;
    answer?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["faq"]>;
export type FaqSelectScalar = {
    id?: boolean;
    question?: boolean;
    answer?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type FaqOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "question" | "answer" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["faq"]>;
export type $FaqPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Faq";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        question: string;
        answer: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["faq"]>;
    composites: {};
};
export type FaqGetPayload<S extends boolean | null | undefined | FaqDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FaqPayload, S>;
export type FaqCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FaqFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FaqCountAggregateInputType | true;
};
export interface FaqDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Faq'];
        meta: {
            name: 'Faq';
        };
    };
    findUnique<T extends FaqFindUniqueArgs>(args: Prisma.SelectSubset<T, FaqFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FaqClient<runtime.Types.Result.GetResult<Prisma.$FaqPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends FaqFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FaqFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FaqClient<runtime.Types.Result.GetResult<Prisma.$FaqPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends FaqFindFirstArgs>(args?: Prisma.SelectSubset<T, FaqFindFirstArgs<ExtArgs>>): Prisma.Prisma__FaqClient<runtime.Types.Result.GetResult<Prisma.$FaqPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends FaqFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FaqFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FaqClient<runtime.Types.Result.GetResult<Prisma.$FaqPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends FaqFindManyArgs>(args?: Prisma.SelectSubset<T, FaqFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FaqPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends FaqCreateArgs>(args: Prisma.SelectSubset<T, FaqCreateArgs<ExtArgs>>): Prisma.Prisma__FaqClient<runtime.Types.Result.GetResult<Prisma.$FaqPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends FaqCreateManyArgs>(args?: Prisma.SelectSubset<T, FaqCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends FaqCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FaqCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FaqPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends FaqDeleteArgs>(args: Prisma.SelectSubset<T, FaqDeleteArgs<ExtArgs>>): Prisma.Prisma__FaqClient<runtime.Types.Result.GetResult<Prisma.$FaqPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends FaqUpdateArgs>(args: Prisma.SelectSubset<T, FaqUpdateArgs<ExtArgs>>): Prisma.Prisma__FaqClient<runtime.Types.Result.GetResult<Prisma.$FaqPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends FaqDeleteManyArgs>(args?: Prisma.SelectSubset<T, FaqDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends FaqUpdateManyArgs>(args: Prisma.SelectSubset<T, FaqUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends FaqUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FaqUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FaqPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends FaqUpsertArgs>(args: Prisma.SelectSubset<T, FaqUpsertArgs<ExtArgs>>): Prisma.Prisma__FaqClient<runtime.Types.Result.GetResult<Prisma.$FaqPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends FaqCountArgs>(args?: Prisma.Subset<T, FaqCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FaqCountAggregateOutputType> : number>;
    aggregate<T extends FaqAggregateArgs>(args: Prisma.Subset<T, FaqAggregateArgs>): Prisma.PrismaPromise<GetFaqAggregateType<T>>;
    groupBy<T extends FaqGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FaqGroupByArgs['orderBy'];
    } : {
        orderBy?: FaqGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FaqGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFaqGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: FaqFieldRefs;
}
export interface Prisma__FaqClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface FaqFieldRefs {
    readonly id: Prisma.FieldRef<"Faq", 'String'>;
    readonly question: Prisma.FieldRef<"Faq", 'String'>;
    readonly answer: Prisma.FieldRef<"Faq", 'String'>;
    readonly isActive: Prisma.FieldRef<"Faq", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"Faq", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Faq", 'DateTime'>;
}
export type FaqFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FaqSelect<ExtArgs> | null;
    omit?: Prisma.FaqOmit<ExtArgs> | null;
    where: Prisma.FaqWhereUniqueInput;
};
export type FaqFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FaqSelect<ExtArgs> | null;
    omit?: Prisma.FaqOmit<ExtArgs> | null;
    where: Prisma.FaqWhereUniqueInput;
};
export type FaqFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FaqSelect<ExtArgs> | null;
    omit?: Prisma.FaqOmit<ExtArgs> | null;
    where?: Prisma.FaqWhereInput;
    orderBy?: Prisma.FaqOrderByWithRelationInput | Prisma.FaqOrderByWithRelationInput[];
    cursor?: Prisma.FaqWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FaqScalarFieldEnum | Prisma.FaqScalarFieldEnum[];
};
export type FaqFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FaqSelect<ExtArgs> | null;
    omit?: Prisma.FaqOmit<ExtArgs> | null;
    where?: Prisma.FaqWhereInput;
    orderBy?: Prisma.FaqOrderByWithRelationInput | Prisma.FaqOrderByWithRelationInput[];
    cursor?: Prisma.FaqWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FaqScalarFieldEnum | Prisma.FaqScalarFieldEnum[];
};
export type FaqFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FaqSelect<ExtArgs> | null;
    omit?: Prisma.FaqOmit<ExtArgs> | null;
    where?: Prisma.FaqWhereInput;
    orderBy?: Prisma.FaqOrderByWithRelationInput | Prisma.FaqOrderByWithRelationInput[];
    cursor?: Prisma.FaqWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FaqScalarFieldEnum | Prisma.FaqScalarFieldEnum[];
};
export type FaqCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FaqSelect<ExtArgs> | null;
    omit?: Prisma.FaqOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FaqCreateInput, Prisma.FaqUncheckedCreateInput>;
};
export type FaqCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.FaqCreateManyInput | Prisma.FaqCreateManyInput[];
    skipDuplicates?: boolean;
};
export type FaqCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FaqSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FaqOmit<ExtArgs> | null;
    data: Prisma.FaqCreateManyInput | Prisma.FaqCreateManyInput[];
    skipDuplicates?: boolean;
};
export type FaqUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FaqSelect<ExtArgs> | null;
    omit?: Prisma.FaqOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FaqUpdateInput, Prisma.FaqUncheckedUpdateInput>;
    where: Prisma.FaqWhereUniqueInput;
};
export type FaqUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.FaqUpdateManyMutationInput, Prisma.FaqUncheckedUpdateManyInput>;
    where?: Prisma.FaqWhereInput;
    limit?: number;
};
export type FaqUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FaqSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FaqOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FaqUpdateManyMutationInput, Prisma.FaqUncheckedUpdateManyInput>;
    where?: Prisma.FaqWhereInput;
    limit?: number;
};
export type FaqUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FaqSelect<ExtArgs> | null;
    omit?: Prisma.FaqOmit<ExtArgs> | null;
    where: Prisma.FaqWhereUniqueInput;
    create: Prisma.XOR<Prisma.FaqCreateInput, Prisma.FaqUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.FaqUpdateInput, Prisma.FaqUncheckedUpdateInput>;
};
export type FaqDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FaqSelect<ExtArgs> | null;
    omit?: Prisma.FaqOmit<ExtArgs> | null;
    where: Prisma.FaqWhereUniqueInput;
};
export type FaqDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FaqWhereInput;
    limit?: number;
};
export type FaqDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FaqSelect<ExtArgs> | null;
    omit?: Prisma.FaqOmit<ExtArgs> | null;
};
