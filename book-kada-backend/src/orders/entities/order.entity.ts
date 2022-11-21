import { Book } from "src/books/entities/book.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    orderId:number;

    @Column()
    orderDate:Date;

    @ManyToOne(()=>Book,(book)=>book.orders)
    @JoinColumn({ name: 'books' })
    books:Book;

    @ManyToOne(()=>User,(user)=>user.orders)
    @JoinColumn({ name: 'user' })
    user:User;
}
