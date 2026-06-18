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
exports.SignUploadDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class SignUploadDto {
    folder;
    fileName;
    fileType;
}
exports.SignUploadDto = SignUploadDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'products', description: 'Cloudinary folder tujuan upload' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SignUploadDto.prototype, "folder", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'image.jpg' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SignUploadDto.prototype, "fileName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'image/jpeg', enum: ['image/jpeg', 'image/png', 'image/webp'] }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['image/jpeg', 'image/png', 'image/webp']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SignUploadDto.prototype, "fileType", void 0);
//# sourceMappingURL=sign-upload.dto.js.map