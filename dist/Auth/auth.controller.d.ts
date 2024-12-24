import { AuthService } from "./auth.service";
import { LoginUserDTO } from "./DTO/AuthDTO";
import { CreateUserDto } from "src/Users/DTO/usersDTO";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(userData: CreateUserDto): Promise<{
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
    signIn(user: LoginUserDTO): Promise<{
        token: string;
        message: string;
    }>;
}
