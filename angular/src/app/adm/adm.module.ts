import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterializeModule } from 'angular2-materialize';

import { AdmRoutingModule } from './adm-routing.module';

import { DashBoardComponent } from './dash-board/dash-board.component';
import { SidebarComponent } from './principal/sidebar/sidebar.component';
import { NavbarComponent } from './principal/navbar/navbar.component';
import { PrincipalComponent } from './principal/principal.component';

@NgModule({
  imports: [
    CommonModule,
    AdmRoutingModule,
    MaterializeModule
  ],
  declarations: [
    DashBoardComponent,
    SidebarComponent,
    NavbarComponent,
    PrincipalComponent
  ],
  providers:[
    
  ]
})
export class AdmModule { }
