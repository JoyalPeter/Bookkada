import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { identity } from 'rxjs';
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
  create(createOrderDto: CreateOrderDto) {
    return this.orderRepo.save({
      orderDate: createOrderDto.orderDate,
      book: createOrderDto.book,
      user: createOrderDto.user
     });
  }

  findAll() {
    return this.orderRepo.find();
  }

  // findOne() {
  //   return this.orderRepo.findOne();
  // }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
