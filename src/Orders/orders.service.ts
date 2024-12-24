import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetails } from 'src/Entities/orderDetails.entity';
import { Order } from 'src/Entities/orders.entity';
import { Products } from 'src/Entities/products.entity';
import { User } from 'src/Entities/users.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './DTO/CreateOrderDto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order) private ordersRepository: Repository<Order>,
        @InjectRepository(Products) private productRepository: Repository<Products>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(OrderDetails) private orderDetailsRepository: Repository<OrderDetails>
    ) { }

    async addOrder(dataOrder: CreateOrderDto) {

        const userFound = await this.userRepository.findOne({ where: { id: dataOrder.userId } });
        if (!userFound) throw new NotFoundException("User not found.");
        console.log("este es userFound", userFound)

        const newOrder = this.ordersRepository.create({
            id: uuid(),
            user: userFound,
            date: new Date(),
        });

        await this.ordersRepository.save(newOrder);

        let totalPrice = 0;

        const productsToAdd: Products[] = [];

        for (const product of dataOrder.products) {
            const productFound = await this.productRepository.findOne({ where: { id: product.id } });

            console.log("este productFount", productFound)
            // if (productFound.stock <= 0) continue;

            productsToAdd.push(productFound);

            totalPrice += parseFloat(productFound.price.toString());
        }

        const newOrderDetail = this.orderDetailsRepository.create({
            id: uuid(),
            price: totalPrice,
            order: newOrder,
            products: productsToAdd,
        });

        await this.orderDetailsRepository.save(newOrderDetail);

        return { orderId: newOrder.id, orderDate: newOrder.date, totalPrice: totalPrice, orderDetailId: newOrderDetail.id };


    }

    async getOrder(orderId: string) {

        const order = await this.ordersRepository.findOne({
            where: { id: orderId },
            relations: ['user', 'orderDetails', 'orderDetails.products']
        })

        if (!order) {
            throw new NotFoundException('Orden no encontrada')
        }
        return order;
    }

}