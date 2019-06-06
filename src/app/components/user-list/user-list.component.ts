import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  //storing users
  users: Object;
  checkoutForm;

  constructor(private formBuilder: FormBuilder, private data: UserService) { 
    this.checkoutForm = this.formBuilder.group({
      email: ''
    });
  }

  ngOnInit() {
    this.data.getAllUsers().subscribe(data => {
        this.users = data;
        console.log(this.users);
    });
  }

  searchByEmail(obj){
    console.log(obj);
    this.data.getUserbyEmail(obj.email).subscribe(user => {
      this.users = user;
      console.log(this.users);
    })
  }

}
