import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import DBException from "src/exceptions/db.exception";
import { Repository } from "typeorm";
import { CreateBookDto } from "../books/dto/create-book.dto";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Order } from "./entities/order.entity";

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>
  ) { }

  async create(
    quantity: number,
    user: CreateUserDto,
    book: CreateBookDto
  ) {
    return await this.orderRepo
      .save({
        orderDate: new Date(),
        quantity: quantity,
        book: book,
        user: user,
      })
      .catch(() => {
        throw new DBException();
      });
  }

  async findAll() {
    return await this.orderRepo
      .find({ relations: ["book", "user"] })
      .catch(() => {
        throw new DBException();
      });
  }

  async findBooks(id: number) {
    return await this.orderRepo
      .find({
        where: { book: { bookId: id } },
        relations: ["user"],
      })
      .catch(() => {
        throw new DBException();
      });
  }

  async findOrderByUser(id: number) {
    return await this.orderRepo
      .find({
        where: { user: { userId: id } },
        relations: ["book"],
      })
      .catch(() => {
        throw new DBException();
      });
  }

  async orderCount() {
    return await this.orderRepo.count().catch(() => {
      throw new DBException();
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    return await `This action updates a #${id} order`;
  }

  async remove(id: number) {
    return await this.orderRepo.delete(id).catch(() => {
      throw new DBException();
    });
  }
}
