
import { Injectable } from '@angular/core';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';

/*
  Generated class for the CartProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CartProvider {
  public userDetails : any;
  userPostData = {"user_id":"","type":"","token":""};
  private cart : any=[];
  responseData : any;
  product : any;
  private datasend : any;

  constructor(public authService: AuthServiceProvider) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.type = this.userDetails.type;
    this.userPostData.token = this.userDetails.token;
    console.log('Hello CartProvider Provider');
  }
   
  /*getProducts(){
    this.authService.postData(this.userPostData, "getcart").then(res => {
      this.responseData = res;
        this.datasend = this.responseData.product;
        console.log(this.datasend);
        return this.datasend;
    });
  }*/
  getCart(){
    return this.cart;
  }
  addProduct(product){
    this.cart.push(product);
  }
  removeItem(msgIndex){
    this.cart.splice(msgIndex, 1);
  }
  removeAllItem(select){
    this.cart.splice(select);
  }
}
