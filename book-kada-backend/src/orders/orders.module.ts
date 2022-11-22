import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { UsersService } from 'src/users/users.service';
import { BooksService } from 'src/books/books.service';
import { Book } from 'src/books/entities/book.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Book])],
  controllers: [OrdersController],
  providers: [OrdersService, UsersService, BooksService],
})
export class OrdersModule {}
