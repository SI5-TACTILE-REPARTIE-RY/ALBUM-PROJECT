import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { applyPresetOnImage, presetsMapping } from 'instagram-filters';
import { environment } from 'src/environments/environment';
import { WsService } from '../services/ws.service';
import { Session } from './session';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('visibleHidden', [
      state('none', style({
        display: 'none'
      })),
      state('visible', style({
        display: 'block',
        opacity: 1
      })),
      state('hidden', style({
        display: 'block',
        opacity: 0
      })),
      transition('visible => hidden', [
        animate('1s')
      ]),
      transition('hidden => visible', [
        animate('1s')
      ]),
    ]),
  ]
})
export class HomeComponent implements OnInit {
  @ViewChild('albumImage') albumImage: ElementRef;

  public users: number = 0;
  public albumSessionStarted: boolean = false;
  public photoSrc: string = null;
  public currentFilterName: string = "noFilter";
  public currentFilterApplied: boolean = true;
  photoKept: boolean = false;
  photoKeptMessageAnimation: string = 'none';
  photoNotKeptMessageAnimation: string = 'none';
  displayShakeBar: boolean = true;

  constructor(private wsService: WsService, private httpWeb: HttpClient) { }

  ngOnInit() {
    this.httpWeb.get(`${environment.SERVER_ADDRESS}/session`).subscribe((session: Session) => {
      this.setSession(session);
    });

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

  }


  setSession(session: Session) {
    this.photoKept = session.photoKept;
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
    setTimeout(() => this.httpWeb.get(`${environment.SERVER_ADDRESS}/start-album-session`).subscribe(), 500);
  }

  stopAlbumSession() {
    this.httpWeb.get(`${environment.SERVER_ADDRESS}/stop-album-session`).subscribe();
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
    console.log(this.photoSrc);
    setTimeout(() => this.albumImage.nativeElement.src = src || this.photoSrc);
  }

  voteFinished(photoKept: boolean) {
    this.photoKept = photoKept;
    if (photoKept) {
      this.photoKeptMessageAnimation = 'hidden';
      setTimeout(() => this.photoKeptMessageAnimation = 'visible');
      setTimeout(() => this.photoKeptMessageAnimation = 'hidden', 5000);
      setTimeout(() => this.photoKeptMessageAnimation = 'none', 6000);
      setTimeout(() => this.displayShakeBar = false, 6000);
    } else {
      this.photoNotKeptMessageAnimation = 'hidden';
      setTimeout(() => this.photoNotKeptMessageAnimation = 'visible');
      setTimeout(() => this.photoNotKeptMessageAnimation = 'hidden', 5000);
      setTimeout(() => this.photoNotKeptMessageAnimation = 'none', 6000);
      setTimeout(() => this.displayShakeBar = false, 6000);
      setTimeout(() => this.httpWeb.get(`${environment.SERVER_ADDRESS}/vote-finished?photoKept=${photoKept}`).subscribe(), 6000);
    }
  }
}
