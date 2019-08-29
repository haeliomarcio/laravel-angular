import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Evento } from './evento';
import { EventoService } from './evento.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {

  eventoForm: FormGroup;
  evento: Evento;
  listEventos = [];
  pesquisa = 'Teste';

  constructor(
    private eventoService: EventoService, 
    private formBuilder: FormBuilder,
    private toast: ToastrService) {
    this.eventoService.listarEventos()
    .subscribe(data =>  this.listEventos = data); 
  }

  ngOnInit(): void{
    this.eventoForm = this.formBuilder.group({
      title: [''],
      description: [''],
      start: [''],
      end: ['']
    });
  }

  criarEvento(){
    console.log("teste");
  }

  consultaEvento(evento: Evento){

  }
  
}
