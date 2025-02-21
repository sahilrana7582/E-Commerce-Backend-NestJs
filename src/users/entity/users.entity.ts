import { Exclude } from 'class-transformer';
import { ShopingCart } from 'src/shopingCart/entity/shopingCart.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
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

  @OneToOne(() => ShopingCart, (shopingCart) => shopingCart.user)
  shopingCart: ShopingCart;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;
}
