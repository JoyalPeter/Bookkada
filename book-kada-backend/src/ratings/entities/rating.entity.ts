import { Book } from "src/books/entities/book.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Rating {
    @PrimaryGeneratedColumn()
    ratingId:number;

    @Column()
    discription:string;

    @Column()
    rating:number;

    @ManyToOne(()=>User,(user)=>user.ratings)
    @JoinColumn({ name: 'user' })
    user:User;

    @ManyToOne(()=>Book,(book)=>book.ratings)
    @JoinColumn({ name: 'book' })
    book:Book;
}
