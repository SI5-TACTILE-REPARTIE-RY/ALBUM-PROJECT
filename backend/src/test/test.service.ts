import { Injectable } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TestService {
  service$ = new BehaviorSubject<string>(null);
  get service(): string {
    return this.service$.getValue();
  }

  lockService(id: string) {
    this.service$.next(id);
  }

  unlockService(id: string) {
    const current = this.service;
    if (current && current === id) {
      this.service$.next(null);
    }
  }
}
