import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DateRange } from '@uiowa/date-range-picker';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  constructor(private http: HttpClient) { }

  findTaskById(id){
    let headers = new HttpHeaders();
    if (localStorage.getItem('token') == null) {
      return new Observable;
    };
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:8080/smartcity_war/tasks/' + id, { headers });
  }

  findTasksByOrganizationId(id){
    let headers = new HttpHeaders();
    if (localStorage.getItem('token') == null) {
      return new Observable;
    };
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:8080/smartcity_war/tasks/organizationId/' + id, { headers });
  }

  findTasksByUserId(id){
    let headers = new HttpHeaders();
    if (localStorage.getItem('token') == null) {
      return new Observable;
    };
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:8080/smartcity_war/tasks/userId/' + id, { headers });
  }

  createTask(taskDto){
    let headers = new HttpHeaders();
    if (localStorage.getItem('token') == null) {
      return new Observable;
    };
    console.log(taskDto);
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    this.http.post('http://localhost:8080/smartcity_war/tasks/', taskDto, {headers}).subscribe((res) => {
      console.log(res);
    });
  }

  findTasksByDate(dateRange: DateRange){
    let headers = new HttpHeaders();
    if (localStorage.getItem('token') == null) {
      return new Observable;
    };
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:8080/smartcity_war/tasks/date?from=' + dateRange.start.toJSON().replace('Z','')
    + "&to=" + dateRange.end.toJSON().replace('Z','') , { headers });
  }

  deleteTask(id){
    let headers = new HttpHeaders();
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.delete('http://localhost:8080/smartcity_war/tasks/' + id, { headers }).subscribe((res) => {
      console.log(res);
    });
  }

  updateTask(id,taskDto){
    let headers = new HttpHeaders();
    if (localStorage.getItem('token') == null) {
      return new Observable;
    };
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put('http://localhost:8080/smartcity_war/tasks/' + id,taskDto, { headers });
  }
  }
