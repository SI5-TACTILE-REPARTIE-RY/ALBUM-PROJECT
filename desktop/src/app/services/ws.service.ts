import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WsService {

  constructor(private socket: Socket) {}

  sendWsMessage(message){
    this.socket.emit('message', message);
  }

  albumSessionStartedEvent(): Observable<any> {
    return this.socket.fromEvent('album-session-started');
  }

  albumSessionStoppedEvent() {
    return this.socket.fromEvent('album-session-stopped');
  }

  usersEvent(): Observable<any> {
    return this.socket.fromEvent('users');
  }

  goodShakeEvent(): Observable<any> {
    return this.socket.fromEvent('good');
  }

  badShakeEvent(): Observable<any> {
    return this.socket.fromEvent('bad');
  }

}
