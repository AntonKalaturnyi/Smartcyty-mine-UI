import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {

  checkoutForm;

  constructor(private taskService: TaskService, private formBuilder: FormBuilder, private router: Router, private actRouter: ActivatedRoute) {
    this.checkoutForm = this.formBuilder.group({ 
      title: '',
      description: '',
      budget: '',
      approvedBudget: '',
      deadlineDate: '2019-07-01T21:40:00.123',
      taskStatus: '',
      usersOrganizationsId: this.actRouter.snapshot.paramMap.get('id')
    });
   }

  ngOnInit() {
  }

  onSubmit(task) {
    // Process checkout data here
    this.taskService.createTask(task);
    this.router.navigateByUrl('/home/organizations');
  }

}
