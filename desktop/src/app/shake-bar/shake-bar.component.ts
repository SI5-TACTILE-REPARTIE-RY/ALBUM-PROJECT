import { Component, OnInit } from '@angular/core';
import {Socket} from 'ngx-socket-io';

@Component({
  selector: 'app-shake-bar',
  templateUrl: './shake-bar.component.html',
  styleUrls: ['./shake-bar.component.css']
})
export class ShakeBarComponent implements OnInit {

  ctr = 0;

  constructor(private socket: Socket) {
    this.socket.fromEvent('shake').subscribe(() => {
      console.log('fromEvent received!');
      this.increment();
    });
    this.socket.on('shake', () => {
      console.log('on received');
    });
  }

  ngOnInit(): void {
    // setInterval(() => {
    //   this.decrement();
    // }, 1000);
  }

  private increment(): void {
    ++this.ctr;
  }

  private decrement(): void {
    if (this.ctr > 0) {
      --this.ctr;
    }
  }

}
