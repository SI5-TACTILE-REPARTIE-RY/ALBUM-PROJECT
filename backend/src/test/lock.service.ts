import { Injectable } from '@nestjs/common';
import { CurrentSession } from '../session';
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

  lock(buttonName: string, userId: string) {
    if (buttonName === 'cropper') {
      this.cropperOwnerId = userId;
    }
  }

  unlock(buttonName: string, userId: string) {
    if (buttonName === 'cropper') {
      if (this.cropperOwnerId && this.cropperOwnerId === userId) {
        this.cropperOwnerId = null;
      }
    }
  }
}
