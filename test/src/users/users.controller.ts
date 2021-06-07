import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { ValidationPipe } from '../pipes/validate.pipe';
import { UpdateUserInput } from './dto/update-user.input';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Get(':id')
  async get(@Param('id') id): Promise<User | undefined> {
    return this.usersService.findOne(id);
  }

  @Get()
  async getByName(@Query('username') username): Promise<User[]> {
    return this.usersService.findByName(username);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserInput) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
