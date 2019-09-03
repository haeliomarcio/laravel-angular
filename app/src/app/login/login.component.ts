import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  urlApi = 'http://localhost:8000/api/login';
  loginForm: FormGroup;
  token = '';
  usuario = '';

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    ) { 
    }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [''],
      senha: ['']
    });
  }

  login(){
    const credenciais = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('senha').value,
    };
    this.http.post<Object>(this.urlApi, credenciais)
    .subscribe(data => {
      if(data){
          this.token = data['token'];
          this.usuario = data['usuario'];
          localStorage.setItem('currentUser', this.token);
          localStorage.setItem('usuario', this.usuario);
          Swal.fire({
            title: 'Sucesso!',
            text: 'Usuário logado com Sucesso!',
            type: 'success',
          });
          setTimeout(() => {
            location.href = '/calendario';
          }, 2000);
      }
    });
  }
}
