import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './provider/users.service';
import { CreateUserDto } from './dtos/create-users.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AuthGuard } from './guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @UseGuards(AuthGuard)
  public async getUsers() {
    const users = await this.usersService.getUsers();
    return {
      success: true,
      data: users,
      message: users.length ? 'Users fetched successfully' : 'No users found',
    };
  }

  @Get(':id')
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

  @Delete(':id')
  public async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.deleteUser(id);
    return {
      success: true,
      message: 'User deleted successfully',
    };
  }

  @Put(':id')
  public async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.usersService.updateUser(id, updateUserDto);
    return {
      success: true,
      data: user,
      message: 'User updated successfully',
    };
  }
}
