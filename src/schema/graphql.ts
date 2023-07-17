
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

export abstract class IQuery {
    abstract welcomeMessage(): Nullable<string> | Promise<Nullable<string>>;
}

export class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export abstract class IMutation {
    abstract createUser(userInput: UserInput): User | Promise<User>;
}

type Nullable<T> = T | null;
