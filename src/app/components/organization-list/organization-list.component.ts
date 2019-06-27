import {Component, OnInit} from '@angular/core';
import {OrganizationService} from 'src/app/services/organization.service';
import {Router} from '@angular/router';
import {Organization} from '../../model/Organization';
import {TaskService} from '../../services/task.service';
import {Task} from '../../model/Task';
import {DialogService} from '../../services/dialog.service';
import {User} from '../../model/User';
import {UserService} from '../../services/user.service';
import {UserVerificationService} from '../../services/user-verification.service';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent implements OnInit {

  organizations: Organization[];
  authenticatedUser: User;

  constructor(private userVerificationService: UserVerificationService, private organizationService: OrganizationService,
              private taskService: TaskService, private router: Router,
              private dialogService: DialogService, private userService: UserService) {
  }

  ngOnInit() {
    console.log(this.userVerificationService.adminVerification());
    console.log(this.userVerificationService.supervisorVerification());
    console.log(this.userVerificationService.responsiblePersonVerification());
    console.log(this.userVerificationService.userVerification());
    this.userService.getAuthenticatedUser().subscribe(authenticatedUser => {
      this.authenticatedUser = authenticatedUser;
      this.organizationService.findAllOrganizations().subscribe(data => {
        this.organizations = data;
        if (!this.userVerificationService.adminVerification() && !this.userVerificationService.supervisorVerification()
          && this.userVerificationService.responsiblePersonVerification()) {
          this.organizations = this.organizations.filter(organization => organization.responsiblePersons
            .some((item) => item.id === this.authenticatedUser.id));
        }
        this.setNumberTasks();
      });
    });
  }

  setNumberTasks() {
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
