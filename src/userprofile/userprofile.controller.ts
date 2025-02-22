import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UserprofileService } from './provider/userprofile.service';
import { UserProfile } from './entity/user-profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('userprofile')
export class UserprofileController {
  constructor(private readonly userprofileService: UserprofileService) {}
  @Get(':userId')
  getUserProfile(@Param('userId', ParseIntPipe) userId: number) {
    return this.userprofileService.getUserProfile(userId);
  }

  @Post(':userId')
  createUserProfile(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() userProfile: CreateProfileDto
  ) {
    return this.userprofileService.createUserProfile(userId, userProfile);
  }
}
