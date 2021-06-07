import { CreateUserInput } from './create-user.input';
import { PartialType } from '@nestjs/mapped-types';
import { IsString } from "class-validator";

export class UpdateUserInput extends PartialType(CreateUserInput) {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;
}
