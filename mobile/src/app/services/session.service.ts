import { HttpService } from './http.service';
import { WsService } from './ws.service';
import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface Session {
  users: number;
  started: boolean;
  currentPhotoName: string;
  currentFilterName: string;
  photoKept: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  session$ = new BehaviorSubject<Session>(null);

  constructor(private wsService: WsService, private http: HttpService) {
    this.wsService.albumSessionResetEvent().subscribe(() => {
      this.updateSession();
    });
  }

  async updateSession() {
    this.session$.next(await this.http.get('/session'));
  }
}
