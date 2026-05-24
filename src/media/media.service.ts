import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}

@Injectable()
export class MediaService {
  private readonly cloudName: string;
  private readonly apiKey: string;
  private readonly apiSecret: string;

  constructor(private config: ConfigService) {
    this.cloudName = this.config.getOrThrow<string>('CLOUDINARY_CLOUD_NAME');
    this.apiKey = this.config.getOrThrow<string>('CLOUDINARY_API_KEY');
    this.apiSecret = this.config.getOrThrow<string>('CLOUDINARY_API_SECRET');
  }

  async uploadImage(file: Express.Multer.File, folder = 'mamabear'): Promise<CloudinaryUploadResult> {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedMimes.includes(file.mimetype)) {
      throw new BadRequestException('Hanya file JPEG, PNG, atau WebP yang diizinkan');
    }

    const maxSize = 5 * 1024 * 1024; // 5 MB
    if (file.size > maxSize) {
      throw new BadRequestException('Ukuran file maksimal 5 MB');
    }

    const base64 = file.buffer.toString('base64');
    const dataUri = `data:${file.mimetype};base64,${base64}`;

    const timestamp = Math.floor(Date.now() / 1000);
    const signature = await this.sign(`folder=${folder}&timestamp=${timestamp}`);

    const formData = new FormData();
    formData.append('file', dataUri);
    formData.append('api_key', this.apiKey);
    formData.append('timestamp', String(timestamp));
    formData.append('signature', signature);
    formData.append('folder', folder);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`,
      { method: 'POST', body: formData },
    );

    if (!res.ok) throw new BadRequestException('Gagal mengunggah gambar');
    return res.json() as Promise<CloudinaryUploadResult>;
  }

  async deleteImage(publicId: string) {
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = await this.sign(`public_id=${publicId}&timestamp=${timestamp}`);

    const formData = new FormData();
    formData.append('public_id', publicId);
    formData.append('api_key', this.apiKey);
    formData.append('timestamp', String(timestamp));
    formData.append('signature', signature);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${this.cloudName}/image/destroy`,
      { method: 'POST', body: formData },
    );

    if (!res.ok) throw new BadRequestException('Gagal menghapus gambar');
    return res.json();
  }

  private async sign(params: string): Promise<string> {
    const { createHash } = await import('crypto');
    return createHash('sha256').update(`${params}${this.apiSecret}`).digest('hex');
  }
}
