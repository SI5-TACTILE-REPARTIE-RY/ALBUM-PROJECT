import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Session, SessionService} from '../services/session.service';

@Component({
  selector: 'app-lock-button',
  templateUrl: './lock-button.component.html',
  styleUrls: ['./lock-button.component.scss'],
})
export class LockButtonComponent implements OnInit {
  @Input() buttonName: string;
  @Output() clicked = new EventEmitter<void>();
  buttonOwnerId: string = null;
  userLogin: string = null;

  constructor(private socket: Socket, private sessionService: SessionService) {}

  ngOnInit() {
    this.sessionService.buttonOwnerId(this.buttonName).subscribe((buttonOwnerId: string) => {
      this.buttonOwnerId = buttonOwnerId;
    });
    this.sessionService.userLogin$.subscribe((userLogin: string) => {
      this.userLogin = userLogin;
    });
  }

  isLocked(): boolean {
    return this.buttonOwnerId !== this.userLogin && !!this.buttonOwnerId;
  }

  lock() {
    this.clicked.emit();
    this.sessionService.lock(this.buttonName);
  }
}
