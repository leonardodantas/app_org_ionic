import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private URL = "http://localhost:3000/usuario";

  constructor(
    private http: HttpClient
  ) { }

  public login(user = {}): Observable<any>{
    return this.http.post(this.URL + "/login", user)
      .pipe(map((res:any)=>{
        return res;
      },catchError((err)=>{
        return err;
      })))
  }
  
}
