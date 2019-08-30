import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";

import { Usuario } from './usuario';

@Injectable({providedIn: 'root'})
export class  UsuarioService{
    
    urlApi = 'http://localhost:8000/api/usuarios';

    constructor(private http: HttpClient){
    }

    listarUsuarios(): Observable<Object[]>{
        return this.http.get<Object[]>(this.urlApi);
    }

    consultarUsuario(usuario: Usuario): Observable<Usuario>{
        return this.http.get<Usuario>(this.urlApi+'/'+usuario.id);
    }
    
    criarUsuario(usuario: Usuario): Observable<Usuario>{
        //return this.http.post<Usuario>(this.urlApi, usuario);
        return this.http.post<Usuario>('http://localhost:8000/api/registrar', usuario);
    }

    atualizarUsuario(usuario: Usuario): Observable<Usuario>{
        return this.http.put<Usuario>(this.urlApi+'/'+usuario.id, usuario);
    }

    deletarUsuario(usuario: Usuario): Observable<{}>{
        return this.http.delete(this.urlApi+'/'+usuario.id);
    }
}