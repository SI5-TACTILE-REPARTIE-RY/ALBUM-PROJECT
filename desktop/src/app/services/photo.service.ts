import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  currentFilterName = 'noFilter';
  currentFilterName$ = new BehaviorSubject(this.currentFilterName);

  constructor() { }

  applyFilter(filterName: string): void {
    if (!filterName) {
      this.currentFilterName = 'noFilter';
    } else {
      this.currentFilterName = filterName;
    }
    this.currentFilterName$.next(this.currentFilterName);
  }
}
