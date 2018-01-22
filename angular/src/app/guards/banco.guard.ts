import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { LoginService } from './../shared/services/login.service';

@Injectable()
export class BancoGuard implements CanActivateChild {

  constructor(
    private authService: LoginService,
    private router: Router
  ) { }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

    if (this.authService.tipoAcesso() === 'ROLE_CLIENTE') {
      return true;
    }
    this.router.navigate(['login']);
    return false;

  }
}
