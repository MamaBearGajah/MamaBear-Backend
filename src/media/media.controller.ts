import {
  Controller,
  Post,
  Delete,
  Param,
  UploadedFile,
  UseInterceptors,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { MediaService } from './media.service.js';
import { Roles } from '../auth/decorators/index.js';
import { Role } from '../../generated/prisma/enums.js';
import { BadRequestResponseDto, ForbiddenResponseDto, MessageResponseDto, UnauthorizedResponseDto } from '../common/dto/response.dto.js';
import { MediaUploadResponseDto } from './dto/media-response.dto.js';

@ApiTags('Media')
@ApiBearerAuth('access-token')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Roles(Role.admin, Role.super_admin)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary', description: 'Image file to upload (jpg, png, webp)' },
      },
      required: ['file'],
    },
  })
  @ApiCreatedResponse({ description: 'Image uploaded to Cloudinary. Returns public_id and secure_url.', type: MediaUploadResponseDto })
  @ApiBadRequestResponse({ description: 'No file provided or unsupported file type.', type: BadRequestResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'Requires admin role.', type: ForbiddenResponseDto })
  uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder?: string,
  ) {
    return this.mediaService.uploadImage(file, folder);
  }

  @Roles(Role.admin, Role.super_admin)
  @Delete(':publicId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Image deleted from Cloudinary successfully.', type: MessageResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'Requires admin role.', type: ForbiddenResponseDto })
  deleteImage(@Param('publicId') publicId: string) {
    return this.mediaService.deleteImage(publicId);
  }
}
