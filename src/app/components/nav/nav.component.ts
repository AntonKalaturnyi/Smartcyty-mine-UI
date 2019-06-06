import { Component, OnInit } from '@angular/core';
import{ UserService } from 'src/app/services/user.service';
import{ BudgetService } from 'src/app/services/budget.service';
import { Router, NavigationStart } from '@angular/router';
import { ComponentMessageService } from 'src/app/services/component-message.service';
import {timer} from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {

  user: Object;
  budget: Object;

  constructor(private userService: UserService, private budgetService: BudgetService, private router: Router, private compMessage: ComponentMessageService) {
  }

  refreshBudget(){
    this.budgetService.getBudget().subscribe(data=>{
      this.budget = data;
    });
  }

  ngOnInit() {
    this.userService.getAuthenticatedUser().subscribe(data =>{
      this.user = data;
    });

    // Refresh budget value upon component load
    this.refreshBudget();
    
    this.compMessage.currentMessage.subscribe(user => {
      this.user = user;
    });

    // Refresh budget value upon route change
    this.router.events.subscribe(event => {
      if(event instanceof NavigationStart){
        this.refreshBudget();
      }
    });

    // Refresh budget value couple of seconds
    timer(20*1000,20*1000).subscribe(i => {
      this.refreshBudget();
    });
  };

  logOut() {
    // Process checkout data here
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.user=false;
    this.router.navigateByUrl('/home/signin');
  }

}
