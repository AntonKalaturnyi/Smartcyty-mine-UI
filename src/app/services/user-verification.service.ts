import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserVerificationService {

  constructor() {

  }

  adminVerification(): boolean {
    if (localStorage.getItem('ROLE_ADMIN')) {
      return true;
    }
    return false;
  }

  supervisorVerification(): boolean {
    if (localStorage.getItem('ROLE_SUPERVISOR')) {
      return true;
    }
    return false;
  }

  responsiblePersonVerification(): boolean {
    if (localStorage.getItem('ROLE_RESPONSIBLE_PERSON')) {
      return true;
    }
    return false;
  }

  userVerification(): boolean {
    if (localStorage.getItem('ROLE_USER')) {
      return true;
    }
    return false;
  }
}
