import { ApiHideProperty, ApiProperty, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator"



export class CreateUserDto {

        @ApiProperty({
                type: String,
                description: 'Nombre completo del usuario',
                example: 'Juan Perez'
        })
        @IsString()
        @IsNotEmpty()
        @MaxLength(50)
        name: string;

        @ApiProperty({
                type: String,
                description: 'Correo electrónico del usuario',
                example: 'usuario@mail.com'
        })
        @IsEmail()
        @IsNotEmpty()
        @MaxLength(50)
        email: string;

        @ApiProperty({
                type: String,
                description: 'Contraseña del usuario',
                example: 'Usuario$123'
        })
        @IsNotEmpty()
        @MinLength(8)
        @MaxLength(15)
        @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/)
        password: string;

        @ApiProperty({
                type: Number,
                description: 'Número de teléfono del usuario',
                example: 1234567890
        })
        @IsInt()
        @IsNotEmpty()
        phone: number;

        @ApiProperty({
                type: Date,
                description: 'Fecha de nacimiento del usuario',
                example: '1990-01-01'
        })
        @IsDate()
        @Type(() => Date)
        birthday: Date;

        @ApiProperty({
                type: String,
                description: 'País de residencia del usuario',
                example: 'Argentina',
                required: false
        })
        @IsOptional()
        @IsString()
        @MaxLength(50)
        country?: string;

        @ApiProperty({
                type: String,
                description: 'Dirección del usuario',
                example: 'Calle Falsa 123',
        })
        @IsString()
        @IsNotEmpty()
        address: string;

        @ApiProperty({
                type: String,
                description: 'Ciudad de residencia del usuario',
                example: 'Buenos Aires',
                required: false
        })
        @IsOptional()
        @IsString()
        @MaxLength(50)
        city?: string;

        @ApiHideProperty()
        @IsOptional()
        @IsBoolean()
        isAdmin: boolean;
}

export class UpdateUserDTO extends PartialType(CreateUserDto) { }