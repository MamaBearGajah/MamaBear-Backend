import { Transform } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateImageDto {
    @IsString()
    imageUrl!: string

    @IsString()
    @IsOptional()
    altText?: string

    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @IsOptional()
    sortOrder?: number
    
    @IsBoolean()
    @IsOptional()
    isFeatured?: boolean
}