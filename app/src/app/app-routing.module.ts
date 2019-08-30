import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventoComponent } from './evento/evento.component';
import { UsuarioComponent } from './usuario/usuario.component';

const routes: Routes = [
  {component: EventoComponent, path: 'eventos'},
  {component: UsuarioComponent, path: 'usuarios'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
