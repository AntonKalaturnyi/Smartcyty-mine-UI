import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import{ UserService } from 'src/app/services/user.service';
import { tokenKey } from '@angular/core/src/view';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  checkoutForm;
  token;
  constructor(private formBuilder: FormBuilder, private userService: UserService) { 
    this.checkoutForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  ngOnInit() {
  }

  onSubmit(user) {
    // Process checkout data here
    console.log(user);
    this.userService.authUser(user);
  }

}
