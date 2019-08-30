import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  urlApi = 'http://localhost:8000/api/login';
  loginForm: FormGroup;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder
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
    this.http.post(this.urlApi, credenciais)
    .subscribe(data => {
      console.log(data);
    });
  }

}
