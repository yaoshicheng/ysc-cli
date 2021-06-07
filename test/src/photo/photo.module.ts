import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { photoProviders } from './photo.providers';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { PhotoResolver } from './photo.resolver';
// import { SearchService } from '../search/search.service';
// import { ElasticsearchService } from '@nestjs/elasticsearch';

@Module({
  imports: [DatabaseModule],
  providers: [...photoProviders, PhotoResolver, PhotoService],
  controllers: [PhotoController],
})
export class PhotoModule {}
