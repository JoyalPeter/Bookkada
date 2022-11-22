import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepo: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const book = this.booksRepo.create(createBookDto);
    await this.booksRepo.save(book);
    return this.findAll();
  }

  findAll() {
    return this.booksRepo.find();
  }

  findOne(name: string) {
    return this.booksRepo.find({ where: { name: name } });
  }

  findOneById(id: number) {
    return this.booksRepo.findOne({where:{bookId:id}});
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    await this.booksRepo.update(id,updateBookDto);
    return this.findAll();
  }

  async remove(id: number) {
    await this.booksRepo.delete(id);
    return this.findAll();
  }
}
