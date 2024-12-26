import { User } from "src/Entities/users.entity";
import { Repository } from "typeorm";
import { UpdateUserDTO } from "./DTO/usersDTO";
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    create(createUserDto: Partial<User>): Promise<User>;
    GetUsers(page: number, limit: number): Promise<{
        id: string;
        name: string;
        email: string;
        phone: number;
        birthday: Date;
        country?: string;
        address: string;
        city?: string;
        orders: import("../Entities/orders.entity").Order[];
    }[]>;
    getUsersById(id: string): Promise<{
        id: string;
        name: string;
        email: string;
        phone: number;
        birthday: Date;
        country?: string;
        address: string;
        city?: string;
        orders: import("../Entities/orders.entity").Order[];
    }>;
    makeAdmin(userId: string): Promise<User>;
    deleteUser(id: string): Promise<{
        message: string;
    }>;
    updateUser(id: string, updateUserDTO: UpdateUserDTO): Promise<{
        message: string;
    }>;
}
