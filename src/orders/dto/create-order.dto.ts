import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOrderDto {
    @ApiProperty({ example: 'uuid-address', description: 'ID address pengiriman' })
    @IsUUID()
    @IsNotEmpty()
    addressId!: string

    @ApiProperty({ example: 'JNE', description: 'Kode kurir' })
    @IsString()
    @IsNotEmpty()
    courier!: string
    
    @ApiProperty({ example: 'REG', description: 'Kode service kurir' })
    @IsString()
    @IsNotEmpty()
    service!: string

    @ApiProperty({ example: 'bank-transfer', description: 'Metode pembayaran' })
    @IsString()
    @IsNotEmpty()
    paymentMethod!: string

    @ApiPropertyOptional({ example: 'Tolong dibungkus rapi', description: 'Catatan order' })    
    @IsOptional()
    @IsNotEmpty()
    notes?: string

    @ApiPropertyOptional({ example: 'uuid-voucher', description: 'ID voucher (opsional)' })
    @IsOptional()
    @IsUUID()
    voucherId?: string
}
