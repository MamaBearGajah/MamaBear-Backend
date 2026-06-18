import {
  Controller,
  Post,
  Delete,
  Body,
  Param,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { memoryStorage } from 'multer';
import { MediaService } from './media.service';
import { SignUploadDto } from './dto/sign-upload.dto';
import { Public } from '../auth/decorators';

const MULTER_OPTIONS = {
  storage: memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
};

@ApiTags('Media')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  // ─── Signed URL (Direct Upload ke Cloudinary) ──────────────────────────────
  // Frontend pakai ini untuk upload langsung ke Cloudinary tanpa lewat server

  @Post('sign')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Generate signed URL untuk upload langsung ke Cloudinary',
    description:
      'Kembalikan uploadUrl, signature, timestamp, apiKey, folder. ' +
      'Frontend upload file langsung ke Cloudinary pakai data ini.',
  })
  @ApiResponse({ status: 200, description: 'Signed URL berhasil dibuat' })
  @ApiResponse({ status: 400, description: 'Tipe file tidak diizinkan' })
  signUpload(@Body() dto: SignUploadDto) {
    return this.mediaService.generateSignedUrl(dto);
  }

  // ─── Direct Upload (lewat server → Cloudinary) ─────────────────────────────
  // Fallback jika signed URL tidak bisa dipakai (CORS, dll)

  @Post('upload')
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file', MULTER_OPTIONS))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload satu file gambar via server ke Cloudinary' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        folder: { type: 'string', example: 'products' },
      },
      required: ['file'],
    },
  })
  @ApiResponse({ status: 201, description: 'Upload berhasil, kembalikan imageUrl + publicId' })
  @ApiResponse({ status: 400, description: 'File tidak valid atau melebihi 5MB' })
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('folder') folder = 'uploads',
  ) {
    if (!file) throw new BadRequestException('File tidak ditemukan');
    return this.mediaService.uploadFile(file, folder);
  }

  // ─── Multiple Upload ────────────────────────────────────────────────────────

  @Post('upload/multiple')
  @ApiBearerAuth()
  @UseInterceptors(FilesInterceptor('files', 10, MULTER_OPTIONS))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload beberapa file gambar sekaligus (maks 10)' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
        },
        folder: { type: 'string', example: 'products' },
      },
      required: ['files'],
    },
  })
  @ApiResponse({ status: 201, description: 'Upload berhasil' })
  async uploadMultiple(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('folder') folder = 'uploads',
  ) {
    if (!files?.length) throw new BadRequestException('Tidak ada file yang dikirim');
    return this.mediaService.uploadMultipleFiles(files, folder);
  }

  // ─── Delete ─────────────────────────────────────────────────────────────────

  @Delete(':publicId')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Hapus file dari Cloudinary berdasarkan publicId' })
  @ApiResponse({ status: 200, description: 'File berhasil dihapus' })
  @ApiResponse({ status: 400, description: 'Gagal menghapus file' })
  deleteFile(@Param('publicId') publicId: string) {
    return this.mediaService.deleteFile(publicId);
  }

  // ─── Blog Cover Image Upload ────────────────────────────────────────────────
  // Dedicated endpoint untuk blog agar folder terpisah

  @Post('blog/upload')
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file', MULTER_OPTIONS))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload cover image untuk blog post' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: { file: { type: 'string', format: 'binary' } },
      required: ['file'],
    },
  })
  @ApiResponse({ status: 201, description: 'Upload berhasil' })
  async uploadBlogImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('File tidak ditemukan');
    return this.mediaService.uploadFile(file, 'blog');
  }
}