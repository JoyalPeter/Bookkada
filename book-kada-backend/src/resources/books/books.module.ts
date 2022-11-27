import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Rating } from '../ratings/entities/rating.entity';
import { RatingsService } from '../ratings/ratings.service';
import { Order } from '../orders/entities/order.entity';
import { Photo } from '../photos/entities/photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Rating,Order,Photo])],
  controllers: [BooksController],
  providers: [BooksService, RatingsService],
})
export class BooksModule {}
