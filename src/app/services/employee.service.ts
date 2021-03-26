import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import {employee} from 'app/models/employee';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private apiService: ApiService) { }
  getEmployees(): Observable<employee[]> {
    return this.apiService.getAll('employees/all');
 }
 getEmployee(id: number): Observable<employee> {
   return this.apiService.getOne('employees/all',id);
 }
 createEmployee(employee : any): Observable<employee> {
   return this.apiService.create('employees/add', employee);
 }
 updateEmployee(employee : any): Observable<employee> {
   return this.apiService.update('employees/update', employee);
 }
 deleteEmployee(id: number): Observable<employee> {
   return this.apiService.delete('employees/delete',id);
 }

 getEmployeesByHouseID(id: number): Observable<any> {
  return this.apiService.getOne('employees/employeeByHouseId', id);
}
 
}
