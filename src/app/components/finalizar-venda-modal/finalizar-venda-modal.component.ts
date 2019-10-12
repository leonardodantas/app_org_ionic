import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, NavController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProdutosService } from 'src/app/services/produtos.service';
import { OverlayService } from 'src/app/core/overlay.service';

@Component({
  selector: 'app-finalizar-venda-modal',
  templateUrl: './finalizar-venda-modal.component.html',
  styleUrls: ['./finalizar-venda-modal.component.scss'],
})
export class FinalizarVendaModalComponent implements OnInit {

  public venda = {id:null, frete:null, desconto:null,valor_final:null,valor_total_produtos:null, vendedor_id:null};

  public formPagamento = new FormGroup({
    pagamento: new FormControl(null, Validators.required)
  });

  public finalizarVenda: boolean
  
  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private produtosService: ProdutosService,
    private overlayService: OverlayService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.venda = this.navParams.get('p');
  }

  public finalizarCompra(): void{
    if(!this.formPagamento.invalid){
      const dados = {venda_id: this.venda.id,vendedor_id:this.venda.vendedor_id,tipo_pagamento: this.formPagamento.controls.pagamento.value};
      this.produtosService.finalizarVenda(dados).subscribe(
        (res)=>{
          this.overlayService.loading({message:'Finalizando Compra'})
            .then((data)=>{
              data.present();
              data.dismiss();
            });
            this.finalizarVenda = true;
        }
      )
    }
  }

  dismiss() {
    if(this.finalizarVenda === true){
      this.modalCtrl.dismiss({
        'dismissed': true
      }).then(()=>{
        this.navCtrl.navigateBack('/inicio');
        return 0;
      })
     
    }
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
