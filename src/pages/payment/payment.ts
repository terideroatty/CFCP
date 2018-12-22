import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LoadingController } from 'ionic-angular';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  public userDetails : any;
  responseData: any;
  userPostData = {"user_id":"","token":"","imageB64":""};
  myphoto:any;
  userid : any;
  user : any;
  public photos: any;
  public base64Image: string;
  public fileImage: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private transfer: FileTransfer, private file: File,private camera: Camera,
    public loading: LoadingController,public authService:AuthServiceProvider) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userid = this.userDetails.user_id;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }
  takePhoto(){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.myphoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  getImage() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 600,
      targetHeight: 600,
      saveToPhotoAlbum: false
    }

    this.camera.getPicture(options).then(
      imageData => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
        this.photos.push(this.base64Image);
        this.photos.reverse();
        this.sendData(imageData);
     },
     err => {
       console.log(err);
     }
  );
  }
sendData(imageData){
  this.userPostData.imageB64 = imageData;

  this.authService.postData(this.userPostData,'userImage').then((res)=>{
    console.log(res);
  },(err)=>{

  });
}
  cropImage() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      allowEdit:true,
      targetWidth:300,
      targetHeight:300
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.myphoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  uploadImage(){
    //Show loading
    let loader = this.loading.create({
      content: "Uploading..."
    });
    loader.present();
    this.user = this.userid;
    //create file transfer object
    const fileTransfer: FileTransferObject = this.transfer.create();

    //random int
    
    var user= this.user;
    var random = Math.floor(Math.random() * 100);
    var today = new Date().toISOString(); 
    //option transfer
    let options: FileUploadOptions = {
      fileKey: 'photo',
      fileName: "myImage_"+ random + today +".jpg",
      chunkedMode: false,
      httpMethod: 'post',
      mimeType: "image/jpeg",
      headers: {},
      params : {
        "user": user,
        
        // the rest of your form fields go here, except photo
    }
      
    }

    //file transfer action
    fileTransfer.upload(this.myphoto,'http://54.169.75.217:8080/uploadFoto.php', options)
      .then((data) => {
        alert("Success");
        loader.dismiss();
      }, (err) => {
        console.log(err);
        alert("Error");
        loader.dismiss();
      });
  }
}
