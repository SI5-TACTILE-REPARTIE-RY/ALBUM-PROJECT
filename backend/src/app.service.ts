import { Injectable } from '@nestjs/common';
import { CurrentSession } from './models/session';
import { WsGateway } from './ws/ws.gateway';

@Injectable()
export class AppService {
  filterStack = ['noFilter'];
  interval = null;

  constructor(private readonly wsGateway: WsGateway) {}

  getHello(): string {
    return 'Hello World!';
  }

  startAlbumSession(): void {
    CurrentSession.started = true;
    CurrentSession.currentPhotoName = CurrentSession.photos[0];
    this.wsGateway.albumSessionStarted(CurrentSession.currentPhotoName);
  }

  resetAlbumSession(): void {
    CurrentSession.users = [];
    CurrentSession.started = false;
    CurrentSession.currentPhotoName = null;
    CurrentSession.currentFilterName = 'noFilter';
    CurrentSession.cropperOwnerId = null;
    CurrentSession.cropperPosition = null;
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

  nextPhoto(): void {
    let currentPhotoIndex = CurrentSession.photos.indexOf(CurrentSession.currentPhotoName);
    if (currentPhotoIndex === CurrentSession.photos.length - 1) {
      // session finished
    }
    CurrentSession.currentPhotoName = CurrentSession.photos[++currentPhotoIndex];
    CurrentSession.currentFilterName = 'noFilter';
    CurrentSession.cropperOwnerId = null;
    CurrentSession.cropperPosition = null;
    CurrentSession.cropperPosition = null;
    this.wsGateway.refresh();
  }
}
