import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, isNumber, IsNumber, IsOptional, IsString, Min, MinLength, ValidateNested } from "class-validator";
import { CreateVariantDto } from "./create-variant.dto";
import { CreateImageDto } from "./create-image.dto";

enum ProductStatus {
    active = 'active',
    inactive = 'inactive',
    draft = 'draft',
}

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    name!: string

    @IsString()
    @IsNotEmpty()
    slug: string

    @IsString()
    @IsOptional()
    description?: string
    
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    basePrice!: number

    @IsNumber()
    @IsOptional()
    discountPrice?: number

    @IsNumber()
    @Min(1)
    weight: number
    
    @IsString()
    sku: string

    @IsNumber()
    stock: number

    @IsString()
    mainImage: string

    @IsEnum(ProductStatus)
    status: ProductStatus
    
    @IsString()
    @IsOptional()
    categoryId?: string

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateImageDto)
    images?: CreateImageDto[]

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateVariantDto)
    variants?: CreateVariantDto[]
}
