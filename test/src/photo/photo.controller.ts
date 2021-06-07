import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { PhotoService } from './photo.service';

import { Photo } from './photo.entity';
import { CreatePhotoDto } from './dto/create-photo.input';
import { UpdatePhotoDto } from './dto/update-photo.input';
import { ValidationPipe } from '../pipes/validate.pipe';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../constant/enumMap';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}
  @Get()
  // @Roles(Role.Admin) //角色权限控制
  async findAll(@Query('first') first: number): Promise<Photo[]> {
    return this.photoService.findAll(first);
  }

  @Get(':id')
  async get(@Param('id') id): Promise<Photo | undefined> {
    return this.photoService.findOne(id);
  }

  @Post('create')
  async create(@Body() createPhotoDto: CreatePhotoDto) {
    return this.photoService.create(createPhotoDto);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  update(@Param('id') id: number, @Body() updateCatDto: UpdatePhotoDto) {
    return this.photoService.update(id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photoService.delete(id);
  }
}
