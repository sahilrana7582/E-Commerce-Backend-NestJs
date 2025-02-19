import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/users.entity';
import { UsersService } from './provider/users.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { BcryptProvider } from 'src/auth/providers/bcrypt.provider';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'your_secret_key',
      signOptions: { expiresIn: '60s' },
    }),
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [UsersService, BcryptProvider],
  exports: [UsersService],
})
export class UsersModule {}
