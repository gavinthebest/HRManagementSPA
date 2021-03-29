import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';


@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
  constructor(
    private cookieService: CookieService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token: string = this.cookieService.get('token');
    if (token) {
      return true;
    } else {
      alert('Please Log In')
      return false;
    }
  }
}
