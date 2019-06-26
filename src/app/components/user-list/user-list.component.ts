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
  userRoles: Number[] = [];
  getUsersSubscription;
  getRolesSubscription;
  deactivateUserSubscription;
  activateUserSubscription;
  getUserByEmailSubscription;
  getRolesAddSubscription;



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
    if(this.getRolesAddSubscription) {
      this.getRolesAddSubscription.unsubcribe();
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

  userAddRoleWithExisting(roleId: Number, id: Number) {
    for(let user of this.users) {
      if (user.id === id) {
        for (let role of user.roles) {
          if(role.id !== roleId) {
            this.userRoles.push(role.id);
          }
        }
      }
    }
    this.userRoles.push(roleId);
    this.getRolesAddSubscription = this.data.setRoles(this.userRoles, id).subscribe(data => {
      console.log(data)
    })
  }

  userRemoveRole(roleId: Number, id: Number) {
    console.log(this.userRoles);
    for (let user of this.users) {
      if(user.id === id) {
        for (let role of user.roles) {
          this.userRoles.push(role.id);
        }
      }
    }
    console.log(this.userRoles);
    this.getRolesAddSubscription = this.data.setRoles(this.userRoles, id).subscribe(data => {
      console.log(data)
    })
  }

  toggleEditable(event, roleId:Number, id:Number) {
    if(event.target.checked) {
      this.userAddRoleWithExisting(roleId, id);
    } else if(!event.target.checked) {
      this.userRemoveRole(roleId, id);
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
