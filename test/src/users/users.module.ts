import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { usersProviders } from './users.providers';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersResolver } from './users.resolver';
import { PhotoModule } from '../photo/photo.module';
import { photoProviders } from '../photo/photo.providers';
// import { SearchService } from '../search/search.service';

@Module({
  imports: [DatabaseModule, PhotoModule],
  providers: [
    ...usersProviders,
    ...photoProviders,
    UsersResolver,
    UsersService,
  ],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
