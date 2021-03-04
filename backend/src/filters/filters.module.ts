import { Module } from '@nestjs/common';
import { FiltersGateway } from './filters.gateway';
import { FiltersService } from './filters.service';

@Module({
  providers: [FiltersGateway, FiltersService],
  exports: [FiltersGateway, FiltersService],
})
export class FiltersModule {}
