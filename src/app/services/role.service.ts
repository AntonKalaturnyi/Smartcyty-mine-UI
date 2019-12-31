import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from '../model/User';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { Role } from '../model/Role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {


  constructor(private http: HttpClient) {
  }

  getRoles(): Observable<Role[]> {
    let headers = this.getAuthHeader();
    return this.http.get<Role[]>('http://localhost:8080/GrowIt/roles/all', { headers });
  }

  private getAuthHeader() {
    let headers = new HttpHeaders();
    if (localStorage.getItem('token')) {
      return headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    }
  }
}
