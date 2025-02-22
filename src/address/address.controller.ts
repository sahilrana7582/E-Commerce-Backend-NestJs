import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { AddressService } from './provider/address.service';
import { AddressDto } from './dto/address.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post(':userId')
  createAddress(
    @Body() addressDto: AddressDto,
    @Param('userId', ParseIntPipe) userId: number
  ) {
    return this.addressService.createAddress(userId, addressDto);
  }

  @Get(':userId')
  getAddress(@Param('userId', ParseIntPipe) userId: number) {
    return this.addressService.getAddress(userId);
  }
}
