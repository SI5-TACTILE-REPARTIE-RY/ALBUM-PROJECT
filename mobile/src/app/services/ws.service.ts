import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {Session} from './session.service';
import {CropperPosition} from 'ngx-image-cropper';

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

  sendUpVote(userLogin: string) {
    console.log('UP');
    this.socket.emit('upVote', userLogin);
  }

  sendDownVote(userLogin: string) {
    console.log('DOWN');
    this.socket.emit('downVote', userLogin);
  }

  sessionRefreshed() {
    return this.socket.fromEvent<Session>('refresh');
  }

  sendCropped(position: CropperPosition) {
    this.socket.emit('cropped', position);
  }
}
