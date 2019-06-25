import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { RoleService } from 'src/app/services/role.service';
import { User } from 'src/app/model/User';
import { Role } from 'src/app/model/Role';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  inputEmail: String;
  //storing users
  users: User[];
  roles: Role[];
  allRoles: Role[];
  selectedRoles: Role[];
  getUsersSubscription;
  getRolesSubscription;
  deactivateUserSubscription;
  activateUserSubscription;
  getUserByEmailSubscription;



  constructor(private data: UserService, private roleService: RoleService) {}


  ngOnInit() {
    this.getUsersSubscription = this.data.getAllUsers().subscribe(data => {
      this.users = data;
      for(let user of this.users) {
        this.data.getRoles(user.id).subscribe(data => {
            user.roles = data;
        });
      }
    });
    this.getRolesSubscription = this.roleService.getRoles().subscribe(roleService => {
      this.allRoles = roleService;
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
    if(this.getRolesSubscription) {
      this.getRolesSubscription.unsubcribe();
    }

  }

  getUsers() {
    this.getUsersSubscription = this.data.getAllUsers().subscribe(data => {
      this.users = data;
      console.log(this.users);
    })
  }

  getUserRoles(user: User, role: Role) {
    if(user.roles) {
      return user.roles.some((userRole) => userRole.name === role.name);
    }
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

  getUserByEmail(inputEmail:String) {
    this.getUserByEmailSubscription = this.data.getUserbyEmail(this.inputEmail).subscribe(user => {
      let userList: User[] = []; userList.push(user); this.users = userList;
      console.log(this.users);
    });
  }
}
