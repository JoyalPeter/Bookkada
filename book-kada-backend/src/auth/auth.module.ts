import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "../resources/users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import * as dotenv from "dotenv";
import { UsersService } from "src/resources/users/users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/resources/users/entities/user.entity";
import { Order } from "src/resources/orders/entities/order.entity";
import { OrdersService } from "src/resources/orders/orders.service";
import { RatingsService } from "src/resources/ratings/ratings.service";
import { Rating } from "src/resources/ratings/entities/rating.entity";

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([User,Order,Rating]),
    ConfigModule.forRoot(),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "2d" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UsersService,OrdersService,RatingsService],
  exports: [AuthService],
})
export class AuthModule { }
