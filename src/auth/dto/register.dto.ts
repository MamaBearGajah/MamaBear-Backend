import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password minimal 8 karakter' })
  password!: string;

  @IsOptional()
  @IsString()
  @Matches(/^(\+62|62|0)8[1-9][0-9]{6,10}$/, {
    message: 'Format nomor HP tidak valid',
  })
  phone?: string;
}