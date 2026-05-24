import { IsEmail, IsHexadecimal, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({ description: 'Registered email address', example: 'budi@example.com' })
  @IsEmail({}, { message: 'Format email tidak valid' })
  @IsNotEmpty({ message: 'Email tidak boleh kosong' })
  email!: string;
}

export class ResendVerificationDto {
  @ApiProperty({ description: 'Registered email address to resend verification to', example: 'budi@example.com' })
  @IsEmail({}, { message: 'Format email tidak valid' })
  @IsNotEmpty({ message: 'Email tidak boleh kosong' })
  email!: string;
}

export class ResetPasswordDto {
  @ApiProperty({ description: 'Reset token received via email', example: 'a1b2c3d4e5f6...' })
  @IsHexadecimal()
  @IsNotEmpty({ message: 'Token tidak boleh kosong' })
  token!: string;

  @ApiProperty({ description: 'New password (minimum 8 characters)', example: 'NewPassword123!' })
  @IsString()
  @MinLength(8, { message: 'Password minimal 8 karakter' })
  newPassword!: string;
}
