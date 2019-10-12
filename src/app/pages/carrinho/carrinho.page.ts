import { Component, OnInit } from '@angular/core';
import { ProdutosService } from 'src/app/services/produtos.service';
import { OverlayService } from 'src/app/core/overlay.service';
import { VendasDetalhesComponent } from 'src/app/components/vendas-detalhes/vendas-detalhes.component';
import { FinalizarVendaModalComponent } from 'src/app/components/finalizar-venda-modal/finalizar-venda-modal.component';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {

  public carrinho = [{}];

  constructor(
    private produtoService: ProdutosService,
    private overlayService: OverlayService
  ) { }

  ngOnInit() {
    let token = localStorage.getItem("token").split('..');
    let id = parseInt(token[1]);
    this.produtoService.getCarrinho(id).subscribe(
      (res)=>{
        this.carrinho = res.vendasAbertasUsuario;
      },
      (err)=>{
        this.carrinho.length = 0;
      }
    )
  }

  public detalhesCarrinho(p): void{
    this.overlayService.modal({component: VendasDetalhesComponent, componentProps: {'produto': p}})
      .then((data)=>{
        data.present();
      });
  }

  public finalizar(p): void{
    this.overlayService.modal({component: FinalizarVendaModalComponent, componentProps:{'p':p}})
      .then((data)=>{
        data.present();
      });
  }

}
