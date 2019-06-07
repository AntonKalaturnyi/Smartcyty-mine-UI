import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }


  findCommentById(id){
    let headers = new HttpHeaders();
    if (localStorage.getItem('token') == null) {
      return new Observable;
    };
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:8080/smartcity_war/comments/' + id, { headers });
  }


  findCommentByTaskId(id){
    let headers = new HttpHeaders();
    if (localStorage.getItem('token') == null) {
      return new Observable;
    };
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:8080/smartcity_war/comments/taskId/' + id, { headers });
  }

  createComment(commentDto){
    let headers = new HttpHeaders();
    if (localStorage.getItem('token') == null) {
      return new Observable;
    };
    console.log(commentDto);
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    this.http.post('http://localhost:8080/smartcity_war/comments/', commentDto, {headers}).subscribe((res) => {
      console.log(res);
    });
  }

  deleteComment(id){
    let headers = new HttpHeaders();
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.delete('http://localhost:8080/smartcity_war/comments/' + id, { headers }).subscribe((res) => {
      console.log(res);
    });
  }

  updateComment(id, commentDto){
    let headers = new HttpHeaders();
    if (localStorage.getItem('token') == null) {
      return new Observable;
    };
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put('http://localhost:8080/smartcity_war/comments/' + id, commentDto, { headers });
  }

}
