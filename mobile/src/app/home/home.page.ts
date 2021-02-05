import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { WsService } from '../services/ws.service';
import { applyPresetOnImage, presetsMapping } from 'instagram-filters';
import { FilterNames } from './filter-names';
import { environment } from 'src/environments/environment';
import { Session } from './session';
import { HTTP, HTTPResponse } from '@ionic-native/http/ngx';

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

  constructor(private wsService: WsService, private http: HTTP) { }

  ngAfterViewInit() {
    this.http.get(`${environment.SERVER_ADDRESS}:3000/session`, {}, {}).then((result: HTTPResponse) => {
      const session: Session = result.data;
      this.users = session.users;
      this.albumSessionStarted = session.started;
      this.updateFilter(session.currentFilterName);
      this.updatePhotoSrc(session.currentPhotoSrc);
    });

    this.wsService.albumSessionStartedEvent().subscribe((photoSrc: string) => {
      this.albumSessionStarted = true;
      this.updatePhotoSrc(photoSrc);
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

  async imageLoaded() {
    if (!this.currentFilterApplied) {
      const blob = await applyPresetOnImage(this.albumImage.nativeElement, presetsMapping[this.currentFilterName]());
      this.refreshImage(URL.createObjectURL(blob))
      this.currentFilterApplied = true;
    }
  }

  startAlbumSession() {
    this.http.get(`${environment.SERVER_ADDRESS}/start-album-session`, {}, {});
  }

  stopAlbumSession() {
    this.http.get(`${environment.SERVER_ADDRESS}/stop-album-session`, {}, {});
  }

  applyRandomFilter() {
    const randomFilterName = this.filterNames[Math.floor(Math.random() * this.filterNames.length)];
    this.http.get(`${environment.SERVER_ADDRESS}/apply-filter/${randomFilterName}`, {}, {});
  }

  applyFilter() {
    this.http.get(`${environment.SERVER_ADDRESS}/apply-filter/${this.currentFilterName}`, {}, {});
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
