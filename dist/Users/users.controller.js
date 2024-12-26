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
exports.UsersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const auth_guard_1 = require("../Auth/guards/auth.guard");
const parse_uuidpipe_pipe_1 = require("../pipes/parse-uuidpipe.pipe");
const roles_decorator_1 = require("../decorators/roles.decorator");
const role_enum_1 = require("../role.enum");
const roles_guard_1 = require("../Auth/guards/roles.guard");
const swagger_1 = require("@nestjs/swagger");
const usersDTO_1 = require("./DTO/usersDTO");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    GetUsers(page, limit) {
        if (page && limit) {
            return this.usersService.GetUsers(page, limit);
        }
        return this.usersService.GetUsers(1, 5);
    }
    getUsersById(id) {
        return this.usersService.getUsersById(id);
    }
    async makeAdmin(id) {
        await this.usersService.makeAdmin(id);
    }
    updateUser(id, updateUserDto) {
        return this.usersService.updateUser(id, updateUserDto);
    }
    deleteUser(id) {
        return this.usersService.deleteUser(id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all Users.' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Users List.',
        schema: {
            example: [{
                    "id": "5cf47a48-f787-4da6-a477-dad708f24671",
                    "name": "Juan Perez",
                    "email": "usuario@mail.com",
                    "phone": 1234567890,
                    "birthday": "1989-12-31",
                    "country": "Argentina",
                    "address": "Calle Falsa 123",
                    "city": "Buenos Aires"
                }]
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
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "GetUsers", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Search for Users by ID' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'User found by ID.',
        schema: {
            example: {
                "id": "5cf47a48-f787-4da6-a477-dad708f24671",
                "name": "Juan Perez",
                "email": "usuario@mail.com",
                "phone": 1234567890,
                "birthday": "1989-12-31",
                "country": "Argentina",
                "address": "Calle Falsa 123",
                "city": "Buenos Aires"
            }
        }
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: 'Invalid User ID.',
        schema: {
            example: {
                "statusCode": 500,
                "message": "Internal server error"
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
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', parse_uuidpipe_pipe_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUsersById", null);
__decorate([
    (0, common_1.Put)(':id/make-admin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "makeAdmin", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(200),
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Modify a User' }),
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
    (0, swagger_1.ApiOkResponse)({
        description: 'modified User.',
        schema: {
            example: {
                "message": "Usuario Modificado"
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
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, usersDTO_1.UpdateUserDTO]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(200),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a User' }),
    (0, swagger_1.ApiOkResponse)({ description: 'User deleted successfully.', schema: { example: 'Usuario Eliminado' } }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Some input value is not found. (uuid is expected)',
        schema: {
            example: {
                "message": "El id \"5cf47a48-f787-4da6-a477-dad708f2467\" no tiene un formato válido de UUID",
                "error": "Bad Request",
                "statusCode": 400
            }
        }
    }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', parse_uuidpipe_pipe_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "deleteUser", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map