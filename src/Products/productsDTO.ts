import { PartialType } from "@nestjs/swagger";
import { Products } from "src/Entities/products.entity";

export class updateProductsDTO extends PartialType(Products) { }