import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrganizationListService {

  constructor(private http: HttpClient) { }

  getOrganizations() {
    // Need to change url
    let headers = new HttpHeaders();
    headers = headers.append('authorization','Bearer '+localStorage.getItem('token'));
    return this.http.get('http://localhost:8080/smartcity_war/organizations', {headers});
  }
}
