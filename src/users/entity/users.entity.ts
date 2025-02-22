import { Exclude } from 'class-transformer';
import { Order } from 'src/order/entity/order.entity';
import { ShopingCart } from 'src/shopingCart/entity/shopingCart.entity';
import { UserProfile } from 'src/userprofile/entity/user-profile.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column()
  name: string;

  @Column()
  @Unique(['email'])
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @Column({
    nullable: true,
  })
  avatar: string;

  @OneToOne(() => UserProfile, (userProfile) => userProfile.user)
  @JoinColumn()
  userProfile: UserProfile;

  @OneToOne(() => ShopingCart, (shopingCart) => shopingCart.user)
  shopingCart: ShopingCart;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;
}
