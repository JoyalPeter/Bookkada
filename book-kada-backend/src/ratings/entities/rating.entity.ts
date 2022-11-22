import { Book } from "src/books/entities/book.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Rating {
    @PrimaryGeneratedColumn()
    ratingId:number;

    @Column()
    description:string;

    @Column()
    rating:number;

    @ManyToOne(()=>User,(user)=>user.ratings)
    @JoinColumn({ name: 'userId' })
    user:User;

    @ManyToOne(()=>Book,(book)=>book.ratings)
    @JoinColumn({ name: 'bookId' })
    book:Book;
}
