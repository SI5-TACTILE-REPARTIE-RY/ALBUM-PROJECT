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

  voteFinishedEvent(): Observable<any> {
    return this.socket.fromEvent('vote-finished');
  }

  croppedEvent(): Observable<any> {
    return this.socket.fromEvent('cropped');
  }

  filterStack(): Observable<string[]> {
    return this.socket.fromEvent<string[]>('filter-stack');
  }

  echoFilterEvent(): Observable<string> {
    return this.socket.fromEvent<string>('filter-echo');
  }

  echoReversedFilterEvent(): Observable<string> {
    return this.socket.fromEvent<string>('reversed-filter-echo');
  }

}
