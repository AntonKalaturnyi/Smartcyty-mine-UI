import {Component, OnInit} from '@angular/core';
import {OrganizationService} from '../../services/organization.service';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.scss']
})
export class CreateOrganizationComponent implements OnInit {

  createOrganization;

  constructor(private formBuilder: FormBuilder, private organizationServise: OrganizationService, private router: Router) {
    this.createOrganization = this.formBuilder.group({
      name: '',
      address: ''
    });
  }

  onSubmit(organization) {
    // Process checkout data here
    console.log(organization);
    this.organizationServise.addOrganization(organization).subscribe(() => {
      this.router.navigate(['home/organizations']);
    });
  }

  ngOnInit() {
  }

}
