import {Component, OnInit} from '@angular/core';
import {OrganizationService} from 'src/app/services/organization.service';
import {Router} from '@angular/router';
import {Organization} from '../../model/Organization';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent implements OnInit {

  organizations: Organization[];

  constructor(private organizationService: OrganizationService, private router: Router) {

  }

  ngOnInit() {
    this.organizationService.findAllOrganizations().subscribe(data => {
      this.organizations = data;
      console.log(this.organizations);
    });
  }

  onClickCreateOrganization() {
    this.router.navigateByUrl('/home/create-organization');
  }

  onClickDeleteOrganization(organization: Organization) {
    console.log(organization);
    this.organizationService.deleteOrganization(organization.id).subscribe(() => {
      this.organizations = this.organizations.filter(item => item !== organization);
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
