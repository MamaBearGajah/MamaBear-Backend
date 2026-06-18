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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const multer_1 = require("multer");
const media_service_1 = require("./media.service");
const sign_upload_dto_1 = require("./dto/sign-upload.dto");
const MULTER_OPTIONS = {
    storage: (0, multer_1.memoryStorage)(),
    limits: { fileSize: 5 * 1024 * 1024 },
};
let MediaController = class MediaController {
    mediaService;
    constructor(mediaService) {
        this.mediaService = mediaService;
    }
    signUpload(dto) {
        return this.mediaService.generateSignedUrl(dto);
    }
    async uploadFile(file, folder = 'uploads') {
        if (!file)
            throw new common_1.BadRequestException('File tidak ditemukan');
        return this.mediaService.uploadFile(file, folder);
    }
    async uploadMultiple(files, folder = 'uploads') {
        if (!files?.length)
            throw new common_1.BadRequestException('Tidak ada file yang dikirim');
        return this.mediaService.uploadMultipleFiles(files, folder);
    }
    deleteFile(publicId) {
        return this.mediaService.deleteFile(publicId);
    }
    async uploadBlogImage(file) {
        if (!file)
            throw new common_1.BadRequestException('File tidak ditemukan');
        return this.mediaService.uploadFile(file, 'blog');
    }
};
exports.MediaController = MediaController;
__decorate([
    (0, common_1.Post)('sign'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Generate signed URL untuk upload langsung ke Cloudinary',
        description: 'Kembalikan uploadUrl, signature, timestamp, apiKey, folder. ' +
            'Frontend upload file langsung ke Cloudinary pakai data ini.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Signed URL berhasil dibuat' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Tipe file tidak diizinkan' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_upload_dto_1.SignUploadDto]),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "signUpload", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', MULTER_OPTIONS)),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload satu file gambar via server ke Cloudinary' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: { type: 'string', format: 'binary' },
                folder: { type: 'string', example: 'products' },
            },
            required: ['file'],
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Upload berhasil, kembalikan imageUrl + publicId' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'File tidak valid atau melebihi 5MB' }),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)('folder')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)('upload/multiple'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 10, MULTER_OPTIONS)),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload beberapa file gambar sekaligus (maks 10)' }),
    (0, swagger_1.ApiBody)({
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
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Upload berhasil' }),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)('folder')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "uploadMultiple", null);
__decorate([
    (0, common_1.Delete)(':publicId'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Hapus file dari Cloudinary berdasarkan publicId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'File berhasil dihapus' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Gagal menghapus file' }),
    __param(0, (0, common_1.Param)('publicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "deleteFile", null);
__decorate([
    (0, common_1.Post)('blog/upload'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', MULTER_OPTIONS)),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload cover image untuk blog post' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: { file: { type: 'string', format: 'binary' } },
            required: ['file'],
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Upload berhasil' }),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "uploadBlogImage", null);
exports.MediaController = MediaController = __decorate([
    (0, swagger_1.ApiTags)('Media'),
    (0, common_1.Controller)('media'),
    __metadata("design:paramtypes", [media_service_1.MediaService])
], MediaController);
//# sourceMappingURL=media.controller.js.map