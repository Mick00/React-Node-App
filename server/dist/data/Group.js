"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Group {
    constructor(id, name, permissions = []) {
        this.id = id;
        this.name = name;
        this.permissions = permissions;
    }
    hasPermission(permission) {
        return this.permissions.includes(permission);
    }
}
exports.default = Group;
//# sourceMappingURL=Group.js.map