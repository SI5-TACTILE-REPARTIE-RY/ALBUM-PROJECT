import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import {HTTP} from '@ionic-native/http/ngx';
import {UsersOnlineComponent} from './users-online/users-online.component';
import {VoteComponent} from './vote/vote.component';
import {PhotoEditorComponent} from './photo-editor/photo-editor.component';
import {FiltersComponent} from './photo-editor/filters/filters.component';
import {HttpService} from "../services/http.service";
import {SessionService} from "../services/session.service";
import {WsService} from "../services/ws.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
    UsersOnlineComponent,
    VoteComponent,
    PhotoEditorComponent,
    FiltersComponent
  ],
  providers: [HTTP, HttpService, SessionService, WsService]
})
export class HomePageModule {}
