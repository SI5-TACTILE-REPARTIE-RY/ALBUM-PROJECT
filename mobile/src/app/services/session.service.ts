import { HttpService } from './http.service';
import { WsService } from './ws.service';
import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface Session {
  users: number;
  started: boolean;
  currentPhotoName: string;
  currentFilterName: string;
  photoKept: boolean;
  test: string;
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  users$ = new BehaviorSubject<number>(0);
  sessionStarted$ = new BehaviorSubject<boolean>(false);
  currentPhotoName$ = new BehaviorSubject<string>(null);
  currentFilterName$ = new BehaviorSubject<string>('noFilter');
  photoKept$ = new BehaviorSubject<boolean>(null);
  test$ = new BehaviorSubject<string>(null);

  userID$ = new BehaviorSubject<string>(null);
  private get userID(): string {
    return this.userID$.getValue();
  }

  constructor(
      private wsService: WsService,
      private http: HttpService
  ) {
    this.connect();
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
    this.wsService.usersEvent().subscribe((users: number) => {
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

  private connect() {
    this.http.get('/connect').then((id: string) => {
      this.userID$.next(id);
    }).catch(error => {
      console.log('ERROR::', error);
    });
  }

  lock() {
    this.http.get(`/lock/${this.userID}`);
  }

  unlock() {
    this.http.get(`/unlock/${this.userID}`);
  }

  disconnect(): Promise<any> {
    return this.http.get(`/disconnect/${this.userID}`);
  }

  async updateSession() {
    const session = await this.http.get('/session');
    this.setFromSession(session);
  }

  setFromSession(session: Session) {
    this.users$.next(session.users);
    this.sessionStarted$.next(session.started);
    this.currentPhotoName$.next(session.currentPhotoName);
    this.currentFilterName$.next(session.currentFilterName);
    this.photoKept$.next(session.photoKept);
    this.test$.next(session.test);
  }
}
