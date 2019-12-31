import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private http: HttpClient) { }

  getBudget() {
    let headers = new HttpHeaders();
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:8080/GrowIt/budget', {headers});
  }

  setBudget(budget) {
    let headers = new HttpHeaders();
    headers = headers.append('authorization','Bearer ' + localStorage.getItem('token'));
    return this.http.put('http://localhost:8080/GrowIt/budget', budget, {headers});
  }

  deposit(amount) {
    let headers = new HttpHeaders();
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put('http://localhost:8080/GrowIt/budget/deposit', +amount, {headers});
  }

  withdraw(amount) {
    let headers = new HttpHeaders();
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put('http://localhost:8080/GrowIt/budget/withdraw', +amount, {headers});
  }
}
