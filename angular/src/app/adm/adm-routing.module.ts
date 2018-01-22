import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrincipalComponent } from './principal/principal.component';
import { DashBoardComponent } from './dash-board/dash-board.component';

const routes: Routes = [
  {
    path: '', component: PrincipalComponent, children: [
      { path: '', component: DashBoardComponent },
      { path: 'clientes', loadChildren: 'app/adm/usuario/usuario.module#UsuarioModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmRoutingModule { }
