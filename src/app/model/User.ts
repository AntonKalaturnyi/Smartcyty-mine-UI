import { Role } from './Role';

export class User {
    id: number;
    name: string;
    surname: string;
    middleName: string;
    email: string;
    phone: string;
    active: boolean;
    roles: Role[];
}
