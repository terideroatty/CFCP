import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http,Headers, RequestOptions } from '@angular/http';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
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
  public items : Array<any> = [];
  public images : Array<any> = [];
  public random : Array<any> =[];
  public userDetails : any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,public authService:AuthServiceProvider) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
  }

  ionViewDidLoad() {
    this.load();
    console.log('ionViewDidLoad CoursePage');
  }
  load()
    {
       //this.http.post(this.userDetails.user_id,'http://localhost/DB/retrieve-dat.php')
       this.http.get('http://localhost/DB/retrieve-dat.php')
       .map(res => res.json())
       .subscribe(data => 
       {
          this.items = data; 
          console.log(this.items);        
       });
    }
   /* getRandom() {
      let rd = Math.floor(Math.random() * this.items.length);
      this.random = [this.items[rd]];
    }*/
}
