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

  voteFinished(photoKept: string): void {
    CurrentSession.photoKept = photoKept === 'true';
    if (CurrentSession.photoKept) {
      this.wsGateway.voteFinished(CurrentSession.photoKept);
    } else {
      this.resetAlbumSession();
    }
  }
}
