import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AddressDto } from 'src/address/dto/address.dto';

export class CreateProfileDto {
  @IsString()
  @IsOptional()
  address: AddressDto;

  @IsString()
  @IsNotEmpty()
  phone: string;
}
