import { Component } from '@angular/core';
import { IonicPage, NavController, App} from 'ionic-angular';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import { Http,Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {ProfilePage} from '../profile/profile';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
 public userDetails : any;
 responseData: any;
 showdata : any;
 dataSet : any;
 userPostData = {"user_id":"","token":""};
 feedData ={"feed_id":"","ftitle":"","fdes":""};
 public item : any = [];
 public items : any = [];
 public items2 : any = [];
  /*userPostData = {
    name: "",
    des: ""
  };*/
  
  constructor(public navCtrl: NavController,public authService : AuthServiceProvider,public app:App,public http:Http) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;
  //  this.getDetail();
  }

  ionViewDidLoad() {
    this.load();
    console.log('ionViewDidLoad HomePage');
    console.log(this.userDetails);
  }
  profile(){
    this.navCtrl.push(ProfilePage)
  }
  backToWelcome(){
	  const root = this.app.getRootNav();
	  root.popToRoot();
  }

  logout() {
  	// Remove API token 
  	localStorage.clear();
  	// Go back to root
  	setTimeout(() => this.backToWelcome(), 1000);
  }
  
  load()
    {
       this.http.get('http://localhost/DB/getNews.php')
       .map(res => res.json())
       .subscribe(data => 
       {
         this.item = data;
          if(this.userDetails.type == this.item.ftype){
          this.items = data;
          }else if(this.userDetails.type != this.item.ftype){
          this.items2 = data;
          }
          console.log("This mfood"+this.items);
          console.log(this.items2);
       });
    }
 /* load()
    {
       this.http.get('http://localhost/DB/retrieve-dat.php')
       .map(res => res.json())
       .subscribe(data => 
       {
          this.items = data;         
       });
    }*/
   
  /*load()
    {
       this.http.get('http://localhost/DB/retrieve-dat.php')
       .map(res => res.json())
       .subscribe(data => 
       {
          this.items = data;         
       });
    }*/
  /*getDetail() {
    this.authService.getData()
      .then((result) => {
        this.responseData = result;
        if (this.responseData.detailData) {
          this.dataSet = this.responseData.detailData;
        } else {}
      }, (err) => {

      });
  }
 convertTime(created) {
    let date = new Date(created * 1000);
    return date;
  }*/
}
