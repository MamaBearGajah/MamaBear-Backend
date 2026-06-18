import { PrismaService } from '../prisma/prisma.service';
import { CacheService } from '../cache/cache.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
export declare class BannerService {
    private readonly prisma;
    private readonly cache;
    private readonly logger;
    constructor(prisma: PrismaService, cache: CacheService);
    getActiveBanners(): Promise<any[]>;
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
    findOne(id: string): Promise<{
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
    private invalidateCache;
}
