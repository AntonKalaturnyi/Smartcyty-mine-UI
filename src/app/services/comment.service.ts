import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import {Comment} from "../model/Comment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }


  findCommentById(id): Observable<any>{
    let headers = this.getAuthHeader();
    return this.http.get('http://localhost:8080/smartcity_war/comments/' + id, { headers });
  }


  findCommentByTaskId(id): Observable<any>{
    let headers = this.getAuthHeader();
    return this.http.get('http://localhost:8080/smartcity_war/comments/taskId/' + id, { headers });
  }


  createComment(commentDto) : Observable<any>{
    let headers = this.getAuthHeader();
    return this.http.post('http://localhost:8080/smartcity_war/comments/', commentDto, {headers});
  }

  deleteComment(comment:Comment): Observable<any>{
    let headers = this.getAuthHeader();
    return this.http.delete('http://localhost:8080/smartcity_war/comments/' + comment.id + "?userId=" + comment.userId, { headers });
  }

  updateComment(id, commentDto): Observable<any>{
    let headers = this.getAuthHeader();
    return this.http.put('http://localhost:8080/smartcity_war/comments/' + id, commentDto, { headers });
  }

  addUserToCommentSeen(commentId:number,userId:number): Observable<any>{
    let headers = this.getAuthHeader();
    return this.http.post('http://localhost:8080/smartcity_war/comments/' + commentId + '/addUser/' + userId, null, { headers });
  }

  private getAuthHeader() {
    let headers = new HttpHeaders();
    if (localStorage.getItem('token')) {
      return headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    }
  }
}
