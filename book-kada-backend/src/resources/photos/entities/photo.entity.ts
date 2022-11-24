import { Book } from 'src/resources/books/entities/book.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  photoId: number;

  @Column()
  link: string;

  @ManyToOne(() => Book, (book) => book.photos)
  @JoinColumn({ name: 'bookId' })
  book: Book;
}
