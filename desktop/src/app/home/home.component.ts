import { VoteService } from '../services/vote.service';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { applyPresetOnImage, presetsMapping } from 'instagram-filters';
import { environment } from 'src/environments/environment';
import {SessionService} from '../services/session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('albumImage') albumImage: ElementRef;

  public users = 0;
  public albumSessionStarted = false;
  public photoSrc: string = null;
  public currentFilterName = 'noFilter';
  public currentFilterApplied = true;
  displayVote = true;

  constructor(private sessionService: SessionService, private http: HttpClient, private voteSerive: VoteService) { }

  ngOnInit(): void {
    this.sessionService.users$.subscribe((users: number) => {
      this.users = users;
    });

    this.sessionService.sessionStarted$.subscribe(() => {
      this.albumSessionStarted = true;
    });

    this.sessionService.photoKept$.subscribe(photoKept => {
      if (photoKept !== null) {
        this.displayVote = false;
      }
    });
  }

  startAlbumSession(): void {
    setTimeout(() => this.http.get(`${environment.SERVER_ADDRESS}/start-album-session`).subscribe(), 500);
  }
}
