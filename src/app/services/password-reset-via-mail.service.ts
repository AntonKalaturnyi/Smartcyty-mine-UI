import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetViaMailService {

  constructor(private http: HttpClient) { }

  requestResetPasswordMail(email: string){
    let headers = new HttpHeaders();
    return this.http.post('http://localhost:8080/smartcity_war/forgotPassword/', email, {headers});
  }

  updatePasswordViaToken(token: string, newPass: string){
    let headers = new HttpHeaders();
    return this.http.post('http://localhost:8080/smartcity_war/forgotPassword/resetPassword?token='+token, newPass, {headers});
  }

}
