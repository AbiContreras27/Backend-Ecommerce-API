"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryModule = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_service_1 = require("./cloudinary.service");
const cloudinary_controller_1 = require("./cloudinary.controller");
const cloudinary_1 = require("../config/cloudinary");
const typeorm_1 = require("@nestjs/typeorm");
const products_entity_1 = require("../Entities/products.entity");
const file_upload_repository_1 = require("./Repository/file-upload.repository");
let CloudinaryModule = class CloudinaryModule {
};
exports.CloudinaryModule = CloudinaryModule;
exports.CloudinaryModule = CloudinaryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([products_entity_1.Products])],
        controllers: [cloudinary_controller_1.CloudinaryController],
        providers: [cloudinary_service_1.FileCloudinaryService, cloudinary_1.CloudinaryConfig, file_upload_repository_1.FileUploadRepository],
    })
], CloudinaryModule);
//# sourceMappingURL=cloudinary.module.js.map