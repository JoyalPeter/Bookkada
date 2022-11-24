import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { Photo } from './entities/photo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from '../books/books.service';
import { Book } from '../books/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Photo, Book])],
  controllers: [PhotosController],
  providers: [PhotosService, BooksService],
})
export class PhotosModule {}
