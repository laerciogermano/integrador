import { Headers, Http, RequestOptions } from "@angular/http";
import { Injectable } from '@angular/core';

@Injectable()
export class AppRequestProvider {

  private accessToken: String = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJndWVzdCIsImlhdCI6MTU0MjAyNzI3Nn0.Q4hGkAN5KoEvm8YdVmSNP9PG8Hl5X2WAdP67-Av0yag`;

  constructor(
    public http: Http
  ) {}

  public get(url){
    const options = this.getAuthorizationHeaders();
    
    return this.http.get(url, options).toPromise().then(res => {
      return res.json();
    }).catch(err => {
      throw err.json();
    });
  }

  private getAuthorizationHeaders(){
    const headers = new Headers({ 'x-access-token': this.accessToken });

		return new RequestOptions({ headers: headers });
  }

}
