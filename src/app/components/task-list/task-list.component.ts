import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import {  OrganizationService } from 'src/app/services/organization.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  tasks: Object;
  org: Object;

  constructor(private taskService: TaskService, private orgService: OrganizationService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
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
  refOnComments(comId){
    this.router.navigateByUrl('/home/comments/'+ comId);
  }
  handleDelete(id){
    this.taskService.deleteTask(id);
  }

  handleEdit(id){
    this.router.navigateByUrl('/home/task/edit/' + id);
  }

}