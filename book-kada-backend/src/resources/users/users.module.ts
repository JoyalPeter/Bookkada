import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Book } from '../books/entities/book.entity';
import { Order } from '../orders/entities/order.entity';
import { Rating } from '../ratings/entities/rating.entity';
import { BooksService } from '../books/books.service';
import { OrdersService } from '../orders/orders.service';
import { RatingsService } from '../ratings/ratings.service';

@Module({
  imports: [TypeOrmModule.forFeature([User,Book,Order,Rating])],
  controllers: [UsersController],
  providers: [UsersService,BooksService,OrdersService,RatingsService]
})
export class UsersModule { }
