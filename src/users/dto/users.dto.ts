import {
  IsString,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  MinLength,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiPropertyOptional({ description: 'Full name', example: 'Budi Santoso' })
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  name?: string;

  @ApiPropertyOptional({ description: 'Indonesian phone number', example: '081234567890' })
  @IsOptional()
  @IsPhoneNumber('ID', { message: 'Format nomor telepon tidak valid' })
  phone?: string;
}

export class ChangePasswordDto {
  @ApiProperty({ description: 'Current password', example: 'OldPassword123!' })
  @IsString()
  @IsNotEmpty({ message: 'Password lama tidak boleh kosong' })
  oldPassword!: string;

  @ApiProperty({ description: 'New password (minimum 8 characters)', example: 'NewPassword123!' })
  @IsString()
  @MinLength(8, { message: 'Password baru minimal 8 karakter' })
  newPassword!: string;
}

export class CreateAddressDto {
  @ApiPropertyOptional({ description: 'Address label', example: 'Rumah' })
  @IsOptional()
  @IsString()
  label?: string;

  @ApiProperty({ description: 'Receiver full name', example: 'Budi Santoso' })
  @IsString()
  @IsNotEmpty({ message: 'Nama penerima tidak boleh kosong' })
  receiverName!: string;

  @ApiProperty({ description: 'Receiver phone number', example: '081234567890' })
  @IsPhoneNumber('ID', { message: 'Format nomor telepon tidak valid' })
  phone!: string;

  @ApiProperty({ description: 'Street address', example: 'Jl. Sudirman No. 1' })
  @IsString()
  @IsNotEmpty({ message: 'Alamat tidak boleh kosong' })
  address!: string;

  @ApiProperty({ description: 'Raja Ongkir city ID', example: '501' })
  @IsString()
  @IsNotEmpty({ message: 'cityId tidak boleh kosong' })
  cityId!: string;

  @ApiProperty({ description: 'Raja Ongkir province ID', example: '9' })
  @IsString()
  @IsNotEmpty({ message: 'provinceId tidak boleh kosong' })
  provinceId!: string;

  @ApiProperty({ description: 'Postal code', example: '12190' })
  @IsString()
  @IsNotEmpty({ message: 'Kode pos tidak boleh kosong' })
  postalCode!: string;
}

export class UpdateAddressDto {
  @ApiPropertyOptional({ description: 'Address label', example: 'Kantor' })
  @IsOptional()
  @IsString()
  label?: string;

  @ApiPropertyOptional({ description: 'Receiver full name', example: 'Budi Santoso' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  receiverName?: string;

  @ApiPropertyOptional({ description: 'Receiver phone number', example: '081234567890' })
  @IsOptional()
  @IsPhoneNumber('ID', { message: 'Format nomor telepon tidak valid' })
  phone?: string;

  @ApiPropertyOptional({ description: 'Street address', example: 'Jl. Gatot Subroto No. 5' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  address?: string;

  @ApiPropertyOptional({ description: 'Raja Ongkir city ID', example: '152' })
  @IsOptional()
  @IsString()
  cityId?: string;

  @ApiPropertyOptional({ description: 'Raja Ongkir province ID', example: '6' })
  @IsOptional()
  @IsString()
  provinceId?: string;

  @ApiPropertyOptional({ description: 'Postal code', example: '40132' })
  @IsOptional()
  @IsString()
  postalCode?: string;
}
