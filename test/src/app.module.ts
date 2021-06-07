import { Module, CacheModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PhotoModule } from './photo/photo.module';
import { RedisModule} from 'nestjs-redis'
// import { SearchModule } from './search/search.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchController } from './search/search.controller';
import { SearchService } from './search/search.service';
import { logger } from './middlewares/logger.middleware';
import { CacheController } from './cache/cache.controller';
import { CacheService } from "./cache/cache.service";

@Module({
  imports: [
    RedisModule.register({
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 0,
    }),
    ElasticsearchModule.register({
      node: 'http://localhost:9200',
    }),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      // playground: false, // Playground 是一个图形化的，交互式的浏览器内 GraphQL IDE, false禁用
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    }),
    PhotoModule,
    UsersModule,
    // SearchModule,
    CacheModule.register(),
    AuthModule,
  ],
  controllers: [AppController, SearchController, CacheController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    SearchService,
    CacheService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(logger).forRoutes('photo') //指定路由使用中间件
  }
}
