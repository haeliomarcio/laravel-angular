import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";

import { Evento } from './evento';

@Injectable({providedIn: 'root'})
export class EventoService{
    
    urlApi = 'http://localhost:8000/api/eventos';

    constructor(private http: HttpClient){
    }

    listarEventos(): Observable<Object[]>{
        return this.http.get<Object[]>(this.urlApi);
    }

    consultarEvento(evento: Evento): Observable<Evento>{
        return this.http.get<Evento>(this.urlApi+'/'+evento.id);
    }
    
    criarEvento(evento: Evento): Observable<Evento>{
        return this.http.post<Evento>(this.urlApi, evento);
    }

    atualizarEvento(evento: Evento): Observable<Evento>{
        return this.http.put<Evento>(this.urlApi+'/'+evento.id, evento);
    }

    deletarEvento(evento: Evento): Observable<{}>{
        return this.http.delete(this.urlApi+'/'+evento.id);
    }
}