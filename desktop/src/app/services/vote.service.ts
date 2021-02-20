import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import {SessionService} from './session.service';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  voteRunning$: BehaviorSubject<boolean> = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  startVote(): void {
    this.voteRunning$.next(true);
  }

  endVote(): void {
    this.voteRunning$.next(false);
  }

  keepPhoto(photoKept: boolean): void {
    this.http.get(`${environment.SERVER_ADDRESS}/vote-finished?photoKept=${photoKept}`).subscribe();
  }
}
