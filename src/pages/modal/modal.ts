import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams  } from 'ionic-angular';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
  
})
export class ModalPage {
  showdata : any=[];
  constructor(private navParams: NavParams, private view:ViewController) {
  }

  ionViewDidLoad() {
    const data = this.navParams.get('data');
    console.log(data);
    this.showdata = data;
  }
  closeModal(){
    this.view.dismiss();
  }
}
