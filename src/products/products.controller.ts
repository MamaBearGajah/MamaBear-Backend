import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { IsOptional, IsString, IsUrl, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class BatchVariantImageItemDto {
  @ApiProperty({ example: 'uuid' })
  @IsUUID()
  variantId!: string;

  @ApiProperty({ example: 'https://res.cloudinary.com/...' })
  @IsUrl()
  imageUrl!: string;

  @ApiPropertyOptional({ example: 'Warna merah' })
  @IsOptional()
  @IsString()
  altText?: string;
}

class BatchVariantImagesDto {
  @ApiProperty({ type: [BatchVariantImageItemDto] })
  @ValidateNested({ each: true })
  @Type(() => BatchVariantImageItemDto)
  items!: BatchVariantImageItemDto[];
}
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { ProductsService } from './products.service.js';
import { ReviewsService } from './reviews.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { ProductQueryDto } from './dto/product-query.dto.js';
import { CreateVariantDto } from './dto/create-variant.dto.js';
import { UpdateVariantDto } from './dto/update-variant.dto.js';
import { CreateImageDto } from './dto/create-image.dto.js';
import { UpdateImageDto } from './dto/update-image.dto.js';
import { CreateReviewDto, UpdateReviewDto, ToggleHelpfulDto } from './dto/review.dto.js';
import { Public, Roles, GetUser } from '../auth/decorators/index.js';
import { Role } from '../../generated/prisma/enums.js';
import { BadRequestResponseDto, ConflictResponseDto, ForbiddenResponseDto, MessageResponseDto, NotFoundResponseDto, UnauthorizedResponseDto } from '../common/dto/response.dto.js';
import { PaginatedProductsDto, ProductDto, ProductImageDto, ProductVariantDto, ProductReviewDto, PaginatedReviewsDto, RatingSummaryDto } from './dto/product-response.dto.js';

@ApiTags('Products')
@ApiBearerAuth('access-token')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly reviewsService: ReviewsService,
  ) {}

  @Public()
  @Get()
  @ApiOkResponse({ description: 'Returns a paginated list of products.', type: PaginatedProductsDto })
  findAll(@Query() query: ProductQueryDto) {
    return this.productsService.findAll(query);
  }

  @Public()
  @Get('slug/:slug')
  @ApiOkResponse({ description: 'Returns the product matching the given slug.', type: ProductDto })
  @ApiNotFoundResponse({ description: 'Product not found.', type: NotFoundResponseDto })
  findBySlug(@Param('slug') slug: string) {
    return this.productsService.findBySlug(slug);
  }

  @Public()
  @Get(':id')
  @ApiOkResponse({ description: 'Returns a product by ID.', type: ProductDto })
  @ApiNotFoundResponse({ description: 'Product not found.', type: NotFoundResponseDto })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Roles(Role.admin, Role.super_admin)
  @Post()
  @ApiCreatedResponse({ description: 'Product created successfully.', type: ProductDto })
  @ApiBadRequestResponse({ description: 'Invalid product data.', type: BadRequestResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'Requires admin role.', type: ForbiddenResponseDto })
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Roles(Role.admin, Role.super_admin)
  @Put(':id')
  @ApiOkResponse({ description: 'Product updated successfully.', type: ProductDto })
  @ApiBadRequestResponse({ description: 'Invalid product data.', type: BadRequestResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'Requires admin role.', type: ForbiddenResponseDto })
  @ApiNotFoundResponse({ description: 'Product not found.', type: NotFoundResponseDto })
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, dto);
  }

  @Roles(Role.admin, Role.super_admin)
  @Delete(':id')
  @ApiOkResponse({ description: 'Product deleted successfully.', type: MessageResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'Requires admin role.', type: ForbiddenResponseDto })
  @ApiNotFoundResponse({ description: 'Product not found.', type: NotFoundResponseDto })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @Public()
  @Get(':id/variants')
  @ApiOkResponse({ description: 'Returns all variants for a product.', type: [ProductVariantDto] })
  @ApiNotFoundResponse({ description: 'Product not found.', type: NotFoundResponseDto })
  findVariants(@Param('id') id: string) {
    return this.productsService.findVariants(id);
  }

  @Roles(Role.admin, Role.super_admin)
  @Post(':id/variants')
  @ApiCreatedResponse({ description: 'Variant added successfully.', type: ProductVariantDto })
  @ApiBadRequestResponse({ description: 'Invalid variant data.', type: BadRequestResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'Requires admin role.', type: ForbiddenResponseDto })
  @ApiNotFoundResponse({ description: 'Product not found.', type: NotFoundResponseDto })
  addVariant(@Param('id') id: string, @Body() dto: CreateVariantDto) {
    return this.productsService.addVariant(id, dto);
  }

  @Roles(Role.admin, Role.super_admin)
  @Put(':id/variants/:variantId')
  @ApiOkResponse({ description: 'Variant updated successfully.', type: ProductVariantDto })
  @ApiBadRequestResponse({ description: 'Invalid variant data.', type: BadRequestResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'Requires admin role.', type: ForbiddenResponseDto })
  @ApiNotFoundResponse({ description: 'Variant not found.', type: NotFoundResponseDto })
  updateVariant(@Param('variantId') variantId: string, @Body() dto: UpdateVariantDto) {
    return this.productsService.updateVariant(variantId, dto);
  }

  @Roles(Role.admin, Role.super_admin)
  @Delete(':id/variants/:variantId')
  @ApiOkResponse({ description: 'Variant deleted successfully.', type: MessageResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'Requires admin role.', type: ForbiddenResponseDto })
  @ApiNotFoundResponse({ description: 'Variant not found.', type: NotFoundResponseDto })
  removeVariant(@Param('variantId') variantId: string) {
    return this.productsService.removeVariant(variantId);
  }

  @Roles(Role.admin, Role.super_admin)
  @Post(':id/variants/images/batch')
  @ApiOkResponse({ description: 'Batch variant images updated.' })
  @ApiBadRequestResponse({ description: 'Invalid data.', type: BadRequestResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'Requires admin role.', type: ForbiddenResponseDto })
  batchUpdateVariantImages(@Param('id') id: string, @Body() dto: BatchVariantImagesDto) {
    return this.productsService.batchUpdateVariantImages(id, dto.items);
  }

  @Roles(Role.admin, Role.super_admin)
  @Post(':id/images')
  @ApiCreatedResponse({ description: 'Image added successfully.', type: ProductImageDto })
  @ApiBadRequestResponse({ description: 'Invalid image data.', type: BadRequestResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'Requires admin role.', type: ForbiddenResponseDto })
  @ApiNotFoundResponse({ description: 'Product not found.', type: NotFoundResponseDto })
  addImage(@Param('id') id: string, @Body() dto: CreateImageDto) {
    return this.productsService.addImage(id, dto);
  }

  @Roles(Role.admin, Role.super_admin)
  @Put(':id/images/:imageId')
  @ApiOkResponse({ description: 'Image updated successfully.', type: ProductImageDto })
  @ApiBadRequestResponse({ description: 'Invalid image data.', type: BadRequestResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'Requires admin role.', type: ForbiddenResponseDto })
  @ApiNotFoundResponse({ description: 'Image not found.', type: NotFoundResponseDto })
  updateImage(@Param('imageId') imageId: string, @Body() dto: UpdateImageDto) {
    return this.productsService.updateImage(imageId, dto);
  }

  @Roles(Role.admin, Role.super_admin)
  @Delete(':id/images/:imageId')
  @ApiOkResponse({ description: 'Image deleted successfully.', type: MessageResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'Requires admin role.', type: ForbiddenResponseDto })
  @ApiNotFoundResponse({ description: 'Image not found.', type: NotFoundResponseDto })
  removeImage(@Param('imageId') imageId: string) {
    return this.productsService.removeImage(imageId);
  }

  // ── Reviews ───────────────────────────────────────────────────────────────

  @Public()
  @Get(':id/reviews')
  @ApiOkResponse({ description: 'Returns paginated reviews for a product.', type: PaginatedReviewsDto })
  @ApiNotFoundResponse({ description: 'Product not found.', type: NotFoundResponseDto })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'sortBy', required: false, enum: ['rating', 'createdAt'] })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'] })
  getReviews(
    @Param('id') id: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('sortBy') sortBy?: 'rating' | 'createdAt',
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
    @GetUser('sub') userId?: string,
  ) {
    return this.reviewsService.getReviews(
      id,
      page ? Number(page) : undefined,
      limit ? Number(limit) : undefined,
      sortBy,
      sortOrder,
      userId,
    );
  }

  @Post(':id/reviews')
  @ApiCreatedResponse({ description: 'Review created successfully.', type: ProductReviewDto })
  @ApiBadRequestResponse({ description: 'Invalid review data.', type: BadRequestResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiNotFoundResponse({ description: 'Product not found.', type: NotFoundResponseDto })
  @ApiConflictResponse({ description: 'You have already reviewed this product.', type: ConflictResponseDto })
  createReview(
    @Param('id') id: string,
    @GetUser('sub') userId: string,
    @Body() dto: CreateReviewDto,
  ) {
    return this.reviewsService.createReview(id, userId, dto);
  }

  @Put(':id/reviews/:reviewId')
  @ApiOkResponse({ description: 'Review updated successfully.', type: ProductReviewDto })
  @ApiBadRequestResponse({ description: 'Invalid review data.', type: BadRequestResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'You can only edit your own reviews.', type: ForbiddenResponseDto })
  @ApiNotFoundResponse({ description: 'Review not found.', type: NotFoundResponseDto })
  updateReview(
    @Param('reviewId') reviewId: string,
    @GetUser('sub') userId: string,
    @Body() dto: UpdateReviewDto,
  ) {
    return this.reviewsService.updateReview(reviewId, userId, dto);
  }

  @Delete(':id/reviews/:reviewId')
  @ApiOkResponse({ description: 'Review deleted successfully.', type: MessageResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'You can only delete your own reviews.', type: ForbiddenResponseDto })
  @ApiNotFoundResponse({ description: 'Review not found.', type: NotFoundResponseDto })
  deleteReview(
    @Param('reviewId') reviewId: string,
    @GetUser('sub') userId: string,
  ) {
    return this.reviewsService.deleteReview(reviewId, userId);
  }

  @Post(':id/reviews/:reviewId/helpful')
  @ApiOkResponse({ description: 'Helpful vote toggled.', type: MessageResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiNotFoundResponse({ description: 'Review not found.', type: NotFoundResponseDto })
  toggleHelpful(
    @Param('reviewId') reviewId: string,
    @GetUser('sub') userId: string,
    @Body() dto: ToggleHelpfulDto,
  ) {
    return this.reviewsService.toggleHelpful(reviewId, userId, dto.isHelpful);
  }

  @Public()
  @Get(':id/rating-summary')
  @ApiOkResponse({ description: 'Returns rating summary for a product.', type: RatingSummaryDto })
  @ApiNotFoundResponse({ description: 'Product not found.', type: NotFoundResponseDto })
  getRatingSummary(@Param('id') id: string) {
    return this.reviewsService.getRatingSummary(id);
  }
}
