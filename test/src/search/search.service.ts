import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import Any = jasmine.Any;

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  // 添加、修改、删除数据
  async bulk<T>(params: any) {
    return this.elasticsearchService.bulk<T>(params);
  }

  // 查询数据
  async search<T>(params) {
    return this.elasticsearchService.search<T>(params);
  }

  create<T>(params) {
    return this.elasticsearchService.create<T>(params);
  }

  update<T>(params) {
    return this.elasticsearchService.update<T>(params);
  }

  source<T>(params) {
    return this.elasticsearchService.getSource<T>(params);
  }

  get<T>(params) {
    return this.elasticsearchService.get<T>(params);
  }

  count<T>(params) {
    return this.elasticsearchService.count<T>(params);
  }

  delete<T>(params) {
    return this.elasticsearchService.delete<T>(params);
  }

  deleteByQuery<T>(params) {
    return this.elasticsearchService.deleteByQuery<T>(params);
  }

  exist<T>(params) {
    return this.elasticsearchService.exists<T>(params);
  }

  mget<T>(params) {
    return this.elasticsearchService.mget<T>(params);
  }

  explain<T>(params) {
    return this.elasticsearchService.explain<T>(params);
  }

  msearch<T>(params) {
    return this.elasticsearchService.msearch<T>(params);
  }

  reindex<T>(params) {
    return this.elasticsearchService.reindex<T>(params);
  }
}
