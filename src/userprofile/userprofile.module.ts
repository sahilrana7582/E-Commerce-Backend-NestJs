import { Module } from '@nestjs/common';
import { UserprofileController } from './userprofile.controller';
import { UserprofileService } from './provider/userprofile.service';
import { UserProfile } from './entity/user-profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserProfile])],
  controllers: [UserprofileController],
  providers: [UserprofileService],
})
export class UserprofileModule {}
