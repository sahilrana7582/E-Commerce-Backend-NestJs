import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entity/address.entity';
import { UserProfile } from 'src/userprofile/entity/user-profile.entity';
import { AddressController } from './address.controller';
import { AddressService } from './provider/address.service';

@Module({
  imports: [TypeOrmModule.forFeature([Address, UserProfile])],
  controllers: [AddressController],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}
