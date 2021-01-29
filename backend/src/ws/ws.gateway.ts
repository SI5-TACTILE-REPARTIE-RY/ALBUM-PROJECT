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

  constructor() {
    console.log('ICI');
  }

  async handleConnection() {
    // A client has connected
    Session.users++;

    // Notify connected clients of current users
    this.server.emit('users', Session.users);
  }

  async handleDisconnect() {
    // A client has disconnected
    Session.users--;

    // Notify connected clients of current users
    this.server.emit('users', Session.users);
  }

  @SubscribeMessage('ws-test')
  async onWsTest(client, message) {
    console.log(message);
    client.broadcast.emit('ws-test', message);
  }

  async send(message) {
    this.server.emit('ws-test', message);
  }
}
