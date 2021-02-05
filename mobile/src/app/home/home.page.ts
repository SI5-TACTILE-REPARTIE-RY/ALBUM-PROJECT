import { Component, ElementRef, ViewChild } from '@angular/core';
import { WsService } from '../services/ws.service';
import { HttpClient } from '@angular/common/http';
import { applyPresetOnImage, presetsMapping } from 'instagram-filters';
import { FilterNames } from './filter-names';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('albumImage') albumImage: ElementRef;

  public users: number = 0;
  public albumSessionStarted: boolean = false;
  public photoSrc: string = null;
  public currentFilterName: string = "noFilter";
  public currentFilterApplied: boolean = true;
  public filterNames: string[] = FilterNames;

  constructor(private wsService: WsService, private http: HttpClient) { }

  ngOnInit() {

    this.wsService.albumSessionStartedEvent().subscribe((photoSrc: string) => {
      this.albumSessionStarted = true;
      this.photoSrc = photoSrc;
    });

    this.wsService.usersEvent().subscribe((users: number) => {
      this.users = users;
    });

    this.wsService.filterAppliedEvent().subscribe(async (filterName: string) => {
      this.currentFilterName = filterName;
      this.currentFilterApplied = (filterName === 'noFilter');
      this.albumImage.nativeElement.src = this.photoSrc;
    });

  }

  async imageLoaded() {
    if (!this.currentFilterApplied) {
      const blob = await applyPresetOnImage(this.albumImage.nativeElement, presetsMapping[this.currentFilterName]());
      this.albumImage.nativeElement.src = URL.createObjectURL(blob);
      this.currentFilterApplied = true;
    }
  }

  startAlbumSession() {
    this.http.get(`${environment.SERVER_ADDRESS}/start-album-session`).subscribe();
  }

  applyRandomFilter() {
    const randomFilterName = this.filterNames[Math.floor(Math.random() * this.filterNames.length)];
    this.http.get(`${environment.SERVER_ADDRESS}/apply-filter/${randomFilterName}`).subscribe();
  }

  applyFilter() {
    this.http.get(`${environment.SERVER_ADDRESS}/apply-filter/${this.currentFilterName}`).subscribe();
  }
}
