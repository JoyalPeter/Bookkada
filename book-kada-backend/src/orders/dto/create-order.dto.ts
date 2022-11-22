import { Book } from 'src/books/entities/book.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateOrderDto {
  orderDate: Date;
  bookId: number;
  userId: number;
}
