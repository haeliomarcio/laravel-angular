import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Evento } from './evento';

@Injectable({providedIn: 'root'})
export class EventoService{
    
    urlApi = 'http://localhost:8000/api/eventos';
    private evento: Evento;

    headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');
    private httpOptions = {
      headers: this.headers
    };

    constructor(private http: HttpClient){
    }

    listarEventos(){
        return this.http.get<Object[]>(this.urlApi);
    }

    criarEvento(evento: Evento){
        return this.http.post<Evento>(this.urlApi, evento, this.httpOptions);
    }

    deletarEvento(evento: Evento){
        return this.http.delete(this.urlApi+'/'+evento.id, this.httpOptions);
    }

    atualizarEvento(evento: Evento){
        return this.http.put(this.urlApi, evento);
    }
}