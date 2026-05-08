import {
  IsString,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  MinLength,
  IsNotEmpty,
} from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  name?: string;

  @IsOptional()
  @IsPhoneNumber('ID', { message: 'Format nomor telepon tidak valid' })
  phone?: string;
}

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty({ message: 'Password lama tidak boleh kosong' })
  oldPassword!: string;

  @IsString()
  @MinLength(8, { message: 'Password baru minimal 8 karakter' })
  newPassword!: string;
}

export class CreateAddressDto {
  @IsOptional()
  @IsString()
  label?: string;

  @IsString()
  @IsNotEmpty({ message: 'Nama penerima tidak boleh kosong' })
  receiverName!: string;

  @IsPhoneNumber('ID', { message: 'Format nomor telepon tidak valid' })
  phone!: string;

  @IsString()
  @IsNotEmpty({ message: 'Alamat tidak boleh kosong' })
  address!: string;

  @IsString()
  @IsNotEmpty({ message: 'cityId tidak boleh kosong' })
  cityId!: string;

  @IsString()
  @IsNotEmpty({ message: 'provinceId tidak boleh kosong' })
  provinceId!: string;

  @IsString()
  @IsNotEmpty({ message: 'Kode pos tidak boleh kosong' })
  postalCode!: string;
}

export class UpdateAddressDto {
  @IsOptional()
  @IsString()
  label?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  receiverName?: string;

  @IsOptional()
  @IsPhoneNumber('ID', { message: 'Format nomor telepon tidak valid' })
  phone?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  address?: string;

  @IsOptional()
  @IsString()
  cityId?: string;

  @IsOptional()
  @IsString()
  provinceId?: string;

  @IsOptional()
  @IsString()
  postalCode?: string;
}