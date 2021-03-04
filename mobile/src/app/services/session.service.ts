import { HttpService } from './http.service';
import { WsService } from './ws.service';
import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface Session {
  users: string[];
  started: boolean;
  currentPhotoName: string;
  currentFilterName: string;
  photoKept: boolean;
  cropperOwnerId: string;
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  users$ = new BehaviorSubject<string[]>([]);
  sessionStarted$ = new BehaviorSubject<boolean>(false);
  currentPhotoName$ = new BehaviorSubject<string>(null);
  currentFilterName$ = new BehaviorSubject<string>('noFilter');
  photoKept$ = new BehaviorSubject<boolean>(null);
  cropperOwnerId$ = new BehaviorSubject<string>(null);

  userLogin$ = new BehaviorSubject<string>(null);
  private get userLogin(): string {
    return this.userLogin$.getValue();
  }

  constructor(
      private wsService: WsService,
      private http: HttpService
  ) {
    this.updateSession();
    this.wsService.albumSessionResetEvent().subscribe(() => {
      this.updateSession();
    });
    this.wsService.sessionRefreshed().subscribe((session: Session) => {
      this.setFromSession(session);
    });
    this.wsService.filterAppliedEvent().subscribe(async (filterName: string) => {
      this.currentFilterName$.next(filterName);
    });
    this.wsService.usersEvent().subscribe((users: string[]) => {
      this.users$.next(users);
    });
    this.wsService.albumSessionStartedEvent().subscribe((photoName: string) => {
      this.sessionStarted$.next(true);
      this.currentPhotoName$.next(photoName);
    });
    this.wsService.voteFinishedEvent().subscribe((photoKept: boolean) => {
      this.photoKept$.next(photoKept);
      if (!photoKept) {
        this.http.get('/reset-album-session');
      }
    });
  }

  public connect(userLogin: string) {
    this.http.get('/connect/' + userLogin).then(() => {
      this.userLogin$.next(userLogin);
    }).catch(error => {
      console.log('ERROR::', error);
    });
  }

  lock(buttonName: string) {
    this.http.get(`/lock/${buttonName}/${this.userLogin}`);
  }

  unlock(buttonName: string) {
    this.cropperOwnerId$.next(null);
    this.http.get(`/unlock/${buttonName}/${this.userLogin}`);
  }

  disconnect(): Promise<any> {
    return this.http.get(`/disconnect/${this.userLogin}`);
  }

  async updateSession() {
    const session = await this.http.get('/session');
    this.setFromSession(session);
  }

  setFromSession(session: Session) {
    console.log(session);
    this.users$.next(session.users);
    this.sessionStarted$.next(session.started);
    this.currentPhotoName$.next(session.currentPhotoName);
    this.currentFilterName$.next(session.currentFilterName);
    this.photoKept$.next(session.photoKept);
    this.cropperOwnerId$.next(session.cropperOwnerId);
  }

  buttonOwnerId(buttonName: string) {
    if (buttonName === 'cropper') {
      return this.cropperOwnerId$;
    }
  }

  nextPhoto(): void {
    this.http.get(`/next-photo`);
  }
}
