import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ComponentMessageService } from 'src/app/services/component-message.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  checkoutForm;
  user: any;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private compMessage: ComponentMessageService) {
    this.checkoutForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  ngOnInit() {
  }

  onSubmit(user) {
    // Process checkout data here
    this.userService.authUser(user);
    new Promise(resolve => {
      setTimeout(() => {
          this.userService.getUserbyEmail(user.username).subscribe(data => {
          this.user = data;
          this.compMessage.changeMessage(this.user);
        }); 
        this.router.navigateByUrl('/home/organizations')
      }, 800);
    });
  }

}
