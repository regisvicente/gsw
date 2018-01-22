import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CaixaComponent } from './caixa/caixa.component';

const routes: Routes = [
  {
      path: '', component: CaixaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BancoRoutingModule { }
