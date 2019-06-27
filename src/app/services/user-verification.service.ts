import {Injectable} from '@angular/core';
import {UserService} from './user.service';
import {User} from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserVerificationService {

  authenticatedUser: User;

  constructor(private userService: UserService) {
   
  }

  adminVerification(): boolean {
    if(localStorage.getItem('ROLE_ADMIN')){
      return true;
    }
    return false;
  }

  supervisorVerification(): boolean {
    if(localStorage.getItem('ROLE_SUPERVISOR')){
      return true;
    }
    return false;
  }

  responsiblePersonVerification(): boolean {
    if(localStorage.getItem('ROLE_RESPONSIBLE_PERSON')){
      return true;
    }
    return false;
  }

  userVerification(): boolean {
    if(localStorage.getItem('ROLE_USER')){
      return true;
    }
    return false;
  }

}
