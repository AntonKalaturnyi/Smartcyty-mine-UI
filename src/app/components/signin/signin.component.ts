import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ComponentMessageService } from 'src/app/services/component-message.service';
import { NotificationService } from 'src/app/services/notification.service';
import { User } from 'src/app/model/User';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  checkoutForm;
  user: User;
  errorMsg: string;
  constructor(private formBuilder: FormBuilder, private userService: UserService, 
    private router: Router, private compMessage: ComponentMessageService, 
    private notificationService : NotificationService) {
    this.checkoutForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  ngOnInit() {
  }

  onSubmit(user) {
    // Process checkout data here
    this.userService.authUser(user).subscribe(data => {
      console.log(data);
      data.roles.forEach(element => {
          localStorage.setItem(element.name, 'true');
        });
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', data.username);
      this.userService.getUserbyEmail(user.username).subscribe(data => {
        this.user = data;
        this.compMessage.changeMessage(this.user);
        this.router.navigateByUrl('/home/organizations');
    });
  }, error => {
      this.errorMsg = error;
      this.notificationService.showErrorWithTimeout('Password or email is incorrect', 'Bad credantials', 4200);
  }
  );
  } 

  toSignUp(){
    this.router.navigateByUrl('/home/signup');
  }
}
