import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./products.entity";
import { Order } from "./orders.entity";

@Entity({
    name: 'ORDER_DETAILS'
})
export class OrderDetails {

    @PrimaryGeneratedColumn('uuid')
    id: string
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2
    })
    price: number


    @ManyToMany(() => Products)
    @JoinTable({
        name: 'ORDER_DETAILS_PRODUCTS'
    })
    products: Products[]

    @OneToOne(() => Order)
    @JoinColumn()
    order: Order

}