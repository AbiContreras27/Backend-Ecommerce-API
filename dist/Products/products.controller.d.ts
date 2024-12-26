import { ProductService } from "./products.service";
import { updateProductsDTO } from "./productsDTO";
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getProducts(): Promise<import("../Entities/products.entity").Products[]>;
    addProducts(): Promise<string>;
    getProductsById(id: string): Promise<import("../Entities/products.entity").Products>;
    updateProducts(id: string, updateProductsDto: updateProductsDTO): Promise<{
        message: string;
    }>;
    deleteProduct(id: string): Promise<{
        message: string;
    }>;
}
