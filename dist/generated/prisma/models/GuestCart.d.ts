import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type GuestCartModel = runtime.Types.Result.DefaultSelection<Prisma.$GuestCartPayload>;
export type AggregateGuestCart = {
    _count: GuestCartCountAggregateOutputType | null;
    _min: GuestCartMinAggregateOutputType | null;
    _max: GuestCartMaxAggregateOutputType | null;
};
export type GuestCartMinAggregateOutputType = {
    id: string | null;
    sessionId: string | null;
    expiresAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type GuestCartMaxAggregateOutputType = {
    id: string | null;
    sessionId: string | null;
    expiresAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type GuestCartCountAggregateOutputType = {
    id: number;
    sessionId: number;
    expiresAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type GuestCartMinAggregateInputType = {
    id?: true;
    sessionId?: true;
    expiresAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type GuestCartMaxAggregateInputType = {
    id?: true;
    sessionId?: true;
    expiresAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type GuestCartCountAggregateInputType = {
    id?: true;
    sessionId?: true;
    expiresAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type GuestCartAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GuestCartWhereInput;
    orderBy?: Prisma.GuestCartOrderByWithRelationInput | Prisma.GuestCartOrderByWithRelationInput[];
    cursor?: Prisma.GuestCartWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | GuestCartCountAggregateInputType;
    _min?: GuestCartMinAggregateInputType;
    _max?: GuestCartMaxAggregateInputType;
};
export type GetGuestCartAggregateType<T extends GuestCartAggregateArgs> = {
    [P in keyof T & keyof AggregateGuestCart]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateGuestCart[P]> : Prisma.GetScalarType<T[P], AggregateGuestCart[P]>;
};
export type GuestCartGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GuestCartWhereInput;
    orderBy?: Prisma.GuestCartOrderByWithAggregationInput | Prisma.GuestCartOrderByWithAggregationInput[];
    by: Prisma.GuestCartScalarFieldEnum[] | Prisma.GuestCartScalarFieldEnum;
    having?: Prisma.GuestCartScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: GuestCartCountAggregateInputType | true;
    _min?: GuestCartMinAggregateInputType;
    _max?: GuestCartMaxAggregateInputType;
};
export type GuestCartGroupByOutputType = {
    id: string;
    sessionId: string;
    expiresAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: GuestCartCountAggregateOutputType | null;
    _min: GuestCartMinAggregateOutputType | null;
    _max: GuestCartMaxAggregateOutputType | null;
};
export type GetGuestCartGroupByPayload<T extends GuestCartGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<GuestCartGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof GuestCartGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], GuestCartGroupByOutputType[P]> : Prisma.GetScalarType<T[P], GuestCartGroupByOutputType[P]>;
}>>;
export type GuestCartWhereInput = {
    AND?: Prisma.GuestCartWhereInput | Prisma.GuestCartWhereInput[];
    OR?: Prisma.GuestCartWhereInput[];
    NOT?: Prisma.GuestCartWhereInput | Prisma.GuestCartWhereInput[];
    id?: Prisma.StringFilter<"GuestCart"> | string;
    sessionId?: Prisma.StringFilter<"GuestCart"> | string;
    expiresAt?: Prisma.DateTimeNullableFilter<"GuestCart"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"GuestCart"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"GuestCart"> | Date | string;
    items?: Prisma.GuestCartItemListRelationFilter;
};
export type GuestCartOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    items?: Prisma.GuestCartItemOrderByRelationAggregateInput;
};
export type GuestCartWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.GuestCartWhereInput | Prisma.GuestCartWhereInput[];
    OR?: Prisma.GuestCartWhereInput[];
    NOT?: Prisma.GuestCartWhereInput | Prisma.GuestCartWhereInput[];
    sessionId?: Prisma.StringFilter<"GuestCart"> | string;
    expiresAt?: Prisma.DateTimeNullableFilter<"GuestCart"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"GuestCart"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"GuestCart"> | Date | string;
    items?: Prisma.GuestCartItemListRelationFilter;
}, "id">;
export type GuestCartOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.GuestCartCountOrderByAggregateInput;
    _max?: Prisma.GuestCartMaxOrderByAggregateInput;
    _min?: Prisma.GuestCartMinOrderByAggregateInput;
};
export type GuestCartScalarWhereWithAggregatesInput = {
    AND?: Prisma.GuestCartScalarWhereWithAggregatesInput | Prisma.GuestCartScalarWhereWithAggregatesInput[];
    OR?: Prisma.GuestCartScalarWhereWithAggregatesInput[];
    NOT?: Prisma.GuestCartScalarWhereWithAggregatesInput | Prisma.GuestCartScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"GuestCart"> | string;
    sessionId?: Prisma.StringWithAggregatesFilter<"GuestCart"> | string;
    expiresAt?: Prisma.DateTimeNullableWithAggregatesFilter<"GuestCart"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"GuestCart"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"GuestCart"> | Date | string;
};
export type GuestCartCreateInput = {
    id?: string;
    sessionId: string;
    expiresAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.GuestCartItemCreateNestedManyWithoutGuestCartInput;
};
export type GuestCartUncheckedCreateInput = {
    id?: string;
    sessionId: string;
    expiresAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.GuestCartItemUncheckedCreateNestedManyWithoutGuestCartInput;
};
export type GuestCartUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.GuestCartItemUpdateManyWithoutGuestCartNestedInput;
};
export type GuestCartUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.GuestCartItemUncheckedUpdateManyWithoutGuestCartNestedInput;
};
export type GuestCartCreateManyInput = {
    id?: string;
    sessionId: string;
    expiresAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type GuestCartUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GuestCartUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GuestCartCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type GuestCartMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type GuestCartMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type GuestCartScalarRelationFilter = {
    is?: Prisma.GuestCartWhereInput;
    isNot?: Prisma.GuestCartWhereInput;
};
export type GuestCartCreateNestedOneWithoutItemsInput = {
    create?: Prisma.XOR<Prisma.GuestCartCreateWithoutItemsInput, Prisma.GuestCartUncheckedCreateWithoutItemsInput>;
    connectOrCreate?: Prisma.GuestCartCreateOrConnectWithoutItemsInput;
    connect?: Prisma.GuestCartWhereUniqueInput;
};
export type GuestCartUpdateOneRequiredWithoutItemsNestedInput = {
    create?: Prisma.XOR<Prisma.GuestCartCreateWithoutItemsInput, Prisma.GuestCartUncheckedCreateWithoutItemsInput>;
    connectOrCreate?: Prisma.GuestCartCreateOrConnectWithoutItemsInput;
    upsert?: Prisma.GuestCartUpsertWithoutItemsInput;
    connect?: Prisma.GuestCartWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.GuestCartUpdateToOneWithWhereWithoutItemsInput, Prisma.GuestCartUpdateWithoutItemsInput>, Prisma.GuestCartUncheckedUpdateWithoutItemsInput>;
};
export type GuestCartCreateWithoutItemsInput = {
    id?: string;
    sessionId: string;
    expiresAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type GuestCartUncheckedCreateWithoutItemsInput = {
    id?: string;
    sessionId: string;
    expiresAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type GuestCartCreateOrConnectWithoutItemsInput = {
    where: Prisma.GuestCartWhereUniqueInput;
    create: Prisma.XOR<Prisma.GuestCartCreateWithoutItemsInput, Prisma.GuestCartUncheckedCreateWithoutItemsInput>;
};
export type GuestCartUpsertWithoutItemsInput = {
    update: Prisma.XOR<Prisma.GuestCartUpdateWithoutItemsInput, Prisma.GuestCartUncheckedUpdateWithoutItemsInput>;
    create: Prisma.XOR<Prisma.GuestCartCreateWithoutItemsInput, Prisma.GuestCartUncheckedCreateWithoutItemsInput>;
    where?: Prisma.GuestCartWhereInput;
};
export type GuestCartUpdateToOneWithWhereWithoutItemsInput = {
    where?: Prisma.GuestCartWhereInput;
    data: Prisma.XOR<Prisma.GuestCartUpdateWithoutItemsInput, Prisma.GuestCartUncheckedUpdateWithoutItemsInput>;
};
export type GuestCartUpdateWithoutItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GuestCartUncheckedUpdateWithoutItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GuestCartCountOutputType = {
    items: number;
};
export type GuestCartCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    items?: boolean | GuestCartCountOutputTypeCountItemsArgs;
};
export type GuestCartCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuestCartCountOutputTypeSelect<ExtArgs> | null;
};
export type GuestCartCountOutputTypeCountItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GuestCartItemWhereInput;
};
export type GuestCartSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sessionId?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    items?: boolean | Prisma.GuestCart$itemsArgs<ExtArgs>;
    _count?: boolean | Prisma.GuestCartCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["guestCart"]>;
export type GuestCartSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sessionId?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["guestCart"]>;
export type GuestCartSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sessionId?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["guestCart"]>;
export type GuestCartSelectScalar = {
    id?: boolean;
    sessionId?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type GuestCartOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "sessionId" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["guestCart"]>;
export type GuestCartInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    items?: boolean | Prisma.GuestCart$itemsArgs<ExtArgs>;
    _count?: boolean | Prisma.GuestCartCountOutputTypeDefaultArgs<ExtArgs>;
};
export type GuestCartIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type GuestCartIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $GuestCartPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "GuestCart";
    objects: {
        items: Prisma.$GuestCartItemPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        sessionId: string;
        expiresAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["guestCart"]>;
    composites: {};
};
export type GuestCartGetPayload<S extends boolean | null | undefined | GuestCartDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$GuestCartPayload, S>;
export type GuestCartCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<GuestCartFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: GuestCartCountAggregateInputType | true;
};
export interface GuestCartDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['GuestCart'];
        meta: {
            name: 'GuestCart';
        };
    };
    findUnique<T extends GuestCartFindUniqueArgs>(args: Prisma.SelectSubset<T, GuestCartFindUniqueArgs<ExtArgs>>): Prisma.Prisma__GuestCartClient<runtime.Types.Result.GetResult<Prisma.$GuestCartPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends GuestCartFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, GuestCartFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__GuestCartClient<runtime.Types.Result.GetResult<Prisma.$GuestCartPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends GuestCartFindFirstArgs>(args?: Prisma.SelectSubset<T, GuestCartFindFirstArgs<ExtArgs>>): Prisma.Prisma__GuestCartClient<runtime.Types.Result.GetResult<Prisma.$GuestCartPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends GuestCartFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, GuestCartFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__GuestCartClient<runtime.Types.Result.GetResult<Prisma.$GuestCartPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends GuestCartFindManyArgs>(args?: Prisma.SelectSubset<T, GuestCartFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GuestCartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends GuestCartCreateArgs>(args: Prisma.SelectSubset<T, GuestCartCreateArgs<ExtArgs>>): Prisma.Prisma__GuestCartClient<runtime.Types.Result.GetResult<Prisma.$GuestCartPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends GuestCartCreateManyArgs>(args?: Prisma.SelectSubset<T, GuestCartCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends GuestCartCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, GuestCartCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GuestCartPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends GuestCartDeleteArgs>(args: Prisma.SelectSubset<T, GuestCartDeleteArgs<ExtArgs>>): Prisma.Prisma__GuestCartClient<runtime.Types.Result.GetResult<Prisma.$GuestCartPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends GuestCartUpdateArgs>(args: Prisma.SelectSubset<T, GuestCartUpdateArgs<ExtArgs>>): Prisma.Prisma__GuestCartClient<runtime.Types.Result.GetResult<Prisma.$GuestCartPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends GuestCartDeleteManyArgs>(args?: Prisma.SelectSubset<T, GuestCartDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends GuestCartUpdateManyArgs>(args: Prisma.SelectSubset<T, GuestCartUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends GuestCartUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, GuestCartUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GuestCartPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends GuestCartUpsertArgs>(args: Prisma.SelectSubset<T, GuestCartUpsertArgs<ExtArgs>>): Prisma.Prisma__GuestCartClient<runtime.Types.Result.GetResult<Prisma.$GuestCartPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends GuestCartCountArgs>(args?: Prisma.Subset<T, GuestCartCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], GuestCartCountAggregateOutputType> : number>;
    aggregate<T extends GuestCartAggregateArgs>(args: Prisma.Subset<T, GuestCartAggregateArgs>): Prisma.PrismaPromise<GetGuestCartAggregateType<T>>;
    groupBy<T extends GuestCartGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: GuestCartGroupByArgs['orderBy'];
    } : {
        orderBy?: GuestCartGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, GuestCartGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGuestCartGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: GuestCartFieldRefs;
}
export interface Prisma__GuestCartClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    items<T extends Prisma.GuestCart$itemsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.GuestCart$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GuestCartItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface GuestCartFieldRefs {
    readonly id: Prisma.FieldRef<"GuestCart", 'String'>;
    readonly sessionId: Prisma.FieldRef<"GuestCart", 'String'>;
    readonly expiresAt: Prisma.FieldRef<"GuestCart", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"GuestCart", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"GuestCart", 'DateTime'>;
}
export type GuestCartFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuestCartSelect<ExtArgs> | null;
    omit?: Prisma.GuestCartOmit<ExtArgs> | null;
    include?: Prisma.GuestCartInclude<ExtArgs> | null;
    where: Prisma.GuestCartWhereUniqueInput;
};
export type GuestCartFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuestCartSelect<ExtArgs> | null;
    omit?: Prisma.GuestCartOmit<ExtArgs> | null;
    include?: Prisma.GuestCartInclude<ExtArgs> | null;
    where: Prisma.GuestCartWhereUniqueInput;
};
export type GuestCartFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuestCartSelect<ExtArgs> | null;
    omit?: Prisma.GuestCartOmit<ExtArgs> | null;
    include?: Prisma.GuestCartInclude<ExtArgs> | null;
    where?: Prisma.GuestCartWhereInput;
    orderBy?: Prisma.GuestCartOrderByWithRelationInput | Prisma.GuestCartOrderByWithRelationInput[];
    cursor?: Prisma.GuestCartWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.GuestCartScalarFieldEnum | Prisma.GuestCartScalarFieldEnum[];
};
export type GuestCartFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuestCartSelect<ExtArgs> | null;
    omit?: Prisma.GuestCartOmit<ExtArgs> | null;
    include?: Prisma.GuestCartInclude<ExtArgs> | null;
    where?: Prisma.GuestCartWhereInput;
    orderBy?: Prisma.GuestCartOrderByWithRelationInput | Prisma.GuestCartOrderByWithRelationInput[];
    cursor?: Prisma.GuestCartWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.GuestCartScalarFieldEnum | Prisma.GuestCartScalarFieldEnum[];
};
export type GuestCartFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuestCartSelect<ExtArgs> | null;
    omit?: Prisma.GuestCartOmit<ExtArgs> | null;
    include?: Prisma.GuestCartInclude<ExtArgs> | null;
    where?: Prisma.GuestCartWhereInput;
    orderBy?: Prisma.GuestCartOrderByWithRelationInput | Prisma.GuestCartOrderByWithRelationInput[];
    cursor?: Prisma.GuestCartWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.GuestCartScalarFieldEnum | Prisma.GuestCartScalarFieldEnum[];
};
export type GuestCartCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuestCartSelect<ExtArgs> | null;
    omit?: Prisma.GuestCartOmit<ExtArgs> | null;
    include?: Prisma.GuestCartInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.GuestCartCreateInput, Prisma.GuestCartUncheckedCreateInput>;
};
export type GuestCartCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.GuestCartCreateManyInput | Prisma.GuestCartCreateManyInput[];
    skipDuplicates?: boolean;
};
export type GuestCartCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuestCartSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.GuestCartOmit<ExtArgs> | null;
    data: Prisma.GuestCartCreateManyInput | Prisma.GuestCartCreateManyInput[];
    skipDuplicates?: boolean;
};
export type GuestCartUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuestCartSelect<ExtArgs> | null;
    omit?: Prisma.GuestCartOmit<ExtArgs> | null;
    include?: Prisma.GuestCartInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.GuestCartUpdateInput, Prisma.GuestCartUncheckedUpdateInput>;
    where: Prisma.GuestCartWhereUniqueInput;
};
export type GuestCartUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.GuestCartUpdateManyMutationInput, Prisma.GuestCartUncheckedUpdateManyInput>;
    where?: Prisma.GuestCartWhereInput;
    limit?: number;
};
export type GuestCartUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuestCartSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.GuestCartOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.GuestCartUpdateManyMutationInput, Prisma.GuestCartUncheckedUpdateManyInput>;
    where?: Prisma.GuestCartWhereInput;
    limit?: number;
};
export type GuestCartUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuestCartSelect<ExtArgs> | null;
    omit?: Prisma.GuestCartOmit<ExtArgs> | null;
    include?: Prisma.GuestCartInclude<ExtArgs> | null;
    where: Prisma.GuestCartWhereUniqueInput;
    create: Prisma.XOR<Prisma.GuestCartCreateInput, Prisma.GuestCartUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.GuestCartUpdateInput, Prisma.GuestCartUncheckedUpdateInput>;
};
export type GuestCartDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuestCartSelect<ExtArgs> | null;
    omit?: Prisma.GuestCartOmit<ExtArgs> | null;
    include?: Prisma.GuestCartInclude<ExtArgs> | null;
    where: Prisma.GuestCartWhereUniqueInput;
};
export type GuestCartDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GuestCartWhereInput;
    limit?: number;
};
export type GuestCart$itemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type GuestCartDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GuestCartSelect<ExtArgs> | null;
    omit?: Prisma.GuestCartOmit<ExtArgs> | null;
    include?: Prisma.GuestCartInclude<ExtArgs> | null;
};
