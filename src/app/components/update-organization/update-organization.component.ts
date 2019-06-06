import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {OrganizationService} from '../../services/organization.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-update-organization',
  templateUrl: './update-organization.component.html',
  styleUrls: ['./update-organization.component.scss']
})
export class UpdateOrganizationComponent implements OnInit {

  updateOrganizationForm;

  constructor(private formBuilder: FormBuilder, private organizationService: OrganizationService, private router: Router,
              private actRouter: ActivatedRoute) {
    this.updateOrganizationForm = this.formBuilder.group({
      name: '',
      address: ''
    });
  }

  onSubmit(organization) {
    console.log(organization);
    this.organizationService.updateOrganization(this.actRouter.snapshot.paramMap.get('id'), organization).subscribe(() => {
      this.router.navigate(['home/organizations']);
    });
  }

  ngOnInit() {
    this.organizationService.findById(this.actRouter.snapshot.paramMap.get('id')).subscribe(organization => {
      this.updateOrganizationForm.controls['name'].setValue(organization.name);
      this.updateOrganizationForm.controls['address'].setValue(organization.address);
    });
  }
}

