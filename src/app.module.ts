import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entity/users.entity';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entity/product.entity';
import { ShopingCartModule } from './shopingCart/shopinCart.module';
import { UserprofileModule } from './userprofile/userprofile.module';
import { AddressModule } from './address/address.module';
import { Address } from './address/entity/address.entity';
import { UserProfile } from './userprofile/entity/user-profile.entity';
import { ShopingCart } from './shopingCart/entity/shopingCart.entity';
import { Order } from './order/entity/order.entity';
import { OrderModule } from './order/order.module';
import { OrderItem } from './order/entity/order-item.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'ecommerce',
      entities: [User, Product, UserProfile, Address, ShopingCart, Order, OrderItem],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    AuthModule,
    CloudinaryModule,
    ProductsModule,
    ShopingCartModule,
    UserprofileModule,
    AddressModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
