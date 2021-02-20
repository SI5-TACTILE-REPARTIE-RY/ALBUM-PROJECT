import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.scss'],
})
export class CropperComponent implements OnInit {
  @Input() public photoSrc: string;
  @Output() public cropStarted = new EventEmitter<void>();
  @Output() public cropFinished = new EventEmitter<void>();
  cropping = false;

  constructor() { }

  ngOnInit() {}

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
