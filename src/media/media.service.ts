import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { SignUploadDto } from './dto/sign-upload.dto';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

@Injectable()
export class MediaService {
  constructor(private readonly config: ConfigService) {
    cloudinary.config({
      cloud_name: this.config.getOrThrow('CLOUDINARY_CLOUD_NAME'),
      api_key:    this.config.getOrThrow('CLOUDINARY_API_KEY'),
      api_secret: this.config.getOrThrow('CLOUDINARY_API_SECRET'),
    });
  }

  // ─── Signed URL ────────────────────────────────────────────────────────────

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

  // ─── Single Upload ─────────────────────────────────────────────────────────

  async uploadFile(file: Express.Multer.File, folder: string) {
    this.validateFile(file);
    return this.uploadToCloudinary(file.buffer, folder);
  }

  // ─── Multiple Upload ───────────────────────────────────────────────────────

  async uploadMultipleFiles(files: Express.Multer.File[], folder: string) {
    files.forEach((file) => this.validateFile(file));

    const results = await Promise.all(
      files.map((file) => this.uploadToCloudinary(file.buffer, folder)),
    );

    return results;
  }

  // ─── Delete ────────────────────────────────────────────────────────────────

  async deleteFile(publicId: string) {
    return new Promise<{ deleted: string; result: string }>((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (err, result) => {
        if (err) return reject(err);
        if (result?.result !== 'ok' && result?.result !== 'not found') {
          return reject(new BadRequestException(`Gagal menghapus gambar: ${result?.result}`));
        }
        resolve({ deleted: publicId, result: result?.result ?? 'ok' });
      });
    });
  }

  // ─── Private Helpers ───────────────────────────────────────────────────────

  private validateFile(file: Express.Multer.File) {
    if (!ALLOWED_TYPES.includes(file.mimetype)) {
      throw new BadRequestException(`Tipe file tidak diizinkan: ${file.mimetype}. Hanya jpeg, png, webp.`);
    }
    if (file.size > MAX_SIZE_BYTES) {
      throw new BadRequestException(`File terlalu besar: ${file.originalname}. Maksimum 5MB.`);
    }
  }

  private uploadToCloudinary(
    buffer: Buffer,
    folder: string,
  ): Promise<{ imageUrl: string; publicId: string }> {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder,
          // ✅ Cloudinary otomatis serves via CDN
          // Format transformation bisa ditambahkan di sini jika perlu:
          // eager: [{ format: 'webp', quality: 'auto' }],
        },
        (err, result) => {
          if (err) return reject(err);
          resolve({
            imageUrl: result?.secure_url ?? '',
            publicId: result?.public_id ?? '',
          });
        },
      );
      stream.end(buffer);
    });
  }
}