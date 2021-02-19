import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private platform: Platform, private httpMobile: HTTP, private httpWeb: HttpClient) { }

  async get(api: string): Promise<any> {
    if (this.platform.is('cordova')) {
      const result = await this.httpMobile.get(environment.SERVER_ADDRESS + api, {}, {});
      return result.data;
    } else {
      return await this.httpWeb.get(environment.SERVER_ADDRESS + api).toPromise();
    }
  }
}
