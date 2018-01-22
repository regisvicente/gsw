import { Component, AfterViewChecked, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BancoService } from '../../shared/services/banco.service';
import { Usuario } from '../../model/usuario';
import { LoginService } from '../../shared/services/login.service';
import { UsuariosService } from '../../shared/services/usuarios.service';


declare var Materialize: any;
declare var $: any;

@Component({
  selector: 'app-caixa',
  templateUrl: './caixa.component.html',
  styleUrls: ['./caixa.component.css'],
})
export class CaixaComponent implements OnInit {

  cedulas: string[];

  formulario: FormGroup;
  usuario: Usuario = new Usuario;

  imgLogo = '/assets/images/logo.png';

  constructor(
    private servicoBanco: BancoService,
    private servicoUsuario: UsuariosService,
    private login: LoginService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.criaFormulario();

    this.usuario.nome = JSON.parse(localStorage.getItem('currentUser')).nome;

    this.carregaCliente();

  }

  carregaCliente(){

    this.servicoUsuario.getRegistroPorNome(this.usuario.nome).subscribe(
      registro => {
        console.log(registro);
        this.usuario.id = registro.id;
        this.usuario.saldo = registro.saldo;
        this.formulario.get("cliente").setValue(registro.id);
      },
      error => {
        this.mensagemDeErro("Cliente Inválido!");
      }
    )
        
  }

  criaFormulario() {
    this.formulario = this.formBuilder.group({
      cliente: [0],
      valor: [0],
    });
  }

  onSubmit(form) {

    if (form.valid) {
      this.servicoBanco.sacar(form.value).subscribe(
        registro => {
          this.cedulas = registro;
          this.carregaCliente();
        },
        error => {
          this.mensagemDeErro(JSON.parse(error._body).message);
          this.carregaCliente();
        }
      );
    } else {
      this.validaFormulario(form);
    }

  }

  validaFormulario(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      const controle = formGroup.get(campo);
      controle.markAsTouched();
      if (controle instanceof FormGroup) {
        this.validaFormulario(controle);
      }
    });
  }

  onLogout() {
    this.login.logout();
  }

  aplicaCSSErro(campo) {
    campo = this.formulario.get(campo);
    if (campo.touched) {
      if (campo.valid) {
        return 'valid';
      } else {
        return 'invalid';
      }
    }
  }

  mensagemDeErro(erro) {
    const $toastContent = $('<span>' + erro + '</span><span class="left toast-action">Erro</span>');
    Materialize.toast($toastContent, 3000);
  }

}
