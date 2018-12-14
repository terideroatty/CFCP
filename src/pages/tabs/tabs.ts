import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from '../home/home';
import {CoursePage} from '../course/course';
import {StorePage} from '../store/store';
import {MePage} from '../me/me';
import {CookPage} from '../cook/cook';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
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
  datashow:any;
  public userDetails : any;
  responseData: any;
  showData: any=[];
  userPostData = {"user_id":"","token":""};

  constructor(public navCtrl: NavController, public navParams: NavParams,public authService:AuthServiceProvider) {
  this.tab1 = HomePage;
  this.tab2 = CoursePage;
  this.tab3 = StorePage;
  this.tab5 = CookPage;
  this.tab6 = MePage;
  const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;
  /*this.tab4 = StorePage;
  this.tab5 = CookPage;
  this.tab6 = AboutusPage;*/
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
    this.load();
  }
  load()
  {
    this.authService.postData(this.userPostData, "checkStatus").then(res => {
      this.responseData = res;
      if (this.responseData.paystatus) {
        this.showData = this.responseData.paystatus;
        for(let show of this.showData){
          this.datashow = show.status;
        }
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
