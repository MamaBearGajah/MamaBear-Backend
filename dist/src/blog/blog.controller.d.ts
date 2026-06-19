import { BlogService, UpdateBlogDto } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
export declare class BlogController {
    private readonly blogService;
    constructor(blogService: BlogService);
    findAll(page: number, limit: number): Promise<any>;
    findAllAdmin(page: number, limit: number): Promise<{
        data: ({
            author: {
                id: string;
                name: string;
            } | null;
        } & {
            id: string;
            title: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            authorId: string | null;
            excerpt: string | null;
            coverImage: string | null;
            coverPublicId: string | null;
            content: string;
            status: import("../../generated/prisma/enums").BlogStatus;
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
    findBySlug(slug: string): Promise<any>;
    create(authorId: string, dto: CreateBlogDto): Promise<{
        author: {
            id: string;
            name: string;
        } | null;
    } & {
        id: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        authorId: string | null;
        excerpt: string | null;
        coverImage: string | null;
        coverPublicId: string | null;
        content: string;
        status: import("../../generated/prisma/enums").BlogStatus;
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
        title: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        authorId: string | null;
        excerpt: string | null;
        coverImage: string | null;
        coverPublicId: string | null;
        content: string;
        status: import("../../generated/prisma/enums").BlogStatus;
        viewCount: number;
        publishedAt: Date | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
