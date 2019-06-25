import { Component, OnInit, NgModule } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Task } from 'src/app/model/Task';

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.scss']
})
export class TaskUpdateComponent implements OnInit {

  static organizationId: number;
  taskEditForm;
  taskId;
  task : Task;
  taskUpdateSubscription;
  getTaskSubscription;

  constructor(private service: TaskService, private formBuilder: FormBuilder, private router: Router, private actRouter: ActivatedRoute, private location: Location) {

    this.taskEditForm = this.formBuilder.group({
      title: '',
      description: '',
      budget: '',
      approvedBudget: '',
      deadlineDate: '',
      taskStatus: '',
  });
}

  ngOnInit() {
    this.taskId = this.actRouter.snapshot.paramMap.get('id');
    console.log('TASK ID: ' + this.taskId);
    this.getTaskSubscription =  this.service.findTaskById(this.taskId).subscribe(data => {
      this.task = data;
      this.taskEditForm.controls['title'].setValue(this.task.title);
      this.taskEditForm.controls['description'].setValue(this.task.description);
      this.taskEditForm.controls['budget'].setValue(this.task.budget);
      this.taskEditForm.controls['approvedBudget'].setValue(this.task.approvedBudget);
      this.taskEditForm.controls['deadlineDate'].setValue(this.task.deadlineDate);
      this.taskEditForm.controls['taskStatus'].setValue(this.task.taskStatus);
    });
  }

  ngOnDestroy() {
    // Unsubscribing
    if (this.getTaskSubscription) {
      this.getTaskSubscription.unsubscribe();
    }
  }

  onSubmit(updatedTask: Task) {
    // Process checkout data here
    console.log('TASK UPDATE TITLE: ' + updatedTask.taskStatus.toString());
    this.task.title = updatedTask.title;
    this.task.description = updatedTask.description;
    this.task.budget = updatedTask.budget;
    this.task.approvedBudget = updatedTask.approvedBudget;
    this.task.deadlineDate = JSON.stringify(updatedTask.deadlineDate).replace('Z','').replace('"', '').replace('"', '');
    this.task.taskStatus = updatedTask.taskStatus.toString();
    this.service.updateTask(this.taskId, this.task ).subscribe(data =>{
      console.log(data);
      this.router.navigate(['home/tasks/' + TaskUpdateComponent.organizationId]);
    });
    
  }
}