// COMMON
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

// OTHER
import { CurrentSession } from '../models/session';

@WebSocketGateway()
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;

  handleConnection() {
    console.log('GATEWAY :: CONNECTION');
  }

  handleDisconnect() {
    console.log('GATEWAY :: DISCONNECT');
  }

  @SubscribeMessage('message')
  onWsMessage(client, message) {
    console.log(`GATEWAY :: RECIEVE :: MESSAGE EVENT :: ${message}`);
    client.broadcast.emit('message', message);
  }

  @SubscribeMessage('upVote')
  onUpVote(client, userLogin) {
    console.log(`GATEWAY :: RECEIVE :: UP VOTE SHAKE`);
    client.broadcast.emit('upVote', userLogin);
  }

  @SubscribeMessage('downVote')
  onDownVote(client, userLogin) {
    console.log(`GATEWAY :: RECEIVE :: DOWN VOTE SHAKE`);
    client.broadcast.emit('downVote', userLogin);
  }

  @SubscribeMessage('cropped')
  cropped(client, position) {
    console.log(`GATEWAY :: RECEIVE :: CROPPED EVENT`);
    CurrentSession.cropperPosition = position;
    client.broadcast.emit('cropped', position);
  }

  albumSessionStarted(photoSrc: string) {
    console.log(`GATEWAY :: EMIT :: START ALBUM SESSION`);
    this.server.emit('album-session-started', photoSrc);
  }

  albumSessionReset() {
    console.log(`GATEWAY :: EMIT :: ALBUM SESSION RESET`);
    this.server.emit('album-session-reset', CurrentSession);
  }

  filterApplied(filterName: string) {
    console.log(`GATEWAY :: EMIT :: APPLY FILTER :: ${filterName}`);
    this.server.emit('filter-applied', filterName);
  }

  voteFinished(photoKept: boolean) {
    console.log(`GATEWAY :: EMIT :: VOTE FINISHED :: ${photoKept}`);
    this.server.emit('vote-finished', photoKept);
  }

  filterStack(filterStack: string[]) {
    console.log(`GATEWAY :: EMIT :: REFRESH FILTER STACK :: ${filterStack}`);
    this.server.emit('filter-stack', filterStack);
  }

  refresh() {
    console.log(`GATEWAY :: EMIT :: ASK REFRESH :: ${CurrentSession}`);
    this.server.emit('refresh', CurrentSession);
  }

  usersUpdate(users) {
    console.log(`GATEWAY :: EMIT :: USERS UPDATE :: ${users}`);
    this.server.emit('users', users);
  }

  nextPhoto() {
    console.log(`GATEWAY :: EMIT :: NEXT PHOTO`);
    this.server.emit('next-photo');
  }
}
