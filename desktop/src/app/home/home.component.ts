import { Component, OnInit } from '@angular/core';
import { WsService } from '../services/ws.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private wsService: WsService) { }

  ngOnInit(): void {
    this.wsService.receiveWsTest().subscribe((message: string) => {
      console.log(message);
    });

    this.wsService.getUsers().subscribe((users: number) => {
      console.log(users);
    });
  }

}
