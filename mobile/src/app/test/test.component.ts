import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {

  constructor(private socket: Socket) { }

  ngOnInit() {}

  onLockEvent(): Promise<string> {
    return this.socket.fromEvent<string>('lock').toPromise();
  }

  onUnlockEvent(): Promise<string> {
    return this.socket.fromEvent<string>('unlock').toPromise();
  }

}
