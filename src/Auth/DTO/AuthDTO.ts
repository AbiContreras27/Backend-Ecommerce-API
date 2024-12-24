import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Matches } from "class-validator"

export class LoginUserDTO {

    @ApiProperty({
        type: String,
        description: "El correo debe ser valido",
        example: "usuario@mail.com"
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        type: String,
        description: "La contraseña debe de estar entre 8 a 15 dígitos e incluir números, mayúsculas, minusculas y por lo menos un caracter especial",
        example: "Usuario$123"
    })
    @IsNotEmpty()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/)
    password: string;
}
