import { CreateVariantDto } from './create-variant.dto';
import { CreateImageDto } from './create-image.dto';
declare enum ProductStatus {
    active = "active",
    inactive = "inactive",
    draft = "draft"
}
export declare class CreateProductDto {
    name: string;
    slug: string;
    description?: string;
    basePrice: number;
    discountPrice?: number;
    weight: number;
    sku: string;
    stock: number;
    mainImage: string;
    status: ProductStatus;
    categoryId?: string;
    images?: CreateImageDto[];
    variants?: CreateVariantDto[];
}
export {};
