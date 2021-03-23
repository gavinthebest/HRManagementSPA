import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import {user} from 'app/models/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService) { }
  getUsers(): Observable<user[]> {
    return this.apiService.getAll('users/all');
  }
  getUser(id: number): Observable<user> {
    return this.apiService.getOne('users/all', id);
  }
  createUser(user: any): Observable<user> {
    return this.apiService.create('users/add', user);
  }
  updateUser(user: any): Observable<user> {
    return this.apiService.update('users/update', user);
  }
  deleteUser(id: number): Observable<user> {
    return this.apiService.delete('users/delete', id);
  }

}
