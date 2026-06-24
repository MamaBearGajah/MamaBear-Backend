import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '../../../generated/prisma/enums';

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

  @ApiPropertyOptional({ enum: [Role.admin, Role.super_admin], default: Role.admin })
  @IsOptional()
  @IsEnum([Role.admin, Role.super_admin])
  role?: Role.admin | Role.super_admin;
}

export class UpdateAdminUserRoleDto {
  @ApiProperty({ enum: [Role.admin, Role.super_admin] })
  @IsEnum([Role.admin, Role.super_admin])
  role!: Role.admin | Role.super_admin;
}
