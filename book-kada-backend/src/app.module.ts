import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { RatingsModule } from './ratings/ratings.module';
import { OrdersModule } from './orders/orders.module';
import { PhotosModule } from './photos/photos.module';
import { User } from './users/entities/user.entity';
import { Book } from './books/entities/book.entity';
import { Order } from './orders/entities/order.entity';
import { Photo } from './photos/entities/photo.entity';
import { Rating } from './ratings/entities/rating.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'bookkada',
      entities: [User,Book,Order,Photo,Rating],
      synchronize: true,
    }), UsersModule, BooksModule, RatingsModule, OrdersModule, PhotosModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
