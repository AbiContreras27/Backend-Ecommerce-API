import { Module } from "@nestjs/common";
import { ProductService } from "./products.service";
import { ProductController } from "./products.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/Entities/categories.entity";
import { Products } from "src/Entities/products.entity";


@Module({
    imports: [
        TypeOrmModule.forFeature([Products]),
        TypeOrmModule.forFeature([Category])
    ],
    providers: [ProductService],
    controllers: [ProductController]
})

export class ProductModule { }