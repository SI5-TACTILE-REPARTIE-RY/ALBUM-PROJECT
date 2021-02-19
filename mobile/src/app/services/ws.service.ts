import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WsService {

  constructor(private socket: Socket) {}

  sendWsMessage(message){
    this.socket.emit('message', message);
  }

  albumSessionStartedEvent() {
    return this.socket.fromEvent('album-session-started');
  }

  albumSessionResetEvent() {
    return this.socket.fromEvent('album-session-reset');
  }

  usersEvent() {
    return this.socket.fromEvent('users');
  }

  filterAppliedEvent() {
    return this.socket.fromEvent('filter-applied');
  }

  voteFinishedEvent() {
    return this.socket.fromEvent('vote-finished');
  }

  sendUpVote() {
    this.socket.emit('upVote');
  }

  sendDownVote() {
    this.socket.emit('downVote');
  }
}
