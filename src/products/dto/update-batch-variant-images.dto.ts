import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsString, IsUUID, ValidateNested } from "class-validator";

class VariantImageItem {
    @IsUUID()
    @IsNotEmpty()
    variantId!: string

    @IsString()
    @IsNotEmpty()
    imageUrl!: string
}

export class UpdateVariantImagesBatchDto {
    @Type(()=> VariantImageItem)
    @IsArray()
    @ValidateNested({ each: true })
    variants!: VariantImageItem[]
}

