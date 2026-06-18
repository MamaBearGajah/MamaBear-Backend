import {
  Controller, Get, Post, Put, Delete,
  Body, Param, Query, HttpCode, HttpStatus,
} from '@nestjs/common';
import {
  ApiTags, ApiOperation, ApiResponse,
  ApiBearerAuth, ApiParam, ApiQuery,
} from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';
import { HelpfulVoteDto } from '../dto/helpful-vote.dto';
import { ReviewQueryDto } from '../dto/review-query.dto';
import { Public, GetUser } from '../../auth/decorators';
import { Role } from 'generated/prisma/enums';

@ApiTags('Product Reviews')
@Controller('products/:productId/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  // ─── GET ALL REVIEWS ──────────────────────────────────────────────────────

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get semua review produk (public, paginated)' })
  @ApiParam({ name: 'productId' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'rating', required: false, type: Number, description: 'Filter by rating 1-5' })
  @ApiQuery({ name: 'sortBy', required: false, enum: ['rating', 'createdAt'] })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'] })
  @ApiResponse({ status: 200, description: 'List review berhasil diambil' })
  @ApiResponse({ status: 404, description: 'Produk tidak ditemukan' })
  getReviews(
    @Param('productId') productId: string,
    @Query() query: ReviewQueryDto,
    @GetUser('id') userId?: string,
  ) {
    return this.reviewsService.getReviews(
      productId,
      query.page,
      query.limit,
      query.sortBy as 'rating' | 'createdAt',
      query.sortOrder,
      userId,
    );
  }

  // ─── RATING SUMMARY ───────────────────────────────────────────────────────

  @Public()
  @Get('rating-summary')
  @ApiOperation({ summary: 'Get rating summary — avgRating, ratingCount, breakdown (public)' })
  @ApiParam({ name: 'productId' })
  @ApiResponse({ status: 200, description: 'Rating summary berhasil diambil' })
  @ApiResponse({ status: 404, description: 'Produk tidak ditemukan' })
  getRatingSummary(@Param('productId') productId: string) {
    return this.reviewsService.getRatingSummary(productId);
  }

  // ─── CREATE REVIEW ────────────────────────────────────────────────────────

  @Post()
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Buat review — harus verified purchase dengan status delivered (Bearer)' })
  @ApiParam({ name: 'productId' })
  @ApiResponse({ status: 201, description: 'Review berhasil dibuat' })
  @ApiResponse({ status: 400, description: 'Rating atau review harus diisi' })
  @ApiResponse({ status: 403, description: 'Bukan verified purchase atau order belum delivered' })
  @ApiResponse({ status: 404, description: 'Produk atau order tidak ditemukan' })
  @ApiResponse({ status: 409, description: 'Sudah pernah review produk ini untuk order ini' })
  createReview(
    @Param('productId') productId: string,
    @Body() dto: CreateReviewDto,
    @GetUser('id') userId: string,
  ) {
    return this.reviewsService.createReview(productId, userId, dto);
  }

  // ─── UPDATE REVIEW ────────────────────────────────────────────────────────

  @Put(':reviewId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Edit review milik sendiri (Bearer)' })
  @ApiParam({ name: 'productId' })
  @ApiParam({ name: 'reviewId' })
  @ApiResponse({ status: 200, description: 'Review berhasil diupdate' })
  @ApiResponse({ status: 403, description: 'Bukan review milik Anda' })
  @ApiResponse({ status: 404, description: 'Review tidak ditemukan' })
  updateReview(
    @Param('reviewId') reviewId: string,
    @Body() dto: UpdateReviewDto,
    @GetUser('id') userId: string,
  ) {
    return this.reviewsService.updateReview(reviewId, userId, dto);
  }

  // ─── DELETE REVIEW ────────────────────────────────────────────────────────

  @Delete(':reviewId')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Hapus review — milik sendiri atau admin (Bearer)' })
  @ApiParam({ name: 'productId' })
  @ApiParam({ name: 'reviewId' })
  @ApiResponse({ status: 200, description: 'Review berhasil dihapus' })
  @ApiResponse({ status: 403, description: 'Bukan review milik Anda' })
  @ApiResponse({ status: 404, description: 'Review tidak ditemukan' })
  deleteReview(
    @Param('reviewId') reviewId: string,
    @GetUser('id') userId: string,
    @GetUser('role') role: Role,
  ) {
    return this.reviewsService.deleteReview(reviewId, userId, role);
  }

  // ─── HELPFUL VOTE ─────────────────────────────────────────────────────────

  @Post(':reviewId/helpful')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Toggle helpful vote — kirim same value lagi untuk hapus vote (Bearer)' })
  @ApiParam({ name: 'productId' })
  @ApiParam({ name: 'reviewId' })
  @ApiResponse({ status: 200, description: 'Vote berhasil diupdate atau dihapus' })
  @ApiResponse({ status: 404, description: 'Review tidak ditemukan' })
  toggleHelpful(
    @Param('reviewId') reviewId: string,
    @Body() dto: HelpfulVoteDto,
    @GetUser('id') userId: string,
  ) {
    return this.reviewsService.toggleHelpful(reviewId, userId, dto.isHelpful);
  }
}