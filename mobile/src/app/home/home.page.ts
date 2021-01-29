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
  public albumSessionStarted: boolean = false;
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
