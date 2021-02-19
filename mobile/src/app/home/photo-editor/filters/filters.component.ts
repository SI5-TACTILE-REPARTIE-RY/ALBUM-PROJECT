import { HttpService } from '../../../services/http.service';
import { WsService } from '../../../services/ws.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FilterNames } from './filter-names';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  @Output() filterApplied: EventEmitter<string> = new EventEmitter();
  public filterNames: string[] = FilterNames;
  public currentFilterName = 'noFilter';

  constructor(private wsService: WsService, private http: HttpService) { }

  ngOnInit() {
    this.wsService.filterAppliedEvent().subscribe(async (filterName: string) => {
      this.currentFilterName = filterName;
      this.filterApplied.emit(this.currentFilterName);
    });
  }

  applyRandomFilter() {
    const randomFilterName = this.filterNames[Math.floor(Math.random() * this.filterNames.length)];
    this.http.get('/apply-filter/' + randomFilterName);
  }

  applyFilter() {
    this.http.get('/apply-filter/' + this.currentFilterName);
    this.filterApplied.emit(this.currentFilterName);
  }

}
