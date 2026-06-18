"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiPagination = ApiPagination;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
function ApiPagination() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, example: 1, description: 'Halaman ke-' }), (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, example: 20, description: 'Jumlah item per halaman' }));
}
//# sourceMappingURL=api-pagination.decorator.js.map