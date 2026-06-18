import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type BlogPostModel = runtime.Types.Result.DefaultSelection<Prisma.$BlogPostPayload>;
export type AggregateBlogPost = {
    _count: BlogPostCountAggregateOutputType | null;
    _avg: BlogPostAvgAggregateOutputType | null;
    _sum: BlogPostSumAggregateOutputType | null;
    _min: BlogPostMinAggregateOutputType | null;
    _max: BlogPostMaxAggregateOutputType | null;
};
export type BlogPostAvgAggregateOutputType = {
    viewCount: number | null;
};
export type BlogPostSumAggregateOutputType = {
    viewCount: number | null;
};
export type BlogPostMinAggregateOutputType = {
    id: string | null;
    authorId: string | null;
    title: string | null;
    slug: string | null;
    excerpt: string | null;
    coverImage: string | null;
    coverPublicId: string | null;
    content: string | null;
    status: $Enums.BlogStatus | null;
    viewCount: number | null;
    publishedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type BlogPostMaxAggregateOutputType = {
    id: string | null;
    authorId: string | null;
    title: string | null;
    slug: string | null;
    excerpt: string | null;
    coverImage: string | null;
    coverPublicId: string | null;
    content: string | null;
    status: $Enums.BlogStatus | null;
    viewCount: number | null;
    publishedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type BlogPostCountAggregateOutputType = {
    id: number;
    authorId: number;
    title: number;
    slug: number;
    excerpt: number;
    coverImage: number;
    coverPublicId: number;
    content: number;
    status: number;
    viewCount: number;
    publishedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type BlogPostAvgAggregateInputType = {
    viewCount?: true;
};
export type BlogPostSumAggregateInputType = {
    viewCount?: true;
};
export type BlogPostMinAggregateInputType = {
    id?: true;
    authorId?: true;
    title?: true;
    slug?: true;
    excerpt?: true;
    coverImage?: true;
    coverPublicId?: true;
    content?: true;
    status?: true;
    viewCount?: true;
    publishedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type BlogPostMaxAggregateInputType = {
    id?: true;
    authorId?: true;
    title?: true;
    slug?: true;
    excerpt?: true;
    coverImage?: true;
    coverPublicId?: true;
    content?: true;
    status?: true;
    viewCount?: true;
    publishedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type BlogPostCountAggregateInputType = {
    id?: true;
    authorId?: true;
    title?: true;
    slug?: true;
    excerpt?: true;
    coverImage?: true;
    coverPublicId?: true;
    content?: true;
    status?: true;
    viewCount?: true;
    publishedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type BlogPostAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BlogPostWhereInput;
    orderBy?: Prisma.BlogPostOrderByWithRelationInput | Prisma.BlogPostOrderByWithRelationInput[];
    cursor?: Prisma.BlogPostWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | BlogPostCountAggregateInputType;
    _avg?: BlogPostAvgAggregateInputType;
    _sum?: BlogPostSumAggregateInputType;
    _min?: BlogPostMinAggregateInputType;
    _max?: BlogPostMaxAggregateInputType;
};
export type GetBlogPostAggregateType<T extends BlogPostAggregateArgs> = {
    [P in keyof T & keyof AggregateBlogPost]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBlogPost[P]> : Prisma.GetScalarType<T[P], AggregateBlogPost[P]>;
};
export type BlogPostGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BlogPostWhereInput;
    orderBy?: Prisma.BlogPostOrderByWithAggregationInput | Prisma.BlogPostOrderByWithAggregationInput[];
    by: Prisma.BlogPostScalarFieldEnum[] | Prisma.BlogPostScalarFieldEnum;
    having?: Prisma.BlogPostScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BlogPostCountAggregateInputType | true;
    _avg?: BlogPostAvgAggregateInputType;
    _sum?: BlogPostSumAggregateInputType;
    _min?: BlogPostMinAggregateInputType;
    _max?: BlogPostMaxAggregateInputType;
};
export type BlogPostGroupByOutputType = {
    id: string;
    authorId: string | null;
    title: string;
    slug: string;
    excerpt: string | null;
    coverImage: string | null;
    coverPublicId: string | null;
    content: string;
    status: $Enums.BlogStatus;
    viewCount: number;
    publishedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: BlogPostCountAggregateOutputType | null;
    _avg: BlogPostAvgAggregateOutputType | null;
    _sum: BlogPostSumAggregateOutputType | null;
    _min: BlogPostMinAggregateOutputType | null;
    _max: BlogPostMaxAggregateOutputType | null;
};
export type GetBlogPostGroupByPayload<T extends BlogPostGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BlogPostGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BlogPostGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BlogPostGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BlogPostGroupByOutputType[P]>;
}>>;
export type BlogPostWhereInput = {
    AND?: Prisma.BlogPostWhereInput | Prisma.BlogPostWhereInput[];
    OR?: Prisma.BlogPostWhereInput[];
    NOT?: Prisma.BlogPostWhereInput | Prisma.BlogPostWhereInput[];
    id?: Prisma.StringFilter<"BlogPost"> | string;
    authorId?: Prisma.StringNullableFilter<"BlogPost"> | string | null;
    title?: Prisma.StringFilter<"BlogPost"> | string;
    slug?: Prisma.StringFilter<"BlogPost"> | string;
    excerpt?: Prisma.StringNullableFilter<"BlogPost"> | string | null;
    coverImage?: Prisma.StringNullableFilter<"BlogPost"> | string | null;
    coverPublicId?: Prisma.StringNullableFilter<"BlogPost"> | string | null;
    content?: Prisma.StringFilter<"BlogPost"> | string;
    status?: Prisma.EnumBlogStatusFilter<"BlogPost"> | $Enums.BlogStatus;
    viewCount?: Prisma.IntFilter<"BlogPost"> | number;
    publishedAt?: Prisma.DateTimeNullableFilter<"BlogPost"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"BlogPost"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"BlogPost"> | Date | string;
    author?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
};
export type BlogPostOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    authorId?: Prisma.SortOrderInput | Prisma.SortOrder;
    title?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    excerpt?: Prisma.SortOrderInput | Prisma.SortOrder;
    coverImage?: Prisma.SortOrderInput | Prisma.SortOrder;
    coverPublicId?: Prisma.SortOrderInput | Prisma.SortOrder;
    content?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    viewCount?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    author?: Prisma.UserOrderByWithRelationInput;
};
export type BlogPostWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    slug?: string;
    AND?: Prisma.BlogPostWhereInput | Prisma.BlogPostWhereInput[];
    OR?: Prisma.BlogPostWhereInput[];
    NOT?: Prisma.BlogPostWhereInput | Prisma.BlogPostWhereInput[];
    authorId?: Prisma.StringNullableFilter<"BlogPost"> | string | null;
    title?: Prisma.StringFilter<"BlogPost"> | string;
    excerpt?: Prisma.StringNullableFilter<"BlogPost"> | string | null;
    coverImage?: Prisma.StringNullableFilter<"BlogPost"> | string | null;
    coverPublicId?: Prisma.StringNullableFilter<"BlogPost"> | string | null;
    content?: Prisma.StringFilter<"BlogPost"> | string;
    status?: Prisma.EnumBlogStatusFilter<"BlogPost"> | $Enums.BlogStatus;
    viewCount?: Prisma.IntFilter<"BlogPost"> | number;
    publishedAt?: Prisma.DateTimeNullableFilter<"BlogPost"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"BlogPost"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"BlogPost"> | Date | string;
    author?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
}, "id" | "slug">;
export type BlogPostOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    authorId?: Prisma.SortOrderInput | Prisma.SortOrder;
    title?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    excerpt?: Prisma.SortOrderInput | Prisma.SortOrder;
    coverImage?: Prisma.SortOrderInput | Prisma.SortOrder;
    coverPublicId?: Prisma.SortOrderInput | Prisma.SortOrder;
    content?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    viewCount?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.BlogPostCountOrderByAggregateInput;
    _avg?: Prisma.BlogPostAvgOrderByAggregateInput;
    _max?: Prisma.BlogPostMaxOrderByAggregateInput;
    _min?: Prisma.BlogPostMinOrderByAggregateInput;
    _sum?: Prisma.BlogPostSumOrderByAggregateInput;
};
export type BlogPostScalarWhereWithAggregatesInput = {
    AND?: Prisma.BlogPostScalarWhereWithAggregatesInput | Prisma.BlogPostScalarWhereWithAggregatesInput[];
    OR?: Prisma.BlogPostScalarWhereWithAggregatesInput[];
    NOT?: Prisma.BlogPostScalarWhereWithAggregatesInput | Prisma.BlogPostScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"BlogPost"> | string;
    authorId?: Prisma.StringNullableWithAggregatesFilter<"BlogPost"> | string | null;
    title?: Prisma.StringWithAggregatesFilter<"BlogPost"> | string;
    slug?: Prisma.StringWithAggregatesFilter<"BlogPost"> | string;
    excerpt?: Prisma.StringNullableWithAggregatesFilter<"BlogPost"> | string | null;
    coverImage?: Prisma.StringNullableWithAggregatesFilter<"BlogPost"> | string | null;
    coverPublicId?: Prisma.StringNullableWithAggregatesFilter<"BlogPost"> | string | null;
    content?: Prisma.StringWithAggregatesFilter<"BlogPost"> | string;
    status?: Prisma.EnumBlogStatusWithAggregatesFilter<"BlogPost"> | $Enums.BlogStatus;
    viewCount?: Prisma.IntWithAggregatesFilter<"BlogPost"> | number;
    publishedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"BlogPost"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"BlogPost"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"BlogPost"> | Date | string;
};
export type BlogPostCreateInput = {
    id?: string;
    title: string;
    slug: string;
    excerpt?: string | null;
    coverImage?: string | null;
    coverPublicId?: string | null;
    content: string;
    status?: $Enums.BlogStatus;
    viewCount?: number;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    author?: Prisma.UserCreateNestedOneWithoutBlogPostsInput;
};
export type BlogPostUncheckedCreateInput = {
    id?: string;
    authorId?: string | null;
    title: string;
    slug: string;
    excerpt?: string | null;
    coverImage?: string | null;
    coverPublicId?: string | null;
    content: string;
    status?: $Enums.BlogStatus;
    viewCount?: number;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BlogPostUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    excerpt?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    coverImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    coverPublicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBlogStatusFieldUpdateOperationsInput | $Enums.BlogStatus;
    viewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    author?: Prisma.UserUpdateOneWithoutBlogPostsNestedInput;
};
export type BlogPostUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    excerpt?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    coverImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    coverPublicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBlogStatusFieldUpdateOperationsInput | $Enums.BlogStatus;
    viewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BlogPostCreateManyInput = {
    id?: string;
    authorId?: string | null;
    title: string;
    slug: string;
    excerpt?: string | null;
    coverImage?: string | null;
    coverPublicId?: string | null;
    content: string;
    status?: $Enums.BlogStatus;
    viewCount?: number;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BlogPostUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    excerpt?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    coverImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    coverPublicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBlogStatusFieldUpdateOperationsInput | $Enums.BlogStatus;
    viewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BlogPostUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    excerpt?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    coverImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    coverPublicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBlogStatusFieldUpdateOperationsInput | $Enums.BlogStatus;
    viewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BlogPostListRelationFilter = {
    every?: Prisma.BlogPostWhereInput;
    some?: Prisma.BlogPostWhereInput;
    none?: Prisma.BlogPostWhereInput;
};
export type BlogPostOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type BlogPostCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    excerpt?: Prisma.SortOrder;
    coverImage?: Prisma.SortOrder;
    coverPublicId?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    viewCount?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BlogPostAvgOrderByAggregateInput = {
    viewCount?: Prisma.SortOrder;
};
export type BlogPostMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    excerpt?: Prisma.SortOrder;
    coverImage?: Prisma.SortOrder;
    coverPublicId?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    viewCount?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BlogPostMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    excerpt?: Prisma.SortOrder;
    coverImage?: Prisma.SortOrder;
    coverPublicId?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    viewCount?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BlogPostSumOrderByAggregateInput = {
    viewCount?: Prisma.SortOrder;
};
export type BlogPostCreateNestedManyWithoutAuthorInput = {
    create?: Prisma.XOR<Prisma.BlogPostCreateWithoutAuthorInput, Prisma.BlogPostUncheckedCreateWithoutAuthorInput> | Prisma.BlogPostCreateWithoutAuthorInput[] | Prisma.BlogPostUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.BlogPostCreateOrConnectWithoutAuthorInput | Prisma.BlogPostCreateOrConnectWithoutAuthorInput[];
    createMany?: Prisma.BlogPostCreateManyAuthorInputEnvelope;
    connect?: Prisma.BlogPostWhereUniqueInput | Prisma.BlogPostWhereUniqueInput[];
};
export type BlogPostUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: Prisma.XOR<Prisma.BlogPostCreateWithoutAuthorInput, Prisma.BlogPostUncheckedCreateWithoutAuthorInput> | Prisma.BlogPostCreateWithoutAuthorInput[] | Prisma.BlogPostUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.BlogPostCreateOrConnectWithoutAuthorInput | Prisma.BlogPostCreateOrConnectWithoutAuthorInput[];
    createMany?: Prisma.BlogPostCreateManyAuthorInputEnvelope;
    connect?: Prisma.BlogPostWhereUniqueInput | Prisma.BlogPostWhereUniqueInput[];
};
export type BlogPostUpdateManyWithoutAuthorNestedInput = {
    create?: Prisma.XOR<Prisma.BlogPostCreateWithoutAuthorInput, Prisma.BlogPostUncheckedCreateWithoutAuthorInput> | Prisma.BlogPostCreateWithoutAuthorInput[] | Prisma.BlogPostUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.BlogPostCreateOrConnectWithoutAuthorInput | Prisma.BlogPostCreateOrConnectWithoutAuthorInput[];
    upsert?: Prisma.BlogPostUpsertWithWhereUniqueWithoutAuthorInput | Prisma.BlogPostUpsertWithWhereUniqueWithoutAuthorInput[];
    createMany?: Prisma.BlogPostCreateManyAuthorInputEnvelope;
    set?: Prisma.BlogPostWhereUniqueInput | Prisma.BlogPostWhereUniqueInput[];
    disconnect?: Prisma.BlogPostWhereUniqueInput | Prisma.BlogPostWhereUniqueInput[];
    delete?: Prisma.BlogPostWhereUniqueInput | Prisma.BlogPostWhereUniqueInput[];
    connect?: Prisma.BlogPostWhereUniqueInput | Prisma.BlogPostWhereUniqueInput[];
    update?: Prisma.BlogPostUpdateWithWhereUniqueWithoutAuthorInput | Prisma.BlogPostUpdateWithWhereUniqueWithoutAuthorInput[];
    updateMany?: Prisma.BlogPostUpdateManyWithWhereWithoutAuthorInput | Prisma.BlogPostUpdateManyWithWhereWithoutAuthorInput[];
    deleteMany?: Prisma.BlogPostScalarWhereInput | Prisma.BlogPostScalarWhereInput[];
};
export type BlogPostUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: Prisma.XOR<Prisma.BlogPostCreateWithoutAuthorInput, Prisma.BlogPostUncheckedCreateWithoutAuthorInput> | Prisma.BlogPostCreateWithoutAuthorInput[] | Prisma.BlogPostUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.BlogPostCreateOrConnectWithoutAuthorInput | Prisma.BlogPostCreateOrConnectWithoutAuthorInput[];
    upsert?: Prisma.BlogPostUpsertWithWhereUniqueWithoutAuthorInput | Prisma.BlogPostUpsertWithWhereUniqueWithoutAuthorInput[];
    createMany?: Prisma.BlogPostCreateManyAuthorInputEnvelope;
    set?: Prisma.BlogPostWhereUniqueInput | Prisma.BlogPostWhereUniqueInput[];
    disconnect?: Prisma.BlogPostWhereUniqueInput | Prisma.BlogPostWhereUniqueInput[];
    delete?: Prisma.BlogPostWhereUniqueInput | Prisma.BlogPostWhereUniqueInput[];
    connect?: Prisma.BlogPostWhereUniqueInput | Prisma.BlogPostWhereUniqueInput[];
    update?: Prisma.BlogPostUpdateWithWhereUniqueWithoutAuthorInput | Prisma.BlogPostUpdateWithWhereUniqueWithoutAuthorInput[];
    updateMany?: Prisma.BlogPostUpdateManyWithWhereWithoutAuthorInput | Prisma.BlogPostUpdateManyWithWhereWithoutAuthorInput[];
    deleteMany?: Prisma.BlogPostScalarWhereInput | Prisma.BlogPostScalarWhereInput[];
};
export type EnumBlogStatusFieldUpdateOperationsInput = {
    set?: $Enums.BlogStatus;
};
export type BlogPostCreateWithoutAuthorInput = {
    id?: string;
    title: string;
    slug: string;
    excerpt?: string | null;
    coverImage?: string | null;
    coverPublicId?: string | null;
    content: string;
    status?: $Enums.BlogStatus;
    viewCount?: number;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BlogPostUncheckedCreateWithoutAuthorInput = {
    id?: string;
    title: string;
    slug: string;
    excerpt?: string | null;
    coverImage?: string | null;
    coverPublicId?: string | null;
    content: string;
    status?: $Enums.BlogStatus;
    viewCount?: number;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BlogPostCreateOrConnectWithoutAuthorInput = {
    where: Prisma.BlogPostWhereUniqueInput;
    create: Prisma.XOR<Prisma.BlogPostCreateWithoutAuthorInput, Prisma.BlogPostUncheckedCreateWithoutAuthorInput>;
};
export type BlogPostCreateManyAuthorInputEnvelope = {
    data: Prisma.BlogPostCreateManyAuthorInput | Prisma.BlogPostCreateManyAuthorInput[];
    skipDuplicates?: boolean;
};
export type BlogPostUpsertWithWhereUniqueWithoutAuthorInput = {
    where: Prisma.BlogPostWhereUniqueInput;
    update: Prisma.XOR<Prisma.BlogPostUpdateWithoutAuthorInput, Prisma.BlogPostUncheckedUpdateWithoutAuthorInput>;
    create: Prisma.XOR<Prisma.BlogPostCreateWithoutAuthorInput, Prisma.BlogPostUncheckedCreateWithoutAuthorInput>;
};
export type BlogPostUpdateWithWhereUniqueWithoutAuthorInput = {
    where: Prisma.BlogPostWhereUniqueInput;
    data: Prisma.XOR<Prisma.BlogPostUpdateWithoutAuthorInput, Prisma.BlogPostUncheckedUpdateWithoutAuthorInput>;
};
export type BlogPostUpdateManyWithWhereWithoutAuthorInput = {
    where: Prisma.BlogPostScalarWhereInput;
    data: Prisma.XOR<Prisma.BlogPostUpdateManyMutationInput, Prisma.BlogPostUncheckedUpdateManyWithoutAuthorInput>;
};
export type BlogPostScalarWhereInput = {
    AND?: Prisma.BlogPostScalarWhereInput | Prisma.BlogPostScalarWhereInput[];
    OR?: Prisma.BlogPostScalarWhereInput[];
    NOT?: Prisma.BlogPostScalarWhereInput | Prisma.BlogPostScalarWhereInput[];
    id?: Prisma.StringFilter<"BlogPost"> | string;
    authorId?: Prisma.StringNullableFilter<"BlogPost"> | string | null;
    title?: Prisma.StringFilter<"BlogPost"> | string;
    slug?: Prisma.StringFilter<"BlogPost"> | string;
    excerpt?: Prisma.StringNullableFilter<"BlogPost"> | string | null;
    coverImage?: Prisma.StringNullableFilter<"BlogPost"> | string | null;
    coverPublicId?: Prisma.StringNullableFilter<"BlogPost"> | string | null;
    content?: Prisma.StringFilter<"BlogPost"> | string;
    status?: Prisma.EnumBlogStatusFilter<"BlogPost"> | $Enums.BlogStatus;
    viewCount?: Prisma.IntFilter<"BlogPost"> | number;
    publishedAt?: Prisma.DateTimeNullableFilter<"BlogPost"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"BlogPost"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"BlogPost"> | Date | string;
};
export type BlogPostCreateManyAuthorInput = {
    id?: string;
    title: string;
    slug: string;
    excerpt?: string | null;
    coverImage?: string | null;
    coverPublicId?: string | null;
    content: string;
    status?: $Enums.BlogStatus;
    viewCount?: number;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BlogPostUpdateWithoutAuthorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    excerpt?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    coverImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    coverPublicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBlogStatusFieldUpdateOperationsInput | $Enums.BlogStatus;
    viewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BlogPostUncheckedUpdateWithoutAuthorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    excerpt?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    coverImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    coverPublicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBlogStatusFieldUpdateOperationsInput | $Enums.BlogStatus;
    viewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BlogPostUncheckedUpdateManyWithoutAuthorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    excerpt?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    coverImage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    coverPublicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBlogStatusFieldUpdateOperationsInput | $Enums.BlogStatus;
    viewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BlogPostSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    authorId?: boolean;
    title?: boolean;
    slug?: boolean;
    excerpt?: boolean;
    coverImage?: boolean;
    coverPublicId?: boolean;
    content?: boolean;
    status?: boolean;
    viewCount?: boolean;
    publishedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    author?: boolean | Prisma.BlogPost$authorArgs<ExtArgs>;
}, ExtArgs["result"]["blogPost"]>;
export type BlogPostSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    authorId?: boolean;
    title?: boolean;
    slug?: boolean;
    excerpt?: boolean;
    coverImage?: boolean;
    coverPublicId?: boolean;
    content?: boolean;
    status?: boolean;
    viewCount?: boolean;
    publishedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    author?: boolean | Prisma.BlogPost$authorArgs<ExtArgs>;
}, ExtArgs["result"]["blogPost"]>;
export type BlogPostSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    authorId?: boolean;
    title?: boolean;
    slug?: boolean;
    excerpt?: boolean;
    coverImage?: boolean;
    coverPublicId?: boolean;
    content?: boolean;
    status?: boolean;
    viewCount?: boolean;
    publishedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    author?: boolean | Prisma.BlogPost$authorArgs<ExtArgs>;
}, ExtArgs["result"]["blogPost"]>;
export type BlogPostSelectScalar = {
    id?: boolean;
    authorId?: boolean;
    title?: boolean;
    slug?: boolean;
    excerpt?: boolean;
    coverImage?: boolean;
    coverPublicId?: boolean;
    content?: boolean;
    status?: boolean;
    viewCount?: boolean;
    publishedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type BlogPostOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "authorId" | "title" | "slug" | "excerpt" | "coverImage" | "coverPublicId" | "content" | "status" | "viewCount" | "publishedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["blogPost"]>;
export type BlogPostInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    author?: boolean | Prisma.BlogPost$authorArgs<ExtArgs>;
};
export type BlogPostIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    author?: boolean | Prisma.BlogPost$authorArgs<ExtArgs>;
};
export type BlogPostIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    author?: boolean | Prisma.BlogPost$authorArgs<ExtArgs>;
};
export type $BlogPostPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "BlogPost";
    objects: {
        author: Prisma.$UserPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        authorId: string | null;
        title: string;
        slug: string;
        excerpt: string | null;
        coverImage: string | null;
        coverPublicId: string | null;
        content: string;
        status: $Enums.BlogStatus;
        viewCount: number;
        publishedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["blogPost"]>;
    composites: {};
};
export type BlogPostGetPayload<S extends boolean | null | undefined | BlogPostDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$BlogPostPayload, S>;
export type BlogPostCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<BlogPostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BlogPostCountAggregateInputType | true;
};
export interface BlogPostDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['BlogPost'];
        meta: {
            name: 'BlogPost';
        };
    };
    findUnique<T extends BlogPostFindUniqueArgs>(args: Prisma.SelectSubset<T, BlogPostFindUniqueArgs<ExtArgs>>): Prisma.Prisma__BlogPostClient<runtime.Types.Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends BlogPostFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, BlogPostFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__BlogPostClient<runtime.Types.Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends BlogPostFindFirstArgs>(args?: Prisma.SelectSubset<T, BlogPostFindFirstArgs<ExtArgs>>): Prisma.Prisma__BlogPostClient<runtime.Types.Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends BlogPostFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, BlogPostFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__BlogPostClient<runtime.Types.Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends BlogPostFindManyArgs>(args?: Prisma.SelectSubset<T, BlogPostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends BlogPostCreateArgs>(args: Prisma.SelectSubset<T, BlogPostCreateArgs<ExtArgs>>): Prisma.Prisma__BlogPostClient<runtime.Types.Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends BlogPostCreateManyArgs>(args?: Prisma.SelectSubset<T, BlogPostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends BlogPostCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, BlogPostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends BlogPostDeleteArgs>(args: Prisma.SelectSubset<T, BlogPostDeleteArgs<ExtArgs>>): Prisma.Prisma__BlogPostClient<runtime.Types.Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends BlogPostUpdateArgs>(args: Prisma.SelectSubset<T, BlogPostUpdateArgs<ExtArgs>>): Prisma.Prisma__BlogPostClient<runtime.Types.Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends BlogPostDeleteManyArgs>(args?: Prisma.SelectSubset<T, BlogPostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends BlogPostUpdateManyArgs>(args: Prisma.SelectSubset<T, BlogPostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends BlogPostUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, BlogPostUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends BlogPostUpsertArgs>(args: Prisma.SelectSubset<T, BlogPostUpsertArgs<ExtArgs>>): Prisma.Prisma__BlogPostClient<runtime.Types.Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends BlogPostCountArgs>(args?: Prisma.Subset<T, BlogPostCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BlogPostCountAggregateOutputType> : number>;
    aggregate<T extends BlogPostAggregateArgs>(args: Prisma.Subset<T, BlogPostAggregateArgs>): Prisma.PrismaPromise<GetBlogPostAggregateType<T>>;
    groupBy<T extends BlogPostGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: BlogPostGroupByArgs['orderBy'];
    } : {
        orderBy?: BlogPostGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, BlogPostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBlogPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: BlogPostFieldRefs;
}
export interface Prisma__BlogPostClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    author<T extends Prisma.BlogPost$authorArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.BlogPost$authorArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface BlogPostFieldRefs {
    readonly id: Prisma.FieldRef<"BlogPost", 'String'>;
    readonly authorId: Prisma.FieldRef<"BlogPost", 'String'>;
    readonly title: Prisma.FieldRef<"BlogPost", 'String'>;
    readonly slug: Prisma.FieldRef<"BlogPost", 'String'>;
    readonly excerpt: Prisma.FieldRef<"BlogPost", 'String'>;
    readonly coverImage: Prisma.FieldRef<"BlogPost", 'String'>;
    readonly coverPublicId: Prisma.FieldRef<"BlogPost", 'String'>;
    readonly content: Prisma.FieldRef<"BlogPost", 'String'>;
    readonly status: Prisma.FieldRef<"BlogPost", 'BlogStatus'>;
    readonly viewCount: Prisma.FieldRef<"BlogPost", 'Int'>;
    readonly publishedAt: Prisma.FieldRef<"BlogPost", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"BlogPost", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"BlogPost", 'DateTime'>;
}
export type BlogPostFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BlogPostSelect<ExtArgs> | null;
    omit?: Prisma.BlogPostOmit<ExtArgs> | null;
    include?: Prisma.BlogPostInclude<ExtArgs> | null;
    where: Prisma.BlogPostWhereUniqueInput;
};
export type BlogPostFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BlogPostSelect<ExtArgs> | null;
    omit?: Prisma.BlogPostOmit<ExtArgs> | null;
    include?: Prisma.BlogPostInclude<ExtArgs> | null;
    where: Prisma.BlogPostWhereUniqueInput;
};
export type BlogPostFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BlogPostSelect<ExtArgs> | null;
    omit?: Prisma.BlogPostOmit<ExtArgs> | null;
    include?: Prisma.BlogPostInclude<ExtArgs> | null;
    where?: Prisma.BlogPostWhereInput;
    orderBy?: Prisma.BlogPostOrderByWithRelationInput | Prisma.BlogPostOrderByWithRelationInput[];
    cursor?: Prisma.BlogPostWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BlogPostScalarFieldEnum | Prisma.BlogPostScalarFieldEnum[];
};
export type BlogPostFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BlogPostSelect<ExtArgs> | null;
    omit?: Prisma.BlogPostOmit<ExtArgs> | null;
    include?: Prisma.BlogPostInclude<ExtArgs> | null;
    where?: Prisma.BlogPostWhereInput;
    orderBy?: Prisma.BlogPostOrderByWithRelationInput | Prisma.BlogPostOrderByWithRelationInput[];
    cursor?: Prisma.BlogPostWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BlogPostScalarFieldEnum | Prisma.BlogPostScalarFieldEnum[];
};
export type BlogPostFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BlogPostSelect<ExtArgs> | null;
    omit?: Prisma.BlogPostOmit<ExtArgs> | null;
    include?: Prisma.BlogPostInclude<ExtArgs> | null;
    where?: Prisma.BlogPostWhereInput;
    orderBy?: Prisma.BlogPostOrderByWithRelationInput | Prisma.BlogPostOrderByWithRelationInput[];
    cursor?: Prisma.BlogPostWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BlogPostScalarFieldEnum | Prisma.BlogPostScalarFieldEnum[];
};
export type BlogPostCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BlogPostSelect<ExtArgs> | null;
    omit?: Prisma.BlogPostOmit<ExtArgs> | null;
    include?: Prisma.BlogPostInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BlogPostCreateInput, Prisma.BlogPostUncheckedCreateInput>;
};
export type BlogPostCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.BlogPostCreateManyInput | Prisma.BlogPostCreateManyInput[];
    skipDuplicates?: boolean;
};
export type BlogPostCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BlogPostSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BlogPostOmit<ExtArgs> | null;
    data: Prisma.BlogPostCreateManyInput | Prisma.BlogPostCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.BlogPostIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type BlogPostUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BlogPostSelect<ExtArgs> | null;
    omit?: Prisma.BlogPostOmit<ExtArgs> | null;
    include?: Prisma.BlogPostInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BlogPostUpdateInput, Prisma.BlogPostUncheckedUpdateInput>;
    where: Prisma.BlogPostWhereUniqueInput;
};
export type BlogPostUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.BlogPostUpdateManyMutationInput, Prisma.BlogPostUncheckedUpdateManyInput>;
    where?: Prisma.BlogPostWhereInput;
    limit?: number;
};
export type BlogPostUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BlogPostSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BlogPostOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BlogPostUpdateManyMutationInput, Prisma.BlogPostUncheckedUpdateManyInput>;
    where?: Prisma.BlogPostWhereInput;
    limit?: number;
    include?: Prisma.BlogPostIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type BlogPostUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BlogPostSelect<ExtArgs> | null;
    omit?: Prisma.BlogPostOmit<ExtArgs> | null;
    include?: Prisma.BlogPostInclude<ExtArgs> | null;
    where: Prisma.BlogPostWhereUniqueInput;
    create: Prisma.XOR<Prisma.BlogPostCreateInput, Prisma.BlogPostUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.BlogPostUpdateInput, Prisma.BlogPostUncheckedUpdateInput>;
};
export type BlogPostDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BlogPostSelect<ExtArgs> | null;
    omit?: Prisma.BlogPostOmit<ExtArgs> | null;
    include?: Prisma.BlogPostInclude<ExtArgs> | null;
    where: Prisma.BlogPostWhereUniqueInput;
};
export type BlogPostDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BlogPostWhereInput;
    limit?: number;
};
export type BlogPost$authorArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type BlogPostDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BlogPostSelect<ExtArgs> | null;
    omit?: Prisma.BlogPostOmit<ExtArgs> | null;
    include?: Prisma.BlogPostInclude<ExtArgs> | null;
};
