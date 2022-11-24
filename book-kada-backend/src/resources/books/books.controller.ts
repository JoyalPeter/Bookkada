import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post('/addBook')
  async create(@Body() createBookDto: CreateBookDto) {
    return await this.booksService.create(createBookDto);
  }

  @Get('/viewAllBooks')
  async findAll() {
    return await this.booksService.findAll();
  }

  @Get('/getBook/:name')
  async findOne(@Param('name') name: string) {
    return await this.booksService.findOne(name);
  }

  @Patch('/updateBook/:id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return await this.booksService.update(+id, updateBookDto);
  }

  @Delete('/deleteBook/:id')
  async remove(@Param('id') id: string) {
    return await this.booksService.remove(+id);
  }
}
