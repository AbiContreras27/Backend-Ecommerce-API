import { UsersService } from "./users.service";
import { UpdateUserDTO } from "./DTO/usersDTO";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
    updateUser(id: string, updateUserDto: UpdateUserDTO): Promise<{
        message: string;
    }>;
    deleteUser(id: string): Promise<{
        message: string;
    }>;
}
