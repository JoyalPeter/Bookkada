import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './entities/rating.entity';
import { User } from 'src/users/entities/user.entity';
import { Book } from 'src/books/entities/book.entity';
import { UsersService } from 'src/users/users.service';
import { BooksService } from 'src/books/books.service';

@Module({
  imports:[TypeOrmModule.forFeature([Rating,User,Book])],
  controllers: [RatingsController],
  providers: [RatingsService,UsersService,BooksService]
})
export class RatingsModule {}
