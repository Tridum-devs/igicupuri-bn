
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class UserInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export class LoginInput {
    email: string;
    password: string;
}

export abstract class IQuery {
    abstract welcomeMessage(): Nullable<string> | Promise<Nullable<string>>;

    abstract verifyEmail(token: string): string | Promise<string>;
}

export class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    isVerified: boolean;
}

export class LoginResponse {
    message: string;
    token: string;
}

export abstract class IMutation {
    abstract createUser(userInput: UserInput): User | Promise<User>;

    abstract loginUser(loginInput: LoginInput): LoginResponse | Promise<LoginResponse>;
}

type Nullable<T> = T | null;
