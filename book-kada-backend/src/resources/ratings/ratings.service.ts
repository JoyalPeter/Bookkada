import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import DBException from "src/exceptions/db.exception";
import { Repository } from "typeorm";
import { CreateBookDto } from "../books/dto/create-book.dto";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { CreateRatingDto } from "./dto/create-rating.dto";
import { UpdateRatingDto } from "./dto/update-rating.dto";
import { Rating } from "./entities/rating.entity";

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private ratingRepo: Repository<Rating>
  ) {}

  async create(
    createRatingDto: CreateRatingDto,
    user: CreateUserDto,
    book: CreateBookDto
  ) {
    return await this.ratingRepo
      .save({
        description: createRatingDto.description,
        rating: createRatingDto.rating,
        user: user,
        book: book,
      })
      .catch(() => {
        throw new DBException();
      });
  }

  async findAll() {
    return await this.ratingRepo
      .find({ relations: ["user", "book"] })
      .catch(() => {
        throw new DBException();
      });
  }

  async findOne(id: number) {
    return await this.ratingRepo
      .find({
        where: { book: { bookId: id } },
        relations: ["user"],
      })
      .catch(() => {
        throw new DBException();
      });
  }

  async getAvg(id: number) {
    return await this.ratingRepo
      .createQueryBuilder("ratingtable")
      .where("ratingtable.bookId = :bookId", { bookId: id })
      .select("AVG(ratingtable.rating)", "rating")
      .getRawOne();
  }

  async ratingCount() {
    return await this.ratingRepo.count().catch(() => {
      throw new DBException();
    });
  }

  async update(id: number, updateRatingDto: UpdateRatingDto) {
    return await `This action updates a #${id} rating`;
  }

  async remove(id: number) {
    return await this.ratingRepo.delete(id).catch(() => {
      throw new DBException();
    });
  }
}
