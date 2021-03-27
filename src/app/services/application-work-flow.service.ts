import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { applicationWorkFlow } from '../models/applicationWorkFlow';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationWorkFlowService {

  constructor(private apiService: ApiService) { }
  getApplicationWorkFlows(): Observable<applicationWorkFlow[]> {
    return this.apiService.getAll('applicationWorkFlows/all');
  }
  getApplicationWorkFlow(id: number): Observable<applicationWorkFlow> {
    return this.apiService.getOne('applicationWorkFlows/all',id);
  }
  getApplicationWorkFlowByForm(): Observable<applicationWorkFlow[]> {
    return this.apiService.getAll('applicationWorkFlows/find/form');
  }
  createApplicationWorkFlow(applicationWorkFlow : any): Observable<applicationWorkFlow> {
    return this.apiService.create('applicationWorkFlows/add', applicationWorkFlow);
  }
  updateApplicationWorkFlow(applicationWorkFlow : any): Observable<applicationWorkFlow> {
    return this.apiService.update('applicationWorkFlows/update', applicationWorkFlow);
  }
  deleteApplicationWorkFlow(id: number): Observable<applicationWorkFlow> {
    return this.apiService.delete('applicationWorkFlows/delete',id);
  }
}
