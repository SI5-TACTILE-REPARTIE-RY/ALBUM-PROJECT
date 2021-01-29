import { Component, OnInit } from '@angular/core';
import {DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';

@Component({
  selector: 'app-accelerometer',
  templateUrl: './accelerometer.component.html',
  styleUrls: ['./accelerometer.component.scss'],
})
export class AccelerometerComponent implements OnInit {

  color = 'grey';

  constructor(private deviceMotion: DeviceMotion) { }

  ngOnInit() {
    // Watch device acceleration
    this.deviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) => {
      (acceleration.x !== 0 && acceleration.y !== 0) ? this.color = 'red' : this.color = 'grey';
    });
  }

}
