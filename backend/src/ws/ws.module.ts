import { Module } from '@nestjs/common';
import { WsGateway } from './ws.gateway';
import { TestService } from '../test/test.service';

@Module({
  providers: [WsGateway, TestService],
  exports: [WsGateway, TestService],
})
export class WsModule {}
