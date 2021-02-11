import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { CurrentSession } from '../session';

@WebSocketGateway()
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;

  async handleConnection() {
    console.log('GATEWAY :: CONNECTION');
    CurrentSession.users++;
    this.server.emit('users', CurrentSession.users);
  }

  async handleDisconnect() {
    console.log('GATEWAY :: DISCONNECT');
    CurrentSession.users--;
    this.server.emit('users', CurrentSession.users);
  }

  @SubscribeMessage('message')
  async onWsMessage(client, message) {
    console.log(`GATEWAY :: RECIEVE :: MESSAGE EVENT :: ${message}`);
    client.broadcast.emit('message', message);
  }

  @SubscribeMessage('good')
  async onGoodShake() {
    console.log(`GATEWAY :: RECEIVE :: GOOD SHAKE`);
    this.server.emit('good');
  }

  @SubscribeMessage('bad')
  async onBadShake() {
    console.log(`GATEWAY :: RECEIVE :: BAD SHAKE`);
    this.server.emit('bad');
  }

  async albumSessionStarted(photoSrc: string) {
    console.log(`GATEWAY :: EMIT :: START ALBUM SESSION`);
    this.server.emit('album-session-started', photoSrc);
  }

  async albumSessionReset() {
    console.log(`GATEWAY :: EMIT :: ALBUM SESSION RESET`);
    this.server.emit('album-session-reset', CurrentSession);
  }

  async filterApplied(filterName: string) {
    console.log(`GATEWAY :: EMIT :: APPLY FILTER :: ${filterName}`);
    this.server.emit('filter-applied', filterName);
  }

  async voteFinished(photoKept: boolean) {
    console.log(`GATEWAY :: EMIT :: VOTE FINISHED :: ${photoKept}`);
    this.server.emit('vote-finished', photoKept);
  }
}
