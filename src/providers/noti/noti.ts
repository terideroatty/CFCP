
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
  private notdeli : any=[];

  constructor(public authService: AuthServiceProvider) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;
    console.log('Hello NotiProvider Provider');
  }
  getPay(){
    return this.not;
  }
  getDeli(){
    return this.notdeli;
  }
  addPay(product){
    this.not.push(product);
  }
  addDelivery(product){
    this.notdeli.push(product);
  }
}
