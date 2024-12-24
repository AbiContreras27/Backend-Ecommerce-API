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
exports.CloudinaryController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const cloudinary_service_1 = require("./cloudinary.service");
const platform_express_1 = require("@nestjs/platform-express");
const auth_guard_1 = require("../Auth/guards/auth.guard");
const swagger_1 = require("@nestjs/swagger");
let CloudinaryController = class CloudinaryController {
    constructor(fileCloudinaryService) {
        this.fileCloudinaryService = fileCloudinaryService;
    }
    async uploadImagen(productId, file) {
        return this.fileCloudinaryService.uploadProductImage(file, productId);
    }
};
exports.CloudinaryController = CloudinaryController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('uploadImage/:productId'),
    (0, swagger_1.ApiOperation)({ summary: 'Add Files' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'file added successfully',
        schema: {
            example: {
                "id": "1f452184-8889-4caa-989a-494e5b7a1e2c",
                "fullname": "Liam Moore",
                "username": "liammoore",
                "profile_image": "https://res.cloudinary.com/dz24lee3x/image/upload/v1734988502/hu44vzsmfgyrtd068nfu.png"
            }
        }
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'User Not Found ',
        schema: {
            example: {
                "message": "User not found.",
                "error": "Not Found",
                "statusCode": 404
            }
        }
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Error: Bad Request',
        schema: {
            example: {
                "message": "File must be maximum 200kb",
                "error": "Bad Request",
                "statusCode": 400
            }
        }
    }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: { type: 'object', properties: { file: { type: 'string', format: 'binary', } } }
    }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Param)('productId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({
                maxSize: 200 * 1024,
                message: 'Archivo admite maximo 200kb'
            }),
            new common_1.FileTypeValidator({ fileType: /(jpg|jpeg|png|gif)$/, })
        ],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CloudinaryController.prototype, "uploadImagen", null);
exports.CloudinaryController = CloudinaryController = __decorate([
    (0, swagger_1.ApiTags)('Files'),
    (0, common_1.Controller)('files'),
    __metadata("design:paramtypes", [cloudinary_service_1.FileCloudinaryService])
], CloudinaryController);
//# sourceMappingURL=cloudinary.controller.js.map