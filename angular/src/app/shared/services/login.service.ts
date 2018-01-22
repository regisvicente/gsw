import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { JwtHelper } from 'angular2-jwt';
import { AppSettings } from '../../app.settings';
import { Usuario } from '../../model/usuario';

@Injectable()
export class LoginService {

  private token: string;
  private role: string;
  private isTokenExpired: boolean;

  private urlDefault = AppSettings.URL_API_LOGIN;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http,
    private router: Router) {

    const currentUser = localStorage.getItem('currentUser');

    if (currentUser !== null) {
      this.token = JSON.parse(currentUser).token;
      this.role = this.jwtHelper.decodeToken(this.token).role[0].authority;
      this.isTokenExpired = this.jwtHelper.isTokenExpired(this.token);
    }

  }

  home() {

    if (this.role === 'ROLE_ADM') {
      this.router.navigate(['/adm']);
    }
    if (this.role === 'ROLE_CLIENTE') {
      this.router.navigate(['/banco']);
    }

  }

  login(usuario: Usuario): Observable<boolean> {

    const body = JSON.stringify({ nome: usuario.nome, senha: usuario.senha });

    return this.http
      .post(this.urlDefault, body, this.options)
      .map((response: Response) => {

        const token = response.json().token;

        if (token) {
          this.token = token;
          this.role = this.jwtHelper.decodeToken(this.token).role[0].authority;
          this.isTokenExpired = this.jwtHelper.isTokenExpired(this.token);

          localStorage.setItem('currentUser', JSON.stringify({ nome: usuario.nome, token: token }));

          this.home();

          return true;
        }

        return false;
      });

  }

  usuarioEstaAutenticado() {
    return (this.isTokenExpired === false) && (this.token !== '');
  }

  tipoAcesso() {
    return this.role;
  }

  logout() {
    this.token = null;
    this.role = null;
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

}
