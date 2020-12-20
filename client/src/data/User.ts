export interface IUser {
    username: string,
    uid: number,
    token: string,
    permissions: string[];
    passwordNeedsReset?: boolean;
    disabled?: boolean;
    hasPermission(permission: string): boolean;
}

export default class User implements IUser{
    uid: number;
    username: string;
    token: string;
    permissions: string[];
    passwordNeedsReset;
    disabled = false;

    constructor(uid: number, username: string, token:string, permissions:string[] = [], passwordNeedsReset = false) {
        this.uid = uid;
        this.username = username;
        this.token = token;
        this.permissions = permissions;
        this.passwordNeedsReset = passwordNeedsReset;
    }

    hasPermission(permission: string){
        return this.permissions.includes(permission);
    }
}
