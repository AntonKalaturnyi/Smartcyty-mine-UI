import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OrganizationService} from '../../services/organization.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Organization} from '../../model/Organization';
import {UserVerificationService} from '../../services/user-verification.service';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-update-organization',
  templateUrl: './update-organization.component.html',
  styleUrls: ['./update-organization.component.scss']
})
export class UpdateOrganizationComponent implements OnInit {

  updateOrganizationForm: FormGroup;
  organization: Organization;

  constructor(private formBuilder: FormBuilder, private organizationService: OrganizationService, private router: Router,
              private actRouter: ActivatedRoute, private userVerificationService: UserVerificationService,
              private notificationService: NotificationService) {
    this.updateOrganizationForm = this.formBuilder.group({
      name: ['', [Validators.required,
        Validators.pattern('[a-zA-Z-]*'),
        Validators.minLength(3),
        Validators.maxLength(20)]],
      address: ['', [Validators.required,
        Validators.pattern('[a-zA-Z0-9. -]*'),
        Validators.minLength(3),
        Validators.maxLength(45)]]
    });
  }

  get name() {
    return this.updateOrganizationForm.get('name');
  }

  get address() {
    return this.updateOrganizationForm.get('address');
  }

  onSubmit(organization: Organization) {
    this.organizationService.updateOrganization(this.actRouter.snapshot.paramMap.get('id'), organization).subscribe(() => {
      this.router.navigate(['home/organizations']);
      this.notificationService.showSuccessWithTimeout('Organization has been successfully updated.',
        'Update organization',
        3200);
    }, (error) =>
      this.notificationService.showErrorHTMLMessage(error.error.message, 'Error'));
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

