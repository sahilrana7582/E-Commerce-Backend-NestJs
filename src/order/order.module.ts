import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { OrderService } from './provider/order.service';
import { OrderItem } from './entity/order-item.entity';
import { Product } from 'src/products/entity/product.entity';
import { User } from 'src/users/entity/users.entity';
import { Address } from 'src/address/entity/address.entity';
import { CartItem } from 'src/shopingCart/entity/cartItem.entity';
import { UserProfile } from 'src/userprofile/entity/user-profile.entity';
import { OrderController } from './order.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      OrderItem,
      Address,
      User,
      Product,
      CartItem,
      UserProfile,
    ]),
  ],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
