import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController } from 'ionic-angular';
import { CommentsPage } from '../comments/comments';
import { StoreApiProvider } from '../../providers/store-api/store-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  

  public apps: Array<any> = [];

  constructor(
    public http: Http,
    public navCtrl: NavController,
    public storeAPI: StoreApiProvider
  ) {}

  ngOnInit(){
    this.requestApps();
  }

  public requestApps(){
    return this.storeAPI.getApps().then(res => {
      this.apps = res.result;
    });
  }


  // todo: verificar id da loja se existe...
  public openApp(app){
    this.navCtrl.push(CommentsPage, { app });
  }

  public doRefresh(refresher){
    this.requestApps().then(() => {
      refresher.complete();
    }).catch(err => {
      refresher.complete();
    });
  }

}
