import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import {visitor} from 'app/models/visitor';
@Injectable({
  providedIn: 'root'
})
export class VisitorService {

  constructor(private authService: AuthService) { }
  getVisitors(): Observable<visitor[]> {
    return this.authService.getAll('visitors/all');
  }
  getVisitor(id: number): Observable<visitor> {
    return this.authService.getOne('visitors/all', id);
  }
  getVisitorByToken(token: string): Observable<visitor> {
    return this.authService.getOneBy('visitors/findByToken', token);
  }
  createVisitor(visitor: any): Observable<visitor> {
    return this.authService.create('visitors/add', visitor);
  }
  updateVisitor(visitor: any): Observable<visitor> {
    return this.authService.update('visitors/update', visitor);
  }
  deleteVisitor(id: number): Observable<visitor> {
    return this.authService.delete('visitors/delete', id);
  }
  deleteVisitorByUsername(username: string): Observable<visitor> {
    return this.authService.deleteByUsername('visitors/deleteByUsername', username);
  }
}
