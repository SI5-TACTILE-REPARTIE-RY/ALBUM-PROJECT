import { WsService } from '../../services/ws.service';
import { Component, OnInit } from '@angular/core';
import {SessionService} from '../../services/session.service';

@Component({
  selector: 'app-users-online',
  templateUrl: './users-online.component.html',
  styleUrls: ['./users-online.component.scss'],
})
export class UsersOnlineComponent implements OnInit {
  public users = 0;

  constructor(private wsService: WsService, private sessionService: SessionService) { }

  ngOnInit() {
    this.wsService.usersEvent().subscribe((users: number) => {
      this.users = users;
    });

    this.sessionService.session$.subscribe(session => {
      if (session) {
        this.users = session.users;
      }
    });
  }
}
