import { SiteSettingsService } from './site-settings.service';
import { UpdateSiteSettingsDto } from './dto/update-site-settings.dto';
export declare class SiteSettingsController {
    private readonly siteSettingsService;
    constructor(siteSettingsService: SiteSettingsService);
    get(): Promise<{
        id: string;
        updatedAt: Date;
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
        taxRate: import("@prisma/client-runtime-utils").Decimal;
        currency: string;
        maintenanceMode: boolean;
    }>;
    update(dto: UpdateSiteSettingsDto): Promise<{
        message: string;
        data: {
            id: string;
            updatedAt: Date;
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
            taxRate: import("@prisma/client-runtime-utils").Decimal;
            currency: string;
            maintenanceMode: boolean;
        };
    }>;
}
