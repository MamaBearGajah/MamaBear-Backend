import { PrismaService } from "../prisma/prisma.service";
import { CacheService } from "../cache/cache.service";
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryQueryDto } from './dto/category-query.dto';
import { ProductQueryDto } from "../products/dto/product-query.dto";
export declare class CategoriesService {
    private readonly prisma;
    private readonly cache;
    constructor(prisma: PrismaService, cache: CacheService);
    private slugify;
    findAll(query: CategoryQueryDto): Promise<{}>;
    findOne(id: string): Promise<{}>;
    getBreadcrumb(id: string): Promise<{
        id: string;
        name: string;
        slug: string;
    }[]>;
    create(dto: CreateCategoryDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string | null;
        isActive: boolean;
        sortOrder: number;
        parentId: string | null;
        slug: string;
        description: string | null;
    }>;
    update(id: string, dto: UpdateCategoryDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string | null;
        isActive: boolean;
        sortOrder: number;
        parentId: string | null;
        slug: string;
        description: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string | null;
        isActive: boolean;
        sortOrder: number;
        parentId: string | null;
        slug: string;
        description: string | null;
    }>;
    findProducts(id: string, query: ProductQueryDto): Promise<{}>;
    private getAllDescendantIds;
    private invalidateCategoryCache;
}
