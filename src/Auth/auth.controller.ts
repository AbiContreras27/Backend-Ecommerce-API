import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDTO } from "./DTO/AuthDTO";
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "src/Users/DTO/usersDTO";

@ApiTags('Auth')
@Controller('auth')

export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/signup')
    @ApiOperation({ summary: 'User registration' })
    @ApiCreatedResponse({
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
    })
    @ApiConflictResponse({
        description: 'error creating user',
        schema: {
            example: {
                "message": "El email ó nombre de usuario ya se encuentra registrado.",
                "error": "Conflict",
                "statusCode": 409
            }
        }
    })
    @ApiBadRequestResponse({
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
    })
    signup(@Body() userData: CreateUserDto) {
        return this.authService.signUp(userData)
    }

    @Post('signin')
    @ApiOperation({ summary: 'User login' })
    @ApiOkResponse({
        description: 'successful user login',
        schema: {
            example: {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZjQ3YTQ4LWY3ODctNGRhNi1hNDc3LWRhZDcwOGYyNDY3MSIsImVtYWlsIjoidXN1YXJpb0BtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MzUwMTk1NzksImV4cCI6MTczNTAyMzE3OX0.hQXdSip_xIptC1ydV3-72i7YkIfFtAZODBGOCuCSMKE",
                "message": "User Logeed In"
            }
        }
    })
    @ApiBadRequestResponse({
        description: 'Invalid credentials',
        schema: {
            example: {
                "message": "Credenciales inválidas",
                "error": "Bad Request",
                "statusCode": 400
            }
        }
    })
    @HttpCode(200)
    async signIn(@Body() user: LoginUserDTO) {
        const { email, password } = user
        return this.authService.signIn(email, password)
    }
}