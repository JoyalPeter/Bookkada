import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookDto } from 'src/books/dto/create-book.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
  ) {}
  create(
    createOrderDto: CreateOrderDto,
    user: CreateUserDto,
    book: CreateBookDto,
  ) {
    return this.orderRepo.save({
      orderDate: createOrderDto.orderDate,
      book: book,
      user: user,
    });
  }

  findAll() {
    return this.orderRepo.find({ relations: ['book', 'user'] });
  }

  findBooks(id: number) {
    return this.orderRepo.find({
      where: { book: { bookId: id } },
      relations: ['user'],
    });
  }

  findUsers(id: number) {
    return this.orderRepo.find({
      where: { user: { userId: id } },
      relations: ['book'],
    });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
