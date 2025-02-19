import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UsersService } from './provider/users.service';
import { CreateUserDto } from './dtos/create-users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  public async getUsers() {
    const users = await this.usersService.getUsers();
    return {
      success: true,
      data: users,
      message: users.length ? 'Users fetched successfully' : 'No users found',
    };
  }

  @Post(':id')
  public async getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.getUserById(id);
    return {
      success: true,
      data: user,
      message: 'User fetched successfully',
    };
  }

  @Post()
  public async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.createUser(createUserDto);
    return {
      success: true,
      data: user,
      message: 'User created successfully',
    };
  }
}
