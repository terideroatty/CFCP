import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CartProvider} from '../../providers/cart/cart';
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
  constructor(public navCtrl: NavController, public navParams: NavParams,public cartService: CartProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartproPage');
    let items = this.cartService.getCart();
    let selected = {};
    for (let obj of items){
      if(selected[obj.pro_id]){
        selected[obj.pro_id].count++;
      }else{
        selected[obj.pro_id] = {...obj,count: 1};
      }
    }

    this.selectedItems = Object.keys(selected).map(key => selected[key])
    console.log('items: ', this.selectedItems);
    this.total = this.selectedItems.reduce((a,b) => a + (b.count * b.pro_price), 0);
    console.log(this.total);
  }

}
