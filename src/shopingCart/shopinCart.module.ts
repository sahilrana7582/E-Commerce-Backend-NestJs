import { Module } from '@nestjs/common';
import { ShopingCartController } from './shopingCart.controller';
import { ShopingCartService } from './provider/shopinCart.service';
import { User } from 'src/users/entity/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopingCart } from './entity/shopingCart.entity';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';
import { CartItem } from './entity/cartItem.entity';
import { Product } from 'src/products/entity/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, ShopingCart, CartItem, Product]),
    User,
    ProductsModule,
    UsersModule,
  ],
  controllers: [ShopingCartController],
  providers: [ShopingCartService],
})
export class ShopingCartModule {}
