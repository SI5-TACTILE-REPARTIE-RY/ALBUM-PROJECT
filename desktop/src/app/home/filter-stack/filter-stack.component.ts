import { Component, OnInit } from '@angular/core';
import { WsService } from '../../services/ws.service';
import {PhotoService} from '../../services/photo.service';

@Component({
  selector: 'app-filter-stack',
  templateUrl: './filter-stack.component.html',
  styleUrls: ['./filter-stack.component.css']
})
export class FilterStackComponent implements OnInit {

  index = 0;
  interval = null;
  filters = new Map<string, string[]>();

  constructor(private ws: WsService, private photoService: PhotoService) {
    this.ws.echoReversedFilterEvent().subscribe(next => {
      const map = new Map<string, string[]>(JSON.parse(next));
      if (map.size - 1 < this.index) { this.index = 0; }
      this.filters = map;
    });
    this.ws.clearFiltersEvent().subscribe(() => {
      this.index = 0;
      this.filters = new Map<string, string[]>();
      this.photoService.applyFilter(null);
      clearInterval(this.interval);
    });
  }

  ngOnInit(): void {
    this.interval = setInterval(() => {
      if (this.filters.size - 1 > this.index) {
        ++this.index;
      } else {
        this.index = 0;
      }
      // [ [ "filterName", [ "userID", "userID, ... ] ], [ "filterName", [ "userID", "userID, ... ] ], ... ]
      if (this.filters.size > 0) {
        this.photoService.applyFilter(Array.from(this.filters)[this.index][0]);
      } else {
        this.photoService.applyFilter(null);
      }
    }, 5000);
  }
}
