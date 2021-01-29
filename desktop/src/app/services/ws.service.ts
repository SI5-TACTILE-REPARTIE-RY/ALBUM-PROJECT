import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WsService {

  constructor(private socket: Socket) { 

  }

  sendWsTest(message){
    this.socket.emit('ws-test', message);
  }

  receiveWsTest(){
    return this.socket.fromEvent('ws-test');
  }

  getUsers(){
    return this.socket.fromEvent('users');
  }

}
