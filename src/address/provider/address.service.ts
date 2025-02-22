import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../entity/address.entity';
import { AddressDto } from '../dto/address.dto';
import { UserProfile } from 'src/userprofile/entity/user-profile.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,

    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>,


  ) {}

  async createAddress(userId: number, addressDto: AddressDto): Promise<Address> {
    const userProfile = await this.userProfileRepository.findOne({
      where: { user: { id: userId } },
      relations: ['address'], // ✅ Ensure existing address is loaded
    });

    console.log(userProfile);
    console.log(addressDto);

    if (!userProfile) {
      throw new NotFoundException('User profile not found');
    }
    let address: Address;
    if (userProfile.address) {
      const existingAddress = await this.addressRepository.preload({
        id: userProfile.address.id,
        ...addressDto,
      });

      if (!existingAddress) {
        throw new NotFoundException('Address not found');
      }
      address = existingAddress; // Ensure address is of type Address
    } else {
      address = this.addressRepository.create({
        ...addressDto,
        userProfile, // Link to userProfile
      });
    }

    const savedAddress = await this.addressRepository.save(address);  
    // ✅ Ensure userProfile is updated only if it's a new address
    if (!userProfile.address) {
      userProfile.address = savedAddress;
      await this.userProfileRepository.save(userProfile);
    }

    return savedAddress;
   }

  async getAddress(userId: number): Promise<Address> {
    const userProfile = await this.userProfileRepository.findOne({
      where: { user: { id: userId } },
      relations: ['address'],
    });

    if (!userProfile) {
      throw new NotFoundException('User profile not found');
    }

    if (!userProfile.address) {
      throw new NotFoundException('Address not found');
    }

    return userProfile.address;
  }
}
