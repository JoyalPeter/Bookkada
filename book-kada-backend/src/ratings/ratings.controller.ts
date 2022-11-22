import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { UsersService } from 'src/users/users.service';
import { BooksService } from 'src/books/books.service';

@Controller('ratings')
export class RatingsController {
  constructor(
    private readonly ratingsService: RatingsService,
    private readonly usersService: UsersService,
    private readonly booksService: BooksService,
  ) {}

  @Post('/addRating')
  async create(@Body() createRatingDto: CreateRatingDto) {
    const user = await this.usersService.findOne(createRatingDto.userId);
    const book = await this.booksService.findOneById(createRatingDto.bookId);
    return this.ratingsService.create(createRatingDto, user, book);
  }

  @Get('/getAllRatings')
  findAll() {
    return this.ratingsService.findAll();
  }

  @Get('/getReview/:bookId')
  findOne(@Param('bookId') bookId: string) {
    return this.ratingsService.findOne(+bookId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto) {
    return this.ratingsService.update(+id, updateRatingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ratingsService.remove(+id);
  }
}
