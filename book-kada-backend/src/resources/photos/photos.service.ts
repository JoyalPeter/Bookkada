import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DBException from 'src/utils/DBException';
import { Repository } from 'typeorm';
import { Book } from '../books/entities/book.entity';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Photo } from './entities/photo.entity';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo)
    private photosRepo: Repository<Photo>,
  ) {}

  async create(createPhotoDto: CreatePhotoDto, book: Book) {
    return await this.photosRepo
      .save({
        link: createPhotoDto.link,
        book: book,
      })
      .catch(() => {
        throw new DBException();
      });
  }

  async findAll() {
    return await this.photosRepo.find().catch(() => {
      throw new DBException();
    });
  }

  async findOne(id: number) {
    return await this.photosRepo
      .findOne({ where: { book: { bookId: id } } })
      .catch(() => {
        throw new DBException();
      });
  }

  async update(id: number, updatePhotoDto: UpdatePhotoDto) {
    return await `This action updates a #${id} photo`;
  }

  async remove(id: number) {
    return await `This action removes a #${id} photo`;
  }
}
