import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss'],
})
export class PhotoEditorComponent {
  @Input() public photoSrc: string;

  displayAppFilters: boolean = true;

  constructor() { }
}
