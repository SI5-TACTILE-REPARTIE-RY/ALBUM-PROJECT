import {Session, SessionService} from '../services/session.service';
import { HttpService } from '../services/http.service';
import {Component, OnInit} from '@angular/core';
import { WsService } from '../services/ws.service';
import {environment} from '../../environments/environment';
import { Plugins } from '@capacitor/core';
import {Platform} from "@ionic/angular";
const { App } = Plugins;


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public photoSrc: string;
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
    this.sessionService.session$.subscribe((session: Session) => {
      if (session) {
        this.albumSessionStarted = session.started;
        this.photoKept = session.photoKept;
        this.photoSrc = environment.SERVER_ADDRESS + '/' + session.currentPhotoName;
      }
    });

    this.sessionService.updateSession();

    this.wsService.albumSessionStartedEvent().subscribe((currentPhotoName: string) => {
      this.albumSessionStarted = true;
      this.photoSrc = environment.SERVER_ADDRESS + '/' + currentPhotoName;
    });

    this.wsService.voteFinishedEvent().subscribe((photoKept: boolean) => this.photoKept = photoKept);
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
