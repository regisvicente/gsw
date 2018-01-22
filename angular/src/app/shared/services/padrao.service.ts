import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class PadraoService {

  constructor(protected http: Http) {
  }

  protected urlDefault: string;
  protected token = JSON.parse(localStorage.getItem('currentUser')).token;
  protected headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.token });
  protected options = new RequestOptions({ headers: this.headers });

}
