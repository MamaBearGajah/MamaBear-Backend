import {
  IsString,
  IsOptional,
  IsPhoneNumber,
  MinLength,
  IsNotEmpty,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiPropertyOptional({
    example: 'John Doe',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  name?: string;

  @ApiPropertyOptional({
    example: '08123456789',
  })
  @IsOptional()
  @IsPhoneNumber('ID', { message: 'Format nomor telepon tidak valid' })
  phone?: string;
}

export class ChangePasswordDto {
  @ApiProperty({
    example: 'passwordLama123',
  })
  @IsString()
  @IsNotEmpty({ message: 'Password lama tidak boleh kosong' })
  oldPassword!: string;

  @ApiProperty({
    example: 'passwordBaru123',
    minLength: 8,
  })
  @IsString()
  @MinLength(8, { message: 'Password baru minimal 8 karakter' })
  newPassword!: string;
}

export class CreateAddressDto {
  @ApiPropertyOptional({
    example: 'Rumah',
  })
  @IsOptional()
  @IsString()
  label?: string;

  @ApiProperty({
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty({ message: 'Nama penerima tidak boleh kosong' })
  receiverName!: string;

  @ApiProperty({
    example: '08123456789',
  })
  @IsPhoneNumber('ID', { message: 'Format nomor telepon tidak valid' })
  phone!: string;

  @ApiProperty({
    example: 'Jl. Mawar No. 1',
  })
  @IsString()
  @IsNotEmpty({ message: 'Alamat tidak boleh kosong' })
  address!: string;

  @ApiProperty({
    example: '501',
  })
  @IsString()
  @IsNotEmpty({ message: 'cityId tidak boleh kosong' })
  cityId!: string;

  @ApiProperty({
    example: '15',
  })
  @IsString()
  @IsNotEmpty({ message: 'provinceId tidak boleh kosong' })
  provinceId!: string;

  @ApiProperty({
    example: '60111',
  })
  @IsString()
  @IsNotEmpty({ message: 'Kode pos tidak boleh kosong' })
  postalCode!: string;
}

export class UpdateAddressDto {
  @ApiPropertyOptional({
    example: 'Kantor',
  })
  @IsOptional()
  @IsString()
  label?: string;

  @ApiPropertyOptional({
    example: 'John Doe',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  receiverName?: string;

  @ApiPropertyOptional({
    example: '08123456789',
  })
  @IsOptional()
  @IsPhoneNumber('ID', { message: 'Format nomor telepon tidak valid' })
  phone?: string;

  @ApiPropertyOptional({
    example: 'Jl. Melati No. 2',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  address?: string;

  @ApiPropertyOptional({
    example: '501',
  })
  @IsOptional()
  @IsString()
  cityId?: string;

  @ApiPropertyOptional({
    example: '15',
  })
  @IsOptional()
  @IsString()
  provinceId?: string;

  @ApiPropertyOptional({
    example: '60111',
  })
  @IsOptional()
  @IsString()
  postalCode?: string;
}