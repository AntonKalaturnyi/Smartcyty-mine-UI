import {Component, OnInit} from '@angular/core';
import {OrganizationService} from 'src/app/services/organization.service';
import {Router} from '@angular/router';
import {Organization} from '../../model/Organization';
import {TaskService} from '../../services/task.service';
import {DialogService} from '../../services/dialog.service';
import {User} from '../../model/User';
import {UserService} from '../../services/user.service';
import {UserVerificationService} from '../../services/user-verification.service';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent implements OnInit {

  organizations: Organization[];
  authenticatedUser: User;
  isAdmin: boolean;
  isRespons: boolean;
  isSuper: boolean;
  isLoading: boolean;

  constructor(private userVerificationService: UserVerificationService, private organizationService: OrganizationService,
              private taskService: TaskService, private router: Router, private dialogService: DialogService,
              private userService: UserService, private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.isAdmin = this.userVerificationService.adminVerification();
    this.isSuper = this.userVerificationService.supervisorVerification();
    this.isRespons = this.userVerificationService.responsiblePersonVerification();
    if (this.isAdmin || this.isSuper || this.isRespons) {
      this.userService.getAuthenticatedUser().subscribe(authenticatedUser => {
        this.authenticatedUser = authenticatedUser;
        this.organizationService.findAllOrganizations().subscribe(data => {
          this.organizations = data;
          if (!this.isAdmin && !this.isSuper && this.isRespons) {
            this.organizations = this.organizations.filter(organization => organization.responsiblePersons
              .some((item) => item.id === this.authenticatedUser.id));
          }
          if (!this.isAdmin) {
            this.setNumberTasks();
          }
          this.isLoading = false;
        });
      });
    } else {
      this.isLoading = false;
    }
  }

  setNumberTasks() {
    this.organizations.forEach((item) => {
      this.taskService.findTasksByOrganizationId(item.id).subscribe(data => {
        item.numberDone = data.filter(task => !task.taskStatus.localeCompare('Done')).length;
        item.numberInProgress = data.filter(task => !task.taskStatus.localeCompare('InProgress')).length;
        item.numberToDo = data.filter(task => !task.taskStatus.localeCompare('Todo')).length;
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
        this.organizationService.deleteOrganization(organization.id).subscribe(() => {
          this.organizations = this.organizations.filter(item => item !== organization);
          this.notificationService.showSuccessWithTimeout('Organization has been successfully deleted.',
            'Delete organization',
            3200);
        }, error => {
          this.notificationService.showErrorHTMLMessage('Delete organization error', 'Error');
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
