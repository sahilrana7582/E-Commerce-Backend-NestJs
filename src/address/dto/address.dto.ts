import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddressDto {
  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsNumber()
  @IsNotEmpty()
  zip: number;

  @IsString()
  @IsNotEmpty()
  country: string;
}
