import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DateRange } from '@uiowa/date-range-picker';

@Injectable({
  providedIn: 'root'
})

export class TransactionService {

  constructor(private http: HttpClient) { }

  findTransactionsByTaskId(id: String) {
    let headers = new HttpHeaders();
    if (localStorage.getItem('token') == null) {
      return new Observable;
    };
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:8080/smartcity_war/transactions/taskId/' + id, { headers });
  }


  findTransactionById(id: Number) {
    let headers = new HttpHeaders();
    if (localStorage.getItem('token') == null) {
      return new Observable;
    };
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:8080/smartcity_war/transactions/' + id, { headers });
  }


  createTransaction(transactionDto: Object) {
    this.http.post('http://localhost:8080/smartcity_war/transactions/', transactionDto).subscribe((res) => {
      console.log(res);
    });
  }

  deleteTransaction(id: Number) {
    let headers = new HttpHeaders();
    if (localStorage.getItem('token') == null) {
      return new Observable;
    };
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.delete('http://localhost:8080/smartcity_war/transactions/' + id, { headers }).subscribe((res)=>{
      console.log(res);
    });
  }

  updateTransaction(id: Number, transactionDto: Object) {
    let headers = new HttpHeaders();
    if (localStorage.getItem('token') == null) {
      return new Observable;
    };
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put('http://localhost:8080/smartcity_war/transactions/' + id, transactionDto, { headers });
  }

  findTransactionsByDate(id: Object, dateRange: DateRange) {
    let headers = new HttpHeaders();
    if (localStorage.getItem('token') == null) {
      return new Observable;
    };
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    if (dateRange.start != null && dateRange.end != null) {
      dateRange.start.setUTCHours(0);
      dateRange.end.setUTCHours(24);
      return this.http.get('http://localhost:8080/smartcity_war/transactions/taskId/' + id +
        "/date?from=" + dateRange.start.toJSON().replace('Z', '') + "&to=" + dateRange.end.toJSON().replace('Z', ''), { headers });
    } else return new Observable();
  }
}
