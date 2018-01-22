import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { BancoGuard } from './guards/banco.guard';


const routes: Routes = [
  { path: '', component: LoginComponent  },
  { path: 'login', component: LoginComponent },
  { path: 'adm', loadChildren: 'app/adm/adm.module#AdmModule', canActivate: [AuthGuard], canActivateChild: [AdminGuard]},
  { path: 'banco', loadChildren: 'app/banco/banco.module#BancoModule', canActivate: [AuthGuard], canActivateChild: [BancoGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
