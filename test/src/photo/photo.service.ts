import { Injectable, Inject, Param } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';
import { CreatePhotoDto } from './dto/create-photo.input';
import { UpdatePhotoDto } from './dto/update-photo.input';

@Injectable()
export class PhotoService {
  constructor(
    @Inject('PHOTO_REPOSITORY')
    private readonly photoRepository: Repository<Photo>,
  ) {}

  async findAll(first = 100): Promise<Photo[]> {
    return this.photoRepository.find({
      take: first,
      relations: ['user'],
    });
  }

  create(createPhotoCatDto: CreatePhotoDto) {
    this.photoRepository
      .createQueryBuilder()
      .insert()
      .into(Photo)
      .values([createPhotoCatDto])
      .execute();
  }

  findOne(id) {
    return this.photoRepository.findOne(id, { relations: ['user'] });
  }

  update(id: number, updatePhotoDto: UpdatePhotoDto) {
    return this.photoRepository
      .createQueryBuilder()
      .update(Photo)
      .set(updatePhotoDto)
      .where('id = :id', { id: id })
      .execute();
  }

  delete(id: string) {
    return this.photoRepository
      .createQueryBuilder()
      .delete()
      .from(Photo)
      .where('id = :id', { id: id })
      .execute();
  }

  async findEdges(size = 10, number = 1) {
    const [, count] = await this.photoRepository.findAndCount();
    let photos = [];
    const skip = size * number;
    photos = await this.photoRepository.find({ take: size || 10, skip: skip });
    const res = count - (size + size * number);
    const hasNextPage = res > 0;
    const hasPreviousPage = count > size * number;
    // if (first) {
    //   photos = await this.photoRepository.find({ take: first || 10 });
    // } else if (last) {
    //   let skip = count - last;
    //   skip = skip > 0 ? skip : 0;
    //   photos = await this.photoRepository.find({
    //     take: last,
    //     skip: skip,
    //   });
    // } else {
    //   photos = await this.photoRepository.find();
    // }
    const edges = photos.map((item) => {
      return {
        node: item,
        cursor: Math.floor(Math.random() * 10000000),
      };
    });
    return {
      total: count,
      edges: edges,
      pageInfo: {
        hasPreviousPage: hasPreviousPage,
        hasNextPage: hasNextPage,
      },
    };
  }
}
