import { Component, OnInit } from '@angular/core';
import { ProdutosService } from 'src/app/services/produtos.service';
import { OverlayService } from 'src/app/core/overlay.service';
import { ModalInfoComponent } from 'src/app/components/modal-info/modal-info.component';
import { ModalOptions, ToastOptions } from '@ionic/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  public produtos: [{id: null,plano: null,fab: null,descricao: null,produto: null,qtd: null,val: null,valor:null,img:null}];
  public produtosListar: [{id: null,plano: null,fab: null,descricao: null,produto: null,qtd: null,val: null,valor:null,img:null}];
  public produtosPesquisa: any;
  public caixaPesquisa: boolean;

  constructor(
    private produtoService: ProdutosService,
    private overlayService: OverlayService
  ) { }

  ngOnInit() {
    this.produtoService.getProdutosParaVenda().subscribe(
      (res)=>{
        this.overlayService.loading({message: 'Carregando'})
        .then((data)=>{
          data.present();
          this.produtos = res.produtos;
          this.produtosListar = res.produtos;
          this.caixaPesquisa = true;
          data.dismiss();     
        });
              
      }
    )
  }

  public adicionarProduto(p,qtd){
    let quantidade = parseInt(qtd);
    if(qtd === ""){
      let toastOptions: ToastOptions;
      toastOptions = {message: "A quantidade deve ser maior que 0", duration: 3000}
      this.overlayService.toastSimple(toastOptions);
      return;
    }
    if(quantidade > p.qtd){
      let toastOptions: ToastOptions;
      toastOptions = {message: "Quantidade em estoque é de " + p.qtd, duration: 3000}
      this.overlayService.toastSimple(toastOptions);
      return;
    }


      let token = localStorage.getItem("token").split('..');
      let id = parseInt(token[1]);
      const venda = {organicos_id: p.id , quantidade:quantidade ,produtor_id: p.produtor_id,usuario_id:id};
    
    this.produtoService.adicionarProdutoCarrinho(venda).subscribe(
      (res)=>{
        this.overlayService.loading({message:'Carregando'}).then(
          (data)=>{
            data.present();
            data.dismiss();
          }
        );
        if(res.cod === 61){
          this.overlayService.toastSimple({message: 'Carrinho Atualizado', duration:3000});
        }else this.overlayService.toastSimple({message: 'Nova Venda Iniciada', duration:3000});

      },
      (err)=>{
        console.log(err)
      }
    )
  }

  public pesquisar(v){
    if(v !== ""){
      let valoPesquisa: string = v;
      valoPesquisa = valoPesquisa.toUpperCase();
      this.produtosPesquisa = this.produtosListar.filter((value)=>{
        let valorVetor: string = value.produto;
        valorVetor = valorVetor.toUpperCase();
        return valoPesquisa === valorVetor
      });
  
      this.produtos = this.produtosPesquisa;
    }
    
  }

  public mostrarTodos(){
    this.produtos = this.produtosListar;
  }

  public info(p){
    
    this.overlayService.modal({component: ModalInfoComponent, componentProps: {
      'id': p.id
    }})
    .then((modal)=>{
      modal.present();
    })
  }


}
