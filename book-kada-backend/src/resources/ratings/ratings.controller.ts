import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { RatingsService } from "./ratings.service";
import { CreateRatingDto } from "./dto/create-rating.dto";
import { UpdateRatingDto } from "./dto/update-rating.dto";
import { BooksService } from "../books/books.service";
import { UsersService } from "../users/users.service";

@Controller("ratings")
export class RatingsController {
  constructor(
    private readonly ratingsService: RatingsService,
    private readonly usersService: UsersService,
    private readonly booksService: BooksService
  ) {}

  @Post("/addRating")
  async create(@Body() createRatingDto: CreateRatingDto) {
    const user = await this.usersService.findOne(createRatingDto.userId);
    const book = await this.booksService.findOneById(createRatingDto.bookId);
    await this.ratingsService.create(createRatingDto, user, book);
    return await this.ratingsService.findOne(createRatingDto.bookId);
  }

  @Get("/getAllRatings")
  async findAll() {
    return await this.ratingsService.findAll();
  }

  @Get("/getReview/:bookId")
  async findOne(@Param("bookId") bookId: string) {
    return await this.ratingsService.findOne(+bookId);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateRatingDto: UpdateRatingDto
  ) {
    return await this.ratingsService.update(+id, updateRatingDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.ratingsService.remove(+id);
  }
}
