import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import {CartProvider} from '../../providers/cart/cart';
import {CartproPage} from '../cartpro/cartpro';
/**
 * Generated class for the CookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cook',
  templateUrl: 'cook.html',
})
export class CookPage {
  public userDetails : any;
  responseData: any;
  showdata : any;
  userPostData = {"user_id":"","token":""};
  cart : any =[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public authService:AuthServiceProvider,public cartService: CartProvider) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;
  }

  ionViewDidLoad() {
    this.load();
    console.log('ionViewDidLoad CookPage');
    this.cart = this.cartService.getCart();
  }
  load()
  {
    this.authService.postData(this.userPostData, "getCK").then(res => {
      this.responseData = res;
      if (this.responseData.cookdata) {
        this.showdata = this.responseData.cookdata;
        console.log(this.showdata);
      } else {
        console.log("No access");
      }
    },
    err => {
      //Connection failed message
    }
  );
 
}  
openCart(){
  this.navCtrl.push(CartproPage);
}   
}
