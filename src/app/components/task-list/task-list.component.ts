import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  //storing users
  tasks: Object;
  orgName: Object;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.findTasksByOrganizationId(1).subscribe(data => {
      this.tasks = data;
      console.log(this.tasks);
    });
  }

}