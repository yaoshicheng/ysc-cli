// cache.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CacheService } from './cache.service';
import Any = jasmine.Any;
interface setParam {
  key: string;
  value: any;
  seconds?: number;
}

@Controller('cache')
export class CacheController {
  constructor(private readonly cacheService: CacheService) {}

  @Post('set')
  set(@Body() body) {
    const { key, value, seconds = 0 } = body || {};
    return this.cacheService.set(key, value, seconds);
  }

  @Get('get')
  get(@Body() body) {
    const { key } = body || {};
    return this.cacheService.get(key);
  }

  @Delete('del')
  del(@Body() body) {
    const { key } = body || {};
    return this.cacheService.del(key);
  }

  @Post('flush')
  search(@Body() body: Any) {
    return this.cacheService.flushall();
  }
}
