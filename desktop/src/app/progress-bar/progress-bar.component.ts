import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements AfterViewInit {

  @ViewChild('background') backgroundRect: ElementRef;
  @ViewChild('progression') progressionRect: ElementRef;

  interval = null;

  total: number;
  progression: number;

  WARNING_THRESHOLD = 0.6;
  ALERT_THRESHOLD = 0.3;

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

  ngAfterViewInit(): void {
    this.total = this.backgroundRect.nativeElement.getBoundingClientRect().height;
    this.progression = this.getSize();
    this.startInterval();
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
    if (ratio > 0.05) {
      if (0.1 * this.total > this.progression) {
        this.progression = this.total * 0.01;
      } else {
        this.progression -= 0.1 * this.total;
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

}
