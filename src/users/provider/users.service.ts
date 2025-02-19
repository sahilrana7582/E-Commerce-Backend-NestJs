import {
  BadRequestException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from '../entity/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-users.dto';
import { QueryFailedError } from 'typeorm';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { BcryptProvider } from 'src/auth/providers/bcrypt.provider';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly bcryptProvider: BcryptProvider,
  ) {}

  public async getUsers(): Promise<User[]> {
    const users: User[] = await this.userRepository.find();
    return users;
  }

  public async getUserById(id: number): Promise<User> {
    const user: User | null = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    newUser.password = await this.bcryptProvider.hash(newUser.password);
    try {
      return await this.userRepository.save(newUser);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        (error.driverError as { code: string }).code === '23505'
      ) {
        throw new BadRequestException('User already exists');
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  public async deleteUser(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
    return;
  }

  public async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user: User | null = await this.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    this.userRepository.merge(user, updateUserDto);
    return this.userRepository.save(user);
  }
}
