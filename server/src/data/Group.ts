import {IPermission} from "./Permission";

export interface IGroup {
    id: string;
    name: string;
    permissions: IPermission[];
    hasPermission(permission: IPermission): boolean;
}

export default class Group implements IGroup {
    id: string;
    name: string;
    permissions: IPermission[];

    constructor(id: string, name: string, permissions: IPermission[] = []) {
        this.id = id;
        this.name = name;
        this.permissions = permissions;
    }

    hasPermission(permission: IPermission) {
        return this.permissions.includes(permission);
    }
}
