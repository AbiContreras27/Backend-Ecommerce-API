import { OrdersService } from './orders.service';
import { CreateOrderDto } from './DTO/CreateOrderDto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    createOrder(CreateOrder: CreateOrderDto): Promise<{
        orderId: string;
        orderDate: Date;
        totalPrice: number;
        orderDetailId: string;
    }>;
    getOrder(id: string): Promise<import("../Entities/orders.entity").Order>;
}
