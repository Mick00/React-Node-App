"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Permission_1 = __importDefault(require("../data/Permission"));
exports.permissions = [];
exports.CONFIG_SECURITY_READ = "config.security.read";
exports.CONFIG_SECURITY_WRITE = "config.security.write";
exports.CUSTOMER_RESIDENTIAL_READ = "customers.residential.read";
exports.CUSTOMER_COMMERCIAL_READ = "customers.commercial.read";
exports.USER_READ = "users.read";
exports.USER_RESET_PASSWORD = "users.password.reset";
exports.USER_DISABLE = "users.disable";
exports.seedPermissions = () => {
    return new Promise((res) => {
        exports.permissions.push(new Permission_1.default(exports.CONFIG_SECURITY_READ, "View security config"));
        exports.permissions.push(new Permission_1.default(exports.CONFIG_SECURITY_WRITE, "Change security config"));
        exports.permissions.push(new Permission_1.default(exports.CUSTOMER_RESIDENTIAL_READ, "View residential customer data"));
        exports.permissions.push(new Permission_1.default(exports.CUSTOMER_COMMERCIAL_READ, "View commercial customer data"));
        exports.permissions.push(new Permission_1.default(exports.USER_READ, "View users"));
        exports.permissions.push(new Permission_1.default(exports.USER_RESET_PASSWORD, "Force a user to reset his password"));
        exports.permissions.push(new Permission_1.default(exports.USER_DISABLE, "Disable a user account"));
        res();
    });
};
exports.getPermission = (id) => {
    return exports.permissions.find(perm => perm.id === id);
};
exports.getPermissions = (ids) => {
    return exports.permissions.filter(perm => ids.includes(perm.id));
};
//# sourceMappingURL=Permissions.js.map