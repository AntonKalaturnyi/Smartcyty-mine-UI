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
    }
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<Task>('http://localhost:8080/GrowIt/tasks/' + id, { headers });
  }

  findTasksByOrganizationId(id: any): Observable<any> {
    let headers = new HttpHeaders();
    if (localStorage.getItem('token') == null) {
      return new Observable;
    }
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:8080/GrowIt/tasks/organizationId/' + id, { headers });
  }

  findTasksByUserId(id: Number) {
    let headers = new HttpHeaders();
    if (localStorage.getItem('token') == null) {
      return new Observable;
    }
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:8080/GrowIt/tasks/userId/' + id, { headers });
  }

  createTask(taskDto: Object) {
    let headers = new HttpHeaders();
    if (localStorage.getItem('token') == null) {
      return new Observable;
    }
    console.log(taskDto);
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post('http://localhost:8080/GrowIt/tasks/', taskDto, { headers })
    .pipe(catchError(this.errorHandler));
  }

  findTasksByDate(orgId: Object, dateRange: DateRange) {
    let headers = new HttpHeaders();
    if (localStorage.getItem('token') == null) {
      return new Observable;
    }
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    if (dateRange.start != null && dateRange.end != null) {
      dateRange.start.setUTCHours(0);
      dateRange.end.setUTCHours(24);
      return this.http.get('http://localhost:8080/GrowIt/tasks/organizationId/' + orgId + '/date?from='
        + dateRange.start.toJSON().replace('Z', '')
        + '&to=' + dateRange.end.toJSON().replace('Z', ''), { headers });
    } else { return new Observable(); }
  }

  deleteTask(id: Number) {
    let headers = new HttpHeaders();
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.delete('http://localhost:8080/GrowIt/tasks/' + id, { headers })
    .pipe(catchError(this.errorHandler));
  }

  updateTask(id: Number, taskDto: Task)  {
    let headers = new HttpHeaders();
    if (localStorage.getItem('token') == null) {
      return new Observable();
    }
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put<Task>('http://localhost:8080/GrowIt/tasks/' + id, taskDto, { headers })
    .pipe(catchError(this.errorHandler));

  }

  findUsersOrgsId(userId: Number, orgId: Number) {
    let headers = new HttpHeaders();
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:8080/GrowIt/tasks?userId=' + userId + '&orgId=' + orgId, { headers })
    .pipe(catchError(this.errorHandler));
  }

  findOrgIdByUsersOrgId(usersOrgId: Number) {
    let headers = new HttpHeaders();
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:8080/GrowIt/tasks/OrgIdByUsersOrgId?usersOrgId=' + usersOrgId, { headers })
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error || 'Server error');
  }
}
