import { Products } from "src/Entities/products.entity";
import { Repository } from "typeorm";
import { Category } from "src/Entities/categories.entity";
export declare class ProductService {
    private productsRepository;
    private categoriesRepository;
    constructor(productsRepository: Repository<Products>, categoriesRepository: Repository<Category>);
    getProducts(): Promise<Products[]>;
    addProducts(): Promise<string>;
    getProductsById(id: string): Promise<Products>;
    updateProducts(id: string, updateProductsDto: Partial<Products>): Promise<{
        message: string;
    }>;
    deleteProduct(id: string): Promise<{
        message: string;
    }>;
}
