import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private http: HttpClient) {
  }

  findAllOrganizations(): Observable<any> {
    // Need to change url
    let headers = new HttpHeaders();
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:8080/smartcity_war/organizations', {headers});
  }

  addOrganization(organization: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post('http://localhost:8080/smartcity_war/organizations', organization, {headers});
  }

  deleteOrganization(id: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.delete('http://localhost:8080/smartcity_war/organizations/' + id, {headers});
  }

  findById(id: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:8080/smartcity_war/organizations/' + id, {headers});
  }

  updateOrganization(id: any, organization: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put('http://localhost:8080/smartcity_war/organizations/' + id, organization,
      {headers});
  }

  addUserToOrganization(userId: any, organizationId: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post('http://localhost:8080/smartcity_war/organizations/' + organizationId + '/addUser/' + userId,
      null,
      {headers});
  }

  removeUserFromOrganization(userId: any, organizationId: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.delete('http://localhost:8080/smartcity_war/organizations/' + organizationId + '/removeUser/' + userId,
      {headers});
  }
}
