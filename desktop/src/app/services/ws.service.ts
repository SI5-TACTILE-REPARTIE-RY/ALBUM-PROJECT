import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WsService {

  constructor(private socket: Socket) { 

  }

  sendWsMessage(message){
    this.socket.emit('message', message);
  }

  albumSessionStartedEvent() {
    return this.socket.fromEvent('album-session-started');
  }

  usersEvent(){
    return this.socket.fromEvent('users');
  }

}
