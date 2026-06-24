import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type SiteSettingsModel = runtime.Types.Result.DefaultSelection<Prisma.$SiteSettingsPayload>;
export type AggregateSiteSettings = {
    _count: SiteSettingsCountAggregateOutputType | null;
    _avg: SiteSettingsAvgAggregateOutputType | null;
    _sum: SiteSettingsSumAggregateOutputType | null;
    _min: SiteSettingsMinAggregateOutputType | null;
    _max: SiteSettingsMaxAggregateOutputType | null;
};
export type SiteSettingsAvgAggregateOutputType = {
    taxRate: runtime.Decimal | null;
};
export type SiteSettingsSumAggregateOutputType = {
    taxRate: runtime.Decimal | null;
};
export type SiteSettingsMinAggregateOutputType = {
    id: string | null;
    siteName: string | null;
    siteDescription: string | null;
    contactEmail: string | null;
    contactPhone: string | null;
    contactAddress: string | null;
    socialInstagram: string | null;
    socialTiktok: string | null;
    socialFacebook: string | null;
    socialWhatsapp: string | null;
    shippingOriginCityId: string | null;
    taxRate: runtime.Decimal | null;
    currency: string | null;
    maintenanceMode: boolean | null;
    updatedAt: Date | null;
};
export type SiteSettingsMaxAggregateOutputType = {
    id: string | null;
    siteName: string | null;
    siteDescription: string | null;
    contactEmail: string | null;
    contactPhone: string | null;
    contactAddress: string | null;
    socialInstagram: string | null;
    socialTiktok: string | null;
    socialFacebook: string | null;
    socialWhatsapp: string | null;
    shippingOriginCityId: string | null;
    taxRate: runtime.Decimal | null;
    currency: string | null;
    maintenanceMode: boolean | null;
    updatedAt: Date | null;
};
export type SiteSettingsCountAggregateOutputType = {
    id: number;
    siteName: number;
    siteDescription: number;
    contactEmail: number;
    contactPhone: number;
    contactAddress: number;
    socialInstagram: number;
    socialTiktok: number;
    socialFacebook: number;
    socialWhatsapp: number;
    shippingOriginCityId: number;
    taxRate: number;
    currency: number;
    maintenanceMode: number;
    updatedAt: number;
    _all: number;
};
export type SiteSettingsAvgAggregateInputType = {
    taxRate?: true;
};
export type SiteSettingsSumAggregateInputType = {
    taxRate?: true;
};
export type SiteSettingsMinAggregateInputType = {
    id?: true;
    siteName?: true;
    siteDescription?: true;
    contactEmail?: true;
    contactPhone?: true;
    contactAddress?: true;
    socialInstagram?: true;
    socialTiktok?: true;
    socialFacebook?: true;
    socialWhatsapp?: true;
    shippingOriginCityId?: true;
    taxRate?: true;
    currency?: true;
    maintenanceMode?: true;
    updatedAt?: true;
};
export type SiteSettingsMaxAggregateInputType = {
    id?: true;
    siteName?: true;
    siteDescription?: true;
    contactEmail?: true;
    contactPhone?: true;
    contactAddress?: true;
    socialInstagram?: true;
    socialTiktok?: true;
    socialFacebook?: true;
    socialWhatsapp?: true;
    shippingOriginCityId?: true;
    taxRate?: true;
    currency?: true;
    maintenanceMode?: true;
    updatedAt?: true;
};
export type SiteSettingsCountAggregateInputType = {
    id?: true;
    siteName?: true;
    siteDescription?: true;
    contactEmail?: true;
    contactPhone?: true;
    contactAddress?: true;
    socialInstagram?: true;
    socialTiktok?: true;
    socialFacebook?: true;
    socialWhatsapp?: true;
    shippingOriginCityId?: true;
    taxRate?: true;
    currency?: true;
    maintenanceMode?: true;
    updatedAt?: true;
    _all?: true;
};
export type SiteSettingsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SiteSettingsWhereInput;
    orderBy?: Prisma.SiteSettingsOrderByWithRelationInput | Prisma.SiteSettingsOrderByWithRelationInput[];
    cursor?: Prisma.SiteSettingsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SiteSettingsCountAggregateInputType;
    _avg?: SiteSettingsAvgAggregateInputType;
    _sum?: SiteSettingsSumAggregateInputType;
    _min?: SiteSettingsMinAggregateInputType;
    _max?: SiteSettingsMaxAggregateInputType;
};
export type GetSiteSettingsAggregateType<T extends SiteSettingsAggregateArgs> = {
    [P in keyof T & keyof AggregateSiteSettings]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSiteSettings[P]> : Prisma.GetScalarType<T[P], AggregateSiteSettings[P]>;
};
export type SiteSettingsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SiteSettingsWhereInput;
    orderBy?: Prisma.SiteSettingsOrderByWithAggregationInput | Prisma.SiteSettingsOrderByWithAggregationInput[];
    by: Prisma.SiteSettingsScalarFieldEnum[] | Prisma.SiteSettingsScalarFieldEnum;
    having?: Prisma.SiteSettingsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SiteSettingsCountAggregateInputType | true;
    _avg?: SiteSettingsAvgAggregateInputType;
    _sum?: SiteSettingsSumAggregateInputType;
    _min?: SiteSettingsMinAggregateInputType;
    _max?: SiteSettingsMaxAggregateInputType;
};
export type SiteSettingsGroupByOutputType = {
    id: string;
    siteName: string;
    siteDescription: string | null;
    contactEmail: string | null;
    contactPhone: string | null;
    contactAddress: string | null;
    socialInstagram: string | null;
    socialTiktok: string | null;
    socialFacebook: string | null;
    socialWhatsapp: string | null;
    shippingOriginCityId: string | null;
    taxRate: runtime.Decimal;
    currency: string;
    maintenanceMode: boolean;
    updatedAt: Date;
    _count: SiteSettingsCountAggregateOutputType | null;
    _avg: SiteSettingsAvgAggregateOutputType | null;
    _sum: SiteSettingsSumAggregateOutputType | null;
    _min: SiteSettingsMinAggregateOutputType | null;
    _max: SiteSettingsMaxAggregateOutputType | null;
};
export type GetSiteSettingsGroupByPayload<T extends SiteSettingsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SiteSettingsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SiteSettingsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SiteSettingsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SiteSettingsGroupByOutputType[P]>;
}>>;
export type SiteSettingsWhereInput = {
    AND?: Prisma.SiteSettingsWhereInput | Prisma.SiteSettingsWhereInput[];
    OR?: Prisma.SiteSettingsWhereInput[];
    NOT?: Prisma.SiteSettingsWhereInput | Prisma.SiteSettingsWhereInput[];
    id?: Prisma.StringFilter<"SiteSettings"> | string;
    siteName?: Prisma.StringFilter<"SiteSettings"> | string;
    siteDescription?: Prisma.StringNullableFilter<"SiteSettings"> | string | null;
    contactEmail?: Prisma.StringNullableFilter<"SiteSettings"> | string | null;
    contactPhone?: Prisma.StringNullableFilter<"SiteSettings"> | string | null;
    contactAddress?: Prisma.StringNullableFilter<"SiteSettings"> | string | null;
    socialInstagram?: Prisma.StringNullableFilter<"SiteSettings"> | string | null;
    socialTiktok?: Prisma.StringNullableFilter<"SiteSettings"> | string | null;
    socialFacebook?: Prisma.StringNullableFilter<"SiteSettings"> | string | null;
    socialWhatsapp?: Prisma.StringNullableFilter<"SiteSettings"> | string | null;
    shippingOriginCityId?: Prisma.StringNullableFilter<"SiteSettings"> | string | null;
    taxRate?: Prisma.DecimalFilter<"SiteSettings"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency?: Prisma.StringFilter<"SiteSettings"> | string;
    maintenanceMode?: Prisma.BoolFilter<"SiteSettings"> | boolean;
    updatedAt?: Prisma.DateTimeFilter<"SiteSettings"> | Date | string;
};
export type SiteSettingsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    siteName?: Prisma.SortOrder;
    siteDescription?: Prisma.SortOrderInput | Prisma.SortOrder;
    contactEmail?: Prisma.SortOrderInput | Prisma.SortOrder;
    contactPhone?: Prisma.SortOrderInput | Prisma.SortOrder;
    contactAddress?: Prisma.SortOrderInput | Prisma.SortOrder;
    socialInstagram?: Prisma.SortOrderInput | Prisma.SortOrder;
    socialTiktok?: Prisma.SortOrderInput | Prisma.SortOrder;
    socialFacebook?: Prisma.SortOrderInput | Prisma.SortOrder;
    socialWhatsapp?: Prisma.SortOrderInput | Prisma.SortOrder;
    shippingOriginCityId?: Prisma.SortOrderInput | Prisma.SortOrder;
    taxRate?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    maintenanceMode?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SiteSettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.SiteSettingsWhereInput | Prisma.SiteSettingsWhereInput[];
    OR?: Prisma.SiteSettingsWhereInput[];
    NOT?: Prisma.SiteSettingsWhereInput | Prisma.SiteSettingsWhereInput[];
    siteName?: Prisma.StringFilter<"SiteSettings"> | string;
    siteDescription?: Prisma.StringNullableFilter<"SiteSettings"> | string | null;
    contactEmail?: Prisma.StringNullableFilter<"SiteSettings"> | string | null;
    contactPhone?: Prisma.StringNullableFilter<"SiteSettings"> | string | null;
    contactAddress?: Prisma.StringNullableFilter<"SiteSettings"> | string | null;
    socialInstagram?: Prisma.StringNullableFilter<"SiteSettings"> | string | null;
    socialTiktok?: Prisma.StringNullableFilter<"SiteSettings"> | string | null;
    socialFacebook?: Prisma.StringNullableFilter<"SiteSettings"> | string | null;
    socialWhatsapp?: Prisma.StringNullableFilter<"SiteSettings"> | string | null;
    shippingOriginCityId?: Prisma.StringNullableFilter<"SiteSettings"> | string | null;
    taxRate?: Prisma.DecimalFilter<"SiteSettings"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency?: Prisma.StringFilter<"SiteSettings"> | string;
    maintenanceMode?: Prisma.BoolFilter<"SiteSettings"> | boolean;
    updatedAt?: Prisma.DateTimeFilter<"SiteSettings"> | Date | string;
}, "id">;
export type SiteSettingsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    siteName?: Prisma.SortOrder;
    siteDescription?: Prisma.SortOrderInput | Prisma.SortOrder;
    contactEmail?: Prisma.SortOrderInput | Prisma.SortOrder;
    contactPhone?: Prisma.SortOrderInput | Prisma.SortOrder;
    contactAddress?: Prisma.SortOrderInput | Prisma.SortOrder;
    socialInstagram?: Prisma.SortOrderInput | Prisma.SortOrder;
    socialTiktok?: Prisma.SortOrderInput | Prisma.SortOrder;
    socialFacebook?: Prisma.SortOrderInput | Prisma.SortOrder;
    socialWhatsapp?: Prisma.SortOrderInput | Prisma.SortOrder;
    shippingOriginCityId?: Prisma.SortOrderInput | Prisma.SortOrder;
    taxRate?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    maintenanceMode?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.SiteSettingsCountOrderByAggregateInput;
    _avg?: Prisma.SiteSettingsAvgOrderByAggregateInput;
    _max?: Prisma.SiteSettingsMaxOrderByAggregateInput;
    _min?: Prisma.SiteSettingsMinOrderByAggregateInput;
    _sum?: Prisma.SiteSettingsSumOrderByAggregateInput;
};
export type SiteSettingsScalarWhereWithAggregatesInput = {
    AND?: Prisma.SiteSettingsScalarWhereWithAggregatesInput | Prisma.SiteSettingsScalarWhereWithAggregatesInput[];
    OR?: Prisma.SiteSettingsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SiteSettingsScalarWhereWithAggregatesInput | Prisma.SiteSettingsScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"SiteSettings"> | string;
    siteName?: Prisma.StringWithAggregatesFilter<"SiteSettings"> | string;
    siteDescription?: Prisma.StringNullableWithAggregatesFilter<"SiteSettings"> | string | null;
    contactEmail?: Prisma.StringNullableWithAggregatesFilter<"SiteSettings"> | string | null;
    contactPhone?: Prisma.StringNullableWithAggregatesFilter<"SiteSettings"> | string | null;
    contactAddress?: Prisma.StringNullableWithAggregatesFilter<"SiteSettings"> | string | null;
    socialInstagram?: Prisma.StringNullableWithAggregatesFilter<"SiteSettings"> | string | null;
    socialTiktok?: Prisma.StringNullableWithAggregatesFilter<"SiteSettings"> | string | null;
    socialFacebook?: Prisma.StringNullableWithAggregatesFilter<"SiteSettings"> | string | null;
    socialWhatsapp?: Prisma.StringNullableWithAggregatesFilter<"SiteSettings"> | string | null;
    shippingOriginCityId?: Prisma.StringNullableWithAggregatesFilter<"SiteSettings"> | string | null;
    taxRate?: Prisma.DecimalWithAggregatesFilter<"SiteSettings"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency?: Prisma.StringWithAggregatesFilter<"SiteSettings"> | string;
    maintenanceMode?: Prisma.BoolWithAggregatesFilter<"SiteSettings"> | boolean;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"SiteSettings"> | Date | string;
};
export type SiteSettingsCreateInput = {
    id?: string;
    siteName?: string;
    siteDescription?: string | null;
    contactEmail?: string | null;
    contactPhone?: string | null;
    contactAddress?: string | null;
    socialInstagram?: string | null;
    socialTiktok?: string | null;
    socialFacebook?: string | null;
    socialWhatsapp?: string | null;
    shippingOriginCityId?: string | null;
    taxRate?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency?: string;
    maintenanceMode?: boolean;
    updatedAt?: Date | string;
};
export type SiteSettingsUncheckedCreateInput = {
    id?: string;
    siteName?: string;
    siteDescription?: string | null;
    contactEmail?: string | null;
    contactPhone?: string | null;
    contactAddress?: string | null;
    socialInstagram?: string | null;
    socialTiktok?: string | null;
    socialFacebook?: string | null;
    socialWhatsapp?: string | null;
    shippingOriginCityId?: string | null;
    taxRate?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency?: string;
    maintenanceMode?: boolean;
    updatedAt?: Date | string;
};
export type SiteSettingsUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    siteName?: Prisma.StringFieldUpdateOperationsInput | string;
    siteDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPhone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    socialInstagram?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    socialTiktok?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    socialFacebook?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    socialWhatsapp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    shippingOriginCityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    taxRate?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    maintenanceMode?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SiteSettingsUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    siteName?: Prisma.StringFieldUpdateOperationsInput | string;
    siteDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPhone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    socialInstagram?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    socialTiktok?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    socialFacebook?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    socialWhatsapp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    shippingOriginCityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    taxRate?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    maintenanceMode?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SiteSettingsCreateManyInput = {
    id?: string;
    siteName?: string;
    siteDescription?: string | null;
    contactEmail?: string | null;
    contactPhone?: string | null;
    contactAddress?: string | null;
    socialInstagram?: string | null;
    socialTiktok?: string | null;
    socialFacebook?: string | null;
    socialWhatsapp?: string | null;
    shippingOriginCityId?: string | null;
    taxRate?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency?: string;
    maintenanceMode?: boolean;
    updatedAt?: Date | string;
};
export type SiteSettingsUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    siteName?: Prisma.StringFieldUpdateOperationsInput | string;
    siteDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPhone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    socialInstagram?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    socialTiktok?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    socialFacebook?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    socialWhatsapp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    shippingOriginCityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    taxRate?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    maintenanceMode?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SiteSettingsUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    siteName?: Prisma.StringFieldUpdateOperationsInput | string;
    siteDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPhone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    socialInstagram?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    socialTiktok?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    socialFacebook?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    socialWhatsapp?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    shippingOriginCityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    taxRate?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    maintenanceMode?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SiteSettingsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    siteName?: Prisma.SortOrder;
    siteDescription?: Prisma.SortOrder;
    contactEmail?: Prisma.SortOrder;
    contactPhone?: Prisma.SortOrder;
    contactAddress?: Prisma.SortOrder;
    socialInstagram?: Prisma.SortOrder;
    socialTiktok?: Prisma.SortOrder;
    socialFacebook?: Prisma.SortOrder;
    socialWhatsapp?: Prisma.SortOrder;
    shippingOriginCityId?: Prisma.SortOrder;
    taxRate?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    maintenanceMode?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SiteSettingsAvgOrderByAggregateInput = {
    taxRate?: Prisma.SortOrder;
};
export type SiteSettingsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    siteName?: Prisma.SortOrder;
    siteDescription?: Prisma.SortOrder;
    contactEmail?: Prisma.SortOrder;
    contactPhone?: Prisma.SortOrder;
    contactAddress?: Prisma.SortOrder;
    socialInstagram?: Prisma.SortOrder;
    socialTiktok?: Prisma.SortOrder;
    socialFacebook?: Prisma.SortOrder;
    socialWhatsapp?: Prisma.SortOrder;
    shippingOriginCityId?: Prisma.SortOrder;
    taxRate?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    maintenanceMode?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SiteSettingsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    siteName?: Prisma.SortOrder;
    siteDescription?: Prisma.SortOrder;
    contactEmail?: Prisma.SortOrder;
    contactPhone?: Prisma.SortOrder;
    contactAddress?: Prisma.SortOrder;
    socialInstagram?: Prisma.SortOrder;
    socialTiktok?: Prisma.SortOrder;
    socialFacebook?: Prisma.SortOrder;
    socialWhatsapp?: Prisma.SortOrder;
    shippingOriginCityId?: Prisma.SortOrder;
    taxRate?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    maintenanceMode?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SiteSettingsSumOrderByAggregateInput = {
    taxRate?: Prisma.SortOrder;
};
export type SiteSettingsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    siteName?: boolean;
    siteDescription?: boolean;
    contactEmail?: boolean;
    contactPhone?: boolean;
    contactAddress?: boolean;
    socialInstagram?: boolean;
    socialTiktok?: boolean;
    socialFacebook?: boolean;
    socialWhatsapp?: boolean;
    shippingOriginCityId?: boolean;
    taxRate?: boolean;
    currency?: boolean;
    maintenanceMode?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["siteSettings"]>;
export type SiteSettingsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    siteName?: boolean;
    siteDescription?: boolean;
    contactEmail?: boolean;
    contactPhone?: boolean;
    contactAddress?: boolean;
    socialInstagram?: boolean;
    socialTiktok?: boolean;
    socialFacebook?: boolean;
    socialWhatsapp?: boolean;
    shippingOriginCityId?: boolean;
    taxRate?: boolean;
    currency?: boolean;
    maintenanceMode?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["siteSettings"]>;
export type SiteSettingsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    siteName?: boolean;
    siteDescription?: boolean;
    contactEmail?: boolean;
    contactPhone?: boolean;
    contactAddress?: boolean;
    socialInstagram?: boolean;
    socialTiktok?: boolean;
    socialFacebook?: boolean;
    socialWhatsapp?: boolean;
    shippingOriginCityId?: boolean;
    taxRate?: boolean;
    currency?: boolean;
    maintenanceMode?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["siteSettings"]>;
export type SiteSettingsSelectScalar = {
    id?: boolean;
    siteName?: boolean;
    siteDescription?: boolean;
    contactEmail?: boolean;
    contactPhone?: boolean;
    contactAddress?: boolean;
    socialInstagram?: boolean;
    socialTiktok?: boolean;
    socialFacebook?: boolean;
    socialWhatsapp?: boolean;
    shippingOriginCityId?: boolean;
    taxRate?: boolean;
    currency?: boolean;
    maintenanceMode?: boolean;
    updatedAt?: boolean;
};
export type SiteSettingsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "siteName" | "siteDescription" | "contactEmail" | "contactPhone" | "contactAddress" | "socialInstagram" | "socialTiktok" | "socialFacebook" | "socialWhatsapp" | "shippingOriginCityId" | "taxRate" | "currency" | "maintenanceMode" | "updatedAt", ExtArgs["result"]["siteSettings"]>;
export type $SiteSettingsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "SiteSettings";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        siteName: string;
        siteDescription: string | null;
        contactEmail: string | null;
        contactPhone: string | null;
        contactAddress: string | null;
        socialInstagram: string | null;
        socialTiktok: string | null;
        socialFacebook: string | null;
        socialWhatsapp: string | null;
        shippingOriginCityId: string | null;
        taxRate: runtime.Decimal;
        currency: string;
        maintenanceMode: boolean;
        updatedAt: Date;
    }, ExtArgs["result"]["siteSettings"]>;
    composites: {};
};
export type SiteSettingsGetPayload<S extends boolean | null | undefined | SiteSettingsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SiteSettingsPayload, S>;
export type SiteSettingsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SiteSettingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SiteSettingsCountAggregateInputType | true;
};
export interface SiteSettingsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['SiteSettings'];
        meta: {
            name: 'SiteSettings';
        };
    };
    findUnique<T extends SiteSettingsFindUniqueArgs>(args: Prisma.SelectSubset<T, SiteSettingsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SiteSettingsClient<runtime.Types.Result.GetResult<Prisma.$SiteSettingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SiteSettingsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SiteSettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SiteSettingsClient<runtime.Types.Result.GetResult<Prisma.$SiteSettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SiteSettingsFindFirstArgs>(args?: Prisma.SelectSubset<T, SiteSettingsFindFirstArgs<ExtArgs>>): Prisma.Prisma__SiteSettingsClient<runtime.Types.Result.GetResult<Prisma.$SiteSettingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SiteSettingsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SiteSettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SiteSettingsClient<runtime.Types.Result.GetResult<Prisma.$SiteSettingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SiteSettingsFindManyArgs>(args?: Prisma.SelectSubset<T, SiteSettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SiteSettingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SiteSettingsCreateArgs>(args: Prisma.SelectSubset<T, SiteSettingsCreateArgs<ExtArgs>>): Prisma.Prisma__SiteSettingsClient<runtime.Types.Result.GetResult<Prisma.$SiteSettingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SiteSettingsCreateManyArgs>(args?: Prisma.SelectSubset<T, SiteSettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends SiteSettingsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SiteSettingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SiteSettingsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends SiteSettingsDeleteArgs>(args: Prisma.SelectSubset<T, SiteSettingsDeleteArgs<ExtArgs>>): Prisma.Prisma__SiteSettingsClient<runtime.Types.Result.GetResult<Prisma.$SiteSettingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SiteSettingsUpdateArgs>(args: Prisma.SelectSubset<T, SiteSettingsUpdateArgs<ExtArgs>>): Prisma.Prisma__SiteSettingsClient<runtime.Types.Result.GetResult<Prisma.$SiteSettingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SiteSettingsDeleteManyArgs>(args?: Prisma.SelectSubset<T, SiteSettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SiteSettingsUpdateManyArgs>(args: Prisma.SelectSubset<T, SiteSettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends SiteSettingsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SiteSettingsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SiteSettingsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends SiteSettingsUpsertArgs>(args: Prisma.SelectSubset<T, SiteSettingsUpsertArgs<ExtArgs>>): Prisma.Prisma__SiteSettingsClient<runtime.Types.Result.GetResult<Prisma.$SiteSettingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SiteSettingsCountArgs>(args?: Prisma.Subset<T, SiteSettingsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SiteSettingsCountAggregateOutputType> : number>;
    aggregate<T extends SiteSettingsAggregateArgs>(args: Prisma.Subset<T, SiteSettingsAggregateArgs>): Prisma.PrismaPromise<GetSiteSettingsAggregateType<T>>;
    groupBy<T extends SiteSettingsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SiteSettingsGroupByArgs['orderBy'];
    } : {
        orderBy?: SiteSettingsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SiteSettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSiteSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SiteSettingsFieldRefs;
}
export interface Prisma__SiteSettingsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SiteSettingsFieldRefs {
    readonly id: Prisma.FieldRef<"SiteSettings", 'String'>;
    readonly siteName: Prisma.FieldRef<"SiteSettings", 'String'>;
    readonly siteDescription: Prisma.FieldRef<"SiteSettings", 'String'>;
    readonly contactEmail: Prisma.FieldRef<"SiteSettings", 'String'>;
    readonly contactPhone: Prisma.FieldRef<"SiteSettings", 'String'>;
    readonly contactAddress: Prisma.FieldRef<"SiteSettings", 'String'>;
    readonly socialInstagram: Prisma.FieldRef<"SiteSettings", 'String'>;
    readonly socialTiktok: Prisma.FieldRef<"SiteSettings", 'String'>;
    readonly socialFacebook: Prisma.FieldRef<"SiteSettings", 'String'>;
    readonly socialWhatsapp: Prisma.FieldRef<"SiteSettings", 'String'>;
    readonly shippingOriginCityId: Prisma.FieldRef<"SiteSettings", 'String'>;
    readonly taxRate: Prisma.FieldRef<"SiteSettings", 'Decimal'>;
    readonly currency: Prisma.FieldRef<"SiteSettings", 'String'>;
    readonly maintenanceMode: Prisma.FieldRef<"SiteSettings", 'Boolean'>;
    readonly updatedAt: Prisma.FieldRef<"SiteSettings", 'DateTime'>;
}
export type SiteSettingsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSettingsSelect<ExtArgs> | null;
    omit?: Prisma.SiteSettingsOmit<ExtArgs> | null;
    where: Prisma.SiteSettingsWhereUniqueInput;
};
export type SiteSettingsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSettingsSelect<ExtArgs> | null;
    omit?: Prisma.SiteSettingsOmit<ExtArgs> | null;
    where: Prisma.SiteSettingsWhereUniqueInput;
};
export type SiteSettingsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSettingsSelect<ExtArgs> | null;
    omit?: Prisma.SiteSettingsOmit<ExtArgs> | null;
    where?: Prisma.SiteSettingsWhereInput;
    orderBy?: Prisma.SiteSettingsOrderByWithRelationInput | Prisma.SiteSettingsOrderByWithRelationInput[];
    cursor?: Prisma.SiteSettingsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SiteSettingsScalarFieldEnum | Prisma.SiteSettingsScalarFieldEnum[];
};
export type SiteSettingsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSettingsSelect<ExtArgs> | null;
    omit?: Prisma.SiteSettingsOmit<ExtArgs> | null;
    where?: Prisma.SiteSettingsWhereInput;
    orderBy?: Prisma.SiteSettingsOrderByWithRelationInput | Prisma.SiteSettingsOrderByWithRelationInput[];
    cursor?: Prisma.SiteSettingsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SiteSettingsScalarFieldEnum | Prisma.SiteSettingsScalarFieldEnum[];
};
export type SiteSettingsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSettingsSelect<ExtArgs> | null;
    omit?: Prisma.SiteSettingsOmit<ExtArgs> | null;
    where?: Prisma.SiteSettingsWhereInput;
    orderBy?: Prisma.SiteSettingsOrderByWithRelationInput | Prisma.SiteSettingsOrderByWithRelationInput[];
    cursor?: Prisma.SiteSettingsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SiteSettingsScalarFieldEnum | Prisma.SiteSettingsScalarFieldEnum[];
};
export type SiteSettingsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSettingsSelect<ExtArgs> | null;
    omit?: Prisma.SiteSettingsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SiteSettingsCreateInput, Prisma.SiteSettingsUncheckedCreateInput>;
};
export type SiteSettingsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SiteSettingsCreateManyInput | Prisma.SiteSettingsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SiteSettingsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSettingsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SiteSettingsOmit<ExtArgs> | null;
    data: Prisma.SiteSettingsCreateManyInput | Prisma.SiteSettingsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SiteSettingsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSettingsSelect<ExtArgs> | null;
    omit?: Prisma.SiteSettingsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SiteSettingsUpdateInput, Prisma.SiteSettingsUncheckedUpdateInput>;
    where: Prisma.SiteSettingsWhereUniqueInput;
};
export type SiteSettingsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SiteSettingsUpdateManyMutationInput, Prisma.SiteSettingsUncheckedUpdateManyInput>;
    where?: Prisma.SiteSettingsWhereInput;
    limit?: number;
};
export type SiteSettingsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSettingsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SiteSettingsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SiteSettingsUpdateManyMutationInput, Prisma.SiteSettingsUncheckedUpdateManyInput>;
    where?: Prisma.SiteSettingsWhereInput;
    limit?: number;
};
export type SiteSettingsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSettingsSelect<ExtArgs> | null;
    omit?: Prisma.SiteSettingsOmit<ExtArgs> | null;
    where: Prisma.SiteSettingsWhereUniqueInput;
    create: Prisma.XOR<Prisma.SiteSettingsCreateInput, Prisma.SiteSettingsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SiteSettingsUpdateInput, Prisma.SiteSettingsUncheckedUpdateInput>;
};
export type SiteSettingsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSettingsSelect<ExtArgs> | null;
    omit?: Prisma.SiteSettingsOmit<ExtArgs> | null;
    where: Prisma.SiteSettingsWhereUniqueInput;
};
export type SiteSettingsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SiteSettingsWhereInput;
    limit?: number;
};
export type SiteSettingsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SiteSettingsSelect<ExtArgs> | null;
    omit?: Prisma.SiteSettingsOmit<ExtArgs> | null;
};
