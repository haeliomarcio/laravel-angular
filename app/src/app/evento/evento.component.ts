import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Evento } from './evento';
import { EventoService } from './evento.service';


@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {

  evento: Evento;
  listEventos = [];
  eventoForm: FormGroup;

  constructor(
    private eventoService: EventoService, 
    private formBuilder: FormBuilder,
    private toastr: ToastrService
   ) {
    this.listarEventos();
  }

  listarEventos(){
    this.eventoService.listarEventos()
    .subscribe(data =>  this.listEventos = data); 
  }

  ngOnInit(): void{
    this.eventoForm = this.formBuilder.group({
      id: [''],
      title: [''],
      description: [''],
      start: [''],
      end: [''],
      responsible: [''],
    });
  }

  criarEvento(){

    const evento: Evento = {
      id: this.eventoForm.get('id').value,
      title: this.eventoForm.get('title').value,
      description: this.eventoForm.get('description').value,
      start: this.eventoForm.get('start').value,
      end: this.eventoForm.get('end').value,
      responsible: 1,
    };

    if(this.eventoForm.get('id').value != ''){
      this.atualizarEvento(evento);
    } else {
      this.eventoService.criarEvento(evento)
      .subscribe(data => {
        this.toastr.success('Evento Registrado com Sucesso!', 'Sucesso');
        this.limpaForm();
        this.listarEventos();
      });
    }
  }


  editarEvento(evento: Evento){
    this.eventoService.consultarEvento(evento)
    .subscribe(data => {
      this.eventoForm.setValue({
        id: data.id,
        title: data.title,
        description: data.description,
        start:  data.start,
        end: data.end,
        responsible: data.responsible
      });
    });
  }

  atualizarEvento(evento){
    this.eventoService.atualizarEvento(evento)
    .subscribe(data => {
      this.toastr.info('Evento Atualizado com Sucesso!', 'Informação');
      this.listarEventos();
    });
  }

  deletarEvento(evento: Evento){
    this.eventoService.deletarEvento(evento)
    .subscribe(data => {
      this.toastr.warning('Evento Deletado com Sucesso!', 'Aviso');
    });
  }

  limpaForm(){
    this.eventoForm.reset();
  }
  
}
