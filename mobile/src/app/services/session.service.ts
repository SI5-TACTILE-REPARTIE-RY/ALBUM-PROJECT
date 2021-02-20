import { HttpService } from './http.service';
import { WsService } from './ws.service';
import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Socket} from 'ngx-socket-io';

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

  userID$ = new BehaviorSubject<string>(null);
  private get userID(): string {
    return this.userID$.getValue();
  }

  session$ = new BehaviorSubject<Session>(null);

  constructor(
      private wsService: WsService,
      private http: HttpService,
      private socket: Socket
  ) {
    this.connect();
    this.wsService.albumSessionResetEvent().subscribe(() => {
      this.updateSession();
    });
    this.socket.fromEvent<Session>('refresh').subscribe((session: Session) => {
      this.session$.next(session);
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
    this.session$.next(await this.http.get('/session'));
  }
}
