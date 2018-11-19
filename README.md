This is a starter template for [Ionic](http://ionicframework.com/docs/) projects.

## How to use this template
```bash
一、在tab.ts中：
    1、引入 
      import { ViewChild } from '@angular/core';
      import { Tabs } from 'ionic-angular';
    2、在export class TabsPage{}中写入
      @ViewChild('mainTabs') tabs:Tabs;
二、在tab.html中：
    <ion-nav #myNav [root]="rootPage"></ion-nav>
三、在app.component.ts中：
   1、引入
      import { ViewChild } from '@angular/core';
      import { Nav,ToastController,App } from 'ionic-angular';
    2、在export class MyApp{}中声明变量
    public backButtonPressed: boolean = false;
    并且
    @ViewChild("myNav") nav: Nav;
    3、在app.component.ts中的详情请看src/app/app.component.ts
四、在app.component.html中
<ion-nav #myNav [root]="rootPage"></ion-nav>
```
