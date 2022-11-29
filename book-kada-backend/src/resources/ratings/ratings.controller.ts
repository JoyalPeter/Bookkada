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

  // @ApiBearerAuth()
  // @UseGuards(AuthGuard("jwt"))
  @Post("/addRating")
  async create(@Body() createRatingDto: CreateRatingDto) {
    const user = await this.usersService.findOne(createRatingDto.userId);
    const book = await this.booksService.findOneById(createRatingDto.bookId);
    await this.ratingsService.create(createRatingDto, user, book);
    const rating = await this.ratingsService.getAvg(createRatingDto.bookId);
    await this.booksService.update(createRatingDto.bookId, rating);
    return await this.ratingsService.findOne(createRatingDto.bookId);
  }

  @Get("/getReview/:bookId")
  async findOne(@Param("bookId") bookId: string) {
    return await this.ratingsService.findOne(+bookId);
  }

  @Get('ratingsCount')
  async ratingCount() {
    return await this.ratingsService.ratingCount();
  }

  // @ApiBearerAuth()
  // @UseGuards(AuthGuard("jwt"))
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateRatingDto: UpdateRatingDto
  ) {
    return await this.ratingsService.update(+id, updateRatingDto);
  }

  // @ApiBearerAuth()
  // @UseGuards(AuthGuard("jwt"))
  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.ratingsService.remove(+id);
  }
}
