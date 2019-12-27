import { Component, OnInit, NgModule, OnDestroy } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/model/Task';
import { NotificationService } from 'src/app/services/notification.service';
import { UserVerificationService } from 'src/app/services/user-verification.service';

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.scss']
})
export class TaskUpdateComponent implements OnInit, OnDestroy {

  static organizationId: number;
  taskEditForm;
  taskId;
  task: Task;
  taskUpdateSubscription;
  getTaskSubscription;

  constructor(private service: TaskService, private notificationService: NotificationService,
              public verificationService: UserVerificationService,
              private formBuilder: FormBuilder, private router: Router,
              private actRouter: ActivatedRoute) {

    this.taskEditForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      budget: ['', [Validators.required]],
      approvedBudget: ['', [Validators.required]],
      deadlineDate: ['', [Validators.required]],
      taskStatus: [''],
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
      console.log(this.task.deadlineDate);
    });
  }

  ngOnDestroy() {
    // Unsubscribing
    if (this.getTaskSubscription) {
      this.getTaskSubscription.unsubscribe();
    }
  }

  get title() {
    return this.taskEditForm.get('title');
  }

  get description() {
    return this.taskEditForm.get('description');
  }

  get budget() {
    return this.taskEditForm.get('budget');
  }

  get approvedBudget() {
    return this.taskEditForm.get('approvedBudget');
  }

  onSubmit(updatedTask: Task) {
    // Process checkout data here
    if (this.verificationService.supervisorVerification()) {
      if(updatedTask.approvedBudget !== null) {
      this.task.budget = updatedTask.approvedBudget;
      this.task.approvedBudget = updatedTask.approvedBudget;
    } else {
      this.task.approvedBudget = updatedTask.approvedBudget;
    }
    } else {
      this.task.budget = updatedTask.budget;
    }
    this.task.title = updatedTask.title;
    this.task.description = updatedTask.description;

    this.task.deadlineDate = JSON.stringify(updatedTask.deadlineDate).replace('Z', '').replace('"', '').replace('"', '');
    this.task.taskStatus = updatedTask.taskStatus.toString();
    this.service.updateTask(this.taskId, this.task ).subscribe(data => {
      console.log(data);
     // this.router.navigate(['/home/task/details/' + this.taskId]);
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/home/task/details/' + this.taskId]);
  });
    }, validationErr => {
      this.notificationService.showErrorHTMLMessage(validationErr.error.message, 'Invalid input');
    });
 //   window.history.back();
  }
}
