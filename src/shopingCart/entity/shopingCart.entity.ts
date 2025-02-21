import { User } from 'src/users/entity/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CartItem } from './cartItem.entity';

@Entity()
export class ShopingCart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => CartItem, (cartItem) => cartItem.shopingCart, {
    cascade: true,
    eager: true,
  })
  cartItems: CartItem[];

  @Column()
  quantity: number = 0;

  @OneToOne(() => User, (user) => user.shopingCart, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
  })
  totalPrice: number = 0; // ✅ Ensure default price

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
