import { Injectable } from '@angular/core';

import { AppSettings } from './../../app.settings';
import { CadastroService } from './cadastro.service';


@Injectable()
export class UsuariosService extends CadastroService {

    urlDefault = AppSettings.URL_API_CLIENTES;

    getRegistroPorNome(nome) {
        return this.getJson(this.urlDefault + '/nome/' + nome);
    }

}
