import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { WsService } from '../services/ws.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public users = 0;
  public albumSessionStarted = false;
  public photoSrc: string = null;

  constructor(private wsService: WsService, private http: HttpClient) { }

  ngOnInit() {

    this.wsService.albumSessionStartedEvent().subscribe((photoSrc: string) => {
      this.albumSessionStarted = true;
      this.photoSrc = photoSrc;
    });

    this.wsService.usersEvent().subscribe((users: number) => {
      this.users = users;
    });

  }

  startAlbumSession() {
    this.http.get('http://localhost:3000/start-album-session').subscribe();
  }

}
