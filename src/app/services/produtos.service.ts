import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  private URL = "http://localhost:3000/venda";

  constructor(
    private http: HttpClient
  ) { }

  public getProdutosParaVenda(): Observable<any> {
    let localToken = localStorage.getItem("token").split('..');
    let token = localToken[0];
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    }
    return this.http.get<any>(this.URL + "/produtos_para_venda", httpOptions);
  }

  public getInfoProdutor(id: number): Observable<any> {
    let localToken = localStorage.getItem("token").split('..');
    let token = localToken[0];
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    }
    return this.http.get(this.URL + "/media/" + id, httpOptions);
  }

  public adicionarProdutoCarrinho(venda = {}): Observable<any> {
    let localToken = localStorage.getItem("token").split('..');
    let token = localToken[0];
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    }
    return this.http.post(this.URL + "/nova_venda", venda, httpOptions)
      .pipe(map((res) => {
        return res;
      }, catchError((err) => {
        return err;
      })))
  }

  public getCarrinho(id: number): Observable<any> {
    let localToken = localStorage.getItem("token").split('..');
    let token = localToken[0];
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    }
    return this.http.get(this.URL + "/vendas_abertas_usuario/" + id, httpOptions);
  }

  public getProdutosCarrinho(id: number): Observable<any> {
    let localToken = localStorage.getItem("token").split('..');
    let token = localToken[0];
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    }
    return this.http.get(this.URL + "/produtos_venda_aberta/" + id, httpOptions);
  }

  public adicionarUmProduto(id_produto): Observable<any> {
    let localToken = localStorage.getItem("token").split('..');
    let token = localToken[0];
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    }

    return this.http.post(this.URL + "/adicionar_um_produto", id_produto, httpOptions)
      .pipe(map((res) => {
        return res;
      }, catchError((err) => {
        return err;
      })))
  }

  public removerUmProduto(id_produto): Observable<any> {
    let localToken = localStorage.getItem("token").split('..');
    let token = localToken[0];
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    }

    return this.http.post(this.URL + "/remover_um_produto", id_produto, httpOptions)
      .pipe(map((res) => {
        return res;
      }, catchError((err) => {
        return err;
      })))
  }

  public finalizarVenda(dados): Observable<any> {
    let localToken = localStorage.getItem("token").split('..');
    let token = localToken[0];
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    }

    return this.http.post(this.URL + "/finalizar_venda_usuario", dados,httpOptions)
      .pipe(map((res)=>{
        return res;
      },catchError((err)=>{
        return err;
      })))
  }

  public getSituacaoVendas(): Observable<any>{
    let localToken = localStorage.getItem("token").split('..');
    let token = localToken[0];
    let id = parseInt(localToken[1]);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    }
    return this.http.get(this.URL + "/situacao_compras/" + id,httpOptions);
  }

  public getVendasAvaliar(): Observable<any>{
    let localToken = localStorage.getItem("token").split('..');
    let token = localToken[0];
    let id = parseInt(localToken[1]);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    }

    return this.http.get(this.URL + "/vendas_para_avaliar/" + id,httpOptions);
  }

  public avaliarVenda(dados = {}): Observable<any>{
    let localToken = localStorage.getItem("token").split('..');
    let token = localToken[0];
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    }

    return this.http.post(this.URL + "/avaliar_venda", dados, httpOptions)
      .pipe(map((res)=>{
        return res;
      },catchError((err)=>{
        return err;
      })))
  }
}
