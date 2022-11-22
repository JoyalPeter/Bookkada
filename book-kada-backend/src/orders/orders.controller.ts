import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UsersService } from 'src/users/users.service';
import { BooksService } from 'src/books/books.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly usersService: UsersService,
    private readonly booksService: BooksService,
  ) {}

  @Post('placeOrder')
  async create(@Body() createOrderDto: CreateOrderDto) {
    const user = await this.usersService.findOne(createOrderDto.userId);
    const book = await this.booksService.findOneById(createOrderDto.bookId);
    return this.ordersService.create(createOrderDto, user, book);
  }

  @Get('getAllOrders')
  findAll(id: string) {
    return this.ordersService.findAll();
  }

  @Get('bookOrders/:bookId')
  findBooks(@Param('bookId') bookId: string) {
    return this.ordersService.findBooks(+bookId);
  }

  @Get('userOrders/:userId')
  findUsers(@Param('userId') userId: string) {
    return this.ordersService.findUsers(+userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
