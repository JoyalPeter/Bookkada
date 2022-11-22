import { Book } from "src/books/entities/book.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    photoId:number;

    @Column()
    link:string;

    @ManyToOne(()=>Book,(book)=>book.photos)
    @JoinColumn({ name: 'book' })
    book:Book;
}
