export class User {
    id!: number;
    email!: string;
    password!: string;
    firstname!: string;
    lastname!: string;
}

export class UpdateUser {
    email!: string;
    password!: string;
    firstname!: string;
    lastname!: string;
}

export class UserLogin {
    email!: string;
    password!: string;
}