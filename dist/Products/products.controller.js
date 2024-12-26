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
exports.ProductController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const auth_guard_1 = require("../Auth/guards/auth.guard");
const roles_decorator_1 = require("../decorators/roles.decorator");
const role_enum_1 = require("../role.enum");
const roles_guard_1 = require("../Auth/guards/roles.guard");
const swagger_1 = require("@nestjs/swagger");
const productsDTO_1 = require("../Products/DTO/productsDTO");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    getProducts() {
        return this.productService.getProducts();
    }
    addProducts() {
        return this.productService.addProducts();
    }
    getProductsById(id) {
        return this.productService.getProductsById(id);
    }
    updateProducts(id, updateProductsDto) {
        return this.productService.updateProducts(id, updateProductsDto);
    }
    async deleteProduct(id) {
        return this.productService.deleteProduct(id);
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Products list' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Products list',
        schema: {
            example: {
                "id": "32ec3181-3b1f-4843-9d96-56ab4d5143fa",
                "name": "Iphone 15",
                "description": "The best smartphone in the world",
                "price": "199.99",
                "stock": 12,
                "imgUrl": "https://example.com/default-image.jpg"
            }
        }
    }),
    openapi.ApiResponse({ status: 200, type: [require("../Entities/products.entity").Products] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getProducts", null);
__decorate([
    (0, common_1.Get)('seeder'),
    (0, swagger_1.ApiOperation)({ summary: 'Add Products' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Add Products',
        schema: {
            example: {
                "message": "Productos agregados"
            }
        }
    }),
    openapi.ApiResponse({ status: 200, type: String }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "addProducts", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'product search by ID' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'product search by ID',
        schema: {
            example: {
                "id": "32ec3181-3b1f-4843-9d96-56ab4d5143fa",
                "name": "Iphone 15",
                "description": "The best smartphone in the world",
                "price": "199.99",
                "stock": 12,
                "imgUrl": "https://example.com/default-image.jpg"
            }
        }
    }),
    openapi.ApiResponse({ status: 200, type: require("../Entities/products.entity").Products }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getProductsById", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Modify product' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Modified product',
        schema: {
            example: {
                "id": "32ec3181-3b1f-4843-9d96-56ab4d5143fa",
                "name": "Iphone 15",
                "description": "The best smartphone in the world",
                "price": "199.99",
                "stock": 12,
                "imgUrl": "https://example.com/default-image.jpg"
            }
        }
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Not Authorized',
        schema: {
            example: {
                "message": "Not Authorized",
                "error": "Unauthorized",
                "statusCode": 401
            }
        }
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'your request has incorrect parameters.',
        schema: {
            example: {
                "message": "Unexpected token \n in JSON at position 26",
                "error": "Bad Request",
                "statusCode": 400
            },
        },
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, productsDTO_1.updateProductsDTO]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "updateProducts", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete product' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Deleted product',
        schema: {
            example: {
                "message": "Producto Eliminado"
            }
        }
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'your request has incorrect parameters.',
        schema: {
            example: {
                "message": "Unexpected token \n in JSON at position 26",
                "error": "Bad Request",
                "statusCode": 400
            },
        },
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Not Authorized',
        schema: {
            example: {
                "message": "Not Authorized",
                "error": "Unauthorized",
                "statusCode": 401
            }
        }
    }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProduct", null);
exports.ProductController = ProductController = __decorate([
    (0, swagger_1.ApiTags)('Product'),
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductService])
], ProductController);
//# sourceMappingURL=products.controller.js.map