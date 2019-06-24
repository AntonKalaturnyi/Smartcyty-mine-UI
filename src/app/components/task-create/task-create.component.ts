import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { Task } from 'src/app/model/Task';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/services/user.service';

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
  
  constructor(private taskService: TaskService, private userService: UserService, private formBuilder: FormBuilder, private router: Router, private actRouter: ActivatedRoute) {
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
    this.orgId = this.actRouter.snapshot.paramMap.get('id');
    this.userService.getUsersByOrganizationId(this.orgId).subscribe(allUsers => {
      this.allUsers = allUsers;
    });
  }

  onSubmit(task: Task) {
    // Process checkout data here
    task.deadlineDate = task.deadlineDate.toJSON().replace('Z','');
    this.taskService.findUsersOrgsId(task.usersOrganizationsId.toString(), this.orgId).subscribe((res)=>{
      task.usersOrganizationsId = Number.parseInt(res.toString());
      console.log(task.usersOrganizationsId);
      console.log(res.toString());
      this.taskService.createTask(task);
    });
    this.router.navigateByUrl('/home/organizations');
  }

}
