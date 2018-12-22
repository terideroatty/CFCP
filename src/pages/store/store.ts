import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, GESTURE_ITEM_SWIPE } from 'ionic-angular';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import {CartproPage} from '../cartpro/cartpro';
import {CartProvider} from '../../providers/cart/cart';

/**
 * Generated class for the StorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-store',
  templateUrl: 'store.html',
})
export class StorePage{
  public userDetails : any;
  responseData: any;
  userPostData = {"user_id":"","type":"","token":""};
  product : any;
  productid : any;
  name : any;
  price : any;
  quantity : any;
  order : {"pro_id":"","pro_name":"","pro_price":"","pro_quantity":""};
  rec : any;
  rec2 : any;
  rec3 : any;
  rec4 : any;
  data : any=[];
  searchQuery: string = '';
  cart : any=[];
  items : any=[];
  items2 : any=[];
  hideMe = false;
  get : {"pro_id":"","pro_name":"","pro_price":"","pro_quantity":"","user_id":"","count":"0"};
  private currentNumber = 0;

   constructor(public navCtrl: NavController, public navParams: NavParams,
    public authService:AuthServiceProvider,public cartService: CartProvider) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.type = this.userDetails.type;
    this.userPostData.token = this.userDetails.token;
  }

  ionViewWillEnter() {
    this.load();
    this.cart = this.cartService.getCart();
    //this.items = this.cartService.getProducts();
    console.log('ionViewDidLoad StorePage');
  }
load() {
    
    this.authService.postData(this.userPostData, "getcart").then(res => {
      this.responseData = res;
      if (this.responseData.product) {
        this.items = this.responseData.product;
        //this.pap = this.product.length;


        for(let i of this.items){
          i.count = 0; 
        }
        console.log(this.items);
      } else {
        console.log("No access");
      }
    },
    err => {
      //Connection failed message
    }
  );
} 
increment (msgIndex) {
  this.items[msgIndex].count = this.items[msgIndex].count + 1;
  console.log(this.items[msgIndex].count);
 
}

decrement (msgIndex) {
  this.items[msgIndex].count = this.items[msgIndex].count - 1;
  console.log(this.items[msgIndex].count);
}
filterdata(){
  this.items = this.items.sort((a, b) => a.pro_price <= b.pro_price ? -1 : 1);
}
filtermore(){
  this.items = this.items.sort((a, b) => a.pro_price <= b.pro_price ? 1 : -1);
}
doRefresh(refresher) {
  console.log('Begin async operation', refresher);

  setTimeout(() => {
    this.load();
    console.log('Async operation has ended');
    refresher.complete();
  }, 2000);
}
addToCart(product){
  this.cartService.addProduct(product);
}
openCart(){
  this.navCtrl.push(CartproPage);
}
hide() {
  if(this.hideMe == true){
    this.hideMe = false;
  }else{
    this.hideMe = true;
  }
}
getItems(ev: any){

  let val = ev.target.value;

  if(val && val.trim() != ''){
    this.items = this.items.filter((item) => {
      return (item.pro_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }else{
    this.items = this.responseData.product;
  }
}
//cart(p){
  ///=var a = [];
  // Parse the serialized data back into an aray of objects
  //a = JSON.parse(localStorage.getItem('order'));
  // Push the new data (whether it be an object or anything else) onto the array
 /*  a.push({
    pro_id:p.pro_id,
    pro_name:p.pro_name,
    pro_price:p.pro_price,
    pro_quantity:p.pro_quantity
  });*/
  // Alert the array value
  //alert(a);  // Should be something like [Object array]
  // Re-serialize the array back into a string and store it in localStorage
  //localStorage.setItem('order', JSON.stringify(a));
  /*this.get = p;
  localStorage.setItem('order',JSON.stringify(p))
  console.log(this.get);
  }*/
  /*this.rec = productid;
  this.rec2 = proname;
  this.rec3 = proprice;
  this.rec4 = proquantity;*/

  //this.order("pro_id :"+ this.rec +"pro_name :"+this.rec2+"pro_price :"+this.rec3+"pro_quantity"+this.rec4);
  /*this.order.push(this.rec2);
  this.order.push(this.rec3);
  this.order.push(this.rec4);*/
  
  /*console.log(this.rec);
  console.log(this.rec2);
  console.log(this.rec3);
  console.log(this.rec4);*/
}   

  
  

