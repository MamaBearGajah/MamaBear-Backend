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
        createdAt: Date;
        updatedAt: Date;
        label: string | null;
        imageUrl: string;
        altText: string | null;
        title: string | null;
        desc: string | null;
        isActive: boolean;
        sortOrder: number;
        startDate: Date | null;
        endDate: Date | null;
    }[]>;
    create(dto: CreateBannerDto): Promise<{
        id: string;
        path: string | null;
        createdAt: Date;
        updatedAt: Date;
        label: string | null;
        imageUrl: string;
        altText: string | null;
        title: string | null;
        desc: string | null;
        isActive: boolean;
        sortOrder: number;
        startDate: Date | null;
        endDate: Date | null;
    }>;
    update(id: string, dto: UpdateBannerDto): Promise<{
        id: string;
        path: string | null;
        createdAt: Date;
        updatedAt: Date;
        label: string | null;
        imageUrl: string;
        altText: string | null;
        title: string | null;
        desc: string | null;
        isActive: boolean;
        sortOrder: number;
        startDate: Date | null;
        endDate: Date | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
