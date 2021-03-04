// MODULES
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// COMPONENTS
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { VoteComponent } from './home/vote/vote.component';
import { TimerComponent } from './home/vote/timer/timer.component';
import { ProgressBarComponent } from './home/vote/progress-bar/progress-bar.component';

// OTHERS
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { VoteResultMessageComponent } from './home/vote-result-message/vote-result-message.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { PhotoComponent } from './home/photo/photo.component';
import { FilterStackComponent } from './home/filter-stack/filter-stack.component';
import { ConnectedUsersComponent } from './home/connected-users/connected-users.component';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {ToastrModule} from 'ngx-toastr';
const config: SocketIoConfig = { url: environment.SERVER_ADDRESS, options: {}};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VoteComponent,
    TimerComponent,
    ProgressBarComponent,
    VoteResultMessageComponent,
    PhotoComponent,
    FilterStackComponent,
    PhotoComponent,
    ConnectedUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    HttpClientModule,
    BrowserAnimationsModule,
    ImageCropperModule,
    MatCardModule,
    MatChipsModule,
    SweetAlert2Module.forRoot(),
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
