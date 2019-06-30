import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PasswordResetViaMailService } from '../services/password-reset-via-mail.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-password-reset-via-mail',
  templateUrl: './password-reset-via-mail.component.html',
  styleUrls: ['./password-reset-via-mail.component.scss']
})
export class PasswordResetViaMailComponent implements OnInit {

  private await: boolean;
  private done: boolean;
  private token: string;
  private resetPasswordForm: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private notificationService: NotificationService,
    private formBuilder: FormBuilder, private passResetService: PasswordResetViaMailService) { 
    this.resetPasswordForm = this.formBuilder.group({
      password: '',
      confirmPassword: ''
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.token = params['token'];
    });
  }

  onSubmit(newPass: string) {
    this.await = true;
    this.passResetService.updatePasswordViaToken(this.token, newPass).subscribe(
      response => {
        this.done = true;
        this.await = false;
      }, error => {
        this.await = false;
        this.notificationService.showErrorWithTimeout('Perhaps the provided token is invalid or has expired.', 'Password reset attempt unsuccessful.', 4200);
      }
    );
  } 

}
