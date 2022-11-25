import { Order } from "src/resources/orders/entities/order.entity";
import { Photo } from "src/resources/photos/entities/photo.entity";
import { Rating } from "src/resources/ratings/entities/rating.entity";
import { User } from "src/resources/users/entities/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  bookId: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  author: string;

  // @Column()
  // category:string;

  @ManyToMany(() => User, (user) => user.books)
  @JoinColumn({ name: "users" })
  users: User[]; // for checkout functionalilty

  @OneToMany(() => Rating, (rating) => rating.book)
  @JoinColumn({ name: "ratings" })
  ratings: Rating[];

  @OneToMany(() => Photo, (photo) => photo.book)
  @JoinColumn({ name: "photos" })
  photos: Photo[];

  @OneToMany(() => Order, (order) => order.book)
  @JoinColumn({ name: "orders" })
  orders: Order[];
}
