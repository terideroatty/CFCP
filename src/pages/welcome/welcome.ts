import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController,AlertController} from 'ionic-angular';
import {Login} from '../login/login';
import {Signup} from '../signup/signup';
import {TabsPage} from '../tabs/tabs';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import { Http } from '@angular/http';
/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class Welcome {
  resposeData : any;
  userData = {"username":"", "password":""};
  constructor(public navCtrl: NavController,public authService: AuthServiceProvider, public navParams: NavParams,
    private toastCtrl:ToastController,private alert:AlertController, public http:Http) {
  }
  login(){
    if(this.userData.username && this.userData.password){
      this.authService.postData(this.userData, "login").then((result) =>{
      this.resposeData = result;
      console.log(this.resposeData);
      if(this.resposeData.userData){
        localStorage.setItem('userData',JSON.stringify(this.resposeData))
        this.navCtrl.push(TabsPage);

      }else{
        let alert = this.alert.create({
          title: 'ไม่พบผู้ใช้งาน',
          subTitle: 'กรุณาตรวจสอบอีเมลล์หรือรหัสผ่าน!',
          buttons: ['OK']
      });
    
      alert.present();
      }


      
      }, (err) =>{
        
  });
}      
}
    signup(){
    this.navCtrl.push(Signup);
    }
    home(){
    this.navCtrl.push(TabsPage);
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
