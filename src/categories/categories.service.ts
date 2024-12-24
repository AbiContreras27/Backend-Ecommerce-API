import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/Entities/categories.entity';
import { Repository } from 'typeorm';
import * as data from "../assets/data.json"

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category) private categoryRepository: Repository<Category>,
    ) { }

    addCategories() {
        const filteredCategories = []
        data.map(async (product) => {
            await this.categoryRepository
                .createQueryBuilder()
                .insert()
                .into(Category)
                .values({ name: product.category })
                .orIgnore()
                .execute();
        })

        return 'Categorias Agregadas'
    }

    async getCategories() {

        return await this.categoryRepository.find()

    }

}