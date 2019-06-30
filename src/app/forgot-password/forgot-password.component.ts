import { Component, OnInit } from '@angular/core';
import { PasswordResetViaMailService } from '../services/password-reset-via-mail.service';
import { NotificationService } from '../services/notification.service';
import { Form, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  await: boolean;
  done: boolean;
  emailForm: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    private passResetService: PasswordResetViaMailService, 
    private notificationService: NotificationService) { 
      this.emailForm = this.formBuilder.group({
        email: ''
      });
  }

  ngOnInit() {
  }

  onSubmit(email: string) {
    this.await = true;
    this.passResetService.requestResetPasswordMail(email).subscribe(
      response => {
        this.done = true;
        this.await = false;
      }, error => {
        this.await = false;
        this.notificationService.showErrorWithTimeout('Something went wrong.', 'Unknown error', 4200);
      }
    );
  } 

}
