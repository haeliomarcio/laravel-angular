import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Evento } from './evento';
import { EventoService } from './evento.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {

  evento: Evento;
  listEventos = [];
  eventoForm: FormGroup;
  title = 'Cadastrar Novo Evento';

  constructor(
    private eventoService: EventoService, 
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
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

    if(this.eventoForm.get('id').value != null){
      this.atualizarEvento(evento);
    } else {
      this.eventoService.criarEvento(evento)
      .subscribe(data => {
        Swal.fire({
          title: 'Sucesso!',
          text: 'Evento Registrado com Sucesso!',
          type: 'success',
          confirmButtonText: 'OK'
        });
        this.limpaForm();
        this.listarEventos();
      });
    }
  }


  editarEvento(evento: Evento){
    this.title = 'Editar Evento';
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
      Swal.fire(
        'Sucesso!',
        'Evento Atualizado com Sucesso!',
        'success'
      )
      this.listarEventos();
    });
  }

  deletarEvento(evento: Evento){

    Swal.fire({
      title: 'Deletar',
      text: "Tem certeza de que deseja deletar?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim'
    }).then((result) => {
      if (result.value) {
        this.eventoService.deletarEvento(evento)
        .subscribe();
        Swal.fire(
          'Deletado!',
          'Evento Deletado com Sucesso!',
          'success'
        )
      }
    })
  }

  limpaForm(){
    this.title = 'Cadastrar Novo Evento';
    this.eventoForm.reset();
  }
  
}
