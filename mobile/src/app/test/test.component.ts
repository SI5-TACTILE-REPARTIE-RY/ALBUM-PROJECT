import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Session, SessionService} from '../services/session.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {

  userID: string = null;
  session: Session = null;

  constructor(private socket: Socket, private sessionService: SessionService) {
    this.sessionService.session$.subscribe((session: Session) => {
      this.session = session;
    });
    this.sessionService.userID$.subscribe((id: string) => {
      this.userID = id;
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
    if (this.session) {
      return this.session.test === this.userID;
    } else {
      return false;
    }
  }

  isUnlocked(): boolean {
    if (this.session) {
      return this.session.test === null;
    } else {
      return false;
    }
  }

  isLocked(): boolean {
    if (this.session) {
      return this.session.test !== this.userID && this.session.test !== null;
    } else {
      return false;
    }
  }

  lock() {
    this.sessionService.lock();
  }

  unlock() {
    this.sessionService.unlock();
  }
}
