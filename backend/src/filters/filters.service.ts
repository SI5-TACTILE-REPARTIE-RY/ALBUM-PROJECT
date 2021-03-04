import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';
import { FiltersGateway } from './filters.gateway';

@Injectable()
export class FiltersService implements OnApplicationBootstrap {
  TAG = 'FILTER SERVICE';

  filters = new Map<string, string>();
  filters$: BehaviorSubject<Map<string, string>>;

  constructor(private gateway: FiltersGateway) {
    this.filters$ = new BehaviorSubject<Map<string, string>>(this.filters);
  }

  onApplicationBootstrap(): any {
    this.filters$.subscribe((next) => {
      this.gateway.echoReversedFilters(this.reverseMap(next));
    });
  }

  chooseFilter(userID, filter) {
    if (filter !== 'noFilter') {
      this.filters.set(userID, filter);
    } else {
      this.filters.delete(userID);
    }
    this.filters$.next(this.filters);
  }

  /**
   * Function to reverse a Map<string, string> of associated user and filter
   * Example : [["1234", "Moon"], ["5678", "Moon"], ["9012", "Lark"]]
   * Will became : [["Moon", ["1234","5678"]], ["Lark", ["9012"]]]
   */
  reverseMap(map: Map<string, string>): Map<string, string[]> {
    const reversedMap = new Map<string, string[]>();
    map.forEach((value, key) => {
      if (reversedMap.has(value)) {
        const tmp = reversedMap.get(value);
        tmp.push(key);
        reversedMap.set(value, tmp);
      } else {
        reversedMap.set(value, [key]);
      }
    });
    return reversedMap;
  }
}
