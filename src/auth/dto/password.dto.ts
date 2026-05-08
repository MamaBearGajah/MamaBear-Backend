import { IsEmail, IsHexadecimal, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ForgotPasswordDto {
  @IsEmail({}, { message: 'Format email tidak valid' })
  @IsNotEmpty({ message: 'Email tidak boleh kosong' })
  email!: string;
}

export class ResendVerificationDto {
  @IsEmail({}, { message: 'Format email tidak valid' })
  @IsNotEmpty({ message: 'Email tidak boleh kosong' })
  email!: string;
}

export class ResetPasswordDto {
  @IsHexadecimal()
  @IsNotEmpty({ message: 'Token tidak boleh kosong' })
  token!: string;

  @IsString()
  @MinLength(8, { message: 'Password minimal 8 karakter' })
  newPassword!: string;
}