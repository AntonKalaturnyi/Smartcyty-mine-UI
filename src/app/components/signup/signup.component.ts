import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
 
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  checkoutForm;

  constructor(private formBuilder: FormBuilder, private userService: UserService,
              private router: Router, private notificationService: NotificationService) {
    this.checkoutForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      middleName: '',
      sex: '',
      phone: '',
      email: '',
      password: '',
      birthDate: '',
      registrationDate: '',
      updatedDate: ''
    });
  }

  ngOnInit() {
  }

  onSubmit(user) {
    // Process checkout data here
    user.birthDate = JSON.stringify(user.birthDate).replace('Z', '').replace('"', '').replace('"', '');
    this.userService.regUser(user).subscribe(data =>{
      this.notificationService.showSuccessHTMLMessage('User successfully created', 'SignUp');
      this.router.navigateByUrl('/home/signin');
    }, error => {
      console.log(error);
      this.notificationService.showErrorHTMLMessage(error.error.message, 'Invalid input');
    }
    );
  }

}
