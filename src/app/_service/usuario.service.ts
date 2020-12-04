import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../_model/usuario';
 
@Injectable({
 providedIn: 'root'
})
export class UsuarioService {
 
 usuarioCambio = new Subject<Usuario[]>();
 mensajeCambio = new Subject<string>();
  url: string = `${environment.HOST}/usuarios`;
 
 constructor(private http: HttpClient) { }
 
 listar(){
   return this.http.get<Usuario[]>(this.url);
 }
 
 listarPorId(idUsuario: number) {
   return this.http.get<Usuario>(`${this.url}/${idUsuario}`);
 }
 
 registrar(usuario: Usuario) {
   return this.http.post(this.url, usuario);
 }
 
 modificar(usuario: Usuario) {
   return this.http.put(this.url, usuario);
 }
 
 eliminar(idUsuario: number) {
   return this.http.delete(`${this.url}/${idUsuario}`);
 }
}
