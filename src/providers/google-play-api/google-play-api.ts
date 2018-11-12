import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GooglePlayApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GooglePlayApiProvider {

  private url: String = 'http://127.0.0.1:3000';

  constructor(
    public http: Http
  ){}

  getApps(){
    return this.http.get(this.url + '/api/google/apps').toPromise().then(res => {
      return res.json();
    });
  }

}
