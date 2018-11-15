import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController,ToastController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import {Login} from '../login/login';
import {HomePage} from '../home/home';
/**
 * Generated class for the SignupPage page.
 *aaaa
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class Signup {
  resposeData : any;
  userData = {"username":"", "password":"","email":"","name":"","surname":"","address":"","type":""};
  constructor( public  alert    : AlertController,public toastCtrl  :ToastController,public navCtrl: NavController, public navParams: NavParams,public authService:AuthServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  signup(){

    this.authService.postData(this.userData, "signup").then((result) =>{
    this.resposeData = result;
    console.log(this.resposeData);
    if(this.resposeData.userData){
      
            const toast = this.toastCtrl.create({
          message: 'Your files were successfully saved',
          showCloseButton: true,
          closeButtonText: 'Ok'
        });
        toast.present();
      
    localStorage.setItem('userData',JSON.stringify(this.resposeData))
    this.navCtrl.push(TabsPage);    
    console.log("signup success");
        
  }else{
        

    let alert = this.alert.create({
      title: 'Warning',
      subTitle: 'Wrong Username or Password! Please Try Again !',
      buttons: ['OK']
  });

  alert.present();
  }

    }, (err) =>{
      
    
    });


  }

 login(){
   //Login page link
   this.navCtrl.push(Login);
 }
}
