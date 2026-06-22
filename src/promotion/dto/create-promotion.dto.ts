// src/promotion/dto/create-promotion.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsISO8601,
  IsArray,
  ValidateNested,
  IsInt,
  Min,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/swagger';

export enum PromotionStatus {
  draft  = 'draft',
  active = 'active',
  ended  = 'ended',
}

export class CreatePromotionSectionDto {
  @ApiProperty({ example: 'Our Hamper Collection' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ example: 'Explore our bundle hampers' })
  @IsOptional()
  @IsString()
  subtitle?: string;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class CreatePromotionBenefitDto {
  @ApiPropertyOptional({ example: '💖' })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiProperty({ example: 'Premium Quality' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'High-quality curated items for Mother\'s Day.' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number;
}

export class CreatePromotionDto {
  @ApiProperty({ example: "Mother's Day Special 2025" })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'mothers-day-2025' })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiPropertyOptional({ example: 'The Perfect All-In-One Bundle Hamper' })
  @IsOptional()
  @IsString()
  subtitle?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: "Mother's Day Special • 1 - 31 May" })
  @IsOptional()
  @IsString()
  badgeText?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsISO8601()
  startDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsISO8601()
  endDate?: string;

  @ApiPropertyOptional({ enum: PromotionStatus, default: PromotionStatus.draft })
  @IsOptional()
  @IsEnum(PromotionStatus)
  status?: PromotionStatus;

  @ApiPropertyOptional({ description: 'UUID bundle yang jadi hero. Jika null, otomatis dipilih.' })
  @IsOptional()
  @IsString()
  heroBundleId?: string;

  @ApiPropertyOptional({ type: [CreatePromotionSectionDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePromotionSectionDto)
  sections?: CreatePromotionSectionDto[];

  @ApiPropertyOptional({ type: [CreatePromotionBenefitDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePromotionBenefitDto)
  benefits?: CreatePromotionBenefitDto[];
}

export class UpdatePromotionDto extends PartialType(CreatePromotionDto) {}
