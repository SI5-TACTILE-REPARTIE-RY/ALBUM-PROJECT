import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {

  interval = null;
  get ratio(): number {
    return this.actualSize / this.totalSize;
  }
  get actualSize(): number {
    return document.getElementById('base-progress-progression').getBoundingClientRect().height;
  }
  get totalSize(): number {
    return document.getElementById('base-progress-container').getBoundingClientRect().height;
  }
  progression: number;

  WARNING_THRESHOLD = 0.4;
  ALERT_THRESHOLD = 0.1;

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

  constructor() { }

  ngOnInit(): void {
    this.progression = this.totalSize;
    console.log(this.totalSize);
    this.startInterval();
  }

  startInterval(): void {
    this.interval = setInterval(() => {
      this.setProgression();
      this.setRemainingPathColor();
    }, 1000);
  }

  setRemainingPathColor(): void {
    const ratio = this.actualSize / this.totalSize;
    const { alert, warning, info } = this.COLOR_CODES;
    if (ratio <= alert.threshold) {
      document
        .getElementById('base-progress__progression')
        .classList.remove(warning.color);
      document
        .getElementById('base-progress__progression')
        .classList.add(alert.color);
    } else if (ratio <= warning.threshold) {
      document
        .getElementById('base-progress__progression')
        .classList.remove(info.color);
      document
        .getElementById('base-progress__progression')
        .classList.add(warning.color);
    }
  }

  setProgression(): void {
    if (this.ratio > this.ALERT_THRESHOLD) {
      this.progression -= 0.1 * this.totalSize;
    } else if (this.ratio > 0) {
      this.progression -= 0.05 * this.totalSize;
    }
    document
      .getElementById('base-progress-progression')
      .setAttribute('height', this.progression.toString());
  }

}
