import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { RoleService } from 'src/app/services/role.service';
import { User } from 'src/app/model/User';
import { Role } from 'src/app/model/Role';
import { element } from 'protractor';
import { Observable } from 'rxjs';
import { ConstantPool } from '@angular/compiler';
import { UserVerificationService } from 'src/app/services/user-verification.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  inputName: string;
  //storing users
  users: User[];
  allUsers: User[];
  roles: Role[];
  allRoles: Role[];
  selectedRoles: Role[];
  userId: number;
  authenticationUser: User;
  getUsersSubscription;
  getRolesSubscription;
  deactivateUserSubscription;
  activateUserSubscription;
  getUserByEmailSubscription;
  getRolesAddSubscription;



  constructor(private userService: UserService, private roleService: RoleService, 
    public userVerificationService: UserVerificationService) { }


  ngOnInit() {
    console.log(this.userVerificationService.adminVerification());
    this.userService.getAuthenticatedUser().subscribe(authUser => {
      this.userId = authUser.id;
      this.authenticationUser = authUser;
      this.getUsersSubscription = this.getUsersLimit(1);
      this.getRolesSubscription = this.roleService.getRoles().subscribe(roleService => {
        this.allRoles = roleService;
      });
    });
  }

  getUserByEmail(inputName: String) {
    this.userService.getUserbyEmail(inputName).subscribe(userFind => {   
      let users = [];
      users.push(userFind);
      this.users = users;
    });
  }

  getUsersLimit(pageId: Number) {
    this.userService.getAllUsers(pageId).subscribe(data => {
      this.users = data;
      this.allUsers = data;
      for (let user of this.users) {
        this.userService.getRoles(user.id).subscribe(date2 => {
          user.roles = date2;
        });
      }
    });
  }

  showUsers() {
    this.users = this.allUsers;
  }

  search(){
    this.users = this.allUsers.filter(value => {
      if(value.email) {
        return value.email.toLowerCase().indexOf(this.inputName.toLowerCase()) > -1
      }
      return false;
    });
  }

  isCurrent(user: User):boolean {
    if(this.userId) {
      return user.id === this.userId;
    }
  }

  showActive() {
    this.users = this.allUsers.filter(user => {
      return user.active;
    });
  }

  showDeactivated() {
    this.users = this.allUsers.filter(user => {
      return !user.active;
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
}
