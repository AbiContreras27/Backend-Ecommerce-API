import { OrderDetails } from 'src/Entities/orderDetails.entity';
import { Order } from 'src/Entities/orders.entity';
import { Products } from 'src/Entities/products.entity';
import { User } from 'src/Entities/users.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './DTO/CreateOrderDto';
export declare class OrdersService {
    private ordersRepository;
    private productRepository;
    private userRepository;
    private orderDetailsRepository;
    constructor(ordersRepository: Repository<Order>, productRepository: Repository<Products>, userRepository: Repository<User>, orderDetailsRepository: Repository<OrderDetails>);
    addOrder(dataOrder: CreateOrderDto): Promise<{
        orderId: string;
        orderDate: Date;
        totalPrice: number;
        orderDetailId: string;
    }>;
    getOrder(orderId: string): Promise<Order>;
}
