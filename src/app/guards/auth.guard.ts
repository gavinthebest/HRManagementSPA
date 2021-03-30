import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {VisitorService} from '../services/visitor.service';
import {EmployeeService} from '../services/employee.service';
import {UserRoleService} from '../services/userrole.service';
import {RoleService} from '../services/role.service';
import {ApplicationWorkFlowService} from '../services/application-work-flow.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private cookieService: CookieService,
        private router: Router,
        private visitorService: VisitorService,
        private employeeService: EmployeeService,
        private userRoleService: UserRoleService,
        private roleService: RoleService,
        private applicationWorkFlowService: ApplicationWorkFlowService
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
              this.applicationWorkFlowService.getApplicationWorkFlowByEmployeeId(String(employee.employeeID)).subscribe(ob => {
                this.cookieService.set('employeeID', '' + employee.employeeID);
                if (ob.status === 'open') {
                  this.router.navigate(['/onboarding']);
                  return false;
                } else if (ob.status === 'pending') {
                      alert('Your HR is still working on approving your account!');
                      this.router.navigate(['logout']);
                      return false;
                } else {
                  this.userRoleService.getUserRoleByUserId(currentUserId).subscribe(userRole => {
                    let roleId: number = userRole.roleID;
                    this.roleService.getRole(roleId).subscribe(role => {
                      if (role.roleName === 'HR') {
                        this.router.navigate(['/hr']);
                      } else {
                        this.router.navigate(['/employee']);
                      }
                      return false;
                    });
                  });
                }
              });
            });
          });
        }
        return true;
    }
}
