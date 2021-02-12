import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {GameService} from '../services/game.service';

@Component({
  selector: 'app-shake-bar',
  templateUrl: './shake-bar.component.html',
  styleUrls: ['./shake-bar.component.css']
})
export class ShakeBarComponent implements OnInit {
  goodResult: number;
  badResult: number;
  @Output() photoKept = new EventEmitter<boolean>();

  constructor(private socket: Socket, private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.startGame();
  }

  getBad(result: number): void {
    this.badResult = result;
    setTimeout(() => {
      if (this.goodResult) {
        this.goodResult > this.badResult ? this.photoKept.emit(true) : this.photoKept.emit(false);
      }
    }, 100);
  }

  getGood(result: number): void {
    this.goodResult = result;
    setTimeout(() => {
      if (this.badResult) {
        this.goodResult > this.badResult ? this.photoKept.emit(true) : this.photoKept.emit(false);
      }
    }, 100);
  }
}
