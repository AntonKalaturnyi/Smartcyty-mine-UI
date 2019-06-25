import { Component, OnInit, NgModule } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import {  OrganizationService } from 'src/app/services/organization.service';
import { DateRange } from '@uiowa/date-range-picker';
import { TaskUpdateComponent } from '../task-update/task-update.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})

export class TaskListComponent implements OnInit {
  dateRange: DateRange;
  tasks;
  org: Object;
  orgId;

  constructor(private taskService: TaskService, private orgService: OrganizationService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.orgId = this.route.snapshot.paramMap.get("id");
    this.dateRange =  new DateRange(new Date());
    this.taskService.findTasksByOrganizationId(this.orgId)
    .subscribe(data => {
        this.tasks = data;
        console.log(this.tasks);
    });
    this.orgService.findById(this.orgId)
    .subscribe(data => {
      this.org = data;
      console.log(this.org)
    });
  }
  refOnComments(comId: Number){
    this.router.navigateByUrl('/home/comments/'+ comId);
  }
  handleDelete(id: Number){
    this.taskService.deleteTask(id);
    this.tasks = this.tasks.filter(item => item.id !== id);
  }

  handleEdit(id: Number) {
    TaskUpdateComponent.organizationId = this.orgId;
    this.router.navigateByUrl('/home/task/edit/' + id);
  }

  changeDate(dateRange: DateRange) {
    this.dateRange = dateRange;
    this.taskService.findTasksByDate(this.orgId, this.dateRange).subscribe(data => {
      this.tasks = data;
      console.log(this.tasks);
      console.log(this.org);
  });
  }

  handleTransactions(taskId: Number){
    this.router.navigateByUrl('/home/transactions/' + taskId);
  }

}