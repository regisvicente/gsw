import { Injectable } from '@angular/core';
import { PadraoService } from './padrao.service';
import { AppSettings } from '../../app.settings';


@Injectable()
export class BancoService extends PadraoService {

  urlDefault = AppSettings.URL_API_BANCOS;

  sacar(registro) {
    return this.http
      .post(this.urlDefault, JSON.stringify(registro), this.options)
      .map(res => res.json());
  }

}
