import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UsersService } from '../users/users.service';
import { BooksService } from '../books/books.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly usersService: UsersService,
    private readonly booksService: BooksService,
  ) { }


  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  @Post('placeOrder')
  async create(@Body() createOrderDto: CreateOrderDto) {
    const user = await this.usersService.findOne(createOrderDto.userId);
    const book = await this.booksService.findOneById(createOrderDto.bookId);
    return await this.ordersService.create(createOrderDto, user, book);
  }

  @Get('getAllOrders')
  async findAll(id: string) {
    return await this.ordersService.findAll();
  }


  @Get('bookOrders/:bookId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async findBooks(@Param('bookId') bookId: string) {
    return await this.ordersService.findBooks(+bookId);
  }


  @Get('userOrders/:userId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async findUsers(@Param('userId') userId: string) {
    return await this.ordersService.findUsers(+userId);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return await this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string) {
    return await this.ordersService.remove(+id);
  }
}
