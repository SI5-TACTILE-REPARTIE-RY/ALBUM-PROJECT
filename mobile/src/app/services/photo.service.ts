import { Injectable } from '@angular/core';
import {BehaviorSubject, forkJoin} from 'rxjs';
import {environment} from '../../environments/environment';
import {SessionService} from './session.service';
import {CropperPosition, ImageCroppedEvent} from 'ngx-image-cropper';
import {WsService} from './ws.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  photoSrc$ = new BehaviorSubject<string>(null);
  photoHeightPx$ = new BehaviorSubject<number>(0);

  constructor(private sessionService: SessionService, private wsService: WsService) {
    this.sessionService.currentPhotoName$.subscribe((currentPhotoName) => {
      if (currentPhotoName) {
        this.photoSrc$.next(environment.SERVER_ADDRESS + '/' + currentPhotoName);
      }
    });
  }

  updatePhotoHeightPx$(photoHeightPx: number) {
    this.photoHeightPx$.next(photoHeightPx);
  }

  cropped(position: CropperPosition) {
    this.wsService.sendCropped(position);
  }
}
