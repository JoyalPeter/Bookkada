import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DBException from 'src/exceptions/db.exception';
import { Repository } from 'typeorm';
import { Order } from '../orders/entities/order.entity';
import { Rating } from '../ratings/entities/rating.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,

    @InjectRepository(Order)
    private orderRepo: Repository<Order>,

    @InjectRepository(Rating)
    private ratingRepo: Repository<Rating>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepo.create(createUserDto);
    return await this.userRepo.save(user).catch(() => {
      throw new DBException();
    });
  }

  async findAll() {
    return await this.userRepo.find().catch(() => {
      throw new DBException();
    });
  }

  async findOne(id: number) {
    return await this.userRepo.findOne({ where: { userId: id } }).catch(() => {
      throw new DBException();
    });
  }

  async getUserByEmail(email: string) {
    return await this.userRepo.findOne({ where: { email } }).catch(() => {
      throw new DBException();
    });
  }

  async userCount() {
    return await this.userRepo.count().catch((e) => {
      console.log(e);
      throw new DBException();
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepo.update(id, updateUserDto).catch(() => {
      throw new DBException();
    });
  }

  async remove(id: number) {

    const users = await this.userRepo.findOne({
      where: { userId: id },
      relations: ["ratings", "orders"],
    });
    
    users.ratings.forEach(
      async (e) =>
        await this.ratingRepo.delete(e.ratingId).catch(() => {
          throw new DBException();
        })
    );
    
    users.orders.forEach(
      async (e) =>
        await this.orderRepo.delete(e.orderId).catch(() => {
          throw new DBException();
        })
    );

    return await this.userRepo.delete(id).catch(() => {
      throw new DBException();
    });
  }
}
