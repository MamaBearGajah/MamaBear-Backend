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
exports.AdminCategoriesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_categories_service_1 = require("./admin-categories.service");
const admin_query_dto_1 = require("../dto/admin-query.dto");
let AdminCategoriesController = class AdminCategoriesController {
    adminCategoriesService;
    constructor(adminCategoriesService) {
        this.adminCategoriesService = adminCategoriesService;
    }
    async getAll(query) {
        return this.adminCategoriesService.findAll(query);
    }
};
exports.AdminCategoriesController = AdminCategoriesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get list of categories with pagination and search' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_query_dto_1.AdminBaseQueryDto]),
    __metadata("design:returntype", Promise)
], AdminCategoriesController.prototype, "getAll", null);
exports.AdminCategoriesController = AdminCategoriesController = __decorate([
    (0, swagger_1.ApiTags)('Admin Categories'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('admin/categories'),
    __metadata("design:paramtypes", [admin_categories_service_1.AdminCategoriesService])
], AdminCategoriesController);
//# sourceMappingURL=admin-categories.controller.js.map