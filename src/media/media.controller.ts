import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators';
import { Role } from 'generated/prisma/enums';
import { MediaService } from './media.service';
import { SignUploadDto } from './dto/sign-upload.dto';

@ApiTags('Media')
@ApiBearerAuth()
@Roles(Role.admin, Role.super_admin)
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  // POST /media/sign — Generate Cloudinary signed URL
  @Post('sign')
  @ApiOperation({ summary: 'Generate Cloudinary signed URL untuk upload dari frontend' })
  @ApiResponse({
    status: 200,
    description: 'Signed URL berhasil dibuat',
    schema: {
      example: {
        success: true,
        data: {
          uploadUrl: 'https://api.cloudinary.com/v1_1/<cloud>/image/upload',
          signature: 'abc123...',
          timestamp: 1719999999,
          apiKey: '...',
          folder: 'products',
        },
      },
    },
  })
  async sign(@Body() dto: SignUploadDto) {
    const data = await this.mediaService.generateSignedUrl(dto);
    return { success: true, data };
  }

  // POST /media/upload — Direct upload multipart/form-data
  @Post('upload')
  @ApiOperation({ summary: 'Direct upload image ke Cloudinary. Max 5MB, jpeg/png/webp.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file', 'folder'],
      properties: {
        file: { type: 'string', format: 'binary', description: 'File gambar (jpeg/png/webp, max 5MB)' },
        folder: { type: 'string', example: 'products', description: 'Cloudinary folder tujuan' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Upload berhasil',
    schema: {
      example: {
        success: true,
        data: {
          imageUrl: 'https://res.cloudinary.com/...',
          publicId: 'products/abc123',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB hard limit di multer
    }),
  )
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body('folder') folder: string,
  ) {
    if (!file) throw new BadRequestException('File is required.');
    if (!folder) throw new BadRequestException('Folder is required.');

    const data = await this.mediaService.uploadFile(file, folder);
    return { success: true, data };
  }
}