import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Order } from "src/Entities/orders.entity";


@Injectable()
export class OrdersRepository extends Repository<Order> {
    constructor(private readonly dataSource: DataSource) {
        super(Order, dataSource.createEntityManager());
    }

    async findOrderById(id: string) {
        return this.findOne({ where: { id }, relations: ['details', 'details.product'] });
    }
}