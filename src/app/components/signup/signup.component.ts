import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import{ UserService } from 'src/app/services/user.service';
import { Router } from "@angular/router";
 
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  checkoutForm;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.checkoutForm = this.formBuilder.group({
      name: '',
      surname: '',
      phoneNumber: '',
      email: '',
      password: ''
    });
  }

  ngOnInit() {
  }

  onSubmit(user) {
    // Process checkout data here
    this.userService.regUser(user);
    this.router.navigateByUrl('/home/signin');
  }

}
