"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const orderDetails_entity_1 = require("../Entities/orderDetails.entity");
const orders_entity_1 = require("../Entities/orders.entity");
const products_entity_1 = require("../Entities/products.entity");
const users_entity_1 = require("../Entities/users.entity");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
let OrdersService = class OrdersService {
    constructor(ordersRepository, productRepository, userRepository, orderDetailsRepository) {
        this.ordersRepository = ordersRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.orderDetailsRepository = orderDetailsRepository;
    }
    async addOrder(dataOrder) {
        const userFound = await this.userRepository.findOne({ where: { id: dataOrder.userId } });
        if (!userFound)
            throw new common_1.NotFoundException("User not found.");
        console.log("este es userFound", userFound);
        const newOrder = this.ordersRepository.create({
            id: (0, uuid_1.v4)(),
            user: userFound,
            date: new Date(),
        });
        await this.ordersRepository.save(newOrder);
        let totalPrice = 0;
        const productsToAdd = [];
        for (const product of dataOrder.products) {
            const productFound = await this.productRepository.findOne({ where: { id: product.id } });
            console.log("este productFount", productFound);
            productsToAdd.push(productFound);
            totalPrice += parseFloat(productFound.price.toString());
        }
        const newOrderDetail = this.orderDetailsRepository.create({
            id: (0, uuid_1.v4)(),
            price: totalPrice,
            order: newOrder,
            products: productsToAdd,
        });
        await this.orderDetailsRepository.save(newOrderDetail);
        return { orderId: newOrder.id, orderDate: newOrder.date, totalPrice: totalPrice, orderDetailId: newOrderDetail.id };
    }
    async getOrder(orderId) {
        const order = await this.ordersRepository.findOne({
            where: { id: orderId },
            relations: ['user', 'orderDetails', 'orderDetails.products']
        });
        if (!order) {
            throw new common_1.NotFoundException('Orden no encontrada');
        }
        return order;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(orders_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(products_entity_1.Products)),
    __param(2, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(orderDetails_entity_1.OrderDetails)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrdersService);
//# sourceMappingURL=orders.service.js.map