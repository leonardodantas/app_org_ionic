import { Component, OnInit } from '@angular/core';
import { ProdutosService } from 'src/app/services/produtos.service';

@Component({
  selector: 'app-situacao',
  templateUrl: './situacao.page.html',
  styleUrls: ['./situacao.page.scss'],
})
export class SituacaoPage implements OnInit {

  public situacao = [{valor_final:null, data_finalizada: null, icon:null, situacao:null, color: null}];

  constructor(
    private produtosService: ProdutosService
  ) { }

  ngOnInit() {
    this.produtosService.getSituacaoVendas().subscribe(
      (res)=>{
        this.situacao = res;
        
        this.situacao.map((sit)=>{
          if(sit.situacao === false){
            sit.icon = "close-circle";
            sit.color = "danger";
          }
          else {
            sit.color = "success"
            sit.icon = "checkmark-circle";
          }
        });        
      }
    )
  }

}
