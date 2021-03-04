import { Injectable } from '@nestjs/common';
import { CurrentSession } from '../models/session';
import { WsGateway } from '../ws/ws.gateway';

@Injectable()
export class LockService {
  constructor(private ws: WsGateway) {}

  get cropperOwnerId(): string {
    return CurrentSession.cropperOwnerId;
  }
  set cropperOwnerId(id: string) {
    CurrentSession.cropperOwnerId = id;
    this.ws.refresh();
  }

  lock(buttonName: string, userLogin: string) {
    if (buttonName === 'cropper') {
      this.cropperOwnerId = userLogin;
    }
  }

  unlock(buttonName: string, userLogin: string) {
    if (buttonName === 'cropper') {
      if (this.cropperOwnerId && this.cropperOwnerId === userLogin) {
        this.cropperOwnerId = null;
      }
    }
  }
}
