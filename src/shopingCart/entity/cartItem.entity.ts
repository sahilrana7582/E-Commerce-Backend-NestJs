import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Product } from 'src/products/entity/product.entity';
import { ShopingCart } from './shopingCart.entity';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.cartItems)
  product: Product;

  @ManyToOne(() => ShopingCart, (shopingCart) => shopingCart.cartItems, {
    onDelete: 'CASCADE',
  })
  shopingCart: ShopingCart;

  @Column()
  quantity: number;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
  })
  price: number;
}
