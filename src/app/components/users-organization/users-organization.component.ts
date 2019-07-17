import {Component, OnInit} from '@angular/core';
import {OrganizationService} from '../../services/organization.service';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user.service';
import {Organization} from '../../model/Organization';
import {User} from '../../model/User';
import {UserVerificationService} from '../../services/user-verification.service';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-users-organization',
  templateUrl: './users-organization.component.html',
  styleUrls: ['./users-organization.component.scss']
})
export class UsersOrganizationComponent implements OnInit {

  organization: Organization;
  allUsers: User[];
  trueUsers: User[];
  isLoading: boolean;
  itemsPerPage: number;
  currentPage: number;

  constructor(private organizationService: OrganizationService, private userService: UserService,
              private actRouter: ActivatedRoute, private userVerificatioService: UserVerificationService,
              private notificationService: NotificationService) {
    this.itemsPerPage = 5;
    this.currentPage = 1;
  }

  ngOnInit() {
    this.isLoading = true;
    this.organizationService.findById(this.actRouter.snapshot.paramMap.get('id'))
      .subscribe(organization => {
        this.organization = organization;
        console.log(organization);
      });
    this.userService.getUsersByRoleId(4).subscribe(allUsers => {
      this.allUsers = allUsers;
      this.trueUsers = allUsers;
      this.isLoading = false;
    });
  }

  contain(user: User): boolean {
    if (this.organization && this.organization.responsiblePersons) {
      return this.organization.responsiblePersons.some((item) => item.id === user.id);
    }
  }

  check(e: any, user: User) {
    if (e.target.checked) {
      this.organizationService.addUserToOrganization(user.id, this.organization.id).subscribe(() => {
        this.organization.responsiblePersons.push(user);
        this.notificationService.showSuccessWithTimeout('User has been successfully added to organization.',
          'Add user to organization',
          3200);
      }, error => {
        e.target.checked = !e.target.checked;
        this.notificationService.showErrorHTMLMessage('Add user to organization error.', 'Error');
      });
    } else {
      this.organizationService.removeUserFromOrganization(user.id, this.organization.id).subscribe(() => {
        this.organization.responsiblePersons = this.organization.responsiblePersons.filter(el => el.id !== user.id);
        this.notificationService.showSuccessWithTimeout('User has been successfully removed from organization.',
          'Remove user from organization',
          3200);
      }, error => {
        e.target.checked = !e.target.checked;
        this.notificationService.showErrorHTMLMessage('Remove user from organization error.', 'Error');
      });
    }
  }

  showAllResponsible() {
    this.trueUsers = this.allUsers;
    this.currentPage = 1;
  }

  showOnlyInOrganization() {
    this.trueUsers = this.allUsers.filter((el) => this.contain(el));
    this.currentPage = 1;
  }

  showOnlyNotInOrganization() {
    this.trueUsers = this.allUsers.filter((el) => !this.contain(el));
    this.currentPage = 1;
  }
}


