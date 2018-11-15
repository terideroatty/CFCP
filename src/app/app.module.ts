import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {Welcome} from '../pages/welcome/welcome';
import {Login} from '../pages/login/login';
import {Signup} from '../pages/signup/signup'
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import {HttpModule} from '@angular/http';
import {CoursePage} from '../pages/course/course';
import {StorePage} from '../pages/store/store';
import { CommonProvider } from '../providers/common/common';
import {ProfilePage} from '../pages/profile/profile';
import { SplitPane } from '../providers/split-pane/split-pane';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Welcome,
    Login,
    Signup,
    TabsPage,
    CoursePage,
    StorePage,
    ProfilePage
  ],
  imports: [
    BrowserModule,HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Welcome,
    Signup,
    Login,
    TabsPage,
    CoursePage,
    StorePage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthServiceProvider ,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CommonProvider,
    SplitPane
  
  ]
})
export class AppModule {}
