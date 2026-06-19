import { PrismaService } from '../prisma/prisma.service';
import { CacheService } from '../cache/cache.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { BlogStatus } from '../../generated/prisma/enums';
declare const UpdateBlogDto_base: import("@nestjs/common").Type<Partial<CreateBlogDto>>;
export declare class UpdateBlogDto extends UpdateBlogDto_base {
}
export declare class BlogService {
    private readonly prisma;
    private readonly cache;
    constructor(prisma: PrismaService, cache: CacheService);
    private readonly publicSelect;
    findAll(page?: number, limit?: number): Promise<any>;
    findBySlug(slug: string): Promise<any>;
    findAllAdmin(page?: number, limit?: number): Promise<{
        data: ({
            author: {
                id: string;
                name: string;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            slug: string;
            status: BlogStatus;
            authorId: string | null;
            excerpt: string | null;
            coverImage: string | null;
            coverPublicId: string | null;
            content: string;
            viewCount: number;
            publishedAt: Date | null;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    create(authorId: string, dto: CreateBlogDto): Promise<{
        author: {
            id: string;
            name: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        slug: string;
        status: BlogStatus;
        authorId: string | null;
        excerpt: string | null;
        coverImage: string | null;
        coverPublicId: string | null;
        content: string;
        viewCount: number;
        publishedAt: Date | null;
    }>;
    update(id: string, dto: UpdateBlogDto): Promise<{
        author: {
            id: string;
            name: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        slug: string;
        status: BlogStatus;
        authorId: string | null;
        excerpt: string | null;
        coverImage: string | null;
        coverPublicId: string | null;
        content: string;
        viewCount: number;
        publishedAt: Date | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    private invalidateCache;
}
export {};
