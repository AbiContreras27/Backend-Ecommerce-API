import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/Entities/orders.entity';
import { OrderDetails } from 'src/Entities/orderDetails.entity';
import { User } from 'src/Entities/users.entity';
import { Products } from 'src/Entities/products.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderDetails, User, Products]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule { }
