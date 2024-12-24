import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, JoinTable } from 'typeorm'
import { v4 as uuid } from 'uuid';
import { Category } from './categories.entity';
import { OrderDetails } from "./orderDetails.entity"

@Entity({
    name: "PRODUCTS"
})
export class Products {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({ type: "varchar", length: 50, nullable: false, unique: true })
    name: string;

    @Column({ type: "varchar", nullable: false })
    description: string;

    @Column('decimal', { precision: 10, scale: 2, nullable: false })
    price: number;

    @Column({ nullable: false })
    stock: number;

    @Column('text', { nullable: false, default: 'https://example.com/default-image.jpg' })
    imgUrl: string

    @ManyToOne(() => Category, category => category.products, { nullable: false })
    @JoinColumn({
        name: 'category_id'
    })
    category: Category;

    @ManyToMany(() => OrderDetails, orderDetail => orderDetail.products)
    @JoinTable({
        name: 'ORDER_DETAILS_PRODUCTS'
    })
    orderDetails: OrderDetails[];
}