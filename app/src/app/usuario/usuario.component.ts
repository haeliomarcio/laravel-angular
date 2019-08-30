import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {


  listUsuarios = [];
  usuario: Usuario;
  usuarioForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private toastr: ToastrService) { 
      this.listarUsuarios();
  }

  listarUsuarios(){
    this.usuarioService.listarUsuarios()
    .subscribe(data =>  this.listUsuarios = data); 
  }

  ngOnInit(): void{
    this.usuarioForm = this.formBuilder.group({
      id: [''],
      name: [''],
      email: [''],
      phone: [''],
      birthday: [''],
      password: ['']
    });
  }

  criarUsuario(){

    const usuario: Usuario = {
      id: this.usuarioForm.get('id').value,
      name: this.usuarioForm.get('name').value,
      email: this.usuarioForm.get('email').value,
      phone: this.usuarioForm.get('phone').value,
      birthday: this.usuarioForm.get('birthday').value,
      password: this.usuarioForm.get('password').value
    };

    if(this.usuarioForm.get('id').value != null){
      this.atualizarUsuario(usuario);
    } else {
      this.usuarioService.criarUsuario(usuario)
      .subscribe(data => {
        this.toastr.success('Usuário Registrado com Sucesso!', 'Sucesso');
        this.limpaForm();
        this.listarUsuarios();
      });
    }
  }


  editarUsuario(usuario: Usuario){
    this.usuarioService.consultarUsuario(usuario)
    .subscribe(data => {
      this.usuarioForm.setValue({
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        birthday:  data.birthday,
        password: ''
      });
    });
  }

  atualizarUsuario(usuario){
    this.usuarioService.atualizarUsuario(usuario)
    .subscribe(data => {
      this.toastr.info('Usuário Atualizado com Sucesso!', 'Informação');
      this.listarUsuarios();
    });
  }

  deletarUsuario(usuario: Usuario){
    this.usuarioService.deletarUsuario(usuario)
    .subscribe(data => {
      this.toastr.warning('Usuário Deletado com Sucesso!', 'Aviso');
    });
  }

  limpaForm(){
    this.usuarioForm.reset();
  }

}
