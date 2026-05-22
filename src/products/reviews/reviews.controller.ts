import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Put } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';
import { ReviewQueryDto } from '../dto/review-query.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('products/:productId/reviews')
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) {}

    @Get()
    findByProduct(@Param('productId') productId: string, @Query() query: ReviewQueryDto) {
      return this.reviewsService.findByProduct(productId, query)
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Param('productId') productId: string, @Body() dto: CreateReviewDto, @CurrentUser() user: { id: string }) {
      return this.reviewsService.create(productId, user.id, dto)
    }

    @Put(':reviewId')
    @UseGuards(JwtAuthGuard)
    update(@Param('reviewId') reviewId: string, @Body() dto: UpdateReviewDto, @CurrentUser() user: { id: string }) {
      return this.reviewsService.update(reviewId, user.id, dto)
    }

    @Delete(':reviewId')
    @UseGuards(JwtAuthGuard)
    remove(@Param('reviewId') reviewId: string, @CurrentUser() user: { id: string }) {
      return this.reviewsService.remove(reviewId, user.id)
    }

    @Post(':reviewId/helpful')
    @UseGuards(JwtAuthGuard)
    helpfulVote(@Param('reviewId') reviewId: string, @Body('isHelpful') isHelpful: boolean, @CurrentUser() user: { id: string }) {
      return this.reviewsService.helpfulVote(reviewId, user.id, isHelpful)
    }
}
