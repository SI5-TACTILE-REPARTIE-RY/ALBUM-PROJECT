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
    CurrentSession.currentPhotoName = 'india-photo.jpg';
    this.wsGateway.albumSessionStarted(CurrentSession.currentPhotoName);
  }

  resetAlbumSession(): void {
    CurrentSession.started = false;
    CurrentSession.currentPhotoName = null;
    CurrentSession.currentFilterName = 'noFilter';
    CurrentSession.photoKept = null;
    this.wsGateway.albumSessionReset();
  }

  applyFilter(filterName: string): void {
    CurrentSession.currentFilterName = filterName;
    this.wsGateway.filterApplied(filterName);
  }

  voteFinished(photoKept: boolean): void {
    CurrentSession.photoKept = photoKept;
    this.wsGateway.voteFinished(CurrentSession.photoKept);
  }

  testLock(id: string) {
    CurrentSession.test = id;
    this.wsGateway.refresh();
  }

  testUnlock(id: string) {
    if (CurrentSession.test === id) {
      CurrentSession.test = null;
    }
    this.wsGateway.refresh();
  }
}
