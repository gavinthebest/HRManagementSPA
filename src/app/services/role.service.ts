import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import {role} from 'app/models/role';
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private apiService: ApiService) { }
  getRoles(): Observable<role[]> {
    return this.apiService.getAll('roles/all');
  }
  getRole(id: number): Observable<role> {
    return this.apiService.getOne('roles/all', id);
  }
  createRole(role: any): Observable<role> {
    return this.apiService.create('roles/add', role);
  }
  updateRole(role: any): Observable<role> {
    return this.apiService.update('roles/update', role);
  }
  deleteRole(id: number): Observable<role> {
    return this.apiService.delete('roles/delete', id);
  }

}
