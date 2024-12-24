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
exports.AuthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const AuthDTO_1 = require("./DTO/AuthDTO");
const swagger_1 = require("@nestjs/swagger");
const usersDTO_1 = require("../Users/DTO/usersDTO");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    signup(userData) {
        return this.authService.signUp(userData);
    }
    async signIn(user) {
        const { email, password } = user;
        return this.authService.signIn(email, password);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('/signup'),
    (0, swagger_1.ApiOperation)({ summary: 'User registration' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'successful user registration',
        schema: {
            example: {
                "name": "Juan Perez",
                "email": "usuario@mail.com",
                "phone": 1234567890,
                "birthday": "1990-01-01T00:00:00.000Z",
                "country": "Argentina",
                "address": "Calle Falsa 123",
                "city": "Buenos Aires",
                "id": "5cf47a48-f787-4da6-a477-dad708f24671",
                "isAdmin": false
            }
        }
    }),
    (0, swagger_1.ApiConflictResponse)({
        description: 'error creating user',
        schema: {
            example: {
                "message": "El email ó nombre de usuario ya se encuentra registrado.",
                "error": "Conflict",
                "statusCode": 409
            }
        }
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'invalid input',
        schema: {
            example: {
                "message": [
                    "property cit should not exist"
                ],
                "error": "Bad Request",
                "statusCode": 400
            }
        }
    }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [usersDTO_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('signin'),
    (0, swagger_1.ApiOperation)({ summary: 'User login' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'successful user login',
        schema: {
            example: {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZjQ3YTQ4LWY3ODctNGRhNi1hNDc3LWRhZDcwOGYyNDY3MSIsImVtYWlsIjoidXN1YXJpb0BtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MzUwMTk1NzksImV4cCI6MTczNTAyMzE3OX0.hQXdSip_xIptC1ydV3-72i7YkIfFtAZODBGOCuCSMKE",
                "message": "User Logeed In"
            }
        }
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Invalid credentials',
        schema: {
            example: {
                "message": "Credenciales inválidas",
                "error": "Bad Request",
                "statusCode": 400
            }
        }
    }),
    (0, common_1.HttpCode)(200),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AuthDTO_1.LoginUserDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map