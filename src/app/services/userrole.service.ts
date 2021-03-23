import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { userrole } from '../models/userrole';
@Injectable({
  providedIn: 'root'
})
export class UserRoleService {

  constructor(private apiService: ApiService) { }
  getUserRoles(): Observable<userrole[]> {
    return this.apiService.getAll('userRoles/all');
  }
  getUserRole(id: number): Observable<userrole> {
    return this.apiService.getOne('userRoles/all', id);
  }
  createUserRole(userrole: any): Observable<userrole> {
    return this.apiService.create('userRoles/add', userrole);
  }
  updateUserRole(userrole: any): Observable<userrole> {
    return this.apiService.update('userRoles/update', userrole);
  }
  deleteUserRole(id: number): Observable<userrole> {
    return this.apiService.delete('userRoles/delete', id);
  }

}
