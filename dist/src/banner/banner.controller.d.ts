import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
export declare class BannerController {
    private readonly bannerService;
    constructor(bannerService: BannerService);
    getActiveBanners(): Promise<any[]>;
    findAll(): Promise<{
        id: string;
        path: string | null;
        imageUrl: string;
        altText: string | null;
        label: string | null;
        title: string | null;
        extraText: string | null;
        desc: string | null;
        isActive: boolean;
        sortOrder: number;
        startDate: Date | null;
        endDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    create(dto: CreateBannerDto): Promise<{
        id: string;
        path: string | null;
        imageUrl: string;
        altText: string | null;
        label: string | null;
        title: string | null;
        extraText: string | null;
        desc: string | null;
        isActive: boolean;
        sortOrder: number;
        startDate: Date | null;
        endDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, dto: UpdateBannerDto): Promise<{
        id: string;
        path: string | null;
        imageUrl: string;
        altText: string | null;
        label: string | null;
        title: string | null;
        extraText: string | null;
        desc: string | null;
        isActive: boolean;
        sortOrder: number;
        startDate: Date | null;
        endDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
