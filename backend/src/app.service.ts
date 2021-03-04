import { Injectable } from '@nestjs/common';
import { CurrentSession } from './models/session';
import { WsGateway } from './ws/ws.gateway';
import { SessionService } from './session/session.service';

@Injectable()
export class AppService {
  filterStack = ['noFilter'];
  interval = null;

  constructor(
    private readonly wsGateway: WsGateway,
    private sessionService: SessionService,
  ) {}

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
    this.filterStack.push(filterName);
    this.wsGateway.filterStack(this.filterStack);
  }

  voteFinished(photoKept: boolean): void {
    CurrentSession.photoKept = photoKept;
    this.wsGateway.voteFinished(CurrentSession.photoKept);
    // if (CurrentSession.photoKept) {
    //   this.wsGateway.voteFinished(CurrentSession.photoKept);
    //   CurrentSession.chosenPhoto.push(CurrentSession.currentPhotoName);
    // } else {
    //   CurrentSession.chosenPhoto.push(CurrentSession.currentPhotoName);
    //   this.resetAlbumSession();
    // }
  }
}
