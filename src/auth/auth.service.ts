import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/provider/users.service';
import { HashProvider } from './providers/hash.provider';
import { User } from 'src/users/entity/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersService: Repository<User>,
    private readonly hashProvider: HashProvider,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOneBy({ email });
    if (!user || !user.password) return null;
    const isPasswordValid = await this.hashProvider.compare(
      password,
      user.password,
    );
    return isPasswordValid ? user : null;
  }
}
