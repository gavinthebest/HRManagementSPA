import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';



@Injectable({ providedIn: 'root' })
export class LogoutGuard implements CanActivate {
  constructor(
    private cookieService: CookieService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.cookieService.deleteAll('');
    return true;
  }
}
