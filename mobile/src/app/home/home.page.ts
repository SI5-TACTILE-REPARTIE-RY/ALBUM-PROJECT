import {Session, SessionService} from '../services/session.service';
import { HttpService } from '../services/http.service';
import {Component, OnInit} from '@angular/core';
import { WsService } from '../services/ws.service';
import {environment} from '../../environments/environment';
import { Plugins } from '@capacitor/core';
import {Platform} from '@ionic/angular';
import {PhotoService} from '../services/photo.service';
const { App } = Plugins;


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public photoKept: boolean;
  public albumSessionStarted = false;

  ionContentBorderDefault = 'white';
  ionContentBorder = 'white';

  constructor(
      private wsService: WsService,
      private http: HttpService,
      private sessionService: SessionService,
      private platform: Platform
  ) {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      this.sessionService.disconnect().then(App.exitApp());
    });
  }

  ngOnInit() {
    this.sessionService.photoKept$.subscribe((photoKept: boolean) => {
      this.photoKept = photoKept;
    });
    this.sessionService.sessionStarted$.subscribe((sessionStarted: boolean) => {
        this.albumSessionStarted = sessionStarted;
    });
  }

  startAlbumSession() {
    this.http.get('/start-album-session');
  }

  resetAlbumSession() {
    this.http.get('/reset-album-session');
  }

  public onNoVote(): void {
    this.ionContentBorder = this.ionContentBorderDefault;
  }

  public onUpVote(): void {
    this.ionContentBorder = 'lightgreen';
  }

  public onDownVote(): void {
    this.ionContentBorder = 'orangered';
  }
}
