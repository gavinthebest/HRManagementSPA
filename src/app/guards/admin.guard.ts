import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {UserRoleService} from '../services/userrole.service';
import {RoleService} from '../services/role.service';


@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(
    private cookieService: CookieService,
    private userRoleService: UserRoleService,
    private router: Router,
    private roleService: RoleService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return true;
    let currentUserId: string = this.cookieService.get('userID');
    this.userRoleService.getUserRoleByUserId(currentUserId).subscribe(userRole => {
      if (!userRole) {
        return false;
      }
      let roleId: number = userRole.roleID;
      this.roleService.getRole(roleId).subscribe(role => {
        if (role.roleName === 'HR') {
          return true;
        }
      });
    });
    return false;
  }
}
