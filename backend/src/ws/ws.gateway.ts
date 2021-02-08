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
    CurrentSession.users++;
    this.server.emit('users', CurrentSession.users);
  }

  async handleDisconnect() {
    CurrentSession.users--;
    this.server.emit('users', CurrentSession.users);
  }

  @SubscribeMessage('message')
  async onWsMessage(client, message) {
    client.broadcast.emit('message', message);
  }

  async albumSessionStarted(photoSrc: string) {
    this.server.emit('album-session-started', photoSrc);
  }

  async albumSessionStopped() {
    this.server.emit('album-session-stopped');
  }

  async filterApplied(filterName: string) {
    this.server.emit('filter-applied', filterName);
  }
}
