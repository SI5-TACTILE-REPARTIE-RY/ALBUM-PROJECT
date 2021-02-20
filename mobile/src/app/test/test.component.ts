import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Session, SessionService} from '../services/session.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {

  test: string = null;
  userID: string = null;
  session: Session = null;

  constructor(private socket: Socket, private sessionService: SessionService) {
    this.sessionService.test$.subscribe((test: string) => {
      this.test = test;
    });
    this.sessionService.userID$.subscribe((userID: string) => {
      this.userID = userID;
    });
  }

  ngOnInit() {}

  onLockEvent(): Promise<string> {
    return this.socket.fromEvent<string>('lock').toPromise();
  }

  onUnlockEvent(): Promise<string> {
    return this.socket.fromEvent<string>('unlock').toPromise();
  }

  canUnlock(): boolean {
    return this.test === this.userID;
  }

  isUnlocked(): boolean {
    return this.test === null;
  }

  isLocked(): boolean {
    return this.test !== this.userID && this.test !== null;
  }

  lock() {
    this.sessionService.lock();
  }

  unlock() {
    this.sessionService.unlock();
  }
}
