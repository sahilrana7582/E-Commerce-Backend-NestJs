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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'ecommerce',
      entities: [User, Product],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    AuthModule,
    CloudinaryModule,
    ProductsModule,
    ShopingCartModule,
    UserprofileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
