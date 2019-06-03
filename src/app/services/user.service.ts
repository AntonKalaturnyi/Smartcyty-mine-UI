import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'q';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  regUser(user) {
    this.http.post('http://localhost:8080/smartcity_war/registration', user).subscribe((res) => {
      console.log(res);
    });
  }

  authUser(user) {
    this.http.post<any>('http://localhost:8080/smartcity_war/auth/signin', user, { observe: 'response' }).forEach((res) => {
      localStorage.setItem('token', res.body.token);
      localStorage.setItem('email', res.body.username);
    });
  }

  getUserbyId(id){
    let headers = new HttpHeaders();
    if (localStorage.getItem('token') == null) {
      return new Observable;
    };
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:8080/smartcity_war/users/?email=' + id, { headers });
  }

  getUserbyEmail(email) {
    let headers = new HttpHeaders();
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:8080/smartcity_war/users/?email=' + email, { headers });
  }

  getAllUsers() {
    let headers = new HttpHeaders();
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:8080/smartcity_war/users/all', { headers });
  }

  deleteUser(id) {
    let headers = new HttpHeaders();
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.delete('http://localhost:8080/smartcity_war/users/' + id, { headers });
  }

  updateUser(user, id) {
    let headers = new HttpHeaders();
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put('http://localhost:8080/smartcity_war/users/' + id, { headers });
  }

  getRoles(id){
    let headers = new HttpHeaders();
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:8080/smartcity_war/users/' + id + '/get-roles', { headers });
  }

  setRoles(roles, id){
    let headers = new HttpHeaders();
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put('http://localhost:8080/smartcity_war/users/' + id + '/set-roles', roles ,{ headers });
  }
}
