import { Component } from '@angular/core';
import { WsService } from '../services/ws.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public users: number = 0;
  public message: string = '';
  public messages: string[] = [];

  constructor(private wsService: WsService, private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://localhost:3000/start-album-session').subscribe();

    this.wsService.receiveWsTest().subscribe((message: string) => {
      this.messages.push(message);
    });

    this.wsService.getUsers().subscribe((users: number) => {
      this.users = users;
    });

  }

  addChat() {
    this.messages.push(this.message);
    this.wsService.sendWsTest(this.message);
    this.message = '';
  }

}
