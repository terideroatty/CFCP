import { Component} from '@angular/core';
import { IonicPage, NavController, App, ModalController} from 'ionic-angular';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as moment from 'moment';
import {PaymentPage} from '../payment/payment';
import {CartProvider} from '../../providers/cart/cart';
import {CartproPage} from '../cartpro/cartpro';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
 public userDetails : any;
 responseData: any;
 showdata : any;
 dataSet : any;
 test : any;
 userPostData = {"user_id":"","token":"","type":""};
 userPostData2 = {"user_id":"","token":""};
 feedData ={"feed_id":"","ftitle":"","fdes":""};
 public item : any = [];
 items : any=[];
 public items2 : any = [];
 myDate= moment().format();
 cart : any =[];

  constructor(public navCtrl: NavController,public authService : AuthServiceProvider,public app:App,
    public http:Http,public cartService: CartProvider,private modal:ModalController) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;
    this.userPostData.type = this.userDetails.type;
    this.userPostData2.user_id = this.userDetails.user_id;
    this.userPostData2.token = this.userDetails.token;
  //  this.getDetail();
  }

  ionViewDidLoad() {
    this.load();
    this.cart = this.cartService.getCart();
    console.log('ionViewDidLoad HomePage');
    console.log(this.userDetails);
    
  }
  profile(){
    this.navCtrl.push(PaymentPage)
  }
  backToWelcome(){
	  const root = this.app.getRootNav();
	  root.popToRoot();
  }
openmodal(msgIndex){
  this.showdata = this.dataSet[msgIndex];
  const myModal =  this.modal.create('ModalPage',{data:this.showdata});

  myModal.present();
}
  logout() {
  	// Remove API token 
  	localStorage.clear();
  	// Go back to root
  	setTimeout(() => this.backToWelcome(), 1000);
  }
  openCart(){
    this.navCtrl.push(CartproPage);
  }
  
  load()
    {
      this.authService.postData(this.userPostData, "getNS").then(res => {
        this.responseData = res;
        if (this.responseData.feedData) {
          this.dataSet = this.responseData.feedData;
          console.log(this.dataSet);
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