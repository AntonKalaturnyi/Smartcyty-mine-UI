import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DateRange } from '@uiowa/date-range-picker';
import {Task} from '../model/Task';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  constructor(private http: HttpClient) { }

  findTaskById(id: String) {
    let headers = new HttpHeaders();
    if (localStorage.getItem('token') == null) {
      return new Observable;
    };
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:8080/smartcity_war/tasks/' + id, { headers });
  }

  findTasksByOrganizationId(id: any): Observable<any> {
    let headers = new HttpHeaders();
    if (localStorage.getItem('token') == null) {
      return new Observable;
    };
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:8080/smartcity_war/tasks/organizationId/' + id, { headers });
  }

  findTasksByUserId(id: Number) {
    let headers = new HttpHeaders();
    if (localStorage.getItem('token') == null) {
      return new Observable;
    };
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:8080/smartcity_war/tasks/userId/' + id, { headers });
  }

  createTask(taskDto: Object) {
    let headers = new HttpHeaders();
    if (localStorage.getItem('token') == null) {
      return new Observable;
    };
    console.log(taskDto);
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    this.http.post('http://localhost:8080/smartcity_war/tasks/', taskDto, { headers }).subscribe((res) => {
      console.log(res);
    });
  }

  findTasksByDate(orgId: Object, dateRange: DateRange) {
    let headers = new HttpHeaders();
    if (localStorage.getItem('token') == null) {
      return new Observable;
    };
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    if (dateRange.start != null && dateRange.end != null) {
      dateRange.start.setUTCHours(0);
      dateRange.end.setUTCHours(24);
      return this.http.get('http://localhost:8080/smartcity_war/tasks/organizationId/' + orgId + "/date?from="
        + dateRange.start.toJSON().replace('Z', '')
        + "&to=" + dateRange.end.toJSON().replace('Z', ''), { headers });
    }
    else return new Observable();
  }

  deleteTask(id: Number) {
    let headers = new HttpHeaders();
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.delete('http://localhost:8080/smartcity_war/tasks/' + id, { headers }).subscribe((res) => {
      console.log(res);
    });
  }

  updateTask(id: Number, taskDto: Object) {
    let headers = new HttpHeaders();
    if (localStorage.getItem('token') == null) {
      return new Observable;
    };
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put('http://localhost:8080/smartcity_war/tasks/' + id, taskDto, { headers }).subscribe((res) => {
      console.log(res);
    });
  }

  findUsersOrgsId(userId: string, orgId: string){
    let headers = new HttpHeaders();
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:8080/smartcity_war/tasks?userId=' + userId + "&orgId=" + orgId, { headers });
  }
}
