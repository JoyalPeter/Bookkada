import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './entities/rating.entity';
import { BooksService } from '../books/books.service';
import { Book } from '../books/entities/book.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { Order } from '../orders/entities/order.entity';
import { Photo } from '../photos/entities/photo.entity';


@Module({
  imports:[TypeOrmModule.forFeature([Rating,User,Book,Order,Photo])],
  controllers: [RatingsController],
  providers: [RatingsService,UsersService,BooksService]
})
export class RatingsModule {}
