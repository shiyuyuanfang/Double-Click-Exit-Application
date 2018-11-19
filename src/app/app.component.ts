//根组件

import { Component,ViewChild } from '@angular/core';
import { Nav, Platform, ToastController,App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  public backButtonPressed: boolean = false;
  @ViewChild("myNav") nav: Nav;
  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public toastCtrl: ToastController,
              public appCtrl:App) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault();
      // splashScreen.hide();
      this.exitApp();
    });
  }

  exitApp(){
    //按下物理返回键时，将触发后退按钮事件。此事件仅在Android和Windows平台中使用，不会在iOS上触发，因为iOS没有物理返回键
    this.platform.registerBackButtonAction(() => {
      //控制modal，系统自带提示框
      let overlay = this.appCtrl._appRoot._overlayPortal.getActive() ||    this.appCtrl._appRoot._modalPortal.getActive();
      if (overlay) {
        overlay.dismiss();
        return;
      }

      let activeVC = this.nav.getActive();
      let page = activeVC.instance;

      if (page.tabs) {
        let activeNav = page.tabs.getSelected();
        if (activeNav.canGoBack()) {
          return activeNav.pop();
        } else {
          return this.showExit();
        }
      }
      this.appCtrl.getRootNav().pop();//剩余的情况返回操作
    })
  }

  //双击退出函数
  showExit() {
    if (this.backButtonPressed) {
      this.platform.exitApp();
    } else {
      this.presentToast();//再按一次退出
      this.backButtonPressed = true;
      setTimeout(() => {
        this.backButtonPressed = false;
      }, 3000)
    }
  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: '再按一次退出应用',
      duration: 3000,
      position: 'middle',
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }
}
