import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/*
  Generated class for the AppStoreApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppStoreApiProvider {

  private url: String = 'http://127.0.0.1:3000';

  constructor(
    public http: Http
  ){}

  getApps(){
    return this.http.get(this.url + '/api/apple/apps').toPromise().then(res => {
      return res.json();
    });
  }
}
