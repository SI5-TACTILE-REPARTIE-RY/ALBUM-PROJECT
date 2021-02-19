import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {VoteService} from "../../../services/vote.service";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {

  @Input() time: number;

  FULL_DASH_ARRAY = 283;
  WARNING_THRESHOLD = 10;
  ALERT_THRESHOLD = 5;

  // Start with an initial value of 20 seconds
  TIME_LIMIT = 20;

  // Initially, no time has passed, but this will count up
  // and subtract from the TIME_LIMIT
  timePassed = 0;
  timeLeft = this.TIME_LIMIT;
  timerInterval = null;

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
  remainingPathColor = this.COLOR_CODES.info.color;

  constructor(private voteService: VoteService) { }

  ngOnInit(): void {
    if (this.time) { this.TIME_LIMIT = this.time; }
    this.voteService.startVote();
    this.startInterval();
  }

  formatTimeLeft(time): string {
    // The largest round integer less than or equal to the result of time divided being by 60.
    const minutes: any = Math.floor(time / 60);

    // Seconds are the remainder of the time divided by 60 (modulus operator)
    let seconds: any = time % 60;

    // If the value of seconds is less than 10, then display seconds with a leading zero
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    // The output in MM:SS format
    return `${minutes}:${seconds}`;
  }

  onTimesUp(): void {
    clearInterval(this.timerInterval);
    this.voteService.endVote();
  }

  startInterval(): void {
    this.timerInterval = setInterval(() => {
      // The amount of time passed increments by one
      this.timePassed = this.timePassed += 1;
      this.timeLeft = this.TIME_LIMIT - this.timePassed;

      // The time left label is updated
      document.getElementById('base-timer-label').innerHTML = this.formatTimeLeft(this.timeLeft);

      this.setCircleDasharray();
      this.setRemainingPathColor(this.timeLeft);

      if (this.timeLeft === 0) {
        this.onTimesUp();
      }
    }, 1000);
  }

  calculateTimeFraction(): number {
    return this.timeLeft / this.TIME_LIMIT;
  }

  setRemainingPathColor(timeLeft): void {
    const { alert, warning, info } = this.COLOR_CODES;
    if (timeLeft <= alert.threshold) {
      document
        .getElementById('base-timer-path-remaining')
        .classList.remove(warning.color);
      document
        .getElementById('base-timer-path-remaining')
        .classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
      document
        .getElementById('base-timer-path-remaining')
        .classList.remove(info.color);
      document
        .getElementById('base-timer-path-remaining')
        .classList.add(warning.color);
    }
  }

  setCircleDasharray(): void {
    const circleDasharray = `${(
      this.calculateTimeFraction() * this.FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
      .getElementById('base-timer-path-remaining')
      .setAttribute('stroke-dasharray', circleDasharray);
  }

  ngOnDestroy(): void {
    clearInterval(this.timerInterval);
  }

}
