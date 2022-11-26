import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import DBException from "src/exceptions/db.exception";
import { Like, Repository } from "typeorm";
import { Order } from "../orders/entities/order.entity";
import { Photo } from "../photos/entities/photo.entity";
import { Rating } from "../ratings/entities/rating.entity";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { Book } from "./entities/book.entity";

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepo: Repository<Book>,

    @InjectRepository(Order)
    private orderRepo: Repository<Order>,

    @InjectRepository(Photo)
    private photosRepo: Repository<Photo>,

    @InjectRepository(Rating)
    private ratingRepo: Repository<Rating>
  ) { }

  async create(createBookDto: CreateBookDto) {
    const book = this.booksRepo.create(createBookDto);
    await this.booksRepo.save(book).catch(() => {
      throw new DBException();
    });
    return await this.findAll().catch(() => {
      throw new DBException();
    });
  }

  async findAll() {
    return await this.booksRepo.find().catch(() => {
      throw new DBException();
    });
  }

  async findOne(bookId: number) {
    return await this.booksRepo
      .findOne({ where: { bookId: bookId }, relations: ["ratings"] })
      .catch(() => {
        throw new DBException();
      });
  }

  async findOneById(id: number) {
    return await this.booksRepo.findOne({ where: { bookId: id } }).catch((e) => {
      console.log(e)
      throw new DBException();
    });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    await this.booksRepo.update(id, updateBookDto).catch((e) => {
      console.log(e);

      throw new DBException();
    });
    return await this.findAll().catch(() => {
      throw new DBException();
    });
  }

  async search(key: string) {
    return await this.booksRepo.find({ where: { name: Like(`%${key}%`) } });
  }

  async remove(id: number) {
    const books = await this.booksRepo
      .findOne({
        where: { bookId: id },
        relations: ["ratings", "photos", "orders"],
      })
      .catch((e) => {
        throw new DBException();
      });

    books.ratings.forEach(
      async (e) =>
        await this.ratingRepo.delete(e.ratingId).catch((e) => {
          throw new DBException();
        })
    );

    books.orders.forEach(
      async (e) =>
        await this.orderRepo.delete(e.orderId).catch((e) => {
          throw new DBException();
        })
    );

    books.photos.forEach(
      async (e) =>
        await this.ratingRepo.delete(e.photoId).catch((e) => {
          throw new DBException();
        })
    );

    await this.booksRepo.delete(id).catch((e) => {
      throw new DBException();
    });

    return await this.findAll().catch((e) => {
      throw new DBException();
    });
  }
}
