import {Component, OnInit} from '@angular/core';
import {TaskService} from 'src/app/services/task.service';
import {ActivatedRoute, Router} from '@angular/router';
import {OrganizationService} from 'src/app/services/organization.service';
import {DateRange} from '@uiowa/date-range-picker';
import {TaskUpdateComponent} from '../task-update/task-update.component';
import {NotificationService} from 'src/app/services/notification.service';
import {Task} from '../../model/Task';
import {UserVerificationService} from '../../services/user-verification.service';

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
              private route: ActivatedRoute, private router: Router,
              private notificationService: NotificationService, private verificationService: UserVerificationService) {
  }

  ngOnInit() {
    this.orgId = this.route.snapshot.paramMap.get('id');
    this.dateRange = new DateRange(new Date());
    this.taskService.findTasksByOrganizationId(this.orgId)
      .subscribe(data => {
        this.tasks = data;
      });
    this.orgService.findById(this.orgId)
      .subscribe(data => {
        this.org = data;
      });
  }

  refOnComments(comId: Number) {
    this.router.navigateByUrl('/home/comments/' + comId);
  }

  handleDelete(id: Number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(item => item.id !== id);
    }, error => {
      this.notificationService.showErrorHTMLMessage(error.error.message, 'Task delete');
    });
}

  handleEdit(id: Number) {
    TaskUpdateComponent.organizationId = this.orgId;
    this.router.navigateByUrl('/home/task/edit/' + id);
  }

  onDblClickTaskDetails(id: number) {
    this.router.navigateByUrl('/home/task/details/' + id);
  }

  changeDate(dateRange: DateRange) {
    this.dateRange = dateRange;
    this.taskService.findTasksByDate(this.orgId, this.dateRange).subscribe(data => {
      this.tasks = data;
    });
  }

  handleTransactions(taskId: Number) {
    this.router.navigateByUrl('/home/transactions/' + taskId);
  }


  approveBudget(updTask: Task) {
    if (this.verificationService.supervisorVerification() && updTask.approvedBudget !== updTask.budget) {
      this.taskService.findTaskById((+updTask.id).toString())
      .subscribe(data => {
        updTask.approvedBudget = updTask.budget;
        updTask.usersOrganizationsId = data.usersOrganizationsId;
        this.taskService.updateTask(updTask.id, updTask).subscribe(dat => {
          console.log('****Task update****' + dat);
        }, validationErr => {
            this.notificationService.showErrorHTMLMessage(validationErr.error.message, 'Invalid input');
          });
      });
    } else {
      return;
    }

  }


}
