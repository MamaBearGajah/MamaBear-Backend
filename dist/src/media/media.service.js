"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cloudinary_1 = require("cloudinary");
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE_BYTES = 5 * 1024 * 1024;
let MediaService = class MediaService {
    config;
    constructor(config) {
        this.config = config;
        cloudinary_1.v2.config({
            cloud_name: this.config.getOrThrow('CLOUDINARY_CLOUD_NAME'),
            api_key: this.config.getOrThrow('CLOUDINARY_API_KEY'),
            api_secret: this.config.getOrThrow('CLOUDINARY_API_SECRET'),
        });
    }
    async generateSignedUrl(dto) {
        if (dto.fileType && !ALLOWED_TYPES.includes(dto.fileType)) {
            throw new common_1.BadRequestException('Tipe file tidak diizinkan. Hanya jpeg, png, webp.');
        }
        const timestamp = Math.round(Date.now() / 1000);
        const signature = cloudinary_1.v2.utils.api_sign_request({ timestamp, folder: dto.folder }, this.config.getOrThrow('CLOUDINARY_API_SECRET'));
        return {
            uploadUrl: `https://api.cloudinary.com/v1_1/${this.config.getOrThrow('CLOUDINARY_CLOUD_NAME')}/image/upload`,
            signature,
            timestamp,
            apiKey: this.config.getOrThrow('CLOUDINARY_API_KEY'),
            folder: dto.folder,
        };
    }
    async uploadFile(file, folder) {
        this.validateFile(file);
        return this.uploadToCloudinary(file.buffer, folder);
    }
    async uploadMultipleFiles(files, folder) {
        files.forEach((file) => this.validateFile(file));
        const results = await Promise.all(files.map((file) => this.uploadToCloudinary(file.buffer, folder)));
        return results;
    }
    async deleteFile(publicId) {
        return new Promise((resolve, reject) => {
            cloudinary_1.v2.uploader.destroy(publicId, (err, result) => {
                if (err)
                    return reject(err);
                if (result?.result !== 'ok' && result?.result !== 'not found') {
                    return reject(new common_1.BadRequestException(`Gagal menghapus gambar: ${result?.result}`));
                }
                resolve({ deleted: publicId, result: result?.result ?? 'ok' });
            });
        });
    }
    validateFile(file) {
        if (!ALLOWED_TYPES.includes(file.mimetype)) {
            throw new common_1.BadRequestException(`Tipe file tidak diizinkan: ${file.mimetype}. Hanya jpeg, png, webp.`);
        }
        if (file.size > MAX_SIZE_BYTES) {
            throw new common_1.BadRequestException(`File terlalu besar: ${file.originalname}. Maksimum 5MB.`);
        }
    }
    uploadToCloudinary(buffer, folder) {
        return new Promise((resolve, reject) => {
            const stream = cloudinary_1.v2.uploader.upload_stream({
                folder,
                transformation: [
                    { quality: 'auto', fetch_format: 'auto' },
                ],
            }, (err, result) => {
                if (err)
                    return reject(err);
                resolve({
                    imageUrl: result?.secure_url ?? '',
                    publicId: result?.public_id ?? '',
                });
            });
            stream.end(buffer);
        });
    }
};
exports.MediaService = MediaService;
exports.MediaService = MediaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MediaService);
//# sourceMappingURL=media.service.js.map