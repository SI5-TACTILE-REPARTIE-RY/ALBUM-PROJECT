import {Component, OnInit} from '@angular/core';
import {SessionService} from '../../services/session.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss'],
})
export class PhotoEditorComponent implements OnInit {
  displayAppFilters = true;

  constructor(private sessionService: SessionService) { }

  ngOnInit(): void {}

  nextPhoto(): void {
    this.sessionService.nextPhoto();
  }
}
