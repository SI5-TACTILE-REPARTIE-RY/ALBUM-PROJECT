import { Module } from '@nestjs/common';
import { WsGateway } from './ws.gateway';
import { UsersService } from '../users/users.service';
import { TestService } from '../test/test.service';

@Module({
  providers: [WsGateway, UsersService, TestService],
  exports: [WsGateway],
})
export class WsModule {}
