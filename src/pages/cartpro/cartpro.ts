import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import {CartProvider} from '../../providers/cart/cart';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import 'rxjs/add/operator/map';
import { PaymentPage } from '../payment/payment';
/**
 * Generated class for the CartproPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cartpro',
  templateUrl: 'cartpro.html',
})
export class CartproPage {
  selectedItems : any=[];
  total = 0;
  emp : any;
  public userDetails : any;
  responseData: any;
  checkstatus: any;
  userPostData = {"user_id":"","type":"","token":""};
  orderData = {"pro_id":"","pro_price":"","count":"","user_id":"","token":""};
  resposeData : any;
  pro = {"user_id":"","token":"","count":"","pro_id":""};

  constructor(public navCtrl: NavController, public navParams: NavParams,public cartService: CartProvider,
    public authService: AuthServiceProvider,private alert:AlertController) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.type = this.userDetails.type;
    this.userPostData.token = this.userDetails.token;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartproPage');
    this.authService.postData(this.userPostData, "checkPayment").then(res => {
      this.responseData = res; 
      this.checkstatus = this.responseData.checkpay.status;});
    let items = this.cartService.getCart();
    let selected = {};
    for (let obj of items){
      if(selected[obj.pro_id]){
        selected[obj.pro_id].count++;
      }else{
        selected[obj.pro_id] = {...obj,count: 1,token: this.userPostData.token};
      
      }
    }
    

    this.selectedItems = Object.keys(selected).map(key => selected[key])
    console.log('items: ', this.selectedItems);
    this.total = this.selectedItems.reduce((a,b) => a + (b.count * b.pro_price), 0);
    console.log(this.total);
  }
  sendorder(){
    if(this.checkstatus == 0){
      for(var i=0;i < this.selectedItems.length ;i++){
        this.orderData.pro_id = this.selectedItems[i].pro_id;
        this.orderData.pro_price = this.selectedItems[i].pro_price;
        this.orderData.count = this.selectedItems[i].count;
        this.orderData.user_id = this.selectedItems[i].user_id;
        this.orderData.token = this.selectedItems[i].token;
        this.authService.postData(this.orderData, "getOrder");
        /*this.selectedItems.splice([i], 1);
        this.cartService.removeAllItem([i]);*/
        this.pro.user_id = this.selectedItems[i].user_id;
        this.pro.token = this.selectedItems[i].token;
        this.pro.count = this.selectedItems[i].count;
        this.pro.pro_id = this.selectedItems[i].pro_id;
        this.authService.postData(this.pro, "deleteQuantity");
      }
      this.selectedItems.splice(0);
      this.cartService.removeAllItem(0);
      this.authService.postData(this.userPostData, "updatePayment");

      this.navCtrl.push(PaymentPage,{
        totalPrice: this.total
      });

    }else if(this.checkstatus == 1){
      let alert = this.alert.create({
        title: 'คุณยังไม่ได้ชำระเงิน',
        subTitle: 'โปรดชำระบิลก่อนหน้านี้ก่อนทำรายการใหม่!',
        buttons: ['OK']
    });
    alert.present();
    }
    /*
    for(var i=0;i < this.selectedItems.length ;i++){
      this.orderData.pro_id = this.selectedItems[i].pro_id;
      this.orderData.pro_price = this.selectedItems[i].pro_price;
      this.orderData.count = this.selectedItems[i].count;
      this.orderData.user_id = this.selectedItems[i].user_id;
      this.orderData.token = this.selectedItems[i].token;
      console.log(this.orderData);
      this.authService.postData(this.orderData, "getOrder");
    }
    this.navCtrl.push(HomePage);*/
    /*this.orderData = this.selectedItems;
  //this.orderData = JSON.stringify(this.selectedItems);
    console.log(this.orderData);
    this.authService.postData(this.orderData, "getOrder");*/
  
}
deleteItem(msgIndex){
 
      this.selectedItems.splice(msgIndex, 1);
    this.cartService.removeItem(msgIndex);
    this.total = this.selectedItems.reduce((a,b) => a + (b.count * b.pro_price), 0);
  //this.selectedItems = [].shift.apply(item);
 // console.log(this.selectedItems);
  //console.log(this.selectedItems);
}

}
