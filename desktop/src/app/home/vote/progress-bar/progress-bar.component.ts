import { AfterViewInit, Component, ElementRef, Input, Output, ViewChild, EventEmitter, OnDestroy } from '@angular/core';
import { WsService } from '../../../services/ws.service';
import { VoteService } from '../../../services/vote.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements AfterViewInit, OnDestroy {

  @ViewChild('background') backgroundRect: ElementRef;
  @ViewChild('progression') progressionRect: ElementRef;

  @Input() observe: string;
  @Output() result = new EventEmitter<number>();

  shake = 0;

  interval = null;

  total: number;
  progression: number;

  WARNING_THRESHOLD = 0.5;
  ALERT_THRESHOLD = 0.2;

  COLOR_CODES = {
    info: {
      color: 'green'
    },
    warning: {
      color: 'orange',
      threshold: this.WARNING_THRESHOLD
    },
    alert: {
      color: 'red',
      threshold: this.ALERT_THRESHOLD
    }
  };
  remainingPathColor = this.COLOR_CODES.alert.color;

  constructor(private wsService: WsService, private voteService: VoteService) {}

  ngAfterViewInit(): void {

    // Listen socket
    switch (this.observe) {
      case 'upVote':
        this.wsService.upVoteEvent().subscribe(next => {
          ++this.shake;
        });
        break;
      case 'downVote':
        this.wsService.downVoteEvent().subscribe(next => {
          ++this.shake;
        });
        break;
    }

    // INITIALIZE SIZES
    this.total = this.backgroundRect.nativeElement.getBoundingClientRect().height;
    this.progression = this.getSize();

    // WATCH VOTE STATE
    this.voteService.voteRunning$.subscribe(voteRunning => {
      if (voteRunning === true) {
        this.startInterval();
      } else if (voteRunning === false) {
        clearInterval(this.interval);
        this.result.emit(this.progression);
      }
    });
  }

  startInterval(): void {
    this.interval = setInterval(() => {
      const ratio = this.computeRatio();
      this.setProgression(ratio);
      this.setRemainingPathColor(ratio);
    }, 1000);
  }

  /* ----------------- PROGRESSION BEHAVIOR ----------------- */

  setProgression(ratio: number): void {

    let loose = 0;
    if (ratio > this.ALERT_THRESHOLD) {
      if (ratio > this.WARNING_THRESHOLD) {
        // NORMAL PART
        loose = this.total * 0.1;
      } else {
        // WARNING PART
        loose = this.total * 0.05;
      }
    } else {
      // ALERT PART
      loose = this.total * 0.01;
    }

    let win = 0;
    if (this.shake > 10) {
      this.shake -= 10;
      win = this.total * 0.1;
    }

    if (win !== 0) {
      if (this.progression + win > this.total) {
        this.progression = this.total;
      } else {
        this.progression += win;
      }
    } else {
      if (loose > this.progression) {
        this.progression = this.total * 0.01;
      } else {
        this.progression -= loose;
      }
    }

    this.progressionRect.nativeElement.setAttribute('height', this.progression.toString());
  }

  /* ----------------- COLOR BEHAVIOR ----------------- */

  setRemainingPathColor(ratio: number): void {
    const { alert, warning, info } = this.COLOR_CODES;
    if (ratio <= alert.threshold) {
      this.purgeColor();
      this.progressionRect.nativeElement.classList.add(alert.color);
    } else if (ratio <= warning.threshold) {
      this.purgeColor();
      this.progressionRect.nativeElement.classList.add(warning.color);
    } else if (ratio > warning.threshold) {
      this.purgeColor();
      this.progressionRect.nativeElement.classList.add(info.color);
    }
  }

  private purgeColor(): void {
    const { alert, warning, info } = this.COLOR_CODES;
    if (this.progressionRect.nativeElement.classList.contains(info.color)) {
      this.progressionRect.nativeElement.classList.remove(info.color);
    }
    if (this.progressionRect.nativeElement.classList.contains(warning.color)) {
      this.progressionRect.nativeElement.classList.remove(warning.color);
    }
    if (this.progressionRect.nativeElement.classList.contains(alert.color)) {
      this.progressionRect.nativeElement.classList.remove(alert.color);
    }
  }

  /* ----------------- UTILS ----------------- */

  private computeRatio(): number {
    return this.getSize() / this.total;
  }
  private getSize(): number {
    return this.progressionRect.nativeElement.getBoundingClientRect().height;
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

}
