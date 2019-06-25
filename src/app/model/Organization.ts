import {User} from './User';

export class Organization {
  id: number;
  name: string;
  address: string;
  responsiblePersons: User[];
  numberToDo: number;
  numberInProgress: number;
  numberDone: number;
}
