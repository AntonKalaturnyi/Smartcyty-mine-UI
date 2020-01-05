import { Role } from './Role';

export class User {
    id: number;
    firstName: string;
    lastName: string;
    middleName: string;
    sex: string;
    email: string;
    phone: string;
    active: boolean;
    roles: Role[];
    registrationDate: any;
    birthDate: any;
}
