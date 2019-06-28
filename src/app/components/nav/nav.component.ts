import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { BudgetService } from 'src/app/services/budget.service';
import { Router, NavigationStart } from '@angular/router';
import { ComponentMessageService } from 'src/app/services/component-message.service';
import { timer } from 'rxjs';
import { UserVerificationService } from 'src/app/services/user-verification.service';
import { User } from 'src/app/model/User';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {

  user: User;
  budget: Object;

  showBudgetDepositPopup: boolean;
  awaitingBudgetDepositFinish: boolean;
  
  constructor(private userService: UserService, private budgetService: 
    BudgetService, private router: Router, private compMessage: ComponentMessageService,
    private notificationService: NotificationService,
    private userVerfService: UserVerificationService) {
  }

  refreshBudget() {
    if(localStorage.email!=null){
      this.budgetService.getBudget().subscribe(data => {
        this.budget = data;
      });
    }
  }

  initUser() {
    if(localStorage.email!=null){
      this.userService.getAuthenticatedUser().subscribe(data => {
        this.user = data;
      });
    }
  }

  ngOnInit() {

    this.initUser();

    this.userService.change.subscribe(user => {
      this.user = user;
    });

    //Refresh budget value upon component load
    this.compMessage.currentMessage.subscribe((user: any) => {
      if(user.email!=null){
      this.user = user;
      }
    });


    // Refresh budget value upon route change
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.refreshBudget();
      }
    });

    // Refresh budget value couple of seconds
    timer(40 * 1000, 40 * 1000).subscribe(i => {
      this.refreshBudget();
    });
  };

  ngOnDestroy() {
    // Unsubscribing
    this.userService.change.unsubscribe();
  }

  logOut() {
    // Process checkout data here
    localStorage.clear();
    this.user = null;
    this.router.navigateByUrl('/home/signin');
  }

  toOrg() {
    this.router.navigateByUrl('/home/organizations');
  }
  
  toUsers(){
    this.router.navigateByUrl('/home/users');
  }

  toggleBudgetPopup($scope){
    this.showBudgetDepositPopup = !this.showBudgetDepositPopup;
  }

  depositBudget(amount: number){
    if(amount==0){
      return;
    }
    this.awaitingBudgetDepositFinish = true;
    this.showBudgetDepositPopup = false;
    var handler = () => {
      this.awaitingBudgetDepositFinish = false;
      this.refreshBudget();
    }
    var onErr = () => {
      this.awaitingBudgetDepositFinish = false;
      this.notificationService.showErrorWithTimeout('Could not update budget.', 'Something went wrong', 4200);
      this.refreshBudget();
    }
    if(amount>0){
      this.budgetService.deposit(amount).subscribe(handler,onErr);
    }else{
      this.budgetService.withdraw(-amount).subscribe(handler,onErr);
    }
  }

  canSeeBudget(){
    if(this.user!=null){
      return this.userVerfService.supervisorVerification()||this.userVerfService.responsiblePersonVerification();
    }
    return false;
  }
}
