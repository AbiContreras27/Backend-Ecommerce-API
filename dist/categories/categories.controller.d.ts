import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    addCategories(): string;
    getCategories(): Promise<import("../Entities/categories.entity").Category[]>;
}
