import { BlogStatus } from '../../../generated/prisma/enums';
export declare class CreateBlogDto {
    title: string;
    slug: string;
    excerpt?: string;
    coverImage?: string;
    coverPublicId?: string;
    content: string;
    status?: BlogStatus;
}
