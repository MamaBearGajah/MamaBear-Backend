import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MessageResponseDto {
  @ApiProperty({ example: 'Operation completed successfully.' })
  message!: string;
}

export class PaginationMetaDto {
  @ApiProperty({ example: 100 })
  total!: number;

  @ApiProperty({ example: 1 })
  page!: number;

  @ApiProperty({ example: 20 })
  limit!: number;

  @ApiProperty({ example: 5 })
  totalPages!: number;
}

export class BadRequestResponseDto {
  @ApiProperty({ example: 400 })
  statusCode!: number;

  @ApiProperty({ example: 'Bad Request' })
  error!: string;

  @ApiProperty({
    oneOf: [
      { type: 'string', example: 'Validation failed' },
      { type: 'array', items: { type: 'string' }, example: ['field must not be empty', 'field must be a string'] },
    ],
  })
  message!: string | string[];
}

export class UnauthorizedResponseDto {
  @ApiProperty({ example: 401 })
  statusCode!: number;

  @ApiProperty({ example: 'Unauthorized' })
  message!: string;
}

export class ForbiddenResponseDto {
  @ApiProperty({ example: 403 })
  statusCode!: number;

  @ApiProperty({ example: 'Forbidden resource' })
  message!: string;
}

export class NotFoundResponseDto {
  @ApiProperty({ example: 404 })
  statusCode!: number;

  @ApiProperty({ example: 'Not Found' })
  error!: string;

  @ApiProperty({ example: 'Resource not found' })
  message!: string;
}

export class ConflictResponseDto {
  @ApiProperty({ example: 409 })
  statusCode!: number;

  @ApiProperty({ example: 'Conflict' })
  error!: string;

  @ApiProperty({ example: 'Resource already exists' })
  message!: string;
}

/** @deprecated use specific error DTOs (BadRequestResponseDto, etc.) */
export class ErrorResponseDto extends BadRequestResponseDto {}
