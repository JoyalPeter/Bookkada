import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UsersService } from '../users/users.service';
import { BooksService } from '../books/books.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller("orders")
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly usersService: UsersService,
    private readonly booksService: BooksService,
  ) { }


  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  @Post('placeOrder')
  async create(@Body() createOrdersDto: CreateOrderDto[]) {
    createOrdersDto.forEach(async (orderDto: CreateOrderDto) => {
      const user = await this.usersService.findOne(orderDto.userId);
      const book = await this.booksService.findOneById(orderDto.bookId);
      const order = await this.ordersService.create(orderDto.quantity, user, book);
      Logger.log(order)
    })
    return "Orders placed successfully"
  }

  @Get("getAllOrders")
  async findAll(id: string) {
    return await this.ordersService.findAll();
  }

  @Get("ordersCount")
  async orderCount() {
    return this.ordersService.orderCount();
  }

  @Get("bookOrders/:bookId")
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  async findBooks(@Param("bookId") bookId: string) {
    return await this.ordersService.findBooks(+bookId);
  }

  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  @Get('userOrders/:userId')
  async findOrderByUser(@Param('userId') userId: string) {
    return await this.ordersService.findOrderByUser(+userId);
  }

  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(
    @Param("id") id: string,
    @Body() updateOrderDto: UpdateOrderDto
  ) {
    return await this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  async remove(@Param("id") id: string) {
    return await this.ordersService.remove(+id);
  }
}
