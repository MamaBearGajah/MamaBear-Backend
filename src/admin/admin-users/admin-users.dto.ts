import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// Pakai string literal type — bukan Role.admin/Role.super_admin
// karena Prisma generated Role adalah union type, bukan enum object
type AdminRole = 'admin' | 'super_admin';

export class CreateAdminUserDto {
  @ApiProperty({ example: 'Budi Admin', description: 'Nama admin baru' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'budi@mamabear.id', description: 'Email admin baru' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'Password123!', description: 'Password minimal 8 karakter' })
  @IsString()
  @MinLength(8)
  password!: string;

  @ApiPropertyOptional({ enum: ['admin', 'super_admin'], default: 'admin' })
  @IsOptional()
  @IsEnum(['admin', 'super_admin'])
  role?: AdminRole;
}

export class UpdateAdminUserRoleDto {
  @ApiProperty({ enum: ['admin', 'super_admin'] })
  @IsEnum(['admin', 'super_admin'])
  role!: AdminRole;
}
