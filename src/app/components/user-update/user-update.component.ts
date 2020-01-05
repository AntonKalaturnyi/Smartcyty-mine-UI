import { Component, OnInit, NgModule } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { User } from 'src/app/model/User';
import { NgIf } from '@angular/common';



@NgModule({
  imports: [
    ReactiveFormsModule
  ]
})
@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

  editProfileForm;
  user: User;
  userUpdateSubscription;
  getAuthUserSubscription;
  errorMsg: string;
  isResultReady = false;


  constructor(private userService: UserService, private formBuilder: FormBuilder) {
    this.editProfileForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      middleName: '',
      sex: '',
      phone: '',
      email: '',
    });
  }

  ngOnInit() {

    this.getAuthUserSubscription = this.userService.getAuthenticatedUser().subscribe(user => {
      this.user = user;

      // Form initialization
      this.editProfileForm.controls.firstName.setValue(this.user.firstName);
      this.editProfileForm.controls.lastName.setValue(this.user.lastName);
      this.editProfileForm.controls.middleName.setValue(this.user.middleName);
      this.editProfileForm.controls.phone.setValue(this.user.phone);
    });
    console.log('User ' + this.user);
  }

  ngOnDestroy() {

    // Unsubscribing
    if (this.userUpdateSubscription) {
      this.userUpdateSubscription.unsubscribe();
    }

    if (this.getAuthUserSubscription) {
      this.getAuthUserSubscription.unsubscribe();
    }
  }

  onEditFormSubmit(updatedUser: User) {

    this.errorMsg = null;
    this.isResultReady = false;

    this.user.firstName = updatedUser.firstName;
    this.user.lastName = updatedUser.lastName;
    this.user.middleName = updatedUser.middleName;
    this.user.phone = updatedUser.phone;
    this.user.sex = updatedUser.sex;

    this.userUpdateSubscription = this.userService.updateUser(this.user).subscribe(
      user => {
        this.userService.refreshUsernameOnNavbar(this.user);
        this.isResultReady = true;
      },
      error => {
        this.errorMsg = error;
        this.isResultReady = true;
      }
    );



  }
}

