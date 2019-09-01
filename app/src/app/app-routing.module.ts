import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { EventoComponent } from './evento/evento.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { AuthGuard } from './core/auth/auth.guard';

const routes: Routes = [
  {component: HomeComponent, path: ''},
  {component: LoginComponent, path: 'login'},
  {component: CalendarioComponent, path: 'calendario', canActivate: [AuthGuard]},
  {component: EventoComponent, path: 'eventos', canActivate: [AuthGuard]},
  {component: UsuarioComponent, path: 'usuarios', canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
