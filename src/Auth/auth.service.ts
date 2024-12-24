import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/Entities/users.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt";


@Injectable()

export class AuthService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>,
        private jwtService: JwtService) { }


    async signIn(email: string, password: string) {

        const user = await this.usersRepository.findOneBy({ email });
        if (!user) {
            throw new NotFoundException('Usuario no encontrado')
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new BadRequestException('Credenciales inválidas');
        }

        const payload = {
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin,
        }
        const token = this.jwtService.sign(payload);

        return {
            token,
            message: "User Logeed In"
        }
    }

    async signUp(user: Partial<User>) {
        const foundUser = await this.usersRepository.findOneBy({ email: user.email });

        if (foundUser) {
            throw new ConflictException('User already registered')
        }

        const hashedPassword = await bcrypt.hash(user.password, 10)
        const newUser = { ...user, password: hashedPassword };

        const saveUser = await this.usersRepository.save(newUser)

        const { password, ...userWithoutPassword } = saveUser

        return userWithoutPassword;
    }
}