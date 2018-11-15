import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import { CommonProvider } from '../../providers/common/common';
import {TabsPage} from '../tabs/tabs';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  //userDetails รับ token กับ user_id มาเพื่อเก็บค่าไว้ใน userPostData
  public userDetails : any;
  responseData: any;
  //ประกาศตัวแปรที่จะอัพเดท
  userPostData = {
    "user_id":"",
    "token":"",
    "username":"",
    "email":"",
    "name":"",
    "surname":"",
    "address":""
  };
  constructor(public navCtrl: NavController, public navParams: NavParams,public authService: AuthServiceProvider,public common:CommonProvider) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    console.log(this.userDetails);
  }
  feedUpdate() {
   this.authService.postData(this.userPostData, "profileUpdate").then((res) => {
  this.responseData = res;
  this.navCtrl.push(TabsPage);
   })
  }
  
}
