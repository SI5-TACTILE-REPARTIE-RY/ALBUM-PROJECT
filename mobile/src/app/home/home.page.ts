import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { WsService } from '../services/ws.service';
import { applyPresetOnImage, presetsMapping } from 'instagram-filters';
import { FilterNames } from './filter-names';
import { environment } from 'src/environments/environment';
import { Session } from './session';
import { HTTP, HTTPResponse } from '@ionic-native/http/ngx';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  @ViewChild('albumImage') albumImage: ElementRef;

  public users: number = 0;
  public albumSessionStarted: boolean = false;
  public photoSrc: string = null;
  public currentFilterName: string = "noFilter";
  public currentFilterApplied: boolean = true;
  public filterNames: string[] = FilterNames;

  constructor(private wsService: WsService, private httpMobile: HTTP, private platform: Platform, private httpWeb: HttpClient) { }

  ngAfterViewInit() {
    if (this.platform.is('cordova')) {
      this.httpMobile.get(`${environment.SERVER_ADDRESS}:3000/session`, {}, {}).then((result: HTTPResponse) => {
        this.setSession(result.data);
      });
    } else {
      this.httpWeb.get(`${environment.SERVER_ADDRESS}:3000/session`).subscribe((session: Session) => {
        this.setSession(session);
      });
    }

    this.wsService.albumSessionStartedEvent().subscribe((photoName: string) => {
      this.albumSessionStarted = true;
      this.updatePhotoSrc(environment.SERVER_ADDRESS + '/' + photoName);
    });

    this.wsService.albumSessionStoppedEvent().subscribe(() => {
      this.albumSessionStarted = false;
      this.currentFilterApplied = false;
    });

    this.wsService.usersEvent().subscribe((users: number) => {
      this.users = users;
    });

    this.wsService.filterAppliedEvent().subscribe(async (filterName: string) => {
      this.updateFilter(filterName);
      this.refreshImage();
    });

  }

  setSession(session: Session) {
    this.users = session.users;
    this.albumSessionStarted = session.started;
    this.updateFilter(session.currentFilterName);
    this.updatePhotoSrc(environment.SERVER_ADDRESS + '/' + session.currentPhotoName);
  }

  async imageLoaded() {
    if (!this.currentFilterApplied) {
      const blob = await applyPresetOnImage(this.albumImage.nativeElement, presetsMapping[this.currentFilterName]());
      this.refreshImage(URL.createObjectURL(blob))
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

  stopAlbumSession() {
    if (this.platform.is('cordova')) {
      this.httpMobile.get(`${environment.SERVER_ADDRESS}/stop-album-session`, {}, {});
    } else {
      this.httpWeb.get(`${environment.SERVER_ADDRESS}/stop-album-session`).subscribe();
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
