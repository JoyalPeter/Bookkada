import * as bcrypt from 'bcrypt';
import { Book } from "src/resources/books/entities/book.entity";
import { Order } from "src/resources/orders/entities/order.entity";
import { Rating } from "src/resources/ratings/entities/rating.entity";
import { Roles } from 'src/utils/enums';
import { BeforeInsert, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    readonly userId: number;

    @Column()
    name: string;

    @Column({ unique: true })
    readonly email: string;

    @Exclude()
    @Column({ type: 'varchar', length: 70, nullable: true })
    password: string;

    @Column()
    role: Roles;

    @OneToMany(() => Book, (book) => book.users)
    @JoinColumn({ name: 'books' })
    books: Book[]; // for orders

    @OneToMany(() => Rating, (rating) => rating.user)
    @JoinColumn({ name: 'ratings' })
    ratings: Rating[]

    @OneToMany(() => Order, (order) => order.user)
    @JoinColumn({ name: 'orders' })
    orders: Order[];

    @BeforeInsert()
    async hashPassword() {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }
    async validatePassword(password: string): Promise<boolean> {
        return await bcrypt.compareSync(password, this.password)
    }
    constructor(userId: number, name: string, pass: string) {
        this.userId = userId;
        this.name = name;
        this.password = pass;
    }
}
