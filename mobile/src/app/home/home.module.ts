import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { AccelerometerComponent } from './accelerometer/accelerometer.component';
import { HTTP } from '@ionic-native/http/ngx';
import { TestComponent } from '../test/test.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [
      HomePage,
      TestComponent,
      AccelerometerComponent
  ],
  providers: [HTTP]
})
export class HomePageModule {}
