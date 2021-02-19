import { Component, ElementRef, Input, ViewChild, AfterViewInit } from '@angular/core';
import { applyPresetOnImage, presetsMapping } from 'instagram-filters';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss'],
})
export class PhotoEditorComponent implements AfterViewInit {
  @ViewChild('photoRef') photoRef: ElementRef;

  @Input() public photoSrc: string;

  public currentFilterApplied;
  public currentFilterName = 'noFilter';

  public imageFile: File;

  constructor() { }

  ngAfterViewInit() {
    this.refreshImage();
  }

  async renderFilter() {
    if (!this.currentFilterApplied) {
      const blob = await applyPresetOnImage(this.photoRef.nativeElement, presetsMapping[this.currentFilterName]());
      this.refreshImage(URL.createObjectURL(blob));
      this.imageFile = this.blobToFile(blob, 'photo');
      this.currentFilterApplied = true;
    }
  }

  public blobToFile(theBlob: Blob, fileName: string): File {
    const b: any = theBlob;
    b.lastModifiedDate = new Date();
    b.name = fileName;

    return theBlob as File;
  }

  async onFilterApplied(filterName: string) {
    this.currentFilterName = filterName;
    this.currentFilterApplied = filterName === 'noFilter';
    if (this.photoRef) {
      if (this.currentFilterApplied) {
        this.refreshImage();
      } else {
        this.renderFilter();
      }
    }
  }

  refreshImage(src = null) {
    setTimeout((() => this.photoRef.nativeElement.src = src || this.photoSrc));
  }

}
