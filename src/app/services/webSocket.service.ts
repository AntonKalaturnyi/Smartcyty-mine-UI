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

  constructor(private notif: NotificationService,private userService:UserService,private commentService:CommentService,private userVerificationService:UserVerificationService,private organizationService:OrganizationService) {
  }

  private serverUrl = 'http://localhost:8080/smartcity_war/socket';
  private stompClient;
  tasks = [];
  private commentsSubject = new Subject<any>();
  comments = this.commentsSubject.asObservable();

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
        }
        if(localStorage.getItem('ROLE_RESPONSIBLE_PERSON')) {
          this.stompClient.subscribe('/topic/task.create/' + localStorage.getItem('email'), task => {
            console.log(task);
            this.tasks.forEach(handler => handler(JSON.parse(task.body)));
          });
        }
        if(this.userVerificationService.supervisorVerification() || this.userVerificationService.responsiblePersonVerification()) {
          this.stompClient.subscribe('/topic/comment.create', data => {
            this.userService.getAuthenticatedUser().subscribe((user: User) => {
                  let comment: CommentNotification = JSON.parse(data.body);
                  this.organizationService.findById(comment.organizationId).subscribe(resOrganization =>{
                      let organization:Organization = resOrganization;
                      if (comment.userId !== user.id && (organization.responsiblePersons.some(item => item.id === user.id) || this.userVerificationService.supervisorVerification())) {

                        this.notif.showInfoHTMLMessage("Author:" + comment.user + "<br>Description:<br>" + comment.description, "New comment for task:" + comment.task);

                        this.commentService.findCommentById(comment.id).subscribe(
                          date => {
                            this.addComment(date);
                          }
                          ,
                          error => this.notif.showErrorHTMLMessage(error.error.message, "Error")
                        );
                    }
                  },
                    error => this.notif.showErrorHTMLMessage(error.error.message,"Error"));
              }
            , error => this.notif.showErrorHTMLMessage(error.error.message, "Error"));

          });
        }
    });
}

addTask(task){
    this.tasks.push(task);
}
addComment(comment:any){
  this.commentsSubject.next(comment);
}
disconnect() {
    if (this.stompClient != null) {
        this.stompClient.disconnect();
        console.log("Disconnected");
    }
}

// sendTask(task) {
//     this.stompClient.send("/smartcity_war/sendTask", {}, JSON.stringify(task));
// }

}
