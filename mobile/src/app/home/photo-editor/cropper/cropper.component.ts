import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {PhotoService} from '../../../services/photo.service';

@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.scss'],
})
export class CropperComponent implements OnInit {
  @Output() public cropStarted = new EventEmitter<void>();
  @Output() public cropFinished = new EventEmitter<void>();

  public cropping = false;
  public photoSrc: string;
  public photoHeightPx: number;

  constructor(private photoService: PhotoService) { }

  ngOnInit() {
    this.photoService.photoSrc$.subscribe(photoSrc => this.photoSrc = photoSrc);
    this.photoService.photoHeightPx$.subscribe(photoHeightPx => this.photoHeightPx = photoHeightPx);
  }

  startCrop() {
    this.cropping = true;
    this.cropStarted.emit();
  }

  cancelCrop() {
    this.cropping = false;
    this.cropFinished.emit();
  }

  okCrop() {
    this.cropping = false;
    this.cropFinished.emit();
  }

}
