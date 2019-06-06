import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private http: HttpClient) {
  }

  getOrganizations() {
    // Need to change url
    let headers = new HttpHeaders();
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:8080/smartcity_war/organizations', {headers});
  }

  addOrganization(organization) {
    let headers = new HttpHeaders();
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post('http://localhost:8080/smartcity_war/organizations', organization, {headers}).subscribe((res) => {
      console.log(res);
    });
  }

  deleteOrganization(id) {
    let headers = new HttpHeaders();
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.delete('http://localhost:8080/smartcity_war/organizations/' + id, {headers}).subscribe((res) => {
      console.log(res);
    });
  }

  findById(id) {
    let headers = new HttpHeaders();
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:8080/smartcity_war/organizations/' + id, {headers})
    
  }

  updateOrganization(organization) {
    let headers = new HttpHeaders();
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put('http://localhost:8080/smartcity_war/organizations/' + organization.id, organization,
      {headers}).subscribe((res) => {
      console.log(res);
    });
  }
}
