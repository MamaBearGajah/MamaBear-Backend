import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { SignUploadDto } from './dto/sign-upload.dto';

@Injectable()
export class MediaService {
  constructor(private readonly config: ConfigService) {
    cloudinary.config({
      cloud_name: this.config.getOrThrow('CLOUDINARY_CLOUD_NAME'),
      api_key: this.config.getOrThrow('CLOUDINARY_API_KEY'),
      api_secret: this.config.getOrThrow('CLOUDINARY_API_SECRET'),
    });
  }

  async generateSignedUrl(dto: SignUploadDto) {
    const timestamp = Math.round(Date.now() / 1000);

    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder: dto.folder },
      this.config.getOrThrow('CLOUDINARY_API_SECRET'),
    );

    return {
      uploadUrl: `https://api.cloudinary.com/v1_1/${this.config.getOrThrow('CLOUDINARY_CLOUD_NAME')}/image/upload`,
      signature,
      timestamp,
      apiKey: this.config.getOrThrow('CLOUDINARY_API_KEY'),
      folder: dto.folder,
    };
  }

  async uploadFile(file: Express.Multer.File, folder: string) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException('File type not allowed. Only jpeg, png, webp are accepted.');
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new BadRequestException('File too large. Maximum size is 5MB.');
    }

    return new Promise<{ imageUrl: string; publicId: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder },
        (err, result) => {
          if (err) return reject(err);
          resolve({
            imageUrl: result?.secure_url ?? '',
            publicId: result?.public_id ?? '',
          });
        },
      );

      stream.end(file.buffer);
    });
  }
}