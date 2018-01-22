import { Component, AfterViewChecked, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LoginService } from './../shared/services/login.service';
import { Usuario } from './../model/usuario';

declare var Materialize: any;
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  usuario: Usuario = new Usuario;
  formulario: FormGroup;

  imgLogo = '/assets/images/logo.png';

  constructor(
    private servico: LoginService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.criaFormulario();
  }

  criaFormulario() {
    this.formulario = this.formBuilder.group({
      usuario: [
        null, [
          Validators.required,
          Validators.maxLength(50)
        ],
      ],
      senha: [
        null, [
          Validators.required,
          Validators.maxLength(50)
        ],
      ],
    });
  }

  onSubmit(form) {
    this.usuario.nome = form.get('usuario').value;
    this.usuario.senha = form.get('senha').value;

    this.servico.login(this.usuario).subscribe(
      acesso => {
      },
      error => {
        this.mensagemDeErro('Login invalido');
      }
    );
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

  onCancelar() {

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
