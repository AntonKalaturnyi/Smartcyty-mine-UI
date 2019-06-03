import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentMessageService {

  messageProvider = new BehaviorSubject(Object);
  currentMessage = this.messageProvider.asObservable();

  constructor() { }

  changeMessage(obj) {
    this.messageProvider.next(obj);
  }
}
