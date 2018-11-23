import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http,Headers, RequestOptions } from '@angular/http';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import 'rxjs/add/operator/map';
/**
 * Generated class for the CoursePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-course',
  templateUrl: 'course.html',
})
export class CoursePage {
  public userDetails : any;
  responseData: any;
  notchange : any;
  userPostData = {"user_id":"","type":"","token":"","username":""};
  data1 : any;
  data2 : any;
  data3 : any;
  items1 : any=[];
  items2 : any=[];
  items3 : any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,public authService:AuthServiceProvider) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.type = this.userDetails.type;
    this.userPostData.token = this.userDetails.token;
    this.userPostData.username = this.userDetails.username;
  }

  ionViewDidLoad() {
    this.load();
    console.log('ionViewDidLoad CoursePage');
    console.log(this.userDetails);
  }
  load() {
    this.authService.postData(this.userPostData, "checkdata").then(res => {
      this.responseData = res;
      this.data1 = this.responseData[0];
      this.data2 = this.responseData[1];
      this.data3 = this.responseData[2];
      console.log(this.data1);
      console.log(this.data2);
      console.log(this.data3);
     /* if (this.responseData.OatData) {
        this.data1 = this.responseData.OatData;
        //this.data2 = this.responseData.testData;
        console.log(this.data1);
        //console.log(this.data2);
      } else {
        console.log("No access");
      }*/
    },
    err => {
      //Connection failed message
    }
  );
}     
    
   
}
