import { Injectable } from '@nestjs/common';
import { WsGateway } from '../ws/ws.gateway';
import { CurrentSession } from '../models/session';

@Injectable()
export class UsersService {
  constructor(private readonly wsGateway: WsGateway) {}

  newUser(userLogin: string): void {
    const index = CurrentSession.users.indexOf(userLogin);
    if (index > -1) {
      throw new Error('User named' + userLogin + ' already exists!');
    } else {
      CurrentSession.users.push(userLogin);
      this.wsGateway.usersUpdate(CurrentSession.users);
    }
  }

  removeUser(userLogin: string): void {
    const index = CurrentSession.users.indexOf(userLogin);
    if (index > -1) {
      CurrentSession.users.splice(index, 1);
    }
    this.wsGateway.usersUpdate(CurrentSession.users);
  }
}
