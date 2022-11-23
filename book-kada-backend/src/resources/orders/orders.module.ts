import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { BooksService } from '../books/books.service';
import { Book } from '../books/entities/book.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';


@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Book])],
  controllers: [OrdersController],
  providers: [OrdersService, UsersService, BooksService],
})
export class OrdersModule {}
