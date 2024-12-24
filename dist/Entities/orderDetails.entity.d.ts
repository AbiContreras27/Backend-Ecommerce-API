import { Products } from "./products.entity";
import { Order } from "./orders.entity";
export declare class OrderDetails {
    id: string;
    price: number;
    products: Products[];
    order: Order;
}
