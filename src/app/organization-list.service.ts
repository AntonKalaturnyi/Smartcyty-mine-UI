import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrganizationListService {

  constructor(private http: HttpClient) { }

  getOrganizations() {
    // Need to change url
    return this.http.get('https://reqres.in/api/users')
  }
}
