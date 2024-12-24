import { Order } from './orders.entity';
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: number;
    birthday: Date;
    country?: string;
    address: string;
    city?: string;
    isAdmin: boolean;
    orders: Order[];
}
