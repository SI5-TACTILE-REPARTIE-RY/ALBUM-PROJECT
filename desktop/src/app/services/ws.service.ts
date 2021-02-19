import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WsService {

  constructor(private socket: Socket) {}

  sendWsMessage(message): void {
    this.socket.emit('message', message);
  }

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

}
