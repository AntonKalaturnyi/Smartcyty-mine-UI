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

  assignee: User;
  usersOrgsId: number;
  taskId;
  task: Task;
  getTaskSubscription;

  constructor(private taskService: TaskService, private notificationService: NotificationService,
              private verificationService: UserVerificationService,
              private router: Router, private userService: UserService,
              private actRouter: ActivatedRoute) {

}

  ngOnInit() {
  //  getUserByUsersOrgsId
  this.taskId = this.actRouter.snapshot.paramMap.get('id');
  this.getTaskSubscription =  this.taskService.findTaskById(this.taskId).subscribe(data => {
    this.task = data;
    this.usersOrgsId = this.task.usersOrganizationsId;
    this.userService.getUserByUsersOrgsId(this.usersOrgsId).subscribe(user => {
      this.assignee = user;
    });
  });
  }

  ngOnDestroy() {
    // Unsubscribing
    if (this.getTaskSubscription) {
      this.getTaskSubscription.unsubscribe();
    }
  }
  backToTaskList() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
   // here we go   this.router.navigate(['/home/tasks/' + this.orgId]);
  });
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
    this.taskService.updateTask(updTask.id, updTask).subscribe(data => {
      console.log(data);
    }, validationErr => {
      this.notificationService.showErrorHTMLMessage(validationErr.error.message, 'Invalid input');
    });
  }
}
