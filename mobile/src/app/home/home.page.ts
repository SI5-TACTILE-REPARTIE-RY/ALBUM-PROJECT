// ANGULAR
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';

// NATIVE
import {DeviceMotion, DeviceMotionAccelerationData} from '@ionic-native/device-motion/ngx';
import { HTTP, HTTPResponse } from '@ionic-native/http/ngx';

// SERVICES
import { WsService } from '../services/ws.service';

// CUSTOMS
import { applyPresetOnImage, presetsMapping } from 'instagram-filters';
import { FilterNames } from './filter-names';
import { Session } from './session';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {

  @ViewChild('albumImage') albumImage: ElementRef;

  public users = 0;
  public albumSessionStarted = false;
  public photoSrc: string = null;
  public currentFilterName = 'noFilter';
  public currentFilterApplied = true;
  public filterNames: string[] = FilterNames;
  public photoKept: boolean;

  /* ------------- CONFIG ------------- */

  CONFIG = {
    style: {
      upVote: {
        color: 'lightgreen'
      },
      downVote: {
        color: 'orangered'
      }
    },
    motion: {
      watch: {
        offset: 10
      }
    }
  };

  /* ------------- NgModels ------------- */

  // TOGGLE
  toggle = false;

  /* ------------- NgStyles ------------- */

  // ION-CONTENT BORDER-COLOR
  ionContentBorderDefault = 'white';
  ionContentBorder = 'white';

  // THUMBS-UP COLOR
  thumbsUpColorDefault = 'grey';
  thumbsUpColor = 'lightgreen';

  // THUMBS-DOWN COLOR
  thumbsDownColorDefault = 'grey';
  thumbsDownColor = 'grey';

  /* ------------- CONSTRUCTOR ------------- */

  constructor(
      private deviceMotion: DeviceMotion,
      private wsService: WsService,
      private httpMobile: HTTP,
      private platform: Platform,
      private httpWeb: HttpClient
  ) { }

  ngAfterViewInit() {
    this.startWatchingMotion();
    if (this.platform.is('cordova')) {
      this.httpMobile.get(`${environment.SERVER_ADDRESS}/session`, {}, {}).then((result: HTTPResponse) => {
        this.setSession(result.data);
      });
    } else {
      this.httpWeb.get(`${environment.SERVER_ADDRESS}/session`).subscribe((session: Session) => {
        this.setSession(session);
      });
    }

    this.wsService.albumSessionStartedEvent().subscribe((photoName: string) => {
      this.albumSessionStarted = true;
      this.updatePhotoSrc(environment.SERVER_ADDRESS + '/' + photoName);
    });

    this.wsService.albumSessionResetEvent().subscribe(() => {
      this.httpWeb.get(`${environment.SERVER_ADDRESS}/session`).subscribe((session: Session) => {
        this.setSession(session);
      });
    });

    this.wsService.usersEvent().subscribe((users: number) => {
      this.users = users;
    });

    this.wsService.filterAppliedEvent().subscribe(async (filterName: string) => {
      this.updateFilter(filterName);
      this.refreshImage();
    });

    this.wsService.voteFinishedEvent().subscribe(async (photoKept: boolean) => {
      this.photoKept = photoKept;
    });

  }

  setSession(session: Session) {
    this.photoKept = session.photoKept;
    this.users = session.users;
    this.albumSessionStarted = session.started;
    this.updateFilter(session.currentFilterName);
    this.updatePhotoSrc(environment.SERVER_ADDRESS + '/' + session.currentPhotoName);
  }

  /* ------------- DEVICE MOTION WATCHING BEHAVIOR ------------- */

  startWatchingMotion(): void {
    this.deviceMotion.watchAcceleration({ frequency: 100 }).subscribe((acceleration: DeviceMotionAccelerationData) => {
      this.setBorderColor(acceleration);
      this.emitShake(acceleration);
    });
  }

  private setBorderColor(acceleration: DeviceMotionAccelerationData): void {
    const { style } = this.CONFIG;
    if (this.detectShake(acceleration)) {
      if (this.toggle) {
        this.ionContentBorder = style.downVote.color;
      } else {
        this.ionContentBorder = style.upVote.color;
      }
    } else {
      this.ionContentBorder = this.ionContentBorderDefault;
    }
  }

  private emitShake(acceleration: DeviceMotionAccelerationData): void {
    if (this.detectShake(acceleration)) {
      if (this.toggle) {
        this.wsService.sendDownVote();
      } else {
        this.wsService.sendUpVote();
      }
    }
  }

  private detectShake(acceleration: DeviceMotionAccelerationData): boolean {
    const { watch } = this.CONFIG.motion;
    if ((acceleration.x >= watch.offset || acceleration.x <= -watch.offset) ||
        (acceleration.y >= watch.offset || acceleration.y <= -watch.offset)) {
      return true;
    } else {
      return false;
    }
  }

  /* ------------- TOGGLE BEHAVIOR ------------- */

  toggleChange(): void {
    const { style } = this.CONFIG;
    if (this.toggle) {
      this.thumbsUpColor = this.thumbsUpColorDefault;
      this.thumbsDownColor = style.downVote.color;
    } else {
      this.thumbsDownColor = this.thumbsDownColorDefault;
      this.thumbsUpColor = style.upVote.color;
    }
  }

  /* ------------- // ------------- */

  async imageLoaded() {
    if (!this.currentFilterApplied) {
      const blob = await applyPresetOnImage(this.albumImage.nativeElement, presetsMapping[this.currentFilterName]());
      this.refreshImage(URL.createObjectURL(blob));
      this.currentFilterApplied = true;
    }
  }

  startAlbumSession() {
    if (this.platform.is('cordova')) {
      this.httpMobile.get(`${environment.SERVER_ADDRESS}/start-album-session`, {}, {});
    } else {
      this.httpWeb.get(`${environment.SERVER_ADDRESS}/start-album-session`).subscribe();
    }
  }

  resetAlbumSession() {
    if (this.platform.is('cordova')) {
      this.httpMobile.get(`${environment.SERVER_ADDRESS}/reset-album-session`, {}, {});
    } else {
      this.httpWeb.get(`${environment.SERVER_ADDRESS}/reset-album-session`).subscribe();
    }
  }

  applyRandomFilter() {
    const randomFilterName = this.filterNames[Math.floor(Math.random() * this.filterNames.length)];
    if (this.platform.is('cordova')) {
      this.httpMobile.get(`${environment.SERVER_ADDRESS}/apply-filter/${randomFilterName}`, {}, {});
    } else {
      this.httpWeb.get(`${environment.SERVER_ADDRESS}/apply-filter/${randomFilterName}`).subscribe();
    }
  }

  applyFilter() {
    if (this.platform.is('cordova')) {
      this.httpMobile.get(`${environment.SERVER_ADDRESS}/apply-filter/${this.currentFilterName}`, {}, {});
    } else {
      this.httpWeb.get(`${environment.SERVER_ADDRESS}/apply-filter/${this.currentFilterName}`).subscribe();
    }
  }

  updateFilter(fiterName) {
    this.currentFilterName = fiterName;
    this.currentFilterApplied = (fiterName === 'noFilter');
  }

  updatePhotoSrc(src) {
    this.photoSrc = src;
    if (this.photoSrc && this.albumSessionStarted) {
      this.refreshImage();
    }
  }

  refreshImage(src = null) {
    setTimeout(() => this.albumImage.nativeElement.src = src || this.photoSrc);
  }
}
