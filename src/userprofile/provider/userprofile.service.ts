import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfile } from '../entity/user-profile.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from '../dto/create-profile.dto';

@Injectable()
export class UserprofileService {
  constructor(
    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>,
  ) {}
  public async getUserProfile(userId: number) {
    const userProfile: UserProfile | null = await this.userProfileRepository.findOne({
        where: { user: { id: userId } },
      });
    if (!userProfile) {
      throw new NotFoundException('User profile not found');
    }
    return userProfile;
  }
  public async createUserProfile(
    userId: number,
    userProfile: CreateProfileDto
  ) {
    const newUserProfile: UserProfile = this.userProfileRepository.create({
      ...userProfile,
      user: { id: userId },
    });
    return await this.userProfileRepository.save(newUserProfile);
  }
}
