import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  users = [];

  newUser(): string {
    const id = Math.random().toString(36).substr(2, 9);
    this.users.push(id);
    return id;
  }

  removeUser(id: string): void {
    const index = this.users.indexOf(id);
    if (index > -1) {
      this.users.splice(index, 1);
    }
  }
}
