import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { BcryptProvider } from './providers/bcrypt.provider';
import { User } from 'src/users/entity/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/provider/users.service';
import { HashProvider } from './providers/hash.provider';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your_secret_key',
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forFeature([User]),
    forwardRef(() => UsersModule),
  ],
  providers: [
    BcryptProvider,
    UsersService,
    {
      provide: HashProvider,
      useClass: BcryptProvider,
    },
    AuthService,
  ],
  controllers: [AuthController],
  exports: [BcryptProvider],
})
export class AuthModule {}
