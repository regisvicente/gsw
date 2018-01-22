import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BancoRoutingModule } from './banco-routing.module';
import { CaixaComponent } from './caixa/caixa.component';
import { BancoService } from '../shared/services/banco.service';
import { LoginService } from '../shared/services/login.service';
import { UsuariosService } from '../shared/services/usuarios.service';

@NgModule({
  imports: [
    CommonModule,
    BancoRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [CaixaComponent],
  providers: [BancoService, UsuariosService]
})
export class BancoModule { }
