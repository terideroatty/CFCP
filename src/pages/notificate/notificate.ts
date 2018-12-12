import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import {NotiProvider} from '../../providers/noti/noti';

/**
 * Generated class for the NotificatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notificate',
  templateUrl: 'notificate.html',
})
export class NotificatePage {
  public userDetails : any;
 responseData: any;
 userPostData = {"user_id":"","token":"","type":""};
  constructor(public navCtrl: NavController, public navParams: NavParams,public authService:AuthServiceProvider,public noti:NotiProvider) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;
    this.userPostData.type = this.userDetails.type;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificatePage');
  }

}
