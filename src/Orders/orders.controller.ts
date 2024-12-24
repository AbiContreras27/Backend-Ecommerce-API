import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './DTO/CreateOrderDto';
import { ParseUUIDPipe } from 'src/pipes/parse-uuidpipe.pipe';
import { AuthGuard } from 'src/Auth/guards/auth.guard';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create Order' })
  @ApiCreatedResponse({
    description: 'Created Order',
    schema: {
      example: {
        "orderId": "7ae9dbcf-3ca3-4e2b-b2ae-57eb8f3ca2ef",
        "orderDate": "2024-12-24T07:13:53.542Z",
        "totalPrice": 39.99,
        "orderDetailId": "98461622-5fbc-43f2-850f-ca80a391fa8e"
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'error when entering parameters',
    schema: {
      example: {
        "message": "Unexpected token : in JSON at position 72",
        "error": "Bad Request",
        "statusCode": 400
      }
    }
  })
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async createOrder(@Body() CreateOrder: CreateOrderDto) {
    return await this.ordersService.addOrder(CreateOrder);
  }

  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Order search by id' })
  @ApiOkResponse({
    description: 'order search by id',
    schema: {
      example: {
        "id": "7ae9dbcf-3ca3-4e2b-b2ae-57eb8f3ca2ef",
        "date": "2024-12-24T07:13:53.542Z",
        "user": {
          "id": "5cf47a48-f787-4da6-a477-dad708f24671",
          "name": "Juan Martinez",
          "email": "usuario@mail.com",
          "password": "$2b$10$AfVaKpn2jhzfJyPuPKKefe8QY3ZTJN/4UxSwRtfboYb9ZBaeNRwEW",
          "phone": 1234567890,
          "birthday": "1989-12-31",
          "country": "Argentina",
          "address": "Calle Falsa 123",
          "city": "Buenos Aires",
          "isAdmin": true
        },
        "orderDetails": {
          "id": "98461622-5fbc-43f2-850f-ca80a391fa8e",
          "price": "39.99",
          "products": [
            {
              "id": "54b246e6-ff01-4397-a11f-eb67e60a1673",
              "name": "Logitech G502 Pro",
              "description": "The best mouse in the world",
              "price": "39.99",
              "stock": 12,
              "imgUrl": "https://example.com/default-image.jpg"
            }
          ]
        }
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'Error: Bad Request',
    schema: {
      example: {
        "message": "El id \"7ae9dbcf-3ca3-4e2b-b2ae-57eb8f3ca2e\" no tiene un formato válido de UUID",
        "error": "Bad Request",
        "statusCode": 400
      }
    }
  })
  @UseGuards(AuthGuard)
  async getOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.getOrder(id)
  }

}