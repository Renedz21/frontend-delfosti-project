import { User } from "../interfaces/user.interface";

export class Session {
    authenticated: boolean = false;
    user?: User;
    token?: string;

    constructor(token: string, user?: User) {
        this.user = user;
        this.token = token;
    }
}