import { environment } from '../../../environments/environment';
import { Component, ElementRef, Input, ViewChild, AfterViewInit } from '@angular/core';
import { applyPresetOnImage, presetsMapping } from 'instagram-filters';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss'],
})
export class PhotoEditorComponent implements AfterViewInit {
  @ViewChild('photo') photo: ElementRef;

  @Input() public photoSrc: string;

  public albumSessionStarted = false;
  public currentFilterApplied = true;
  public currentFilterName = 'noFilter';

  constructor() { }

  ngAfterViewInit() {
    this.refreshImage();
  }

  async imageLoaded() {
    if (this.currentFilterName !== 'noFilter') {
      const blob = await applyPresetOnImage(this.photo.nativeElement, presetsMapping[this.currentFilterName]());
      this.refreshImage(URL.createObjectURL(blob));
      this.currentFilterApplied = true;
    }
  }

  onFilterApplied(filterName: string) {
    this.currentFilterName = filterName;
    this.refreshImage();
  }

  refreshImage(src = null) {
    setTimeout(() => this.photo.nativeElement.src = src || this.photoSrc);
  }
}
