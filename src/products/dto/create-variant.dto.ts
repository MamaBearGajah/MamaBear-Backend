import { IsBoolean, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateVariantDto {
    @IsString()
    name: string

    @IsString()
    value: string

    @IsString()
    @IsOptional()
    imageUrl?: string
    
    @IsNumber()
    @IsOptional()
    priceAdjustment?: number
    
    @IsNumber()
    @Min(0)
    stock: number

    @IsString()
    @IsOptional()
    sku?: string

    @IsBoolean()
    @IsOptional()
    isActive?: boolean
}