import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificatePage } from './notificate';

@NgModule({
  declarations: [
    NotificatePage,
  ],
  imports: [
    IonicPageModule.forChild(NotificatePage),
  ],
})
export class NotificatePageModule {}
