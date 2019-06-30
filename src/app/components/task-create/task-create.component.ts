import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { Task } from 'src/app/model/Task';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/services/user.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserVerificationService } from 'src/app/services/user-verification.service';
import { WebSocketService } from 'src/app/services/webSocket.service';

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
    private userVerfService: UserVerificationService, private webSocketService: WebSocketService) {
    this.checkoutForm = this.formBuilder.group({
      title: ['',[Validators.required]],
      description: ['',[Validators.required, Validators.minLength(3)]],
      budget: [''],
      approvedBudget: [''],
      deadlineDate: ['',[Validators.required]],
      taskStatus: [''],
      usersOrganizationsId: ['']
    });
  }

  get title() {
    return this.checkoutForm.get('title');
  }

  get description() {
    return this.checkoutForm.get('description');
  }

  get budget() {
    return this.checkoutForm.get('budget');
  }

  get approvedBudget() {
    return this.checkoutForm.get('approvedBudget');
  }

  ngOnInit() {
    this.email = localStorage.getItem('email');
    
    this.orgId = this.actRouter.snapshot.paramMap.get('id');
    this.userService.getUsersByOrganizationId(this.orgId).subscribe(allUsers => {
      this.allUsers = allUsers;
    });
  }

  onSubmit(task: Task) {
    // Process checkout data here
    if (this.userVerfService.supervisorVerification()) {
      task.budget = task.approvedBudget;
    } else {
      task.usersOrganizationsId = this.allUsers.filter(item => item.email === localStorage.getItem('email'))[0].id;
      task.approvedBudget = 0;
    }
    if(!task.budget){
      task.budget = 0;
    }
    if(!task.approvedBudget){
      task.approvedBudget = 0;
    }
    task.taskStatus = 'Todo';
    task.deadlineDate = JSON.stringify(task.deadlineDate).replace('Z', '').replace('"', '').replace('"', '');
    this.taskService.findUsersOrgsId(task.usersOrganizationsId.toString(), this.orgId).subscribe((res) => {
      task.usersOrganizationsId = Number.parseInt(res.toString());
      this.webSocketService.sendTask(task);
      this.router.navigateByUrl('/home/organizations');
      // this.taskService.createTask(task).subscribe(data => {
      //   this.webSocketService.sendTask(task);
      //   this.notificationService.showSuccessHTMLMessage('Task successfully created', 'Task create');
      //   this.router.navigateByUrl('/home/organizations');
      // }, error => {
      //   this.notificationService.showErrorHTMLMessage(error.error.message, 'Invalid input')
      // });
    }
      , () => {
        this.notificationService.showErrorHTMLMessage('Please assign responsible person', 'Invalid input')
      }
    );

  }

}
