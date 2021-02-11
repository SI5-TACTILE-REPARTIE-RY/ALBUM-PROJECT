import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { applyPresetOnImage, presetsMapping } from 'instagram-filters';
import { environment } from 'src/environments/environment';
import { WsService } from '../services/ws.service';
import { Session } from './session';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('albumImage') albumImage: ElementRef;

  public users: number = 0;
  public albumSessionStarted: boolean = false;
  public photoSrc: string = null;
  public currentFilterName: string = "noFilter";
  public currentFilterApplied: boolean = true;

  constructor(private wsService: WsService, private httpWeb: HttpClient) { }

  ngOnInit() {
    this.httpWeb.get(`${environment.SERVER_ADDRESS}:3000/session`).subscribe((session: Session) => {
      this.setSession(session);
    });

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
      this.httpWeb.get(`${environment.SERVER_ADDRESS}/start-album-session`).subscribe();
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
    setTimeout(() => this.albumImage.nativeElement.src = src || this.photoSrc);
  }

}
