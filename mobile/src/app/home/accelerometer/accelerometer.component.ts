import { Component, OnInit } from '@angular/core';
import {DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';

@Component({
  selector: 'app-accelerometer',
  templateUrl: './accelerometer.component.html',
  styleUrls: ['./accelerometer.component.scss'],
})
export class AccelerometerComponent implements OnInit {

  offset = 10;
  color = 'grey';

  constructor(private deviceMotion: DeviceMotion) { }

  ngOnInit() {
    // Watch device acceleration
    this.deviceMotion.watchAcceleration({ frequency: 100 }).subscribe((acceleration: DeviceMotionAccelerationData) => {
      if ((acceleration.x >= this.offset || acceleration.x <= -this.offset) ||
          (acceleration.y >= this.offset || acceleration.y <= -this.offset)) {
        this.color = 'red';
      } else {
        this.color = 'grey';
      }
    });
  }

}
