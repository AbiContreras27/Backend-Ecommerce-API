import { DataSource, Repository } from "typeorm";
import { Order } from "src/Entities/orders.entity";
export declare class OrdersRepository extends Repository<Order> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    findOrderById(id: string): Promise<Order>;
}
