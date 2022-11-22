import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookDto } from 'src/books/dto/create-book.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Repository } from 'typeorm';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Rating } from './entities/rating.entity';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private ratingRepo: Repository<Rating>,
  ) {}

  create(
    createRatingDto: CreateRatingDto,
    user: CreateUserDto,
    book: CreateBookDto,
  ) {
    return this.ratingRepo.save({
      description: createRatingDto.description,
      rating: createRatingDto.rating,
      user: user,
      book: book
    });
  }

  findAll() {
    return this.ratingRepo.find({relations:["user","book"]});
  }

  findOne(id: number) {
    return this.ratingRepo.find({where:{book:{bookId:id}},relations:["user"]});
  }

  update(id: number, updateRatingDto: UpdateRatingDto) {
    return `This action updates a #${id} rating`;
  }

  remove(id: number) {
    return `This action removes a #${id} rating`;
  }
}
