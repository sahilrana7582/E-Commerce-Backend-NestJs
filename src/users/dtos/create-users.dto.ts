import { IsString, IsEmail, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { Role } from '../entity/users.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;

  @IsOptional()
  @IsString()
  avatar: string;
}
