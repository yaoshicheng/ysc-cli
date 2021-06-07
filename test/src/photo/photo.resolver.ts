// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/create-photo.input';
import { UpdatePhotoDto } from './dto/update-photo.input';

@Resolver('User')
export class PhotoResolver {
  constructor(private readonly photoService: PhotoService) {}

  @Query('photos')
  findAll(
    @Args('first') first: number,
    @Args('after') after: string,
    @Args('last') last: number,
    @Args('before') before: string,
  ) {
    return this.photoService.findAll(first);
  }

  @Query('photosEdge')
  findEdges(@Args('size') size: number, @Args('number') number: number) {
    return this.photoService.findEdges(size, number);
  }

  @Query('photo')
  findOne(@Args('id') id: number) {
    return this.photoService.findOne(id);
  }

  @Mutation('updatePhoto')
  update(
    @Args('id') id: number,
    @Args('updatePhotoInput') updatePhotoInput: UpdatePhotoDto,
  ) {
    return this.photoService.update(id, updatePhotoInput);
  }

  @Mutation('createPhoto')
  create(@Args('createPhotoInput') createPhotoInput: CreatePhotoDto) {
    return this.photoService.create(createPhotoInput);
  }

  @Mutation('removePhoto')
  remove(@Args('username') username: string) {
    return this.photoService.delete(username);
  }
}
