import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { VoteService } from '../../services/vote.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {
  upVote = 10;
  downVote = 10;

  constructor(private voteService: VoteService) { }

  ngOnInit(): void {}

  getDownVote(result: number): void {
    this.downVote = result;
    setTimeout(() => {
      this.upVote > this.downVote ? this.voteService.keepPhoto(true) : this.voteService.keepPhoto(false);
    });
  }

  getUpVote(result: number): void {
    this.upVote = 100;
  }
}
