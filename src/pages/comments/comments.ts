import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { StoreApiProvider } from '../../providers/store-api/store-api';

/**
 * Generated class for the CommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {

  public comments: any = [];
  public app: any;
  public store: any = 'google';
  public lastUpdated: String = '';

  constructor(
    public http: Http,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public storeAPI: StoreApiProvider
  ) {}

  ngOnInit() {
    this.app = this.navParams.get('app');
    this.requestComments(this.store, { loading: true });
  }

  public requestGoogleComments(){
    this.store = 'google';
    this.requestComments(this.store, {loading: true});
  }

  public requestAppleComments(){
    this.store = 'apple';
    this.requestComments(this.store, {loading: true});
  }
  
  public doRefresh(refresher){
    this.requestComments(this.store, { loading: false }).then(() => {
      refresher.complete();
    }).catch(err => {
      refresher.complete();
    });
  }

  private requestComments(from, opts?){
    const loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });

    if(opts && opts.loading)
      loading.present();

    const appId = from == 'google'
      ? this.app.google && this.app.google.id
      : this.app.apple && this.app.apple.id;

    return this.storeAPI.getComments(from, appId, 0, 50).then(res => {
      const comments = res.result;

      this.lastUpdated = new Date(res.lastUpdated).toLocaleString();

      console.log(res.lastUpdated, this.lastUpdated);

      loading.dismiss();

      this.comments = comments.sort((x, y) => {
        return y.date - x.date;
      });

      this.comments = this.comments.map(el => {
        el.date = new Date(+el.date).toLocaleString();
        return el;
      });

    }).catch(err => {
      loading.dismiss();
      this.comments = [];
      // alert('Houve algum erro!');
    });
  }

}
