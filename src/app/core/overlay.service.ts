import { Injectable } from '@angular/core';
import { LoadingController, ToastController, ModalController } from '@ionic/angular';
import { LoadingOptions, ToastOptions, ModalOptions } from '@ionic/core';
import { ModalInfoComponent } from '../components/modal-info/modal-info.component';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
    private modalController: ModalController
  ) { }

  async loading(options?: LoadingOptions): Promise<HTMLIonLoadingElement>{
    const loading = await this.loadingController.create({
      message: 'Carregando',
      ...options
    });
    return loading;
  }

  async toastSimple(options?: ToastOptions): Promise<HTMLIonToastElement>{
    const toast = await this.toastController.create({
      duration: 2000,
      ...options
    })
    toast.present();
    return toast;
  }

  async modal(options?: ModalOptions): Promise<HTMLIonModalElement>{
    const modal = await this.modalController.create({
      ...options
    })
    return modal;
  }
}
