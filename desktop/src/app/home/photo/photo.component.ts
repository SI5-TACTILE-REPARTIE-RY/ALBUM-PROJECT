import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {applyPresetOnImage, presetsMapping} from 'instagram-filters';
import {SessionService} from '../../services/session.service';
import {ImageCropperComponent} from 'ngx-image-cropper';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit, AfterViewInit {
  @ViewChild('initialPhoto') initialPhotoRef: ElementRef;
  @ViewChild('photoWithoutFilter') photoWithoutFilterRef: ElementRef;
  @ViewChild('photoWithFilter') photoWithFilterRef: ElementRef;
  @ViewChild('photoContainer') photoContainerRef: ElementRef;
  @ViewChild('cropper') cropperRef: ImageCropperComponent;

  public photoSrcInitial: string;
  public photoSrc: string;
  public currentFilterName = 'noFilter';
  public displayPhotoWithFilter: boolean;

  constructor(private sessionService: SessionService) { }

  ngOnInit(): void {
    this.sessionService.photoSrc$.subscribe(photoSrc => {
      this.photoSrcInitial = photoSrc;
      this.photoSrc = photoSrc;
    });
    this.sessionService.currentFilterName$.subscribe(currentFilterName => {
      this.currentFilterName = currentFilterName;
      this.renderFilter();
    });
    this.sessionService.cropperPosition$.subscribe( async (position) => {
      this.cropperRef.cropper = position;
      const cropResult = this.cropperRef.crop();
      const res = await fetch(cropResult.base64);
      const blob = await res.blob();
      this.photoSrc = URL.createObjectURL(blob);
      this.renderFilter();
    });
  }

  ngAfterViewInit(): void {
    this.renderFilter();
  }

  async renderFilter(): Promise<void> {
    const imgObj = new Image();
    imgObj.crossOrigin = 'Anonymous';
    if (this.currentFilterName !== 'noFilter') {
      imgObj.onload = async () => {
        const blob = await applyPresetOnImage(imgObj, presetsMapping[this.currentFilterName]());
        this.photoWithFilterRef.nativeElement.src = URL.createObjectURL(blob);
        this.displayPhotoWithFilter = true;
      };
      imgObj.src = this.photoSrc;
    } else {
      imgObj.onload = async () => {
        this.photoWithoutFilterRef.nativeElement.src = imgObj.src;
        this.displayPhotoWithFilter = false;
      };
      imgObj.src = this.photoSrc;
    }
  }
}
