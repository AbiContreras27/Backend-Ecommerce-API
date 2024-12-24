import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Products } from "src/Entities/products.entity";
import { Repository } from "typeorm";
import * as data from '../assets/data.json'
import { Category } from "src/Entities/categories.entity";


@Injectable()

export class ProductService {
    constructor(@InjectRepository(Products) private productsRepository: Repository<Products>,
        @InjectRepository(Category) private categoriesRepository: Repository<Category>) { }

    async getProducts() {
        return await this.productsRepository.find()
    }

    async addProducts() {
        try {

            const categories = await this.categoriesRepository.find();
            console.log(categories)

            data?.map(async (element) => {
                const category = categories.find((category) => category.name === element.category);

                const products = new Products()
                products.name = element.name;
                products.price = element.price;
                products.description = element.description;
                products.stock = element.stock;
                products.category = category;

                await this.productsRepository
                    .createQueryBuilder()
                    .insert()
                    .into(Products)
                    .values(products)
                    .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
                    .execute()
            })

            return 'Productos agregados'

        } catch (error) {

            throw new NotFoundException('Producto no encontrado')

        }

    }

    getProductsById(id: string) {
        try {
            return this.productsRepository.findOneBy({ id })
        } catch (error) {
            throw new NotFoundException(`Producto con id: ${id} no encontrado`)
        }

    }

    async updateProducts(id: string, updateProductsDto: Partial<Products>) {
        try {
            await this.productsRepository.update(id, updateProductsDto)
            return { message: 'Producto Modificado' }
        } catch (error) {
            throw new NotFoundException('El producto no se logro actualizar')
        }
    }

    async deleteProduct(id: string) {
        try {
            await this.productsRepository.delete(id)
            return { message: 'Producto Eliminado' }
        } catch (error) {
            throw new BadRequestException('El producto no se logro eliminar')
        }

    }

}