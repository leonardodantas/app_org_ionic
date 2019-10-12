import { Component } from '@angular/core';

import { Platform, NavController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Inicio',
      url: '/inicio',
      icon: 'home'
    },
    {
      title: 'Carrinho',
      url: '/carrinho',
      icon: 'cart'
    },
    {
      title: 'Situacao',
      url: '/situacao',
      icon: 'navigate'
    },
    {
      title: 'Avaliar Compras',
      url: '/avaliar',
      icon: 'alert'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl: NavController,
    private menuCtrl: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  public sair(){
    localStorage.removeItem("token");
    localStorage.clear();
    this.menuCtrl.enable(false,'menu-principal');
    this.menuCtrl.close('menu-principal');
    this.navCtrl.navigateBack('/');
  }
}
