import { User } from "src/Entities/users.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private usersRepository;
    private jwtService;
    constructor(usersRepository: Repository<User>, jwtService: JwtService);
    signIn(email: string, password: string): Promise<{
        token: string;
        message: string;
    }>;
    signUp(user: Partial<User>): Promise<{
        id: string;
        name: string;
        email: string;
        phone: number;
        birthday: Date;
        country?: string;
        address: string;
        city?: string;
        isAdmin: boolean;
        orders: import("../Entities/orders.entity").Order[];
    }>;
}
