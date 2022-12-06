import { Module } from "@nestjs/common";
import { AnalyticsService } from "./analytics.service";
import { AnalyticsController } from "./analytics.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BooksService } from "../books/books.service";
import { Book } from "../books/entities/book.entity";
import { Order } from "../orders/entities/order.entity";
import { OrdersService } from "../orders/orders.service";
import { Rating } from "../ratings/entities/rating.entity";
import { RatingsService } from "../ratings/ratings.service";
import { User } from "../users/entities/user.entity";
import { UsersService } from "../users/users.service";

@Module({
  imports: [TypeOrmModule.forFeature([User, Book, Order, Rating])],
  controllers: [AnalyticsController],
  providers: [
    UsersService,
    BooksService,
    OrdersService,
    RatingsService,
    AnalyticsService,
  ],
})
export class AnalyticsModule {}
