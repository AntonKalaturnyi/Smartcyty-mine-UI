import { Component, OnInit, NgModule } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';


@NgModule({
  imports: [
    ReactiveFormsModule
  ],
})
@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

  editProfileForm;
  user: any;


  constructor(private userService: UserService, private formBuilder: FormBuilder) {
    this.editProfileForm = this.formBuilder.group({
      username: '',
      surname: '',
      phoneNumber: '',
      email: '',
      password: ''
    });
  }

  ngOnInit() {

    this.userService.getAuthenticatedUser().subscribe(user => {
      this.user = user;
    });


    console.log("User " + this.user);

  }

  onEditFormSubmit(updatedUser: any) {

    if (updatedUser.username != "") {
      this.user.name = updatedUser.username;
    }
    if (updatedUser.surname != "") {
      this.user.surname = updatedUser.surname;
    }
    if (updatedUser.phoneNumber != "") {
      this.user.phoneNumber = updatedUser.phoneNumber;
    }
    if (updatedUser.email != "") {
      this.user.email = updatedUser.email;
    }


    this.userService.updateUser(this.user, this.user.id).subscribe();

    window.location.reload();

    console.log("User is updated!!!");
  }
}

