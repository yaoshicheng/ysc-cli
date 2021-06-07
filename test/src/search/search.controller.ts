// search.controller.ts

import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { SearchService } from './search.service';
import Any = jasmine.Any;

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post('create')
  create(@Body() body: Any) {
    return this.searchService.create(body);
  }

  @Post('bulk')
  bulk(@Body() body: Any) {
    return this.searchService.bulk(body);
  }

  @Get()
  search(@Body() body: Any) {
    return this.searchService.search(body);
  }
  @Get('count')
  count(@Body() body: Any) {
    return this.searchService.count(body);
  }

  @Get('source')
  source(@Body() body: Any) {
    return this.searchService.source(body);
  }

  @Get(':id')
  searchById(@Param('id') id, @Body() body: Any) {
    return this.searchService.get({
      id: id,
      ...body,
    });
  }

  @Put('update')
  update(@Body() body: Any) {
    return this.searchService.update(body);
  }

  @Delete('delete')
  delete(@Body() body: Any) {
    return this.searchService.delete(body);
  }

  @Delete('deleteByQuery')
  deleteByQuery(@Body() body: Any) {
    return this.searchService.deleteByQuery(body);
  }

  @Get('exist')
  exist(@Body() body: Any) {
    return this.searchService.exist(body);
  }

  @Post('mget')
  mget(@Body() body: Any) {
    return this.searchService.mget(body);
  }

  @Get('explain')
  explain(@Body() body: Any) {
    return this.searchService.explain(body);
  }

  @Post('msearch')
  msearch(@Body() body: Any) {
    return this.searchService.msearch(body);
  }

  @Post('reindex')
  reindex(@Body() body: Any) {
    return this.searchService.reindex(body);
  }
}
