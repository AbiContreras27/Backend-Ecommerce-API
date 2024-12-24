import { PartialType } from "@nestjs/swagger";
import { Products } from "src/Entities/products.entity";

export class updateProductsDto extends PartialType(Products) { }