import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {applyPresetOnImage, presetsMapping} from 'instagram-filters';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss'],
})
export class PhotoEditorComponent implements AfterViewInit {
  @ViewChild('photoWithoutFilter') photoWithoutFilterRef: ElementRef;
  @ViewChild('photoWithFilter') photoWithFilterRef: ElementRef;

  @Input() public photoSrc: string;
  public currentFilterName = 'noFilter';
  public photoFile: File;
  public displayPhotoWithFilter: boolean;

  constructor() { }

  ngAfterViewInit(): void {
    this.renderFilter();
  }

  async renderFilter() {
    if (this.currentFilterName !== 'noFilter') {
      const imgObj = new Image();
      imgObj.onload = async () => {
        const blob = await applyPresetOnImage(imgObj, presetsMapping[this.currentFilterName]());
        this.photoWithFilterRef.nativeElement.src = URL.createObjectURL(blob);
        this.photoFile = this.blobToFile(blob);
        this.displayPhotoWithFilter = true;
      };
      imgObj.crossOrigin = 'Anonymous';
      imgObj.src = this.photoSrc;
    } else {
      this.displayPhotoWithFilter = false;
    }
  }

  public blobToFile(blob: Blob): File {
    const b: any = blob;
    b.lastModifiedDate = new Date();
    b.name = 'photo';
    return blob as File;
  }

  async onFilterApplied(filterName: string) {
    this.currentFilterName = filterName;
    if (this.photoWithoutFilterRef) {
      this.renderFilter();
    }
  }
}
