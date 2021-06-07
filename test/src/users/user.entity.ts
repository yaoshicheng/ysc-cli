import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { Photo } from '../photo/photo.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Photo, (photo) => photo.user)
  photos: Photo[];
}
