import { Component, OnInit } from '@angular/core';
import { ProdutosService } from 'src/app/services/produtos.service';
import { OverlayService } from 'src/app/core/overlay.service';

@Component({
  selector: 'app-avaliar',
  templateUrl: './avaliar.page.html',
  styleUrls: ['./avaliar.page.scss'],
})
export class AvaliarPage implements OnInit {

  public avaliar = [{produtor: null, valor_total_produtos: null,valor_frete: null, valor_desconto:null, valor_final: null}];

  constructor(
    private produtosService: ProdutosService,
    private overlayService: OverlayService
  ) { }

  ngOnInit() {
    this.produtosService.getVendasAvaliar().subscribe(
      (res)=>{
        this.avaliar = res.vendasParaAvaliar;
      }
    )
  }

  public info(val,a): void{
    if(val !== undefined){
      const dados = {venda_id: a.id , avaliacao: val, vendedor_id: a.produtor_id};
      this.produtosService.avaliarVenda(dados).subscribe(
        (res)=>{
          this.avaliar.splice(this.avaliar.indexOf(a),1);
          this.overlayService.toastSimple({message:'Venda Avaliada com Sucesso', duration: 2000})
            .then((data)=>{
              data.present();
            });
        },
        (err)=>{
          this.overlayService.toastSimple({message:'Erro ao Avaliar Venda', duration: 2000})
          .then((data)=>{
            data.present();
          });
        }
      )
      console.log(dados)
    }else {
      this.overlayService.toastSimple({message:'Avalie de 0 a 10', duration:2000})
        .then((data)=>{
          data.present();
        })
    }
  }

}
