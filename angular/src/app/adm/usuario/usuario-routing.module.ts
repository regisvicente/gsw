import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioListarComponent } from './usuario-listar/usuario-listar.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: '', component: UsuarioListarComponent },
      { path: 'novo', component: UsuarioFormComponent },
      { path: 'editar/:id', component: UsuarioFormComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
