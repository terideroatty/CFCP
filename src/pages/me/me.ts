import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import {ProfilePage} from  '../profile/profile';
import {PaymentPage} from '../payment/payment';
import {NotiProvider} from '../../providers/noti/noti';
import {CartProvider} from '../../providers/cart/cart';
import {CartproPage} from '../cartpro/cartpro';
/**
 * Generated class for the MePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-me',
  templateUrl: 'me.html',
})
export class MePage {
  public userDetails : any;
  responseData: any;
  showData: any=[];
  userPostData = {"user_id":"","token":""};
  pay : any;
  delivery : any;
  payPro : any=[];
  deliPro : any=[];
  keep : any;
  cart : any =[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public authService:AuthServiceProvider,public notificatiob:NotiProvider,public cartService: CartProvider) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;
  }
  ionViewDidLoad() {
    this.load();
    console.log('ionViewDidLoad MePage');
    this.cart = this.cartService.getCart();
  }
  profile(){
    this.navCtrl.push(ProfilePage);
  }
  payment(){
    this.navCtrl.push(PaymentPage);
  }
  openCart(){
    this.navCtrl.push(CartproPage);
  }
  load()
    {
      this.authService.postData(this.userPostData, "checkStatus").then(res => {
        this.responseData = res;
        if (this.responseData.paystatus) {
          this.showData = this.responseData.paystatus;
        } else {
          console.log("No access");
        }
      },
      err => {
        //Connection failed message
      }
    );
  }     
  
}
