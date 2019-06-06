import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private http: HttpClient) {
  }

  findAllOrganizations(): Observable<any>  {
    // Need to change url
    let headers = new HttpHeaders();
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:8080/smartcity_war/organizations', {headers});
  }

  addOrganization(organization): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post('http://localhost:8080/smartcity_war/organizations', organization, {headers});
  }

  deleteOrganization(id): Observable<any>  {
    let headers = new HttpHeaders();
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.delete('http://localhost:8080/smartcity_war/organizations/' + id, {headers});
  }

  findById(id): Observable<any>  {
    let headers = new HttpHeaders();
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:8080/smartcity_war/organizations/' + id, {headers});
  }

  updateOrganization(id, organization): Observable<any>  {
    let headers = new HttpHeaders();
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put('http://localhost:8080/smartcity_war/organizations/' + id, organization,
      {headers});
  }
}
