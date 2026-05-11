import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsHexadecimal, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({ example: 'jane@example.com' })
  @IsEmail({}, { message: 'Format email tidak valid' })
  @IsNotEmpty({ message: 'Email tidak boleh kosong' })
  email!: string;
}

export class ResendVerificationDto {
  @ApiProperty({ example: 'jane@example.com' })
  @IsEmail({}, { message: 'Format email tidak valid' })
  @IsNotEmpty({ message: 'Email tidak boleh kosong' })
  email!: string;
}

export class ResetPasswordDto {
  @ApiProperty({ example: 'a1b2c3d4e5f6...' })
  @IsHexadecimal()
  @IsNotEmpty()
  token!: string;

  @ApiProperty({ example: 'newSecret123', minLength: 8 })
  @IsString()
  @MinLength(8)
  newPassword!: string;
}