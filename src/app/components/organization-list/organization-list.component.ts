import {Component, OnInit} from '@angular/core';
import {OrganizationService} from 'src/app/services/organization.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent implements OnInit {

  organizations;

  constructor(private organizationService: OrganizationService, private router: Router) {

  }

  ngOnInit() {
    this.organizationService.findAllOrganizations().subscribe(data => {
      this.organizations = data;
      console.log(this.organizations);
    });
  }

  onClickAdd() {
    this.router.navigateByUrl('/home/create-organization');
  }

  onClickDelete(organization) {
    console.log(organization);
    this.organizationService.deleteOrganization(organization.id).subscribe(() => {
      this.organizations = this.organizations.filter(item => item !== organization);
    });
  }


  onClickUpdate(id) {
    this.router.navigateByUrl('/home/update-organization/' + id);
  }

}
