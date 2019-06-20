import { Component, OnInit, NgModule } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import {  OrganizationService } from 'src/app/services/organization.service';
import { DateRange } from '@uiowa/date-range-picker';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})

export class TaskListComponent implements OnInit {
  dateRange: DateRange;
  tasks: Object;
  org: Object;

  constructor(private taskService: TaskService, private orgService: OrganizationService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.dateRange =  new DateRange(new Date());
    this.taskService.findTasksByOrganizationId(this.route.snapshot.paramMap.get("id"))
    .subscribe(data => {
        this.tasks = data;
        console.log(this.tasks);
    });
    this.orgService.findById(this.route.snapshot.paramMap.get("id"))
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
  }

  handleEdit(id: Number){
    this.router.navigateByUrl('/home/task/edit/' + id);
  }

  changeDate(dateRange: DateRange) {
    this.dateRange = dateRange;
    this.taskService.findTasksByDate(this.route.snapshot.paramMap.get("id"),this.dateRange).subscribe(data => {
      this.tasks = data;
      console.log(this.tasks);
      console.log(this.org);
  });
  }

  handleTransactions(taskId: Number){
    this.router.navigateByUrl('/home/transactions/' + taskId);
  }

}