import { CreateReviewDto } from '../dto/create-review.dto'
import { PartialType } from '@nestjs/swagger';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {}
