import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { DateRange } from '@uiowa/date-range-picker';
import { Task } from '../model/Task';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class TaskService {

  constructor(private http: HttpClient) { }

  findTaskById(id: String): Observable<Task> {
    let headers = new HttpHeaders();
    if (localStorage.getItem('token') == null) {
      return new Observable;
    };
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<Task>('http://localhost:8080/smartcity_war/tasks/' + id, { headers });
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
    return this.http.post('http://localhost:8080/smartcity_war/tasks/', taskDto, { headers })
    .pipe(catchError(this.errorHandler));
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

  updateTask(id: Number, taskDto: Task)  {
    let headers = new HttpHeaders();
    if (localStorage.getItem('token') == null) {
      return new Observable();
    };
    console.log("In update!");
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put<Task>('http://localhost:8080/smartcity_war/tasks/' + id, taskDto, { headers });
  }

  findUsersOrgsId(userId: string, orgId: string) {
    let headers = new HttpHeaders();
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:8080/smartcity_war/tasks?userId=' + userId + "&orgId=" + orgId, { headers })
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error|| "Server error");
  }
}
