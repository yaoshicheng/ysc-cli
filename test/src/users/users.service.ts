import { Injectable, Inject } from '@nestjs/common';
import { EntityManager, Equal, getManager, Repository, Transaction } from "typeorm";
import { User } from './user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { Photo } from '../photo/photo.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
    @Inject('PHOTO_REPOSITORY')
    private readonly photoRepository: Repository<Photo>,
  ) {}

  async findOne(id: number): Promise<User | undefined> {
    const user = await this.userRepository.findOne(id, {
      relations: ['photos'],
    });
    return user;
  }

  async findByName(name: string): Promise<User[]> {
    return this.userRepository.find({
      username: Equal(name),
    });
  }

  findAll() {
    return this.userRepository.find({ relations: ['photos'] });
  }

  async create(createUserDto) {
    const { username, password, photos = [] } = createUserDto;

    // 使用EntityManager提交
    // const user = new User();
    // user.username = username;
    // user.password = password;
    // user.photos = photos;
    //
    // return getManager()
    //   .transaction(async (entityManage: EntityManager) => {
    //     const user: { [propName: string]: any } = await entityManage.save(
    //       User,
    //       {
    //         username,
    //         password,
    //         photos,
    //       },
    //     );
    //     //throw new Error('主动抛出错误');
    //     for (const item of photos) {
    //       const { name, description, filename, views, isPublished } = item;
    //       const photo = new Photo();
    //       photo.name = name;
    //       photo.description = description;
    //       photo.filename = filename;
    //       photo.views = views;
    //       photo.isPublished = isPublished;
    //       await entityManage.save(Photo, {
    //         name,
    //         description,
    //         filename,
    //         views,
    //         isPublished,
    //       });
    //     }
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     return '创建成功';
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     return '创建失败';
    //   });

    // 使用Repository提交
    const user = new User();
    user.username = username;
    user.password = password;
    user.photos = photos;
    await this.photoRepository
      .createQueryBuilder()
      .insert()
      .into(Photo)
      .values(photos)
      .execute();
    return await this.userRepository.save(user);
  }

  update(id: number, updateUserDto: UpdateUserInput) {
    return this.userRepository
      .createQueryBuilder()
      .update(User)
      .set(updateUserDto)
      .where('id = :id', { id: id })
      .execute();
  }

  delete(id: string) {
    return this.userRepository
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('id = :id', { id: id })
      .execute();
  }
}
