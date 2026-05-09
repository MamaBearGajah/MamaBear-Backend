import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductQueryDto {
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    page?: number = 1

    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    limit?: number = 20

    @IsString()
    @IsOptional()
    q?: string

    @IsString()
    @IsOptional()
    categoryId?: string

    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    minPrice?: number

    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    maxPrice?: number

    @Transform(({ value }) => value === true)
    @IsBoolean()
    @IsOptional()
    inStock?: boolean

    @IsString()
    @IsOptional()
    sortBy?: string = 'createdAt'

    @IsString()
    @IsOptional()
    @IsIn(['asc', 'desc'])
    sortOrder?: 'asc' | 'desc' = 'desc'
}