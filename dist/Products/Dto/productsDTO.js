"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductsDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const products_entity_1 = require("../../Entities/products.entity");
class updateProductsDTO extends (0, swagger_1.PartialType)(products_entity_1.Products) {
}
exports.updateProductsDTO = updateProductsDTO;
//# sourceMappingURL=productsDTO.js.map