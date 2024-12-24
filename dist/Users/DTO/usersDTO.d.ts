export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    phone: number;
    birthday: Date;
    country?: string;
    address: string;
    city?: string;
    isAdmin: boolean;
}
declare const UpdateUserDTO_base: import("@nestjs/common").Type<Partial<CreateUserDto>>;
export declare class UpdateUserDTO extends UpdateUserDTO_base {
}
export {};
