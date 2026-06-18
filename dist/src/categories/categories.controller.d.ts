import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryQueryDto } from './dto/category-query.dto';
import { ProductQueryDto } from "../products/dto/product-query.dto";
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    findAll(query: CategoryQueryDto): Promise<{}>;
    getBreadcrumb(id: string): Promise<{
        id: string;
        name: string;
        slug: string;
    }[]>;
    findProducts(id: string, query: ProductQueryDto): Promise<{}>;
    findOne(id: string): Promise<{}>;
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
}
