import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/model/Task';
import { UserVerificationService } from 'src/app/services/user-verification.service';
import { NotificationService } from '../services/notification.service';
import { UserService } from '../services/user.service';
import { User } from '../model/User';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit, OnDestroy {

  static assigneeId: number;
  assignee: User;
  taskId;
  task: Task;
  getTaskSubscription;

  constructor(private service: TaskService, private notificationService: NotificationService,
              private verificationService: UserVerificationService,
              private router: Router, private userService: UserService,
              private actRouter: ActivatedRoute) {
    this.taskId = this.actRouter.snapshot.paramMap.get('id');
    console.log('TASK ID: ' + this.taskId);
    this.getTaskSubscription =  this.service.findTaskById(this.taskId).subscribe(data => {
      this.task = data;
    });
    // this.userService.getUserbyId(TaskDetailsComponent.assigneeId).subscribe((res) => {
    //   console.log(res);
    //   this.assignee = res;
    // });
}

  ngOnInit() {
  }

  ngOnDestroy() {
    // Unsubscribing
    if (this.getTaskSubscription) {
      this.getTaskSubscription.unsubscribe();
    }
  }

  handleEdit(id: number) {
    this.router.navigateByUrl('/home/task/edit/' + id);
  }

  approveBudget(updTask: Task) {
    if (this.verificationService.supervisorVerification() && updTask.approvedBudget !== updTask.budget) {
      updTask.approvedBudget = updTask.budget;
    } else {
      return;
    }
    this.service.updateTask(updTask.id, updTask).subscribe(data => {
      console.log(data);
    }, validationErr => {
      this.notificationService.showErrorHTMLMessage(validationErr.error.message, 'Invalid input');
    });
  }
}
