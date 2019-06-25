import {Injectable} from '@angular/core';
import {UserService} from './user.service';
import {User} from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserVerificationService {

  authenticatedUser: User;

  constructor(private userService: UserService) {
    this.userService.getAuthenticatedUser().subscribe(authenticatedUser => {
      this.authenticatedUser = authenticatedUser;
      this.userService.getRoles(this.authenticatedUser.id).subscribe(roles => {
        this.authenticatedUser.roles = roles;
      });
    });
  }

  adminVerification(): boolean {
    if (this.authenticatedUser && this.authenticatedUser.roles) {
      return this.authenticatedUser.roles.some((item) => item.name === 'ROLE_ADMIN');
    }
  }

  supervisorVerification(): boolean {
    if (this.authenticatedUser && this.authenticatedUser.roles) {
      return this.authenticatedUser.roles.some((item) => item.name === 'ROLE_SUPERVISOR');
    }
  }

  responsiblePersonVerification(): boolean {
    if (this.authenticatedUser && this.authenticatedUser.roles) {
      return this.authenticatedUser.roles.some((item) => item.name === 'ROLE_RESPONSIBLE_PERSON');
    }
  }

  userVerification(): boolean {
    if (this.authenticatedUser && this.authenticatedUser.roles) {
      return this.authenticatedUser.roles.some((item) => item.name === 'ROLE_USER');
    }
  }

}
