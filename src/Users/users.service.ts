import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/Entities/users.entity";
import { Repository } from "typeorm";
import { UpdateUserDTO } from "./DTO/usersDTO";


@Injectable()

export class UsersService {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) { }


    async create(createUserDto: Partial<User>) {
        const newUser = this.usersRepository.create(createUserDto)

        return await this.usersRepository.save(newUser)
    }

    async GetUsers(page: number, limit: number) {
        const [pageUsers] = await this.usersRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
        })

        const PublicUser = pageUsers.map(
            ({ isAdmin, password, ...extractUsers }) => extractUsers,
        );

        return PublicUser;

    }

    async getUsersById(id: string) {
        const userFoundById = await this.usersRepository.findOneBy({ id })

        const { isAdmin, password, ...userByIdResul } = userFoundById

        return userByIdResul;

    }

    async makeAdmin(userId: string): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { id: userId } });

        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        user.isAdmin = true;
        return this.usersRepository.save(user);
    }


    async deleteUser(id: string) {
        await this.usersRepository.delete(id)
        return { message: 'Usuario Eliminado' }

    }

    async updateUser(id: string, updateUserDTO: UpdateUserDTO) {
        await this.usersRepository.update(id, updateUserDTO)
        return { message: 'Usuario Modificado' }
    }
}