import { WsService } from './ws.service';
import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

export interface Session {
  users: number;
  started: boolean;
  currentPhotoName: string;
  currentFilterName: string;
  photoKept: boolean;
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
  photoSrc$ = new BehaviorSubject<string>(null);

  constructor(
    private wsService: WsService,
    private http: HttpClient
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
    this.wsService.usersEvent().subscribe((users: number) => {
      this.users$.next(users);
    });
    this.wsService.albumSessionStartedEvent().subscribe(() => {
      this.sessionStarted$.next(true);
    });
  }

  async updateSession(): Promise<void> {
    const session = await this.http.get<Session>(environment.SERVER_ADDRESS + '/session').toPromise();
    this.setFromSession(session);
  }

  setFromSession(session: Session): void {
    this.users$.next(session.users);
    this.sessionStarted$.next(session.started);
    this.currentPhotoName$.next(session.currentPhotoName);
    this.currentFilterName$.next(session.currentFilterName);
    this.photoKept$.next(session.photoKept);
    this.photoSrc$.next(environment.SERVER_ADDRESS + '/' + session.currentPhotoName);
  }
}
