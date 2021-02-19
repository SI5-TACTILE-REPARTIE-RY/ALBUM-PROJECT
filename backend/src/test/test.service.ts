import { Injectable } from '@nestjs/common';
import { CurrentSession } from '../session';
import { WsGateway } from '../ws/ws.gateway';

@Injectable()
export class TestService {
  constructor(private ws: WsGateway) {}

  get test(): string {
    return CurrentSession.test;
  }
  set test(id: string) {
    CurrentSession.test = id;
    this.ws.refresh();
  }

  lockService(id: string) {
    this.test = id;
  }

  unlockService(id: string) {
    if (this.test && this.test === id) {
      this.test = null;
    }
  }
}
