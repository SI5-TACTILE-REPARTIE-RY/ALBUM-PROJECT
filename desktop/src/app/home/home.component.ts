import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import {SessionService} from '../services/session.service';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {WsService} from '../services/ws.service';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('albumImage') albumImage: ElementRef;
  @ViewChild('photoKeptMessage') photoKeptMessageRef: SwalComponent;
  @ViewChild('photoRejectedMessage') photoRejectedMessageRef: SwalComponent;

  public users: string[] = [];
  public albumSessionStarted = null;
  displayVote = true;

  constructor(private sessionService: SessionService,
              private http: HttpClient,
              private wsService: WsService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.sessionService.users$.subscribe((users: string[]) => {
      this.users = users;
    });

    this.sessionService.sessionStarted$.subscribe((sessionStarted) => {
      this.albumSessionStarted = sessionStarted;
    });

    this.sessionService.photoKept$.subscribe(photoKept => {
      this.displayVote = photoKept === null;
    });

    this.wsService.voteFinishedEvent().subscribe(photoKept => {
      if (photoKept) {
        this.photoKeptMessageRef.fire();
      } else if (photoKept) {
        this.photoRejectedMessageRef.fire();
      }
    });
  }

  startAlbumSession(): void {
    setTimeout(() => this.http.get(`${environment.SERVER_ADDRESS}/start-album-session`).subscribe(), 500);
  }
}
