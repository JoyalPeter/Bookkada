import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DBException from 'src/exceptions/db.exception';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepo: Repository<Book>,
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

  async findOne(name: string) {
    return await this.booksRepo.find({ where: { name: name } }).catch(() => {
      throw new DBException();
    });
  }

  async findOneById(id: number) {
    return await this.booksRepo.findOne({ where: { bookId: id } }).catch(() => {
      throw new DBException();
    });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    await this.booksRepo.update(id, updateBookDto).catch(() => {
      throw new DBException();
    });
    return await this.findAll().catch(() => {
      throw new DBException();
    });
  }

  async remove(id: number) {
    await this.booksRepo.delete(id).catch(() => {
      throw new DBException();
    });
    return await this.findAll().catch(() => {
      throw new DBException();
    });
  }
}
