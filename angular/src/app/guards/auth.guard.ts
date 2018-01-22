import { LoginService } from './../shared/services/login.service';

import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: LoginService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

    if (this.authService.usuarioEstaAutenticado()) {
      return true;
    }

    this.router.navigate(['login']);

    return false;
  }

}
