import { Book } from "src/books/entities/book.entity";
import { Order } from "src/orders/entities/order.entity";
import { Rating } from "src/ratings/entities/rating.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userId:number;

    @Column()
    name:string;

    @Column()
    email:string;
    
    @Column()
    password:string;

    @Column()
    role:number; //enum can be used as type

    @OneToMany(()=>Book,(book)=>book.users)
    @JoinColumn({ name: 'books' })
    books:Book[]; // for orders

    @OneToMany(()=>Rating,(rating)=>rating.user)
    @JoinColumn({ name: 'ratings' })
    ratings:Rating[]

    @OneToMany(()=>Order,(order)=>order.user)
    @JoinColumn({ name: 'orders' })
    orders:Order[];

}
