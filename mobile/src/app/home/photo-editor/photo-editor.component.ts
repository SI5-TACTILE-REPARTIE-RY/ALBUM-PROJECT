import {Component, Input, OnInit} from '@angular/core';
import {applyPresetOnImage, presetsMapping} from 'instagram-filters';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss'],
})
export class PhotoEditorComponent implements OnInit {
  displayAppFilters = true;

  constructor() { }

  ngOnInit(): void {}
}
