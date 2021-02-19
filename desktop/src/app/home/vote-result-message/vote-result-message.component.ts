import { VoteService } from '../../services/vote.service';
import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-vote-result-message',
  templateUrl: './vote-result-message.component.html',
  styleUrls: ['./vote-result-message.component.scss'],
  animations: [
    trigger('visibleHidden', [
      state('none', style({
        display: 'none'
      })),
      state('visible', style({
        display: 'block',
        opacity: 1
      })),
      state('hidden', style({
        display: 'block',
        opacity: 0
      })),
      transition('visible => hidden', [
        animate('1s')
      ]),
      transition('hidden => visible', [
        animate('1s')
      ]),
    ]),
  ]
})
export class VoteResultMessageComponent implements OnInit {
  photoKept: boolean = false;
  photoKeptMessageAnimation: string = 'none';
  photoNotKeptMessageAnimation: string = 'none';

  constructor(private voteService: VoteService) { }

  ngOnInit(): void {
    this.voteService.photoKept$.subscribe(photoKept => {
      this.photoKept = photoKept;
      if (photoKept === true) {
        this.photoKeptMessageAnimation = 'hidden';
        setTimeout(() => this.photoKeptMessageAnimation = 'visible');
        setTimeout(() => this.photoKeptMessageAnimation = 'hidden', 5000);
        setTimeout(() => this.photoKeptMessageAnimation = 'none', 6000);
      } else if (photoKept === false) {
        this.photoNotKeptMessageAnimation = 'hidden';
        setTimeout(() => this.photoNotKeptMessageAnimation = 'visible');
        setTimeout(() => this.photoNotKeptMessageAnimation = 'hidden', 5000);
        setTimeout(() => this.photoNotKeptMessageAnimation = 'none', 6000);
      }
    });
  }
}
