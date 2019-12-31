import {Injectable} from '@angular/core';
import * as SockJs from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';
import {NotificationService} from "./notification.service";
import {UserService} from "./user.service";
import {User} from "../model/User";
import {CommentService} from "./comment.service";
import {Subject} from "rxjs";
import {UserVerificationService} from "./user-verification.service";
import {OrganizationService} from "./organization.service";
import {Organization} from "../model/Organization";
import {CommentNotification} from "../model/CommentNotification";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor(private notif: NotificationService,private userService:UserService,private commentService:CommentService,
    private userVerificationService:UserVerificationService,private organizationService:OrganizationService) {
  }

  private serverUrl = 'http://localhost:8080/GrowIt/socket';
  private stompClient;
  tasks = [];
  comments = [];

connect() {
    let socket = new SockJs(this.serverUrl);
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, frame => {
        console.log('Connected: ' + frame);
        if(localStorage.getItem('ROLE_SUPERVISOR')){
            this.stompClient.subscribe('/topic/task.create', task => {
                console.log(task);
                this.tasks.forEach(handler => handler(JSON.parse(task.body)));
            });
            this.stompClient.subscribe('/topic/comment.create',comment =>{
              this.comments.forEach(handler=>handler(JSON.parse(comment.body)));
            })
        }
        if(localStorage.getItem('ROLE_RESPONSIBLE_PERSON')) {
          this.stompClient.subscribe('/topic/task.create/' + localStorage.getItem('email'), task => {
            console.log(task);
            this.tasks.forEach(handler => handler(JSON.parse(task.body)));
          });
          this.stompClient.subscribe('/topic/comment.create/' + localStorage.getItem('email'),comment =>{
            this.comments.forEach(handler=>handler(JSON.parse(comment.body)));
          })
        }
    });
}
addTask(task){
    this.tasks.push(task);
}

addComment(comment){
  this.comments.push(comment);
}
disconnect() {
    if (this.stompClient != null) {
        this.stompClient.disconnect();
        console.log("Disconnected");
    }
}

// sendTask(task) {
//     this.stompClient.send("/GrowIt/sendTask", {}, JSON.stringify(task));
// }

}
