import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from './usuario';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  urlApi = 'http://localhost:8000/api/usuarios';
  listUsuarios = [];
  constructor(private _http: HttpClient) { 
    this._http.get<Object[]>('urlApi')
    .subscribe(data => {
      this.listUsuarios = data;
    });
  }

  ngOnInit() {
  }

}
