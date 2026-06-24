import {
  IsString,
  IsOptional,
  IsBoolean,
  IsNotEmpty,
  MinLength,
  Matches,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: 'John Doe' })
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  name?: string;

  @ApiPropertyOptional({ example: '08123456789' })
  @IsOptional()
  @IsString()
  // FIX: ganti @IsPhoneNumber('ID') yang strict (butuh +62) dengan regex
  // agar format lokal Indonesia (08xx) juga diterima
  @Matches(/^(\+62|62|0)[0-9]{8,13}$/, {
    message: 'Format nomor telepon tidak valid (contoh: 08123456789 atau +6281234567890)',
  })
  phone?: string;
}

export class ChangePasswordDto {
  @ApiProperty({ example: 'passwordLama123' })
  @IsString()
  @IsNotEmpty({ message: 'Password lama tidak boleh kosong' })
  oldPassword!: string;

  @ApiProperty({ example: 'passwordBaru123', minLength: 8 })
  @IsString()
  @MinLength(8, { message: 'Password baru minimal 8 karakter' })
  newPassword!: string;
}

export class CreateAddressDto {
  @ApiPropertyOptional({ example: 'Rumah' })
  @IsOptional()
  @IsString()
  label?: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty({ message: 'Nama penerima tidak boleh kosong' })
  receiverName!: string;

  @ApiProperty({ example: '08123456789' })
  @IsString()
  // FIX: sama seperti di atas — terima format lokal 08xx
  @Matches(/^(\+62|62|0)[0-9]{8,13}$/, {
    message: 'Format nomor telepon tidak valid (contoh: 08123456789 atau +6281234567890)',
  })
  phone!: string;

  @ApiProperty({ example: 'Jl. Mawar No. 1' })
  @IsString()
  @IsNotEmpty({ message: 'Alamat tidak boleh kosong' })
  address!: string;

  @ApiPropertyOptional({ example: 'Patokan: rumah cat hijau, sebelah warung Bu Siti' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ example: '501' })
  @IsString()
  @IsNotEmpty({ message: 'cityId tidak boleh kosong' })
  cityId!: string;

  @ApiProperty({ example: '15' })
  @IsString()
  @IsNotEmpty({ message: 'provinceId tidak boleh kosong' })
  provinceId!: string;

  @ApiProperty({ example: '60111' })
  @IsString()
  @IsNotEmpty({ message: 'Kode pos tidak boleh kosong' })
  postalCode!: string;

  // FIX: tambahkan isDefault agar tidak ditolak forbidNonWhitelisted
  // Service tetap yang memutuskan nilai akhirnya (lihat users.service.ts)
  @ApiPropertyOptional({
    example: false,
    description: 'Jadikan alamat default. Jika ini alamat pertama, otomatis jadi default.',
  })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}

export class UpdateAddressDto {
  @ApiPropertyOptional({ example: 'Kantor' })
  @IsOptional()
  @IsString()
  label?: string;

  @ApiPropertyOptional({ example: 'John Doe' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  receiverName?: string;

  @ApiPropertyOptional({ example: '08123456789' })
  @IsOptional()
  @IsString()
  @Matches(/^(\+62|62|0)[0-9]{8,13}$/, {
    message: 'Format nomor telepon tidak valid (contoh: 08123456789 atau +6281234567890)',
  })
  phone?: string;

  @ApiPropertyOptional({ example: 'Jl. Melati No. 2' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  address?: string;

  @ApiPropertyOptional({ example: 'Patokan: rumah cat hijau, sebelah warung Bu Siti' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ example: '501' })
  @IsOptional()
  @IsString()
  cityId?: string;

  @ApiPropertyOptional({ example: '15' })
  @IsOptional()
  @IsString()
  provinceId?: string;

  @ApiPropertyOptional({ example: '60111' })
  @IsOptional()
  @IsString()
  postalCode?: string;

  // FIX: tambahkan isDefault agar PATCH juga bisa set default
  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}