import { WsService } from '../../services/ws.service';
import {Component, AfterViewInit, EventEmitter, Output, Input, OnInit, OnDestroy} from '@angular/core';
import {DeviceMotion, DeviceMotionAccelerationData} from '@ionic-native/device-motion/ngx';
import {PhotoService} from '../../services/photo.service';
import {SessionService} from '../../services/session.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss'],
})
export class VoteComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() downVote = new EventEmitter<void>();
  @Output() upVote = new EventEmitter<void>();
  @Output() noVote = new EventEmitter<void>();

  public photoSrc: string;
  public watchAccelerationSubscription: Subscription;

  watchOffset = 10;

  toggle = false;

  thumbsUpColorDefault = 'grey';
  thumbsUpColor = 'lightgreen';

  thumbsDownColorDefault = 'grey';
  thumbsDownColor = 'grey';

  constructor(private deviceMotion: DeviceMotion,
              private wsService: WsService,
              private photoService: PhotoService,
              private sessionService: SessionService) { }

  ngOnInit(): void {
    this.photoService.photoSrc$.subscribe(photoSrc => this.photoSrc = photoSrc);
  }

  ngAfterViewInit(): void {
    this.startWatchingMotion();
  }

  startWatchingMotion(): void {
    this.watchAccelerationSubscription = this.deviceMotion.watchAcceleration({ frequency: 100 }).subscribe((acceleration: DeviceMotionAccelerationData) => {
      this.emitShake(acceleration);
    });
  }

  private emitShake(acceleration: DeviceMotionAccelerationData): void {
    if (this.detectShake(acceleration)) {
      if (this.toggle) {
        this.downVote.emit();
        this.wsService.sendDownVote(this.sessionService.userLogin$.value);
      } else {
        this.upVote.emit();
        this.wsService.sendUpVote(this.sessionService.userLogin$.value);
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

  ngOnDestroy(): void {
    this.watchAccelerationSubscription.unsubscribe();
  }
}
