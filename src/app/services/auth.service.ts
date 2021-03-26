import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from 'environments/environment';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  private headers: HttpHeaders;
  constructor(protected http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
  }
  getAll(path: string): Observable<any[]> {
    return this.http
      .get(`${environment.authUrl}${path}`)
      .pipe(map((resp) => resp as any[]));
  }


  getOne(path: string, id?: number): Observable<any> {
    let getUrl: string;
    if (id) {
      getUrl = `${environment.authUrl}${path}` + '/' + id;
    } else {
      getUrl = `${environment.authUrl}${path}`;
    }
    return this.http.get(getUrl).pipe(map((resp) => resp as any));
  }

  getOneBy(path: string, value?: string): Observable<any> {
    let getUrl: string;
    if (value) {
      getUrl = `${environment.authUrl}${path}` + '/' + value;
    } else {
      getUrl = `${environment.authUrl}${path}`;
    }
    return this.http.get(getUrl).pipe(map((resp) => resp as any));
  }


  create(path: string, resource: any, options?: any): Observable<any> {
    return this.http
      .post(`${environment.authUrl}${path}`, resource, { headers: this.headers })
      .pipe(map((response) => response));
  }

  update(path: string, resource: any): Observable<any> {
    return this.http
      .put(`${environment.authUrl}${path}`, resource, { headers: this.headers })
      .pipe(map((response) => response));
  }
  delete(path: string, id?: number): Observable<any> {
    return this.http
      .delete(`${environment.authUrl}${path}` + '/' + id, { headers: this.headers })
      .pipe(map((response) => response));
  }
  deleteByUsername(path: string, username?: string): Observable<any> {
    return this.http
      .delete(`${environment.authUrl}${path}` + '/' + username, { headers: this.headers })
      .pipe(map((response) => response));
  }
}
