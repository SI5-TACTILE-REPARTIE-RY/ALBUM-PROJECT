import { HttpService } from '../../../services/http.service';
import { WsService } from '../../../services/ws.service';
import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { FilterNames } from './filter-names';
import {SessionService} from '../../../services/session.service';
import {applyPresetOnImage, presetsMapping} from 'instagram-filters';
import {PhotoService} from '../../../services/photo.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit, AfterViewInit {
  @ViewChild('photoWithoutFilter') photoWithoutFilterRef: ElementRef;
  @ViewChild('photoWithFilter') photoWithFilterRef: ElementRef;
  @ViewChild('photoContainer') photoContainerRef: ElementRef;

  public photoSrc: string;
  public currentFilterName = 'noFilter';
  public displayPhotoWithFilter: boolean;
  public filterNames: string[] = FilterNames;

  constructor(private wsService: WsService,
              private sessionService: SessionService,
              private http: HttpService,
              private photoService: PhotoService) { }

  ngOnInit() {
    this.photoService.photoSrc$.subscribe(photoSrc => this.photoSrc = photoSrc);
    this.sessionService.currentFilterName$.subscribe(currentFilterName => {
      this.currentFilterName = currentFilterName;
      this.renderFilter();
    });
  }

  ngAfterViewInit(): void {
    this.renderFilter();
  }

  loaded() {
    this.photoService.updatePhotoHeightPx$(this.photoContainerRef.nativeElement.offsetHeight);
  }

  applyRandomFilter() {
    this.currentFilterName = this.filterNames[Math.floor(Math.random() * this.filterNames.length)];
  }

  applyFilter() {
    this.http.get('/apply-filter/' + this.currentFilterName);
  }

  async renderFilter() {
    if (this.currentFilterName !== 'noFilter') {
      const imgObj = new Image();
      imgObj.onload = async () => {
        const blob = await applyPresetOnImage(imgObj, presetsMapping[this.currentFilterName]());
        this.photoWithFilterRef.nativeElement.src = URL.createObjectURL(blob);
        this.displayPhotoWithFilter = true;
      };
      imgObj.crossOrigin = 'Anonymous';
      imgObj.src = this.photoSrc;
    } else {
      this.displayPhotoWithFilter = false;
    }
  }
}
