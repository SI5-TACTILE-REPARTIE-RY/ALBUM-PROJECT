import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import {Session} from './session.service';

@Injectable({
  providedIn: 'root'
})
export class WsService {

  constructor(private socket: Socket) {}

  albumSessionStartedEvent(): Observable<any> {
    return this.socket.fromEvent('album-session-started');
  }

  albumSessionResetEvent(): Observable<any> {
    return this.socket.fromEvent('album-session-reset');
  }

  usersEvent(): Observable<any> {
    return this.socket.fromEvent('users');
  }

  filterAppliedEvent(): Observable<any> {
    return this.socket.fromEvent('filter-applied');
  }

  upVoteEvent(): Observable<any> {
    return this.socket.fromEvent('upVote');
  }

  downVoteEvent(): Observable<any> {
    return this.socket.fromEvent('downVote');
  }

  sessionRefreshed(): Observable<any> {
    return this.socket.fromEvent<Session>('refresh');
  }

}
