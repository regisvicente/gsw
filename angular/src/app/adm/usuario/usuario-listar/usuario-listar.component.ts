import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { UsuariosService } from '../../../shared/services/usuarios.service';

declare var Materialize: any;
declare var $: any;

@Component({
  selector: 'app-usuario-istar',
  templateUrl: './usuario-listar.component.html',
  styleUrls: ['./usuario-listar.component.css']
})
export class UsuarioListarComponent implements OnInit {

  registros = [];

  idRegistro: number;

  constructor(
    private servico: UsuariosService,
    private route: Router,
    private titleService: Title) {

      this.mudaTitulo('Clientes');

    }

  ngOnInit() {

    this.inicializaJQuery();

    this.carregaListaRegistro();

  }

  mudaTitulo(titulo) {
    this.titleService.setTitle(titulo);
  }

  carregaListaRegistro() {
    this.registros = [];
    this.servico.getLista(null).subscribe(
      registros => {
        this.registros = registros;
      },
      erro => {
        this.mensagemDeErro('Não foi possivel carregar os registros');
      }
    );
  }

  inicializaJQuery() {
    $('.modal').modal();
  }

  desejaExcluir(id) {
    this.idRegistro = id;
  }

  excluir(id) {
    if (id > 0) {
      this.servico.excluir(id).subscribe(
        registro => {
          this.carregaListaRegistro();
        },
        erro => {
          this.mensagemDeErro('Não foi possivel excluir');
        }
      );
    }
  }

  mensagemDeErro(erro) {
    const $toastContent = $('<span>' + erro + '</span><span class="btn-flat toast-action">Erro</span>');
    Materialize.toast($toastContent, 3000);
  }
}
