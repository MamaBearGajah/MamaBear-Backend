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
exports.UpdatePromotionDto = exports.CreatePromotionDto = exports.CreatePromotionBenefitDto = exports.CreatePromotionSectionDto = exports.PromotionStatus = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_2 = require("@nestjs/swagger");
var PromotionStatus;
(function (PromotionStatus) {
    PromotionStatus["draft"] = "draft";
    PromotionStatus["active"] = "active";
    PromotionStatus["ended"] = "ended";
})(PromotionStatus || (exports.PromotionStatus = PromotionStatus = {}));
class CreatePromotionSectionDto {
    title;
    subtitle;
    sortOrder;
    isActive;
}
exports.CreatePromotionSectionDto = CreatePromotionSectionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Our Hamper Collection' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePromotionSectionDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Explore our bundle hampers' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePromotionSectionDto.prototype, "subtitle", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreatePromotionSectionDto.prototype, "sortOrder", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreatePromotionSectionDto.prototype, "isActive", void 0);
class CreatePromotionBenefitDto {
    icon;
    title;
    description;
    sortOrder;
}
exports.CreatePromotionBenefitDto = CreatePromotionBenefitDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '💖' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePromotionBenefitDto.prototype, "icon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Premium Quality' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePromotionBenefitDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'High-quality curated items for Mother\'s Day.' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePromotionBenefitDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreatePromotionBenefitDto.prototype, "sortOrder", void 0);
class CreatePromotionDto {
    title;
    slug;
    subtitle;
    description;
    badgeText;
    startDate;
    endDate;
    status;
    heroBundleId;
    sections;
    benefits;
}
exports.CreatePromotionDto = CreatePromotionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Mother's Day Special 2025" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePromotionDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'mothers-day-2025' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePromotionDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'The Perfect All-In-One Bundle Hamper' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePromotionDto.prototype, "subtitle", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePromotionDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Mother's Day Special • 1 - 31 May" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePromotionDto.prototype, "badgeText", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsISO8601)(),
    __metadata("design:type", String)
], CreatePromotionDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsISO8601)(),
    __metadata("design:type", String)
], CreatePromotionDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: PromotionStatus, default: PromotionStatus.draft }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(PromotionStatus),
    __metadata("design:type", String)
], CreatePromotionDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'UUID bundle yang jadi hero. Jika null, otomatis dipilih.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePromotionDto.prototype, "heroBundleId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [CreatePromotionSectionDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreatePromotionSectionDto),
    __metadata("design:type", Array)
], CreatePromotionDto.prototype, "sections", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [CreatePromotionBenefitDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreatePromotionBenefitDto),
    __metadata("design:type", Array)
], CreatePromotionDto.prototype, "benefits", void 0);
class UpdatePromotionDto extends (0, swagger_2.PartialType)(CreatePromotionDto) {
}
exports.UpdatePromotionDto = UpdatePromotionDto;
//# sourceMappingURL=create-promotion.dto.js.map