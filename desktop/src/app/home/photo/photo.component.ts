import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {applyPresetOnImage, presetsMapping} from 'instagram-filters';
import {WsService} from '../../services/ws.service';
import {SessionService} from '../../services/session.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit, AfterViewInit {
  @ViewChild('photoWithoutFilter') photoWithoutFilterRef: ElementRef;
  @ViewChild('photoWithFilter') photoWithFilterRef: ElementRef;
  @ViewChild('photoContainer') photoContainerRef: ElementRef;

  public photoSrc: string;
  public currentFilterName = 'noFilter';
  public displayPhotoWithFilter: boolean;

  constructor(private wsService: WsService,
              private sessionService: SessionService) { }

  ngOnInit(): void {
    this.sessionService.photoSrc$.subscribe(photoSrc => this.photoSrc = photoSrc);
    this.sessionService.currentFilterName$.subscribe(currentFilterName => {
      this.currentFilterName = currentFilterName;
      this.renderFilter();
    });
  }

  ngAfterViewInit(): void {
    this.renderFilter();
  }

  async renderFilter(): Promise<void> {
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
