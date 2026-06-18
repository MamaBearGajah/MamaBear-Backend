import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type OrderStatusHistoryModel = runtime.Types.Result.DefaultSelection<Prisma.$OrderStatusHistoryPayload>;
export type AggregateOrderStatusHistory = {
    _count: OrderStatusHistoryCountAggregateOutputType | null;
    _min: OrderStatusHistoryMinAggregateOutputType | null;
    _max: OrderStatusHistoryMaxAggregateOutputType | null;
};
export type OrderStatusHistoryMinAggregateOutputType = {
    id: string | null;
    orderId: string | null;
    status: $Enums.OrderStatus | null;
    note: string | null;
    createdAt: Date | null;
};
export type OrderStatusHistoryMaxAggregateOutputType = {
    id: string | null;
    orderId: string | null;
    status: $Enums.OrderStatus | null;
    note: string | null;
    createdAt: Date | null;
};
export type OrderStatusHistoryCountAggregateOutputType = {
    id: number;
    orderId: number;
    status: number;
    note: number;
    createdAt: number;
    _all: number;
};
export type OrderStatusHistoryMinAggregateInputType = {
    id?: true;
    orderId?: true;
    status?: true;
    note?: true;
    createdAt?: true;
};
export type OrderStatusHistoryMaxAggregateInputType = {
    id?: true;
    orderId?: true;
    status?: true;
    note?: true;
    createdAt?: true;
};
export type OrderStatusHistoryCountAggregateInputType = {
    id?: true;
    orderId?: true;
    status?: true;
    note?: true;
    createdAt?: true;
    _all?: true;
};
export type OrderStatusHistoryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderStatusHistoryWhereInput;
    orderBy?: Prisma.OrderStatusHistoryOrderByWithRelationInput | Prisma.OrderStatusHistoryOrderByWithRelationInput[];
    cursor?: Prisma.OrderStatusHistoryWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | OrderStatusHistoryCountAggregateInputType;
    _min?: OrderStatusHistoryMinAggregateInputType;
    _max?: OrderStatusHistoryMaxAggregateInputType;
};
export type GetOrderStatusHistoryAggregateType<T extends OrderStatusHistoryAggregateArgs> = {
    [P in keyof T & keyof AggregateOrderStatusHistory]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateOrderStatusHistory[P]> : Prisma.GetScalarType<T[P], AggregateOrderStatusHistory[P]>;
};
export type OrderStatusHistoryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderStatusHistoryWhereInput;
    orderBy?: Prisma.OrderStatusHistoryOrderByWithAggregationInput | Prisma.OrderStatusHistoryOrderByWithAggregationInput[];
    by: Prisma.OrderStatusHistoryScalarFieldEnum[] | Prisma.OrderStatusHistoryScalarFieldEnum;
    having?: Prisma.OrderStatusHistoryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OrderStatusHistoryCountAggregateInputType | true;
    _min?: OrderStatusHistoryMinAggregateInputType;
    _max?: OrderStatusHistoryMaxAggregateInputType;
};
export type OrderStatusHistoryGroupByOutputType = {
    id: string;
    orderId: string;
    status: $Enums.OrderStatus;
    note: string | null;
    createdAt: Date;
    _count: OrderStatusHistoryCountAggregateOutputType | null;
    _min: OrderStatusHistoryMinAggregateOutputType | null;
    _max: OrderStatusHistoryMaxAggregateOutputType | null;
};
export type GetOrderStatusHistoryGroupByPayload<T extends OrderStatusHistoryGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<OrderStatusHistoryGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof OrderStatusHistoryGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], OrderStatusHistoryGroupByOutputType[P]> : Prisma.GetScalarType<T[P], OrderStatusHistoryGroupByOutputType[P]>;
}>>;
export type OrderStatusHistoryWhereInput = {
    AND?: Prisma.OrderStatusHistoryWhereInput | Prisma.OrderStatusHistoryWhereInput[];
    OR?: Prisma.OrderStatusHistoryWhereInput[];
    NOT?: Prisma.OrderStatusHistoryWhereInput | Prisma.OrderStatusHistoryWhereInput[];
    id?: Prisma.StringFilter<"OrderStatusHistory"> | string;
    orderId?: Prisma.StringFilter<"OrderStatusHistory"> | string;
    status?: Prisma.EnumOrderStatusFilter<"OrderStatusHistory"> | $Enums.OrderStatus;
    note?: Prisma.StringNullableFilter<"OrderStatusHistory"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"OrderStatusHistory"> | Date | string;
    order?: Prisma.XOR<Prisma.OrderScalarRelationFilter, Prisma.OrderWhereInput>;
};
export type OrderStatusHistoryOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    order?: Prisma.OrderOrderByWithRelationInput;
};
export type OrderStatusHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.OrderStatusHistoryWhereInput | Prisma.OrderStatusHistoryWhereInput[];
    OR?: Prisma.OrderStatusHistoryWhereInput[];
    NOT?: Prisma.OrderStatusHistoryWhereInput | Prisma.OrderStatusHistoryWhereInput[];
    orderId?: Prisma.StringFilter<"OrderStatusHistory"> | string;
    status?: Prisma.EnumOrderStatusFilter<"OrderStatusHistory"> | $Enums.OrderStatus;
    note?: Prisma.StringNullableFilter<"OrderStatusHistory"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"OrderStatusHistory"> | Date | string;
    order?: Prisma.XOR<Prisma.OrderScalarRelationFilter, Prisma.OrderWhereInput>;
}, "id">;
export type OrderStatusHistoryOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.OrderStatusHistoryCountOrderByAggregateInput;
    _max?: Prisma.OrderStatusHistoryMaxOrderByAggregateInput;
    _min?: Prisma.OrderStatusHistoryMinOrderByAggregateInput;
};
export type OrderStatusHistoryScalarWhereWithAggregatesInput = {
    AND?: Prisma.OrderStatusHistoryScalarWhereWithAggregatesInput | Prisma.OrderStatusHistoryScalarWhereWithAggregatesInput[];
    OR?: Prisma.OrderStatusHistoryScalarWhereWithAggregatesInput[];
    NOT?: Prisma.OrderStatusHistoryScalarWhereWithAggregatesInput | Prisma.OrderStatusHistoryScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"OrderStatusHistory"> | string;
    orderId?: Prisma.StringWithAggregatesFilter<"OrderStatusHistory"> | string;
    status?: Prisma.EnumOrderStatusWithAggregatesFilter<"OrderStatusHistory"> | $Enums.OrderStatus;
    note?: Prisma.StringNullableWithAggregatesFilter<"OrderStatusHistory"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"OrderStatusHistory"> | Date | string;
};
export type OrderStatusHistoryCreateInput = {
    id?: string;
    status: $Enums.OrderStatus;
    note?: string | null;
    createdAt?: Date | string;
    order: Prisma.OrderCreateNestedOneWithoutStatusHistoryInput;
};
export type OrderStatusHistoryUncheckedCreateInput = {
    id?: string;
    orderId: string;
    status: $Enums.OrderStatus;
    note?: string | null;
    createdAt?: Date | string;
};
export type OrderStatusHistoryUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    order?: Prisma.OrderUpdateOneRequiredWithoutStatusHistoryNestedInput;
};
export type OrderStatusHistoryUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderStatusHistoryCreateManyInput = {
    id?: string;
    orderId: string;
    status: $Enums.OrderStatus;
    note?: string | null;
    createdAt?: Date | string;
};
export type OrderStatusHistoryUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderStatusHistoryUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderStatusHistoryListRelationFilter = {
    every?: Prisma.OrderStatusHistoryWhereInput;
    some?: Prisma.OrderStatusHistoryWhereInput;
    none?: Prisma.OrderStatusHistoryWhereInput;
};
export type OrderStatusHistoryOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type OrderStatusHistoryCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type OrderStatusHistoryMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type OrderStatusHistoryMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type OrderStatusHistoryCreateNestedManyWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.OrderStatusHistoryCreateWithoutOrderInput, Prisma.OrderStatusHistoryUncheckedCreateWithoutOrderInput> | Prisma.OrderStatusHistoryCreateWithoutOrderInput[] | Prisma.OrderStatusHistoryUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.OrderStatusHistoryCreateOrConnectWithoutOrderInput | Prisma.OrderStatusHistoryCreateOrConnectWithoutOrderInput[];
    createMany?: Prisma.OrderStatusHistoryCreateManyOrderInputEnvelope;
    connect?: Prisma.OrderStatusHistoryWhereUniqueInput | Prisma.OrderStatusHistoryWhereUniqueInput[];
};
export type OrderStatusHistoryUncheckedCreateNestedManyWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.OrderStatusHistoryCreateWithoutOrderInput, Prisma.OrderStatusHistoryUncheckedCreateWithoutOrderInput> | Prisma.OrderStatusHistoryCreateWithoutOrderInput[] | Prisma.OrderStatusHistoryUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.OrderStatusHistoryCreateOrConnectWithoutOrderInput | Prisma.OrderStatusHistoryCreateOrConnectWithoutOrderInput[];
    createMany?: Prisma.OrderStatusHistoryCreateManyOrderInputEnvelope;
    connect?: Prisma.OrderStatusHistoryWhereUniqueInput | Prisma.OrderStatusHistoryWhereUniqueInput[];
};
export type OrderStatusHistoryUpdateManyWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.OrderStatusHistoryCreateWithoutOrderInput, Prisma.OrderStatusHistoryUncheckedCreateWithoutOrderInput> | Prisma.OrderStatusHistoryCreateWithoutOrderInput[] | Prisma.OrderStatusHistoryUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.OrderStatusHistoryCreateOrConnectWithoutOrderInput | Prisma.OrderStatusHistoryCreateOrConnectWithoutOrderInput[];
    upsert?: Prisma.OrderStatusHistoryUpsertWithWhereUniqueWithoutOrderInput | Prisma.OrderStatusHistoryUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: Prisma.OrderStatusHistoryCreateManyOrderInputEnvelope;
    set?: Prisma.OrderStatusHistoryWhereUniqueInput | Prisma.OrderStatusHistoryWhereUniqueInput[];
    disconnect?: Prisma.OrderStatusHistoryWhereUniqueInput | Prisma.OrderStatusHistoryWhereUniqueInput[];
    delete?: Prisma.OrderStatusHistoryWhereUniqueInput | Prisma.OrderStatusHistoryWhereUniqueInput[];
    connect?: Prisma.OrderStatusHistoryWhereUniqueInput | Prisma.OrderStatusHistoryWhereUniqueInput[];
    update?: Prisma.OrderStatusHistoryUpdateWithWhereUniqueWithoutOrderInput | Prisma.OrderStatusHistoryUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?: Prisma.OrderStatusHistoryUpdateManyWithWhereWithoutOrderInput | Prisma.OrderStatusHistoryUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: Prisma.OrderStatusHistoryScalarWhereInput | Prisma.OrderStatusHistoryScalarWhereInput[];
};
export type OrderStatusHistoryUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.OrderStatusHistoryCreateWithoutOrderInput, Prisma.OrderStatusHistoryUncheckedCreateWithoutOrderInput> | Prisma.OrderStatusHistoryCreateWithoutOrderInput[] | Prisma.OrderStatusHistoryUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.OrderStatusHistoryCreateOrConnectWithoutOrderInput | Prisma.OrderStatusHistoryCreateOrConnectWithoutOrderInput[];
    upsert?: Prisma.OrderStatusHistoryUpsertWithWhereUniqueWithoutOrderInput | Prisma.OrderStatusHistoryUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: Prisma.OrderStatusHistoryCreateManyOrderInputEnvelope;
    set?: Prisma.OrderStatusHistoryWhereUniqueInput | Prisma.OrderStatusHistoryWhereUniqueInput[];
    disconnect?: Prisma.OrderStatusHistoryWhereUniqueInput | Prisma.OrderStatusHistoryWhereUniqueInput[];
    delete?: Prisma.OrderStatusHistoryWhereUniqueInput | Prisma.OrderStatusHistoryWhereUniqueInput[];
    connect?: Prisma.OrderStatusHistoryWhereUniqueInput | Prisma.OrderStatusHistoryWhereUniqueInput[];
    update?: Prisma.OrderStatusHistoryUpdateWithWhereUniqueWithoutOrderInput | Prisma.OrderStatusHistoryUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?: Prisma.OrderStatusHistoryUpdateManyWithWhereWithoutOrderInput | Prisma.OrderStatusHistoryUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: Prisma.OrderStatusHistoryScalarWhereInput | Prisma.OrderStatusHistoryScalarWhereInput[];
};
export type OrderStatusHistoryCreateWithoutOrderInput = {
    id?: string;
    status: $Enums.OrderStatus;
    note?: string | null;
    createdAt?: Date | string;
};
export type OrderStatusHistoryUncheckedCreateWithoutOrderInput = {
    id?: string;
    status: $Enums.OrderStatus;
    note?: string | null;
    createdAt?: Date | string;
};
export type OrderStatusHistoryCreateOrConnectWithoutOrderInput = {
    where: Prisma.OrderStatusHistoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrderStatusHistoryCreateWithoutOrderInput, Prisma.OrderStatusHistoryUncheckedCreateWithoutOrderInput>;
};
export type OrderStatusHistoryCreateManyOrderInputEnvelope = {
    data: Prisma.OrderStatusHistoryCreateManyOrderInput | Prisma.OrderStatusHistoryCreateManyOrderInput[];
    skipDuplicates?: boolean;
};
export type OrderStatusHistoryUpsertWithWhereUniqueWithoutOrderInput = {
    where: Prisma.OrderStatusHistoryWhereUniqueInput;
    update: Prisma.XOR<Prisma.OrderStatusHistoryUpdateWithoutOrderInput, Prisma.OrderStatusHistoryUncheckedUpdateWithoutOrderInput>;
    create: Prisma.XOR<Prisma.OrderStatusHistoryCreateWithoutOrderInput, Prisma.OrderStatusHistoryUncheckedCreateWithoutOrderInput>;
};
export type OrderStatusHistoryUpdateWithWhereUniqueWithoutOrderInput = {
    where: Prisma.OrderStatusHistoryWhereUniqueInput;
    data: Prisma.XOR<Prisma.OrderStatusHistoryUpdateWithoutOrderInput, Prisma.OrderStatusHistoryUncheckedUpdateWithoutOrderInput>;
};
export type OrderStatusHistoryUpdateManyWithWhereWithoutOrderInput = {
    where: Prisma.OrderStatusHistoryScalarWhereInput;
    data: Prisma.XOR<Prisma.OrderStatusHistoryUpdateManyMutationInput, Prisma.OrderStatusHistoryUncheckedUpdateManyWithoutOrderInput>;
};
export type OrderStatusHistoryScalarWhereInput = {
    AND?: Prisma.OrderStatusHistoryScalarWhereInput | Prisma.OrderStatusHistoryScalarWhereInput[];
    OR?: Prisma.OrderStatusHistoryScalarWhereInput[];
    NOT?: Prisma.OrderStatusHistoryScalarWhereInput | Prisma.OrderStatusHistoryScalarWhereInput[];
    id?: Prisma.StringFilter<"OrderStatusHistory"> | string;
    orderId?: Prisma.StringFilter<"OrderStatusHistory"> | string;
    status?: Prisma.EnumOrderStatusFilter<"OrderStatusHistory"> | $Enums.OrderStatus;
    note?: Prisma.StringNullableFilter<"OrderStatusHistory"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"OrderStatusHistory"> | Date | string;
};
export type OrderStatusHistoryCreateManyOrderInput = {
    id?: string;
    status: $Enums.OrderStatus;
    note?: string | null;
    createdAt?: Date | string;
};
export type OrderStatusHistoryUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderStatusHistoryUncheckedUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderStatusHistoryUncheckedUpdateManyWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderStatusHistorySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    orderId?: boolean;
    status?: boolean;
    note?: boolean;
    createdAt?: boolean;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["orderStatusHistory"]>;
export type OrderStatusHistorySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    orderId?: boolean;
    status?: boolean;
    note?: boolean;
    createdAt?: boolean;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["orderStatusHistory"]>;
export type OrderStatusHistorySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    orderId?: boolean;
    status?: boolean;
    note?: boolean;
    createdAt?: boolean;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["orderStatusHistory"]>;
export type OrderStatusHistorySelectScalar = {
    id?: boolean;
    orderId?: boolean;
    status?: boolean;
    note?: boolean;
    createdAt?: boolean;
};
export type OrderStatusHistoryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "orderId" | "status" | "note" | "createdAt", ExtArgs["result"]["orderStatusHistory"]>;
export type OrderStatusHistoryInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
};
export type OrderStatusHistoryIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
};
export type OrderStatusHistoryIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
};
export type $OrderStatusHistoryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "OrderStatusHistory";
    objects: {
        order: Prisma.$OrderPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        orderId: string;
        status: $Enums.OrderStatus;
        note: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["orderStatusHistory"]>;
    composites: {};
};
export type OrderStatusHistoryGetPayload<S extends boolean | null | undefined | OrderStatusHistoryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$OrderStatusHistoryPayload, S>;
export type OrderStatusHistoryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<OrderStatusHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: OrderStatusHistoryCountAggregateInputType | true;
};
export interface OrderStatusHistoryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['OrderStatusHistory'];
        meta: {
            name: 'OrderStatusHistory';
        };
    };
    findUnique<T extends OrderStatusHistoryFindUniqueArgs>(args: Prisma.SelectSubset<T, OrderStatusHistoryFindUniqueArgs<ExtArgs>>): Prisma.Prisma__OrderStatusHistoryClient<runtime.Types.Result.GetResult<Prisma.$OrderStatusHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends OrderStatusHistoryFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, OrderStatusHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__OrderStatusHistoryClient<runtime.Types.Result.GetResult<Prisma.$OrderStatusHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends OrderStatusHistoryFindFirstArgs>(args?: Prisma.SelectSubset<T, OrderStatusHistoryFindFirstArgs<ExtArgs>>): Prisma.Prisma__OrderStatusHistoryClient<runtime.Types.Result.GetResult<Prisma.$OrderStatusHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends OrderStatusHistoryFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, OrderStatusHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__OrderStatusHistoryClient<runtime.Types.Result.GetResult<Prisma.$OrderStatusHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends OrderStatusHistoryFindManyArgs>(args?: Prisma.SelectSubset<T, OrderStatusHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderStatusHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends OrderStatusHistoryCreateArgs>(args: Prisma.SelectSubset<T, OrderStatusHistoryCreateArgs<ExtArgs>>): Prisma.Prisma__OrderStatusHistoryClient<runtime.Types.Result.GetResult<Prisma.$OrderStatusHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends OrderStatusHistoryCreateManyArgs>(args?: Prisma.SelectSubset<T, OrderStatusHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends OrderStatusHistoryCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, OrderStatusHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderStatusHistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends OrderStatusHistoryDeleteArgs>(args: Prisma.SelectSubset<T, OrderStatusHistoryDeleteArgs<ExtArgs>>): Prisma.Prisma__OrderStatusHistoryClient<runtime.Types.Result.GetResult<Prisma.$OrderStatusHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends OrderStatusHistoryUpdateArgs>(args: Prisma.SelectSubset<T, OrderStatusHistoryUpdateArgs<ExtArgs>>): Prisma.Prisma__OrderStatusHistoryClient<runtime.Types.Result.GetResult<Prisma.$OrderStatusHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends OrderStatusHistoryDeleteManyArgs>(args?: Prisma.SelectSubset<T, OrderStatusHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends OrderStatusHistoryUpdateManyArgs>(args: Prisma.SelectSubset<T, OrderStatusHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends OrderStatusHistoryUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, OrderStatusHistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderStatusHistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends OrderStatusHistoryUpsertArgs>(args: Prisma.SelectSubset<T, OrderStatusHistoryUpsertArgs<ExtArgs>>): Prisma.Prisma__OrderStatusHistoryClient<runtime.Types.Result.GetResult<Prisma.$OrderStatusHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends OrderStatusHistoryCountArgs>(args?: Prisma.Subset<T, OrderStatusHistoryCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], OrderStatusHistoryCountAggregateOutputType> : number>;
    aggregate<T extends OrderStatusHistoryAggregateArgs>(args: Prisma.Subset<T, OrderStatusHistoryAggregateArgs>): Prisma.PrismaPromise<GetOrderStatusHistoryAggregateType<T>>;
    groupBy<T extends OrderStatusHistoryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: OrderStatusHistoryGroupByArgs['orderBy'];
    } : {
        orderBy?: OrderStatusHistoryGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, OrderStatusHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderStatusHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: OrderStatusHistoryFieldRefs;
}
export interface Prisma__OrderStatusHistoryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    order<T extends Prisma.OrderDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OrderDefaultArgs<ExtArgs>>): Prisma.Prisma__OrderClient<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface OrderStatusHistoryFieldRefs {
    readonly id: Prisma.FieldRef<"OrderStatusHistory", 'String'>;
    readonly orderId: Prisma.FieldRef<"OrderStatusHistory", 'String'>;
    readonly status: Prisma.FieldRef<"OrderStatusHistory", 'OrderStatus'>;
    readonly note: Prisma.FieldRef<"OrderStatusHistory", 'String'>;
    readonly createdAt: Prisma.FieldRef<"OrderStatusHistory", 'DateTime'>;
}
export type OrderStatusHistoryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderStatusHistorySelect<ExtArgs> | null;
    omit?: Prisma.OrderStatusHistoryOmit<ExtArgs> | null;
    include?: Prisma.OrderStatusHistoryInclude<ExtArgs> | null;
    where: Prisma.OrderStatusHistoryWhereUniqueInput;
};
export type OrderStatusHistoryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderStatusHistorySelect<ExtArgs> | null;
    omit?: Prisma.OrderStatusHistoryOmit<ExtArgs> | null;
    include?: Prisma.OrderStatusHistoryInclude<ExtArgs> | null;
    where: Prisma.OrderStatusHistoryWhereUniqueInput;
};
export type OrderStatusHistoryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderStatusHistorySelect<ExtArgs> | null;
    omit?: Prisma.OrderStatusHistoryOmit<ExtArgs> | null;
    include?: Prisma.OrderStatusHistoryInclude<ExtArgs> | null;
    where?: Prisma.OrderStatusHistoryWhereInput;
    orderBy?: Prisma.OrderStatusHistoryOrderByWithRelationInput | Prisma.OrderStatusHistoryOrderByWithRelationInput[];
    cursor?: Prisma.OrderStatusHistoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrderStatusHistoryScalarFieldEnum | Prisma.OrderStatusHistoryScalarFieldEnum[];
};
export type OrderStatusHistoryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderStatusHistorySelect<ExtArgs> | null;
    omit?: Prisma.OrderStatusHistoryOmit<ExtArgs> | null;
    include?: Prisma.OrderStatusHistoryInclude<ExtArgs> | null;
    where?: Prisma.OrderStatusHistoryWhereInput;
    orderBy?: Prisma.OrderStatusHistoryOrderByWithRelationInput | Prisma.OrderStatusHistoryOrderByWithRelationInput[];
    cursor?: Prisma.OrderStatusHistoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrderStatusHistoryScalarFieldEnum | Prisma.OrderStatusHistoryScalarFieldEnum[];
};
export type OrderStatusHistoryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderStatusHistorySelect<ExtArgs> | null;
    omit?: Prisma.OrderStatusHistoryOmit<ExtArgs> | null;
    include?: Prisma.OrderStatusHistoryInclude<ExtArgs> | null;
    where?: Prisma.OrderStatusHistoryWhereInput;
    orderBy?: Prisma.OrderStatusHistoryOrderByWithRelationInput | Prisma.OrderStatusHistoryOrderByWithRelationInput[];
    cursor?: Prisma.OrderStatusHistoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrderStatusHistoryScalarFieldEnum | Prisma.OrderStatusHistoryScalarFieldEnum[];
};
export type OrderStatusHistoryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderStatusHistorySelect<ExtArgs> | null;
    omit?: Prisma.OrderStatusHistoryOmit<ExtArgs> | null;
    include?: Prisma.OrderStatusHistoryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OrderStatusHistoryCreateInput, Prisma.OrderStatusHistoryUncheckedCreateInput>;
};
export type OrderStatusHistoryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.OrderStatusHistoryCreateManyInput | Prisma.OrderStatusHistoryCreateManyInput[];
    skipDuplicates?: boolean;
};
export type OrderStatusHistoryCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderStatusHistorySelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OrderStatusHistoryOmit<ExtArgs> | null;
    data: Prisma.OrderStatusHistoryCreateManyInput | Prisma.OrderStatusHistoryCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.OrderStatusHistoryIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type OrderStatusHistoryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderStatusHistorySelect<ExtArgs> | null;
    omit?: Prisma.OrderStatusHistoryOmit<ExtArgs> | null;
    include?: Prisma.OrderStatusHistoryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OrderStatusHistoryUpdateInput, Prisma.OrderStatusHistoryUncheckedUpdateInput>;
    where: Prisma.OrderStatusHistoryWhereUniqueInput;
};
export type OrderStatusHistoryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.OrderStatusHistoryUpdateManyMutationInput, Prisma.OrderStatusHistoryUncheckedUpdateManyInput>;
    where?: Prisma.OrderStatusHistoryWhereInput;
    limit?: number;
};
export type OrderStatusHistoryUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderStatusHistorySelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OrderStatusHistoryOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OrderStatusHistoryUpdateManyMutationInput, Prisma.OrderStatusHistoryUncheckedUpdateManyInput>;
    where?: Prisma.OrderStatusHistoryWhereInput;
    limit?: number;
    include?: Prisma.OrderStatusHistoryIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type OrderStatusHistoryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderStatusHistorySelect<ExtArgs> | null;
    omit?: Prisma.OrderStatusHistoryOmit<ExtArgs> | null;
    include?: Prisma.OrderStatusHistoryInclude<ExtArgs> | null;
    where: Prisma.OrderStatusHistoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrderStatusHistoryCreateInput, Prisma.OrderStatusHistoryUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.OrderStatusHistoryUpdateInput, Prisma.OrderStatusHistoryUncheckedUpdateInput>;
};
export type OrderStatusHistoryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderStatusHistorySelect<ExtArgs> | null;
    omit?: Prisma.OrderStatusHistoryOmit<ExtArgs> | null;
    include?: Prisma.OrderStatusHistoryInclude<ExtArgs> | null;
    where: Prisma.OrderStatusHistoryWhereUniqueInput;
};
export type OrderStatusHistoryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderStatusHistoryWhereInput;
    limit?: number;
};
export type OrderStatusHistoryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderStatusHistorySelect<ExtArgs> | null;
    omit?: Prisma.OrderStatusHistoryOmit<ExtArgs> | null;
    include?: Prisma.OrderStatusHistoryInclude<ExtArgs> | null;
};
