import { Component, OnInit } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {GameService} from '../services/game.service';

@Component({
  selector: 'app-shake-bar',
  templateUrl: './shake-bar.component.html',
  styleUrls: ['./shake-bar.component.css']
})
export class ShakeBarComponent implements OnInit {

  constructor(private socket: Socket, private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.startGame();
  }

  getBad(result: number): void {
    console.log('BAD = ', result);
  }

  getGood(result: number): void {
    console.log('Good = ', result);
  }
}
