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

  // @ApiBearerAuth()
  // @UseGuards(AuthGuard("jwt"))
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

  @Get("/booksCount")
  totalCount() {
    return this.booksService.totalCount();
  }

  // @ApiBearerAuth()
  // @UseGuards(AuthGuard("jwt"))
  @Patch("/updateBook/:id")
  update(@Param("id") id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  // @ApiBearerAuth()
  // @UseGuards(AuthGuard("jwt"))
  @Delete("/deleteBook/:id")
  remove(@Param("id") id: string) {
    return this.booksService.remove(+id);
  }

  @Get("/search/:searchKey")
  search(@Param("searchKey") searchKey: string) {
    return this.booksService.search(searchKey);
  }
}
