import { WsService } from '../../services/ws.service';
import {Component, AfterViewInit, EventEmitter, Output, Input} from '@angular/core';
import {DeviceMotion, DeviceMotionAccelerationData} from '@ionic-native/device-motion/ngx';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss'],
})
export class VoteComponent implements AfterViewInit {
  @Output() downVote = new EventEmitter<void>();
  @Output() upVote = new EventEmitter<void>();
  @Output() noVote = new EventEmitter<void>();

  @Input() public photoSrc: string;

  watchOffset = 10;

  toggle = false;

  thumbsUpColorDefault = 'grey';
  thumbsUpColor = 'lightgreen';

  thumbsDownColorDefault = 'grey';
  thumbsDownColor = 'grey';

  constructor(private deviceMotion: DeviceMotion, private wsService: WsService) { }

  ngAfterViewInit(): void {
    this.startWatchingMotion();
  }

  startWatchingMotion(): void {
    this.deviceMotion.watchAcceleration({ frequency: 100 }).subscribe((acceleration: DeviceMotionAccelerationData) => {
      this.emitShake(acceleration);
    });
  }

  private emitShake(acceleration: DeviceMotionAccelerationData): void {
    if (this.detectShake(acceleration)) {
      if (this.toggle) {
        this.downVote.emit();
        this.wsService.sendDownVote();
      } else {
        this.upVote.emit();
        this.wsService.sendUpVote();
      }
    } else {
      this.noVote.emit();
    }
  }

  private detectShake(acceleration: DeviceMotionAccelerationData): boolean {
    return (acceleration.x >= this.watchOffset || acceleration.x <= -this.watchOffset) ||
        (acceleration.y >= this.watchOffset || acceleration.y <= -this.watchOffset);
  }

  toggleChange(): void {
    if (this.toggle) {
      this.thumbsUpColor = this.thumbsUpColorDefault;
      this.thumbsDownColor = 'orangered';
    } else {
      this.thumbsDownColor = this.thumbsDownColorDefault;
      this.thumbsUpColor = 'lightgreen';
    }
  }
}
