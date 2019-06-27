import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OrganizationService} from '../../services/organization.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Organization} from '../../model/Organization';
import {UserVerificationService} from '../../services/user-verification.service';

@Component({
  selector: 'app-update-organization',
  templateUrl: './update-organization.component.html',
  styleUrls: ['./update-organization.component.scss']
})
export class UpdateOrganizationComponent implements OnInit {

  updateOrganizationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private organizationService: OrganizationService, private router: Router,
              private actRouter: ActivatedRoute, private userVerificationService: UserVerificationService) {
    this.updateOrganizationForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]]
    });
  }

  get name() {
    return this.updateOrganizationForm.get('name');
  }

  get address() {
    return this.updateOrganizationForm.get('address');
  }

  onSubmit(organization: Organization) {
    if (organization.name !== '' && organization.address !== '') {
      console.log(organization);
      this.organizationService.updateOrganization(this.actRouter.snapshot.paramMap.get('id'), organization).subscribe(() => {
        this.router.navigate(['home/organizations']);
      });
    }
  }

  ngOnInit() {
    this.organizationService.findById(this.actRouter.snapshot.paramMap.get('id')).subscribe(organization => {
      this.updateOrganizationForm.controls['name'].setValue(organization.name);
      this.updateOrganizationForm.controls['address'].setValue(organization.address);
    });
  }

  onClickCancel() {
    this.router.navigate(['home/organizations']);
  }
}

