import { Module } from '@nestjs/common';
import { WsGateway } from './ws.gateway';
import { FiltersGateway } from '../filters/filters.gateway';

@Module({
  providers: [WsGateway],
  exports: [WsGateway],
})
export class WsModule {}
