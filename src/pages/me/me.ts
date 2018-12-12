import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import {ProfilePage} from  '../profile/profile';
/**
 * Generated class for the MePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-me',
  templateUrl: 'me.html',
})
export class MePage {
  public userDetails : any;
  responseData: any;
  showPro: any=[];
  userPostData = {"user_id":"","token":"","email":"","name":""};
  constructor(public navCtrl: NavController, public navParams: NavParams,public authService:AuthServiceProvider) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;
    this.userPostData.email = this.userDetails.email;
    
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MePage');
    this.showPro = this.userPostData;
    console.log(this.showPro);
  }
  profile(){
    this.navCtrl.push(ProfilePage);
  }

}
