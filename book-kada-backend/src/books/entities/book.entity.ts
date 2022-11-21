import { Order } from "src/orders/entities/order.entity";
import { Photo } from "src/photos/entities/photo.entity";
import { Rating } from "src/ratings/entities/rating.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    bookId:number;

    @Column()
    name:string;

    @Column()
    price:number;
    
    @Column()
    description:string;

    // @Column()
    // category:string;

    @ManyToMany(()=>User,(user)=>user.books)
    @JoinColumn({ name: 'users' })
    users:User[]; // for checkout functionalilty

    @OneToMany(()=>Rating,(rating)=>rating.book)
    @JoinColumn({ name: 'ratings' })
    ratings:Rating[];

    @OneToMany(()=>Photo,(photo)=>photo.book)
    @JoinColumn({ name: 'photos' })
    photos:Photo[];

    @OneToMany(()=>Order,(order)=>order.books)
    @JoinColumn({ name: 'orders' })
    orders:Order[];
}
