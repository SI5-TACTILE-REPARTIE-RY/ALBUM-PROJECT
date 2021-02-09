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
    console.log(`GATEWAY :: MESSAGE EVENT :: ${message}`);
    client.broadcast.emit('message', message);
  }

  async albumSessionStarted(photoSrc: string) {
    console.log(`GATEWAY :: START ALBUM SESSION`);
    this.server.emit('album-session-started', photoSrc);
  }

  async albumSessionStopped() {
    console.log(`GATEWAY :: STOP ALBUM SESSION`);
    this.server.emit('album-session-stopped');
  }

  async filterApplied(filterName: string) {
    console.log(`GATEWAY :: APPLY FILTER :: ${filterName}`);
    this.server.emit('filter-applied', filterName);
  }
}
