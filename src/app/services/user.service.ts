import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from '../model/User';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { Role } from '../model/Role';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) {
  }

  @Output()
  change: EventEmitter<any> = new EventEmitter();

  refreshUsernameOnNavbar(user: User): void {
    this.change.emit(user);
  }

  regUser(user) {
   return this.http.post('http://localhost:8080/GrowIt/registration', user)
    .pipe(catchError(this.errorHandler));
  }

  authUser(user) {
    return this.http.post<any>('http://localhost:8080/GrowIt/auth/signin', user)
      .pipe(catchError(this.errorHandler));
  }

  getUserbyId(id) : any {
    let headers = this.getAuthHeader();
    return this.http.get('http://localhost:8080/GrowIt/users/' + id, {headers});
  }

  getAuthenticatedUser(): Observable<User> {
    let headers = this.getAuthHeader();
    return this.http.get<User>('http://localhost:8080/GrowIt/users/get-current', { headers });
  }

  getUserbyEmail(email: String): Observable<User> {
    let headers = this.getAuthHeader();
    return this.http.get<User>('http://localhost:8080/GrowIt/users/?email=' + email, { headers });
  }

  getAllUsers(pageId: Number): Observable<User[]> {
    let headers = this.getAuthHeader();
    return this.http.get<User[]>('http://localhost:8080/GrowIt/users/all/' + pageId, { headers });
  }

  deleteUser(id: Number) {
    let headers = this.getAuthHeader();
    return this.http.delete('http://localhost:8080/GrowIt/users/' + id, { headers });
  }

  updateUser(user: User): Observable<User> {
    let headers = this.getAuthHeader();
    headers.append('Content-Type', 'application/json');
    return this.http.put<User>('http://localhost:8080/GrowIt/users/update-profile', user, { headers })
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error|| "Server error");
  }

  activateUser(id: Number) {
    let headers = this.getAuthHeader();
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:8080/GrowIt/users/activate/' + id, null, { headers });
  }

  getRoles(id: Number): Observable<Role[]> {
    let headers = this.getAuthHeader();
    return this.http.get<Role[]>('http://localhost:8080/GrowIt/users/' + id + '/get-roles', { headers });
  }

  setRoles(roles:Number[], id: Number) {
    let headers = this.getAuthHeader();
    return this.http.put('http://localhost:8080/GrowIt/users/' + id + '/set-roles', roles, { headers });
  }

  getUsersByOrganizationId(organizationId: any): Observable<any> {
    let headers = this.getAuthHeader();
    return this.http.get('http://localhost:8080/GrowIt/users/organization/' + organizationId, { headers });
  }

  getUserByUsersOrgsId(usersOrgsId): Observable<any> {
    const headers = this.getAuthHeader();
    return this.http.get('http://localhost:8080/GrowIt/users/users-organizations/' + usersOrgsId, { headers });
  }

  getUsersByRole(role: string): Observable<any> {
    let headers = this.getAuthHeader();
    return this.http.get('http://localhost:8080/GrowIt/users/role/?role=' + role, { headers });
  }


  getUsersByCommentId(commentId): Observable<any> {
    let headers = this.getAuthHeader();
    return this.http.get('http://localhost:8080/GrowIt/users/comment/' + commentId, { headers });
  }

  private getAuthHeader() {
    let headers = new HttpHeaders();
    if (localStorage.getItem('token')) {
      return headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    }
  }
}
