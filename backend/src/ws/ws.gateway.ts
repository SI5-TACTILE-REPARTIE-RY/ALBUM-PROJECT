import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Session } from '../session';

@WebSocketGateway()
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;

  async handleConnection() {
    Session.users++;
    this.server.emit('users', Session.users);
  }

  async handleDisconnect() {
    Session.users--;
    this.server.emit('users', Session.users);
  }

  @SubscribeMessage('message')
  async onWsMessage(client, message) {
    client.broadcast.emit('message', message);
  }

  async albumSessionStarted(photoSrc: string) {
    this.server.emit('album-session-started', photoSrc);
  }
}
