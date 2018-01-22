import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterializeModule } from 'angular2-materialize';

import { UsuarioRoutingModule } from './usuario-routing.module';

import { UsuariosService } from './../../shared/services/usuarios.service';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { UsuarioListarComponent } from './usuario-listar/usuario-listar.component';

@NgModule({
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
  ],
  declarations: [
    UsuarioFormComponent,
    UsuarioListarComponent
  ],
  providers:[
    UsuariosService
  ]
})
export class UsuarioModule { }
