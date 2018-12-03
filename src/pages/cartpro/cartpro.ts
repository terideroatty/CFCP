import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CartProvider} from '../../providers/cart/cart';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
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
  public userDetails : any;
  responseData: any;
  userPostData = {"user_id":"","type":"","token":""};
  orderData = {};
  resposeData : any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public cartService: CartProvider,public authService: AuthServiceProvider) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.type = this.userDetails.type;
    this.userPostData.token = this.userDetails.token;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartproPage');
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
    for(var i=0;i < this.selectedItems.length ;i++){
      this.orderData = this.selectedItems[i];
      this.authService.postData(this.orderData, "getOrder");
    }
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
