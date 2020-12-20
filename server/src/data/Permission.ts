export interface IPermission {
    id: string;
    name: string;
}

export default class Permission implements IPermission {
    id: string;
    name: string;

    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
