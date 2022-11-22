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
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get('/viewAllBooks')
  findAll() {
    return this.booksService.findAll();
  }

  @Get('/getBook/:name')
  findOne(@Param('name') name: string) {
    return this.booksService.findOne(name);
  }

  @Patch('/updateBook/:id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete('/deleteBook/:id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
