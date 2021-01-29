import { Injectable } from '@nestjs/common';
import { Session } from './session';
import { WsGateway } from './ws/ws.gateway';

@Injectable()
export class AppService {
  constructor(private readonly wsGateway: WsGateway) {}

  getHello(): string {
    return 'Hello World!';
  }

  startAlbumSession(): void {
    Session.started = true;
    this.wsGateway.send('album session started');
  }
}
