import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {Comment} from "../model/Comment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {
  }
  findCommentById(id): Observable<Comment> {
    let headers = this.getAuthHeader();
    return this.http.get<Comment>('http://localhost:8080/smartcity_war/comments/' + id, {headers});
  }


  findCommentByTaskId(id): Observable<Comment[]> {
    let headers = this.getAuthHeader();
    return this.http.get<Comment[]>('http://localhost:8080/smartcity_war/comments/taskId/' + id, {headers});
  }


  createComment(comment: Comment): Observable<Comment> {
    let headers = this.getAuthHeader();
    return this.http.post<Comment>('http://localhost:8080/smartcity_war/comments/', comment, {headers});
  }

  deleteComment(comment: Comment): Observable<boolean> {
    const options = {
      headers: this.getAuthHeader(),
      body: comment
    };
    return this.http.delete<boolean>('http://localhost:8080/smartcity_war/comments/' + comment.id, options);
  }

  updateComment(comment: Comment): Observable<Comment> {
    let headers = this.getAuthHeader();
    return this.http.put<Comment>('http://localhost:8080/smartcity_war/comments/' + comment.id, comment, {headers});
  }

  addUserToCommentSeen(commentId: number, userId: number): Observable<boolean> {
    let headers = this.getAuthHeader();
    return this.http.post<boolean>('http://localhost:8080/smartcity_war/comments/' + commentId + '/addUser/' + userId, null, {headers});
  }

  private getAuthHeader() {
    let headers = new HttpHeaders();
    if (localStorage.getItem('token')) {
      return headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    }
  }
}
