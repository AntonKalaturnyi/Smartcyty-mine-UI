import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }


  findCommentById(id): Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:8080/smartcity_war/comments/' + id, { headers });
  }


  findCommentByTaskId(id): Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:8080/smartcity_war/comments/taskId/' + id, { headers });
  }


  createComment(commentDto) : Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post('http://localhost:8080/smartcity_war/comments/', commentDto, {headers});
  }

  deleteComment(id): Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.delete('http://localhost:8080/smartcity_war/comments/' + id, { headers });
  }

  updateComment(id, commentDto): Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put('http://localhost:8080/smartcity_war/comments/' + id, commentDto, { headers });
  }

}
