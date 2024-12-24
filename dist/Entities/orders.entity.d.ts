import { OrderDetails } from './orderDetails.entity';
import { User } from './users.entity';
export declare class Order {
    id: string;
    date: Date;
    orderDetails: OrderDetails;
    user: User;
}
