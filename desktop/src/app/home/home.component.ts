import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  public albumSessionStarted = null;
  displayVote = true;

  constructor(private sessionService: SessionService, private http: HttpClient) { }

  ngOnInit(): void {
    this.sessionService.users$.subscribe((users: number) => {
      this.users = users;
    });

    this.sessionService.sessionStarted$.subscribe((sessionStarted) => {
      this.albumSessionStarted = sessionStarted;
    });

    this.sessionService.photoKept$.subscribe(photoKept => {
        this.displayVote = photoKept === null;
    });
  }

  startAlbumSession(): void {
    setTimeout(() => this.http.get(`${environment.SERVER_ADDRESS}/start-album-session`).subscribe(), 500);
  }
}
