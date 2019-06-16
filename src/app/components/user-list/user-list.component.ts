import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  inputEmail: string;
  //storing users
  users;
  roles;
  getUsersSubscription;
  deactivateUserSubscription;
  activateUserSubscription;
  getUserByEmailSubscription;


  constructor(private data: UserService) {}


  ngOnInit() {
    this.getUsersSubscription = this.data.getAllUsers().subscribe(data => {
      this.users = data;
      for(let user of this.users) {
        this.data.getRoles(user.id).subscribe(data => {
            this.roles = data;
        });
      }
    });
  }

  ngOnDestroy() {

    if(this.getUsersSubscription) {
      this.getUsersSubscription.unsubcribe();
    } 
    if(this.activateUserSubscription) {
      this.activateUserSubscription.unsubcribe();
    }
    if(this.deactivateUserSubscription) {
      this.deactivateUserSubscription.unsubcribe();
    }
    if(this.getUserByEmailSubscription) {
      this.getUserByEmailSubscription.unsubcribe();
    }

  }

  getUsers() {
    this.getUsersSubscription = this.data.getAllUsers().subscribe(data => {
      this.users = data;
      console.log(this.users);
    })
  }

  deactivateUser(user) {
    let id: Number = user.id;
    this.deactivateUserSubscription = this.data.deleteUser(id).subscribe(data => {
      if(user.id === id) {
        user.active = false;
      }
      console.log(data);
    });
  }

  activateUser(user) {
    let id: Number = user.id;
    this.activateUserSubscription = this.data.activateUser(id).subscribe(data => {
      if(user.id === id) {
        user.active = true;
      }
      console.log(data);
    });
  }

  getUserByEmail(inputEmail) {
    this.getUserByEmailSubscription = this.data.getUserbyEmail(this.inputEmail).subscribe(user => {
      let userList: Object[] = []; userList.push(user); this.users = userList;
      console.log(this.users);
    });
  }
}
