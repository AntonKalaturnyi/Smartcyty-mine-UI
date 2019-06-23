import {Component, OnInit} from '@angular/core';
import {OrganizationService} from 'src/app/services/organization.service';
import {Router} from '@angular/router';
import {Organization} from '../../model/Organization';
import {TaskService} from '../../services/task.service';
import {Task} from '../../model/Task';
import {DialogService} from '../../services/dialog.service';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent implements OnInit {

  organizations: Organization[];

  constructor(private organizationService: OrganizationService, private taskService: TaskService, private router: Router,
              private dialogService: DialogService) {

  }

  ngOnInit() {
    this.organizationService.findAllOrganizations().subscribe(data => {
      this.organizations = data;
      this.numberTasks();
      console.log(this.organizations);
    });
  }

  numberTasks() {
    let tasks: Task[];
    this.organizations.forEach((item) => {
      this.taskService.findTasksByOrganizationId(item.id).subscribe(data => {
        tasks = data;
        item.numberDone = tasks.filter(task => !task.taskStatus.localeCompare('Done')).length;
        item.numberInProgress = tasks.filter(task => !task.taskStatus.localeCompare('InProgress')).length;
        item.numberToDo = tasks.filter(task => !task.taskStatus.localeCompare('Todo')).length;
      });
    });
  }

  onClickCreateOrganization() {
    this.router.navigateByUrl('/home/create-organization');
  }

  onClickDeleteOrganization(organization: Organization) {
    this.dialogService.openConfirmDialog('Are you sure to delete this organization ?')
      .afterClosed().subscribe(res => {
      if (res) {
        console.log(organization);
        this.organizationService.deleteOrganization(organization.id).subscribe(() => {
          this.organizations = this.organizations.filter(item => item !== organization);
        });
      }
    });
  }

  onClickUpdateOrganization(id: number) {
    this.router.navigateByUrl('/home/update-organization/' + id);
  }

  onClickCreateTask(id: number) {
    this.router.navigateByUrl('/home/task/create/' + id);
  }

  onDblClickTasksList(id: number) {
    this.router.navigateByUrl('/home/tasks/' + id);
  }

  onClickUsersOrganization(id: number) {
    this.router.navigateByUrl('/home/users-organization/' + id);
  }

}
