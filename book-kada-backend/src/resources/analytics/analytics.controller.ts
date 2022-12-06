import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BooksService } from '../books/books.service';
import { OrdersService } from '../orders/orders.service';
import { RatingsService } from '../ratings/ratings.service';
import { UsersService } from '../users/users.service';
import { AnalyticsService } from './analytics.service';
import { CreateAnalyticsDto } from './dto/create-analytics.dto';
import { UpdateAnalyticsDto } from './dto/update-analytics.dto';

@Controller("analytics")
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService,
    private readonly booksService: BooksService,
    private readonly ordersService: OrdersService,
    private readonly ratingsService: RatingsService,
    private readonly usersService: UsersService
    ) {}

  @Post()
  create(@Body() createAnalyticsDto: CreateAnalyticsDto) {
    return this.analyticsService.create(createAnalyticsDto);
  }

  @Get('counts')
  async Count() {
    const Counts = {
      userCount: await this.usersService.userCount(),
      bookCount: await this.booksService.bookCount(),
      orderCount: await this.ordersService.orderCount(),
      reviewCount: await this.ratingsService.ratingCount(),
    };
    return Counts;
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.analyticsService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateAnalyticsDto: UpdateAnalyticsDto
  ) {
    return this.analyticsService.update(+id, updateAnalyticsDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.analyticsService.remove(+id);
  }
}
