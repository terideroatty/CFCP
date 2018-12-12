import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from '../home/home';
import {CoursePage} from '../course/course';
import {StorePage} from '../store/store';
import {MePage} from '../me/me';
/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1:any;
  tab2:any;
  tab3:any;
  tab4:any;
  tab5:any;
  tab6:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.tab1 = HomePage;
  this.tab2 = CoursePage;
  this.tab3 = StorePage;
  this.tab6 = MePage;
  /*this.tab4 = StorePage;
  this.tab5 = CookPage;
  this.tab6 = AboutusPage;*/
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
