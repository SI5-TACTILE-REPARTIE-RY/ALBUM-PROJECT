import { Component, ElementRef, Input, ViewChild, AfterViewInit } from '@angular/core';
import {applyPresetOnImage, applyPresetOnImageURL, presetsMapping} from 'instagram-filters';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss'],
})
export class PhotoEditorComponent {
  @ViewChild('photoRef') photoRef: ElementRef;

  @Input() public photoSrc: string;
  public currentFilterName = 'noFilter';
  public photoFile: File;

  constructor() { }

  renderFilter() {
    if (this.currentFilterName !== 'noFilter') {
      const imgObj = new Image();
      imgObj.onload = async () => {
        const blob = await applyPresetOnImage(imgObj, presetsMapping[this.currentFilterName]());
        this.photoFile = this.blobToFile(blob);
      };
      imgObj.crossOrigin = 'Anonymous';
      imgObj.src = this.photoSrc;
    } else {
      this.photoFile = null;
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
    this.renderFilter();
  }
}
