import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {SessionService} from './session.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  currentFilterName = 'noFilter';
  currentFilterName$ = new BehaviorSubject(this.currentFilterName);

  constructor(private sessionService: SessionService) {
    this.sessionService.currentFilterName$.subscribe(currentFilterName => {
      if (this.currentFilterName !== currentFilterName) {
        this.currentFilterName = currentFilterName;
        this.currentFilterName$.next(currentFilterName);
      }
    });
  }

  applyFilter(filterName: string): void {
    if (!filterName) {
      this.currentFilterName = 'noFilter';
    } else {
      this.currentFilterName = filterName;
    }
    this.currentFilterName$.next(this.currentFilterName);
  }
}
