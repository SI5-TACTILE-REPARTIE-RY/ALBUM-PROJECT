import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

interface Result {
  voteUp: number;
  voteDown: number;
}

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  voteRunning$: BehaviorSubject<boolean> = new BehaviorSubject(null);
  photoKept$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  constructor(private httpWeb: HttpClient) { }

  startVote(): void {
    this.voteRunning$.next(true);
  }

  endVote(): void {
    this.voteRunning$.next(false);
  }

  keepPhoto(photoKept: boolean): void {
    this.photoKept$.next(photoKept);
    this.httpWeb.get(`${environment.SERVER_ADDRESS}/vote-finished?photoKept=${photoKept}`).subscribe();
  }
}
