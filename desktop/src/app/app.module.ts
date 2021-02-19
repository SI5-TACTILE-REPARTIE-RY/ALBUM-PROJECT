// MODULES
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// COMPONENTS
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { VoteComponent } from './vote/vote.component';
import { TimerComponent } from './vote/timer/timer.component';
import { ProgressBarComponent } from './vote/progress-bar/progress-bar.component';

// OTHERS
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { VoteResultMessageComponent } from './home/vote-result-message/vote-result-message.component';
const config: SocketIoConfig = { url: environment.SERVER_ADDRESS, options: {}};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VoteComponent,
    TimerComponent,
    ProgressBarComponent,
    VoteResultMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
