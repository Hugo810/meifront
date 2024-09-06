import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../modelo/Cliente';
import { ClienteComponent } from '../cliente/cliente.component';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  //url da api
  private url:string ='http://localhost:8080/clientes';
  constructor(private http:HttpClient) { }

  //Metodo para selecionar os clientes
  selecionar():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.url);
  }

  //Metodo para cadastrar clientes
  cadastrar(obj:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.url,obj)
  }


   //Metodo para editar clientes
    editar(id: number, obj: Cliente): Observable<Cliente> {
      return this.http.put<Cliente>(`${this.url}/${id}`, obj);
    }
    remover(id:number):Observable<void>{
      return this.http.delete<void>(this.url + '/'+id);

    }
}
