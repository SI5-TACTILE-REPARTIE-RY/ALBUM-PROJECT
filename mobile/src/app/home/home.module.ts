import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { HTTP } from '@ionic-native/http/ngx';
import { VoteComponent } from './vote/vote.component';
import { PhotoEditorComponent } from './photo-editor/photo-editor.component';
import { FiltersComponent } from './photo-editor/filters/filters.component';
import { HttpService } from '../services/http.service';
import { SessionService } from '../services/session.service';
import { WsService } from '../services/ws.service';
import { LockButtonComponent } from '../lock-button/lock-button.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CropperComponent } from './photo-editor/cropper/cropper.component';
import { PhotoService } from '../services/photo.service';
import {ConnectedUsersComponent} from './connected-users/connected-users.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ImageCropperModule
  ],
  declarations: [
    HomePage,
    VoteComponent,
    PhotoEditorComponent,
    FiltersComponent,
    LockButtonComponent,
    CropperComponent,
    ConnectedUsersComponent
  ],
  providers: [HTTP, HttpService, SessionService, WsService, PhotoService]
})
export class HomePageModule {}
