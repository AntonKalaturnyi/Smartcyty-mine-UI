import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { Task } from 'src/app/model/Task';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/services/user.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserVerificationService } from 'src/app/services/user-verification.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})

export class TaskCreateComponent implements OnInit {

  checkoutForm;
  allUsers: User[];
  orgId: string;
  date: Date;
  email: string;
  constructor(private taskService: TaskService, private userService: UserService,
    private formBuilder: FormBuilder, private router: Router,
    private actRouter: ActivatedRoute, private notificationService: NotificationService,
    private userVerfService: UserVerificationService) {
    this.checkoutForm = this.formBuilder.group({
      title: '',
      description: '',
      budget: '',
      approvedBudget: '',
      deadlineDate: '',
      taskStatus: '',
      usersOrganizationsId: ''
    });
  }

  ngOnInit() {
    this.email = localStorage.getItem('email');
    console.log(this.email);
    
    this.orgId = this.actRouter.snapshot.paramMap.get('id');
    this.userService.getUsersByOrganizationId(this.orgId).subscribe(allUsers => {
      this.allUsers = allUsers;
    });
  }

  onSubmit(task: Task) {
    // Process checkout data here
    if (this.userVerfService.supervisorVerification) {
      task.budget = task.approvedBudget;
    } else {
      task.usersOrganizationsId = this.allUsers.filter(item => item.email === localStorage.getItem('email'))[0].id;
      task.approvedBudget = 0;
      console.log(task.usersOrganizationsId);
    }
    task.taskStatus = 'Todo';
    task.deadlineDate = JSON.stringify(task.deadlineDate).replace('Z', '').replace('"', '').replace('"', '');
    this.taskService.findUsersOrgsId(task.usersOrganizationsId.toString(), this.orgId).subscribe((res) => {
      task.usersOrganizationsId = Number.parseInt(res.toString());
      this.taskService.createTask(task).subscribe(data => {
        console.log(data);
        this.router.navigateByUrl('/home/organizations');
      }, error => {
        this.notificationService.showErrorHTMLMessage(error.error.message, 'Invalid input')
      });
    }
      , error => {
        this.notificationService.showErrorHTMLMessage('Please asign responsible person', 'Invalid input')
      }
    );

  }

}
