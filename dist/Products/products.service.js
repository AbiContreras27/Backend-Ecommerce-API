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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const products_entity_1 = require("../Entities/products.entity");
const typeorm_2 = require("typeorm");
const data = require("../assets/data.json");
const categories_entity_1 = require("../Entities/categories.entity");
let ProductService = class ProductService {
    constructor(productsRepository, categoriesRepository) {
        this.productsRepository = productsRepository;
        this.categoriesRepository = categoriesRepository;
    }
    async getProducts() {
        return await this.productsRepository.find();
    }
    async addProducts() {
        try {
            const categories = await this.categoriesRepository.find();
            console.log(categories);
            data?.map(async (element) => {
                const category = categories.find((category) => category.name === element.category);
                const products = new products_entity_1.Products();
                products.name = element.name;
                products.price = element.price;
                products.description = element.description;
                products.stock = element.stock;
                products.category = category;
                await this.productsRepository
                    .createQueryBuilder()
                    .insert()
                    .into(products_entity_1.Products)
                    .values(products)
                    .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
                    .execute();
            });
            return 'Productos agregados';
        }
        catch (error) {
            throw new common_1.NotFoundException('Producto no encontrado');
        }
    }
    getProductsById(id) {
        try {
            return this.productsRepository.findOneBy({ id });
        }
        catch (error) {
            throw new common_1.NotFoundException(`Producto con id: ${id} no encontrado`);
        }
    }
    async updateProducts(id, updateProductsDto) {
        try {
            await this.productsRepository.update(id, updateProductsDto);
            return { message: 'Producto Modificado' };
        }
        catch (error) {
            throw new common_1.NotFoundException('El producto no se logro actualizar');
        }
    }
    async deleteProduct(id) {
        try {
            await this.productsRepository.delete(id);
            return { message: 'Producto Eliminado' };
        }
        catch (error) {
            throw new common_1.BadRequestException('El producto no se logro eliminar');
        }
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(products_entity_1.Products)),
    __param(1, (0, typeorm_1.InjectRepository)(categories_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductService);
//# sourceMappingURL=products.service.js.map