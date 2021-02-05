import { Injectable } from '@nestjs/common';
import { CurrentSession } from './session';
import { WsGateway } from './ws/ws.gateway';

@Injectable()
export class AppService {
  constructor(private readonly wsGateway: WsGateway) {}

  getHello(): string {
    return 'Hello World!';
  }

  startAlbumSession(): void {
    CurrentSession.started = true;
    CurrentSession.currentPhotoSrc = 'http://localhost:3000/india-photo.jpg';
    this.wsGateway.albumSessionStarted(CurrentSession.currentPhotoSrc);
  }

  stopAlbumSession(): void {
    CurrentSession.started = false;
    this.wsGateway.albumSessionStopped();
  }

  applyFilter(filterName: string): void {
    CurrentSession.currentFilterName = filterName;
    this.wsGateway.filterApplied(filterName);
  }
}
