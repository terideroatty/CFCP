import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';

/*
  Generated class for the NotiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotiProvider {
  public userDetails : any;
  userPostData = {"user_id":"","token":""};
  private not : any=[];

  constructor(public http: HttpClient,public authService: AuthServiceProvider) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;
    console.log('Hello NotiProvider Provider');
  }
  getCart(){
    return this.not;
  }
  addProduct(product){
    this.not.push(product);
  }
}
