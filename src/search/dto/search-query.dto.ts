import { Type } from 'class-transformer';
import {
    IsBoolean,
    IsIn,
    IsNumber,
    IsOptional,
    IsString,
    Min,
} from 'class-validator';

export class SearchQueryDto {
    @IsOptional()
    @IsString()
    q?: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    minPrice?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    maxPrice?: number;

    @IsOptional()
    @IsString()
    categoryId?: string;

    @IsOptional()
    @Type(() => Boolean)
    @IsBoolean()
    inStock?: boolean;

    @IsOptional()
    @IsIn(['asc', 'desc'])
    sort?: 'asc' | 'desc';

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    limit?: number = 10;
}
