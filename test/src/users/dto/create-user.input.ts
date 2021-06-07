import { IsString } from 'class-validator';

export class CreateUserInput {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;
}
