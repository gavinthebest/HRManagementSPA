import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {VisitorService} from '../services/visitor.service';
import {EmployeeService} from '../services/employee.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private cookieService: CookieService,
        private router: Router,
        private visitorService: VisitorService,
        private employeeService: EmployeeService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentToken: string = this.cookieService.get('token');
        const currentUsername: string = this.cookieService.get('username');
        const currentUserId: string = this.cookieService.get('userID');
        if (currentUsername && currentToken && currentUserId) {
          this.visitorService.getVisitorByToken(currentToken).subscribe(visitor => {
            if (visitor.username !== currentUsername || (visitor.userID + '') !== currentUserId) {
              alert('Please login');
              return true;
            }
            this.employeeService.getEmployeeByUserId(currentUserId).subscribe(employee => {
              alert('Local Token Found, Redirecting....');
              this.cookieService.set('employeeID', '' + employee.employeeID);
              if (employee.managerID) {
                this.router.navigate(['/hr']);
              } else {
                this.router.navigate(['/employee']);
              }
              return false;
            });
          });
        }
        return true;
    }
}
