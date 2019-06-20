import {Component, OnInit} from '@angular/core';
import {OrganizationService} from '../../services/organization.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Organization} from '../../model/Organization';

@Component({
  selector: 'app-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.scss']
})
export class CreateOrganizationComponent implements OnInit {

  createOrganizationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private organizationServise: OrganizationService, private router: Router) {
    this.createOrganizationForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]]
    });
  }

  get name() {
    return this.createOrganizationForm.get('name');
  }

  get address() {
    return this.createOrganizationForm.get('address');
  }

  onSubmit(organization: Organization) {
    // Process checkout data here
    console.log(organization);
    this.organizationServise.addOrganization(organization).subscribe(() => {
      this.router.navigate(['home/organizations']);
    });
  }

  onClickCancel() {
    this.router.navigate(['home/organizations']);
  }

  ngOnInit() {
  }

}
