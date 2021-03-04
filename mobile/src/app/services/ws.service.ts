import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {Session} from './session.service';
import {CropperPosition} from 'ngx-image-cropper';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WsService {

  constructor(private socket: Socket) {}

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

  sessionRefreshed() {
    return this.socket.fromEvent<Session>('refresh');
  }

  sendCropped(position: CropperPosition) {
    this.socket.emit('cropped', position);
  }
}
