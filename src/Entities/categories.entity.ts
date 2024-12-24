import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";
import { Products } from "./products.entity"
import { v4 as uuid } from "uuid";

@Entity({
    name: "CATEGORIES"
})
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({ type: "varchar", length: 50, nullable: false, unique: true })
    name: string;

    @OneToMany(() => Products, product => product.category)
    @JoinColumn()
    products: Products[];
}