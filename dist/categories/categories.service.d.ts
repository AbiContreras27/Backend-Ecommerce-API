import { Category } from 'src/Entities/categories.entity';
import { Repository } from 'typeorm';
export declare class CategoriesService {
    private categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    addCategories(): string;
    getCategories(): Promise<Category[]>;
}
