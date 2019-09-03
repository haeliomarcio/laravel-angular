import { Component, OnInit } from '@angular/core';
import { EventoService } from '../evento/evento.service';


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  eventos = [];

  constructor(private eventoService: EventoService) {
    this.eventoService.listarEventos()
    .subscribe(data =>  this.eventos = data); 
    
   }

  ngOnInit() {
  }

}
