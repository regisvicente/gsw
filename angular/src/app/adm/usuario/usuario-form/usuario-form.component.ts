import { Component, AfterViewChecked, OnInit, OnDestroy} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { Subscription} from 'rxjs/RX';
import { Title } from '@angular/platform-browser'

import { UsuariosService } from '../../../shared/services/usuarios.service';

declare var Materialize: any;
declare var $: any;

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit, OnDestroy, AfterViewChecked {

  formulario: FormGroup;
  tipoAcesso = [];

  private inscricao: Subscription;

  constructor(
    private servico: UsuariosService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private titleService: Title
  ) {

    this.mudaTitulo('Clientes');

  }

  ngOnInit() {

    this.criaFormulario();

    this.verificaSeAlteracao();
  }

  mudaTitulo(titulo) {
    this.titleService.setTitle(titulo);
  }

  ngAfterViewChecked() {
    Materialize.updateTextFields();
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

  criaFormulario() {
    this.formulario = this.formBuilder.group({
      id: [null],
      nome: [
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
      acesso: ['CLIENTE'],
      saldo: [0]
    });

    this.formulario.get('id').disable();
  }

  verificaSeAlteracao() {
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        const id: number = params['id'];
        if (id > 0) {
          this.inscricao = this.servico.getRegistro(id).subscribe(
            registro => {
              this.populaDadosForm(registro);
            },
            error => {
              this.mensagemDeErro('Não foi possivel carregar o registro');
            }
          );
        }
      }
    );
  }

  onSubmit(form) {
    if (form.valid) {
      this.formulario.get('id').enable();
      this.servico.salvar(form.value).subscribe(
        registro => {
          this.irParaLista();
        },
        error => {
          this.mensagemDeErro('Não foi possivel gravar');
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

  irParaLista() {
    this.router.navigate(['adm', 'clientes']);
  }

  onCancelar() {
    this.irParaLista();
  }

  populaDadosForm(registro) {
    this.formulario.setValue({
      id: registro.id,
      nome: registro.nome,
      senha: null,
      acesso: 'CLIENTE',
      saldo: registro.saldo
    });
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
