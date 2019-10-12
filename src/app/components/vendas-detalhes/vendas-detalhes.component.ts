import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ProdutosService } from 'src/app/services/produtos.service';
import { OverlayService } from 'src/app/core/overlay.service';

@Component({
  selector: 'app-vendas-detalhes',
  templateUrl: './vendas-detalhes.component.html',
  styleUrls: ['./vendas-detalhes.component.scss'],
})
export class VendasDetalhesComponent implements OnInit {

  public venda: {id:null, valor_total_produtos:null,desconto:null,frete: null, valor_final:null};
  public produtos = [{id:null, nome_produto:null, valor_unitario:null,quantidade_venda:null,quantidade_estoque: null, valor_final:null}];

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private produtosService: ProdutosService,
    private overlayService: OverlayService
  ) { }

  ngOnInit() {
   this.venda = this.navParams.get('produto');
   this.produtosService.getProdutosCarrinho(this.venda.id).subscribe(
     (res)=>{
       this.produtos = res;
     }
   )

  }

  public add(p){
    if(this.produtos[this.produtos.indexOf(p)].quantidade_venda + 1 > this.produtos[this.produtos.indexOf(p)].quantidade_estoque)
      this.overlayService.toastSimple({message: "Quantidade Indisponivel", duration:2000}).then(
        (data)=>{
          data.present();
        }
      )
    else {
      const dados = {produtos_venda_id: p.id}
      this.produtosService.adicionarUmProduto(dados).subscribe(
        (res)=>{
          this.produtos[this.produtos.indexOf(p)].quantidade_venda += 1;
          this.overlayService.toastSimple({message: "Quantidade Adicionada", duration:2000}).then(
            (data)=>{
              data.present();
            },
            (err)=>{
              this.overlayService.toastSimple({message: "Quantidade Indisponivel", duration:2000}).then(
                (data)=>{
                  data.present();
                }
              )
            }
          )
        }
      )
      
    }
  }

  public remove(p){
    if(this.produtos[this.produtos.indexOf(p)].quantidade_venda - 1 < 0)
      this.overlayService.toastSimple({message: "Valor minimo é de 0", duration:2000}).then(
        (data)=>{
          data.present();
        }
      )
    else {
      const dados = {produtos_venda_id: p.id}
      this.produtosService.removerUmProduto(dados).subscribe(
        (res)=>{
          this.produtos[this.produtos.indexOf(p)].quantidade_venda -= 1;
          this.overlayService.toastSimple({message: "Quantidade removida", duration:2000}).then(
            (data)=>{
              data.present();
            },
            (err)=>{
              this.overlayService.toastSimple({message: "Quantidade Indisponivel", duration:2000}).then(
                (data)=>{
                  data.present();
                }
              )
            }
          )
        }
      )
      
    }
  }

  public dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
