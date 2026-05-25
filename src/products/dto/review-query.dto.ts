import { Type } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from "class-validator";

export class ReviewQueryDto {
    @Type(() => Number)
    @IsInt()
    @IsOptional()
    @Min(1)
    page?: number = 1

    @Type(() => Number)
    @IsInt()
    @IsOptional()
    limit?: number = 10

    @Type(() => Number)
    @IsInt()
    @IsOptional()
    @Min(1)
    @Max(5)
    rating?: number

    @IsString()
    @IsOptional()
    sortBy?: string = 'createdAt'

    @IsIn(['asc', 'desc'])
    @IsOptional()
    sortOrder?: 'asc' | 'desc' = 'desc'
}