import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateOrderDto {
    @IsUUID()
    @IsNotEmpty()
    addressId!: string

    @IsString()
    @IsNotEmpty()
    courier!: string
    
    @IsString()
    @IsNotEmpty()
    service!: string

    @IsString()
    @IsNotEmpty()
    paymentMethod!: string

    @IsOptional()
    @IsNotEmpty()
    notes?: string

    @IsOptional()
    @IsUUID()
    voucherId?: string
}
