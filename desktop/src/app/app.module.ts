// MODULES
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

// COMPONENTS
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ShakeBarComponent } from './shake-bar/shake-bar.component';
import { TimerComponent } from './timer/timer.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';

// OTHERS
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
const config: SocketIoConfig = { url: environment.SERVER_ADDRESS, options: {}};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShakeBarComponent,
    TimerComponent,
    ProgressBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
