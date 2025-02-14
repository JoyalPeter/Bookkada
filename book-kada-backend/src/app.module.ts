import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './resources/books/books.module';
import { Book } from './resources/books/entities/book.entity';
import { Order } from './resources/orders/entities/order.entity';
import { OrdersModule } from './resources/orders/orders.module';
import { Rating } from './resources/ratings/entities/rating.entity';
import { RatingsModule } from './resources/ratings/ratings.module';
import { User } from './resources/users/entities/user.entity';
import { UsersModule } from './resources/users/users.module';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import { AnalyticsModule } from './resources/analytics/analytics.module';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Book, Order, Rating],
      synchronize: true,
    }),
    UsersModule,
    BooksModule,
    RatingsModule,
    OrdersModule,
    AuthModule,
    AnalyticsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
