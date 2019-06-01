import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { tokenKey } from '@angular/core/src/view';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token;

  constructor(private http: HttpClient) { }

  regUser(user){
    this.http.post('http://localhost:8080/smartcity_war/registration', user).subscribe((res)=>{
      console.log(res);
  });
  }

  authUser(user){
    this.http.post<any>('http://localhost:8080/smartcity_war/auth/signin', user, {observe: 'response'}).subscribe((res)=>{
      localStorage.setItem('token', res.body.token);
    })
  }
}
