import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { RoleService } from 'src/app/services/role.service';
import { User } from 'src/app/model/User';
import { Role } from 'src/app/model/Role';
import { element } from 'protractor';
import { Observable } from 'rxjs';
import { ConstantPool } from '@angular/compiler';

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
  getRolesAddSubscription;



  constructor(private userService: UserService, private roleService: RoleService) { }


  ngOnInit() {
    this.getUsersSubscription = this.userService.getAllUsers().subscribe(data => {
      this.users = data;
      console.log(this.users);
      for (let user of this.users) {
        this.userService.getRoles(user.id).subscribe(date2 => {
          user.roles = date2;
        });
      }
    });
    this.getRolesSubscription = this.roleService.getRoles().subscribe(roleService => {
      this.allRoles = roleService;
    });
  }

  ngOnDestroy() {

    // if(this.getUsersSubscription) {
    //   this.getUsersSubscription.unsubcribe();
    // }
    // if(this.activateUserSubscription) {
    //   this.activateUserSubscription.unsubcribe();
    // }
    // if(this.deactivateUserSubscription) {
    //   this.deactivateUserSubscription.unsubcribe();
    // }
    // if(this.getUserByEmailSubscription) {
    //   this.getUserByEmailSubscription.unsubcribe();
    // }
    // if(this.getRolesSubscription) {
    //   this.getRolesSubscription.unsubcribe();
    // }

  }

  getUsers() {
    this.getUsersSubscription = this.userService.getAllUsers().subscribe(data => {
      this.users = data;
      console.log(this.users);
    })
  }

  getUserRoles(user: User, role: Role) {
    if (user.roles) {
      return user.roles.some((userRole) => userRole.name === role.name);
    }
  }

  userAddRoleWithExisting(role: Role, user: User) {
    user.roles.push(role);
  }

  userRemoveRole(role: Role, user: User) {
    user.roles = user.roles.filter(r => r.name !== role.name);
  }

  toggleEditable(event, role: Role, user: User) {
    if (event.target.checked) {
      this.userAddRoleWithExisting(role, user);
    } else if (!event.target.checked) {
      this.userRemoveRole(role, user);
    }

    this.getRolesAddSubscription = this.userService.setRoles(this.toArray(user.roles), user.id).subscribe(data => {
      console.log(data)
    })
  }

  private toArray(roles: Role[]) {
    let roleIds: Number[] = [];

    roles.forEach(role => {
      roleIds.push(role.id)
    });
    return roleIds;
  }

  deactivateUser(user) {
    let id: Number = user.id;
    this.deactivateUserSubscription = this.userService.deleteUser(id).subscribe(data => {
      if (user.id === id) {
        user.active = false;
      }
      console.log(data);
    });
  }

  activateUser(user) {
    let id: Number = user.id;
    this.activateUserSubscription = this.userService.activateUser(id).subscribe(data => {
      if (user.id === id) {
        user.active = true;
      }
      console.log(data);
    });
  }

  getUserByEmail(inputEmail: String) {
    this.getUserByEmailSubscription = this.userService.getUserbyEmail(this.inputEmail).subscribe(user => {
      let userList: User[] = []; userList.push(user); this.users = userList;
      console.log(this.users);
    });
  }


}
