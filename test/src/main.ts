import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { logger } from './middlewares/logger.middleware';
// import * as csurf from 'csurf';
// import { ValidationPipe } from './pipes/validate.pipe';
// import * as rateLimit from 'express-rate-limit';
// import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(compression()); // 压缩支持
  app.use(cookieParser());
  // app.use(csurf()); // CSRF保护
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  ); // session支持
  // app.use(
  //   rateLimit({
  //     windowMs: 15 * 60 * 1000, // 15 minutes
  //     max: 100, // limit each IP to 100 requests per windowMs
  //   }),
  // ); // 限速
  // app.use(helmet()); // Helmet防护, 打开的话一些基于csp的文件下载有问题

  app.enableCors();

  app.useGlobalFilters(new HttpExceptionFilter());

  // app.useGlobalPipes(new ValidationPipe());

  app.use(logger);

  await app.listen(3009);
}
bootstrap();
