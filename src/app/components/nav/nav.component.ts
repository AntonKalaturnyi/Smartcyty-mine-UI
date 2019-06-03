import { Component, OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import{ UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ComponentMessageService } from 'src/app/services/component-message.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {

  user: Object;

  constructor(private userService: UserService, private router: Router, private compMessage: ComponentMessageService) { 
  }

  ngOnInit() {
    this.userService.getUserbyEmail(localStorage.getItem('email')).subscribe(data =>{
      this.user = data;
  });
    this.compMessage.currentMessage.subscribe(user => {
      this.user = user;
      console.log(this.user);
    })
  };

  logOut() {
    // Process checkout data here
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.user=false;
    this.router.navigateByUrl('/home/signin');
  }

}
