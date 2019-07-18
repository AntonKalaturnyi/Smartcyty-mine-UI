import {Component, OnInit} from '@angular/core';
import {WebSocketService} from 'src/app/services/webSocket.service';
import {NotificationService} from 'src/app/services/notification.service';
import {UserVerificationService} from 'src/app/services/user-verification.service';
import {User} from "../../model/User";
import {CommentNotification} from "../../model/CommentNotification";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private webSocketService: WebSocketService, private userService: UserService,
              private notificationService: NotificationService,
              private userVerf: UserVerificationService) {
    if (this.userVerf.supervisorVerification() || this.userVerf.responsiblePersonVerification()) {
      this.webSocketService.connect();
    }
  }

  ngOnInit() {
    this.webSocketService.addTask((data: any) => {
      this.notificationService.showInfoHTMLMessage('New task has been created. Title: ' + data.title + '\nOrganization: ' + data.orgName + '\nBudget: ' + data.budget, 'Task info');
    });
    this.webSocketService.addComment((comment: CommentNotification) => {
      this.userService.getAuthenticatedUser().subscribe((user: User) => {
        if (comment.userId !== user.id) {
          this.notificationService.showInfoHTMLMessage("Author:" + comment.user + "<br>Description:<br>" + comment.description,
            "New comment for task:" + comment.task);
        }
      });
    });
  }
}
