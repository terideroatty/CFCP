import { Component,ViewChild , OnInit,Renderer} from '@angular/core';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
/**
 * Generated class for the ExpandableComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'expandable',
  templateUrl: 'expandable.html'
})
export class ExpandableComponent{
  public userDetails : any;
  responseData: any;
  showdata : any;
  dataSet : any;
  userPostData = {"user_id":"","token":"","type":""};
  accordionExpanded = false;
  @ViewChild("cc") cardContent:any;

  constructor(public authService : AuthServiceProvider,public renderer: Renderer) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;
    this.userPostData.type = this.userDetails.type;
  }
  ionViewDidLoad(){
    console.log(this.cardContent.nativeElement);
    this.renderer.setElementStyle(this.cardContent.nativeElement, "webkitTransition", "max-height 500ms, padding 500ms");
  }
  
  toggleAccordion(){
    if (this.accordionExpanded) {
      this.renderer.setElementStyle(this.cardContent.nativeElement, "max-height", "0px");
      this.renderer.setElementStyle(this.cardContent.nativeElement, "padding", "0px 16px");

    } else {
      this.renderer.setElementStyle(this.cardContent.nativeElement, "max-height", "500px");
      this.renderer.setElementStyle(this.cardContent.nativeElement, "padding", "13px 16px");
    }
    this.accordionExpanded = !this.accordionExpanded;
  }
  load()
    {
      this.authService.postData(this.userPostData, "getNS").then(res => {
        this.responseData = res;
        if (this.responseData.feedData) {
          this.dataSet = this.responseData.feedData;
          console.log(this.dataSet);
        } else {
          console.log("No access");
        }
      },
      err => {
        //Connection failed message
      }
    );
  }     
}
