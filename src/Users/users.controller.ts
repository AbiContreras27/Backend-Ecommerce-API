import { Controller, Get, Param, Post, Body, Put, Delete, Query, UseGuards, HttpCode, UsePipes, ValidationPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthGuard } from "src/Auth/guards/auth.guard";
import { ParseUUIDPipe } from "src/pipes/parse-uuidpipe.pipe";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/role.enum";
import { RolesGuard } from "src/Auth/guards/roles.guard";
import { ApiBadRequestResponse, ApiBearerAuth, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { UpdateUserDTO } from "./DTO/usersDTO";



@ApiTags('Users')
@Controller('users')

export class UsersController {
    constructor(private readonly usersService: UsersService) { }



    @ApiBearerAuth()
    @HttpCode(200)
    @Get()
    @ApiOperation({ summary: 'Get all Users.' })
    @ApiOkResponse({
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
    })
    @ApiUnauthorizedResponse({
        description: 'Not Authorized',
        schema: {
            example: {
                "message": "Not Authorized",
                "error": "Unauthorized",
                "statusCode": 401
            }
        }
    })
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    GetUsers(@Query('page') page: number, @Query('limit') limit: number) {

        if (page && limit) {
            return this.usersService.GetUsers(page, limit)
        }
        return this.usersService.GetUsers(1, 5)
    }

    @ApiBearerAuth()
    @HttpCode(200)
    @Get(':id')
    @ApiOperation({ summary: 'Search for Users by ID' })
    @ApiOkResponse({
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
    })
    @ApiInternalServerErrorResponse({
        description: 'Invalid User ID.',
        schema: {
            example: {
                "statusCode": 500,
                "message": "Internal server error"
            }
        }
    })
    @ApiUnauthorizedResponse({
        description: 'Not Authorized',
        schema: {
            example: {
                "message": "Not Authorized",
                "error": "Unauthorized",
                "statusCode": 401
            }
        }
    })
    @UseGuards(AuthGuard)
    getUsersById(@Param('id', ParseUUIDPipe) id: string) {
        return this.usersService.getUsersById(id);
    }

    @ApiBearerAuth()
    @HttpCode(200)
    @Put(':id')
    @ApiOperation({ summary: 'Modify a User' })
    @ApiUnauthorizedResponse({
        description: 'Not Authorized',
        schema: {
            example: {
                "message": "Not Authorized",
                "error": "Unauthorized",
                "statusCode": 401
            }
        }
    })
    @ApiOkResponse({
        description: 'modified User.',
        schema: {
            example: {
                "message": "Usuario Modificado"
            }
        }
    })
    @ApiBadRequestResponse({
        description: 'your request has incorrect parameters.',
        schema: {
            example: {
                "message": "Unexpected token \n in JSON at position 26",
                "error": "Bad Request",
                "statusCode": 400
            },
        },
    })
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDTO) {

        return this.usersService.updateUser(id, updateUserDto)
    }

    @ApiBearerAuth()
    @HttpCode(200)
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a User' })
    @ApiOkResponse({ description: 'User deleted successfully.', schema: { example: 'Usuario Eliminado' } })
    @ApiBadRequestResponse({
        description: 'Some input value is not found. (uuid is expected)',
        schema: {
            example: {
                "message": "El id \"5cf47a48-f787-4da6-a477-dad708f2467\" no tiene un formato válido de UUID",
                "error": "Bad Request",
                "statusCode": 400
            }
        }
    })
    @UseGuards(AuthGuard)
    deleteUser(@Param('id', ParseUUIDPipe) id: string) {
        return this.usersService.deleteUser(id)
    }





}