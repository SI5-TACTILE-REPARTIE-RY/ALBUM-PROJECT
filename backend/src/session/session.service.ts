import { Injectable } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';
import { Session } from '../models/session';
import { WsGateway } from '../ws/ws.gateway';

@Injectable()
export class SessionService {
  session: Session = {
    users: [],
    started: false,
    currentPhotoName: null,
    currentFilterName: 'noFilter',
    photoKept: null,
    cropperOwnerId: null,
    cropperPosition: null,
  };
  session$: BehaviorSubject<Session>;

  constructor(private gateway: WsGateway) {
    this.session$ = new BehaviorSubject<Session>(this.session);
  }

  startAlbumSession(): void {
    this.session.started = true;
    this.session.currentPhotoName = 'india-photo.jpg';
    this.session$.next(this.session); // Notify observers
    this.gateway.albumSessionStarted(this.session.currentPhotoName);
  }

  applyFilter(filterName: string): void {
    // this.filterStack.push(filterName);
    // this.wsGateway.filterStack(this.filterStack);
  }

  voteFinished(photoKept: boolean): void {
    this.session.photoKept = photoKept;
    this.session$.next(this.session); // Notify observers
    this.gateway.voteFinished(this.session.photoKept);
    // if (CurrentSession.photoKept) {
    //   this.wsGateway.voteFinished(CurrentSession.photoKept);
    //   CurrentSession.chosenPhoto.push(CurrentSession.currentPhotoName);
    // } else {
    //   CurrentSession.chosenPhoto.push(CurrentSession.currentPhotoName);
    //   this.resetAlbumSession();
    // }
  }
}
