"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHealthDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_health_dto_1 = require("./create-health.dto");
class UpdateHealthDto extends (0, swagger_1.PartialType)(create_health_dto_1.CreateHealthDto) {
}
exports.UpdateHealthDto = UpdateHealthDto;
//# sourceMappingURL=update-health.dto.js.map