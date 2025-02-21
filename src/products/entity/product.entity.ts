import { CartItem } from 'src/shopingCart/entity/cartItem.entity';
import { ShopingCart } from 'src/shopingCart/entity/shopingCart.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
  })
  price: number;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  stock: number;

  @Column()
  category: string;

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItems: CartItem[];

  @Column()
  subCategory: string;
  @Column()
  brand: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
