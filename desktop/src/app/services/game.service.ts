import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Result {
  good: number;
  bad: number;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {

  running$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  result$: BehaviorSubject<Result> = new BehaviorSubject<Result>(null);

  constructor() { }

  startGame(): void {
    this.running$.next(true);
  }

  endGame(): void {
    this.running$.next(false);
  }
}
