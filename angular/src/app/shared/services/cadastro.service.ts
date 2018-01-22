import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { AppSettings } from './../../app.settings';
import { PadraoService } from './padrao.service';

@Injectable()
export class CadastroService extends PadraoService {

  protected getJson(url: string) {
    return this.http.get(url, this.options)
      .map(res => res.json());
  }

  setUrl(url) {
    this.urlDefault = AppSettings.HTTP_PROVIDERS + url;
  }

  getLista(query) {

    if (query == null) {
      return this.getJson(this.urlDefault);
    } else {
      return this.getJson(this.urlDefault + '?' + query);
    }

  }

  getRegistro(id) {
    return this.getJson(this.urlDefault + '/' + id);
  }

  salvar(registro) {
    return this.http
      .post(this.urlDefault, JSON.stringify(registro), this.options)
      .map(res => res.json());

  }

  excluir(id) {
    return this.http
      .delete(this.urlDefault + '/' + id, this.options);

  }

  getUrl() {
    return this.urlDefault;
  }

}
