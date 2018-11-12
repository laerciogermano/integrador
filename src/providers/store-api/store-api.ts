import { Injectable } from '@angular/core';
import { AppRequestProvider } from '../app-request/app-request';
import { Http } from '@angular/http';

@Injectable()
export class StoreApiProvider extends AppRequestProvider{

  // private url: String = 'http://127.0.0.1:3000';
  private url: String = 'http://172.104.217.101:3000';

  constructor(
    public http: Http
  ){
    super(http);
  }

  getApps(){
    const fullURL = `${this.url}/api/apps`;

    return this.get(fullURL);
  }

  getComments(from, appId, offset, length){
    const fullURL = `${this.url}/api/${from}/comments/${appId}/${offset}/${length}`;

    return this.get(fullURL);
  }
}
