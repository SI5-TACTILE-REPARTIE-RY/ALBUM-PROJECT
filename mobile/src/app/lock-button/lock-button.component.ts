import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Session, SessionService} from '../services/session.service';
import {ToastController} from '@ionic/angular';

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

  constructor(private socket: Socket,
              private sessionService: SessionService,
              private toastController: ToastController) {}

  ngOnInit() {
    this.sessionService.buttonOwnerId(this.buttonName).subscribe(async (buttonOwnerId: string) => {
      this.buttonOwnerId = buttonOwnerId === 'null' ? null : buttonOwnerId;
      if (this.isLocked()) {
        const toast = await this.toastController.create({
          message: buttonOwnerId + ' is using ' + this.buttonName,
          duration: 2000
        });
        await toast.present();
      }
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
