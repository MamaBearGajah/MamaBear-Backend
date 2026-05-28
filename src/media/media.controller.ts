import {
  Body,
  Controller,
  Delete,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiBearerAuth,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators';
import { Role } from 'generated/prisma/enums';
import { MediaService } from './media.service';
import { SignUploadDto } from './dto/sign-upload.dto';

const MULTER_OPTIONS = {
  storage: memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
};

@ApiTags('Media')
@ApiBearerAuth()
@Roles(Role.admin, Role.super_admin)
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  // ─── Generate Signed URL ─────────────────────────────────────────────────

  @Post('sign')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Generate Cloudinary signed URL untuk upload langsung dari frontend' })
  @ApiResponse({ status: 200, description: 'Signed URL berhasil dibuat' })
  @ApiResponse({ status: 400, description: 'Tipe file tidak diizinkan' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Akses ditolak' })
  async sign(@Body() dto: SignUploadDto) {
    const data = await this.mediaService.generateSignedUrl(dto);
    return { success: true, data };
  }

  // ─── Single Upload ────────────────────────────────────────────────────────

  @Post('upload')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Upload satu gambar ke Cloudinary (max 5MB, jpeg/png/webp)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file', 'folder'],
      properties: {
        file:   { type: 'string', format: 'binary', description: 'File gambar (jpeg/png/webp, max 5MB)' },
        folder: { type: 'string', example: 'products' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Upload berhasil, returns imageUrl dan publicId' })
  @ApiResponse({ status: 400, description: 'File tidak valid atau folder kosong' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Akses ditolak' })
  @UseInterceptors(FileInterceptor('file', MULTER_OPTIONS))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body('folder') folder: string,
  ) {
    if (!file)   throw new BadRequestException('File is required.');
    if (!folder) throw new BadRequestException('Folder is required.');

    const data = await this.mediaService.uploadFile(file, folder);
    return { success: true, data };
  }

  // ─── Multiple Upload ──────────────────────────────────────────────────────

  @Post('upload/multiple')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Upload beberapa gambar sekaligus ke Cloudinary (max 10 file, masing-masing max 5MB)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['files', 'folder'],
      properties: {
        files:  {
          type: 'array',
          items: { type: 'string', format: 'binary' },
          description: 'File gambar (max 10)',
        },
        folder: { type: 'string', example: 'products' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Semua file berhasil diupload' })
  @ApiResponse({ status: 400, description: 'File tidak valid atau folder kosong' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Akses ditolak' })
  @UseInterceptors(FilesInterceptor('files', 10, MULTER_OPTIONS))
  async uploadMultiple(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('folder') folder: string,
  ) {
    if (!files || files.length === 0) throw new BadRequestException('Minimal satu file diperlukan.');
    if (!folder) throw new BadRequestException('Folder is required.');

    const data = await this.mediaService.uploadMultipleFiles(files, folder);
    return { success: true, data };
  }

  // ─── Delete Image ─────────────────────────────────────────────────────────

  @Delete(':publicId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Hapus gambar dari Cloudinary berdasarkan publicId' })
  @ApiParam({
    name: 'publicId',
    description: 'Cloudinary public ID — jika mengandung slash, encode dulu (e.g. products%2Fabc123)',
  })
  @ApiResponse({ status: 200, description: 'Gambar berhasil dihapus' })
  @ApiResponse({ status: 400, description: 'Gagal menghapus gambar' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Akses ditolak' })
  async deleteImage(@Param('publicId') publicId: string) {
    const decodedId = decodeURIComponent(publicId);
    const data = await this.mediaService.deleteFile(decodedId);
    return { success: true, data };
  }
}