import { Role } from './Role';

export class User{
    id: number;
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
    active: boolean;
    roles: Role[];
}
