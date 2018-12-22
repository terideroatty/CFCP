import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController} from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LoadingController } from 'ionic-angular';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import {HomePage} from '../home/home';
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
  username : any;
  public photos: any;
  public base64Image: string;
  public fileImage: string;
  public total;
  totalsec : any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private transfer: FileTransfer, private file: File,private camera: Camera,
    private loadingCtrl:LoadingController,public authService:AuthServiceProvider,public toastCtrl  :ToastController) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userid = this.userDetails.user_id;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;
    this.total = navParams.get("totalPrice");
    this.totalsec = this.total;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
    this.photos = [];
    console.log(this.total);
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
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.myphoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
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
  /*let loader = this.loadingCtrl.create({
    content: "กำลังอัพโหลด..."
  });
  loader.present();*/

  //create file transfer object
  const fileTransfer: FileTransferObject = this.transfer.create();

  //random int
  var random = Math.floor(Math.random() * 100);
  var userid = this.userid;
  //option transfer
  let options: FileUploadOptions = {
    fileKey: 'photo',
    fileName: "myImage_" + random + ".jpg",
    chunkedMode: false,
    httpMethod: 'post',
    mimeType: "image/jpeg",
    headers: {},
    params: {"userid":userid}
  }
  //file transfer action
  fileTransfer.upload(this.myphoto, 'http://54.169.75.217:8080/uploadFoto.php', options);
  const toast = this.toastCtrl.create({
    message: 'อัพโหลดเสร็จแล้ว',
    showCloseButton: true,
    closeButtonText: 'ตกลง'
  });
  toast.present();
  this.navCtrl.setRoot(HomePage);
    /*.then((data) => {
      alert("Success");
      loader.dismiss();
    }, (err) => {
      console.log(err);
      alert("Error");
      loader.dismiss();
    });*/
}
}

