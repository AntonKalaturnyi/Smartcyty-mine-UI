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
  users: any;
  roles: any;


  constructor(private data: UserService) {}


  ngOnInit() {
    this.data.getAllUsers().subscribe(data => {
      this.users = data;
      for(let user of this.users) {
        this.data.getRoles(user.id).subscribe(data => {
            this.roles = data;
        });
      }
    });
  }

  getUsers() {
    this.data.getAllUsers().subscribe(data => {
      this.users = data;
      console.log(this.users);
    })
  }

  deactivateUser(user) {
    let id = user.id;
    this.data.deleteUser(id).subscribe(data => {
      if(user.id === id) {
        user.active = false;
      }
      console.log(data);
    });
  }

  activateUser(user) {
    let id = user.id;
    user.active = true;
    this.data.updateUser(user, id).subscribe(data => {
      console.log(data);
    });
  }

  getUserByEmail(inputEmail) {
    this.data.getUserbyEmail(this.inputEmail).subscribe(user => {
      let userList: Object[] = []; userList.push(user); this.users = userList;
      console.log(this.users);
    });
  }
}
