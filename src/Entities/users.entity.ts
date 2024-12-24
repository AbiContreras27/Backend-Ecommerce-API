import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { v4 as uuid } from 'uuid';
import { Order } from './orders.entity';

@Entity({
    name: "USERS"
})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: "varchar", length: 50, nullable: false })
    name: string;

    @Column({ type: "varchar", length: 50, nullable: false, unique: true })
    email: string;

    @Column({ type: "varchar", nullable: false })
    password: string;

    @Column()
    phone: number;

    @Column({ type: 'date', nullable: false })
    birthday: Date

    @Column({ type: "varchar", length: 50 })
    country?: string;

    @Column({ type: "varchar" })
    address: string;

    @Column({ type: "varchar", length: 50 })
    city?: string;

    @Column({ type: 'boolean', default: false })
    isAdmin: boolean

    @OneToMany(() => Order, orders => orders.user)
    @JoinColumn({
        name: 'orders_id'
    })
    orders: Order[]
}