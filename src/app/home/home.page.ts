import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OverlayService } from '../core/overlay.service';
import { UsuarioService } from '../services/usuario.service';
import { ToastOptions } from '@ionic/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public formLogin = new FormGroup({
    email: new FormControl(null,[Validators.required, Validators.email]),
    senha: new FormControl(null, Validators.required)
  });

  constructor(
    private menuCtrl: MenuController,
    private navCtrl: NavController,
    private overlayService: OverlayService,
    private usuarioService: UsuarioService
  ) {}

  public async entrar(): Promise<void>{
    //email,senha
    const loading = await this.overlayService.loading();
    const user = {email: this.formLogin.controls.email.value , senha: this.formLogin.controls.senha.value};
    if(!this.formLogin.invalid){
      this.usuarioService.login(user).subscribe(
        (res)=>{
          loading.present();
          if(res.usuario[0].tipo_user_id === 2){
            this.navCtrl.navigateForward('/inicio');
            this.menuCtrl.enable(true,'menu-principal');
            let token = res.token + '..' + res.usuario[0].id;
            localStorage.setItem("token",token);
            loading.dismiss();
            this.formLogin.reset();
          }       
          else {
            loading.dismiss();
            let toastOptions: ToastOptions;
            toastOptions = {message: 'Usuario não Habilitado neste modulo', duration: 3000}
            this.overlayService.toastSimple(toastOptions);
          }
        },
        (err)=>{
          let toastOptions: ToastOptions;
          toastOptions = {message: 'Erro ao Logar', duration: 3000}
          this.overlayService.toastSimple(toastOptions);
        }
      )  
     }

    
   
    
  }

}
