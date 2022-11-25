import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { BooksService } from "src/resources/books/books.service";
import { CreateBookDto } from "src/resources/books/dto/create-book.dto";
import { UpdateBookDto } from "src/resources/books/dto/update-book.dto";

@Controller("books")
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post("/addBook")
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get("/viewAllBooks")
  findAll() {
    return this.booksService.findAll();
  }

  @Get("/getBook/:id")
  findOne(@Param("id") id: string) {
    return this.booksService.findOne(+id);
  }

  @Patch("/updateBook/:id")
  update(@Param("id") id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete("/deleteBook/:id")
  remove(@Param("id") id: string) {
    return this.booksService.remove(+id);
  }
}
