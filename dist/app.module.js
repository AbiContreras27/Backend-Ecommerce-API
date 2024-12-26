"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const users_module_1 = require("./Users/users.module");
const products_modules_1 = require("./Products/products.modules");
const auth_modules_1 = require("./Auth/auth.modules");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const categories_module_1 = require("./categories/categories.module");
const orders_module_1 = require("../src/Orders/orders.module");
const cloudinary_module_1 = require("./Cloudinary/cloudinary.module");
const jwt_1 = require("@nestjs/jwt");
const config_2 = require("./config/config");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_modules_1.AuthModule,
            users_module_1.UsersModule,
            products_modules_1.ProductModule,
            jwt_1.JwtModule.register({
                global: true,
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '1h' }
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [config_2.default]
            }), typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => config.get('typeorm'),
            }), categories_module_1.CategoriesModule, orders_module_1.OrdersModule, cloudinary_module_1.CloudinaryModule
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map