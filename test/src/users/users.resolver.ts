// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query('users')
  findAll() {
    return this.usersService.findAll();
  }

  @Query('user')
  findOne(@Args('id') id: number) {
    return this.usersService.findOne(id);
  }

  // @Query('user2')
  // findByName(@Args('username') username: string) {
  //   return this.usersService.findByName(username);
  // }

  @Mutation('updateUser')
  update(
    @Args('id') id: number,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.update(id, updateUserInput);
  }

  @Mutation('createUser')
  create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Mutation('removeUser')
  remove(@Args('username') username: string) {
    return this.usersService.delete(username);
  }
}
