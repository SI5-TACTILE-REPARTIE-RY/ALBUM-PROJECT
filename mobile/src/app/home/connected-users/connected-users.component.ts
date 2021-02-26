import { Component, OnInit } from '@angular/core';
import {SessionService} from '../../services/session.service';

@Component({
  selector: 'app-connected-users',
  templateUrl: './connected-users.component.html',
  styleUrls: ['./connected-users.component.scss'],
})
export class ConnectedUsersComponent implements OnInit {

  public users: string[] = [];

  constructor(private sessionService: SessionService) { }

  ngOnInit(): void {
    this.sessionService.users$.subscribe((users: string[]) => {
      this.users = users;
    });
  }

}
