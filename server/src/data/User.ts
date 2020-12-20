import bcrypt from "bcrypt";
import {IGroup} from "./Group";
import {eventEmitter, PASSWORD_RESET} from "../Events";

const saltRound = 12;

export interface IUser {
    id: number;
    username: string;
    password: string;
    groups: IGroup[];
    passwordNeedsReset: boolean;
    lastPasswordReset: Date;
    disabled: boolean;
    hashAndSetPassword(plaintext: string);
    comparePassword(password: string);
    hasPermission(permission: string): boolean;
    getPermissions(): string[];
}

export default class User implements IUser {
    static idCounter = 1;

    id: number;
    username: string;
    password: string;
    groups: IGroup[];
    passwordNeedsReset = false;
    lastPasswordReset = new Date();
    disabled = false;

    constructor(username, password, groups: IGroup[] = []) {
        this.id = User.idCounter++;
        this.username = username;
        this.password = password;
        this.groups = groups;
    }

    public async hashAndSetPassword(plaintext: string) {
        this.lastPasswordReset = new Date();
        this.password = await bcrypt.hash(plaintext, saltRound);
        eventEmitter.emit(PASSWORD_RESET, this);
    }

    public async comparePassword(plaintext: string) {
        return await bcrypt.compare(plaintext, this.password);
    }

    hasPermission(permission: string): boolean {
        return this.getPermissions().includes(permission);
    }

    getPermissions(): string[] {
        return this.groups.map(group => group.permissions)
            .reduce((acc, value) => acc.concat(value))
            .map(perm => perm.id);
    }
}
