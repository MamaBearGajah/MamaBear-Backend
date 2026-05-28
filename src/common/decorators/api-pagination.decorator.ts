import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export function ApiPagination() {
  return applyDecorators(
    ApiQuery({ name: 'page', required: false, type: Number, example: 1, description: 'Halaman ke-' }),
    ApiQuery({ name: 'limit', required: false, type: Number, example: 20, description: 'Jumlah item per halaman' }),
  );
}