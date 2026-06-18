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
exports.ReviewsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const reviews_service_1 = require("./reviews.service");
const create_review_dto_1 = require("../dto/create-review.dto");
const update_review_dto_1 = require("../dto/update-review.dto");
const helpful_vote_dto_1 = require("../dto/helpful-vote.dto");
const review_query_dto_1 = require("../dto/review-query.dto");
const decorators_1 = require("../../auth/decorators");
const enums_1 = require("../../../generated/prisma/enums");
let ReviewsController = class ReviewsController {
    reviewsService;
    constructor(reviewsService) {
        this.reviewsService = reviewsService;
    }
    getReviews(productId, query, userId) {
        return this.reviewsService.getReviews(productId, query.page, query.limit, query.sortBy, query.sortOrder, userId);
    }
    getRatingSummary(productId) {
        return this.reviewsService.getRatingSummary(productId);
    }
    createReview(productId, dto, userId) {
        return this.reviewsService.createReview(productId, userId, dto);
    }
    updateReview(reviewId, dto, userId) {
        return this.reviewsService.updateReview(reviewId, userId, dto);
    }
    deleteReview(reviewId, userId, role) {
        return this.reviewsService.deleteReview(reviewId, userId, role);
    }
    toggleHelpful(reviewId, dto, userId) {
        return this.reviewsService.toggleHelpful(reviewId, userId, dto.isHelpful);
    }
};
exports.ReviewsController = ReviewsController;
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get semua review produk (public, paginated)' }),
    (0, swagger_1.ApiParam)({ name: 'productId' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'rating', required: false, type: Number, description: 'Filter by rating 1-5' }),
    (0, swagger_1.ApiQuery)({ name: 'sortBy', required: false, enum: ['rating', 'createdAt'] }),
    (0, swagger_1.ApiQuery)({ name: 'sortOrder', required: false, enum: ['asc', 'desc'] }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List review berhasil diambil' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Produk tidak ditemukan' }),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, decorators_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, review_query_dto_1.ReviewQueryDto, String]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "getReviews", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('rating-summary'),
    (0, swagger_1.ApiOperation)({ summary: 'Get rating summary — avgRating, ratingCount, breakdown (public)' }),
    (0, swagger_1.ApiParam)({ name: 'productId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Rating summary berhasil diambil' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Produk tidak ditemukan' }),
    __param(0, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "getRatingSummary", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Buat review — harus verified purchase dengan status delivered (Bearer)' }),
    (0, swagger_1.ApiParam)({ name: 'productId' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Review berhasil dibuat' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Rating atau review harus diisi' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Bukan verified purchase atau order belum delivered' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Produk atau order tidak ditemukan' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Sudah pernah review produk ini untuk order ini' }),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_review_dto_1.CreateReviewDto, String]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "createReview", null);
__decorate([
    (0, common_1.Put)(':reviewId'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Edit review milik sendiri (Bearer)' }),
    (0, swagger_1.ApiParam)({ name: 'productId' }),
    (0, swagger_1.ApiParam)({ name: 'reviewId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Review berhasil diupdate' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Bukan review milik Anda' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Review tidak ditemukan' }),
    __param(0, (0, common_1.Param)('reviewId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_review_dto_1.UpdateReviewDto, String]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "updateReview", null);
__decorate([
    (0, common_1.Delete)(':reviewId'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Hapus review — milik sendiri atau admin (Bearer)' }),
    (0, swagger_1.ApiParam)({ name: 'productId' }),
    (0, swagger_1.ApiParam)({ name: 'reviewId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Review berhasil dihapus' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Bukan review milik Anda' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Review tidak ditemukan' }),
    __param(0, (0, common_1.Param)('reviewId')),
    __param(1, (0, decorators_1.GetUser)('id')),
    __param(2, (0, decorators_1.GetUser)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "deleteReview", null);
__decorate([
    (0, common_1.Post)(':reviewId/helpful'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Toggle helpful vote — kirim same value lagi untuk hapus vote (Bearer)' }),
    (0, swagger_1.ApiParam)({ name: 'productId' }),
    (0, swagger_1.ApiParam)({ name: 'reviewId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Vote berhasil diupdate atau dihapus' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Review tidak ditemukan' }),
    __param(0, (0, common_1.Param)('reviewId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, helpful_vote_dto_1.HelpfulVoteDto, String]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "toggleHelpful", null);
exports.ReviewsController = ReviewsController = __decorate([
    (0, swagger_1.ApiTags)('Product Reviews'),
    (0, common_1.Controller)('products/:productId/reviews'),
    __metadata("design:paramtypes", [reviews_service_1.ReviewsService])
], ReviewsController);
//# sourceMappingURL=reviews.controller.js.map