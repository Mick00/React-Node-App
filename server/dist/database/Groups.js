"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Group_1 = __importDefault(require("../data/Group"));
const Permissions_1 = require("./Permissions");
exports.groups = [];
exports.ADMIN_GROUP = "admin";
exports.RESIDENTIAL_ATTENDANT_GROUP = "residential_attendant";
exports.COMMERCIAL_ATTENDANT_GROUP = "commercial_attendant";
exports.VISITOR_GROUP = "visitor";
exports.seedGroups = () => {
    return new Promise(resolve => {
        exports.groups.push(new Group_1.default(exports.ADMIN_GROUP, "Administrator", Permissions_1.getPermissions([
            Permissions_1.CONFIG_SECURITY_READ,
            Permissions_1.CONFIG_SECURITY_WRITE,
            Permissions_1.CUSTOMER_COMMERCIAL_READ,
            Permissions_1.CUSTOMER_RESIDENTIAL_READ,
            Permissions_1.USER_READ,
            Permissions_1.USER_RESET_PASSWORD,
            Permissions_1.USER_DISABLE,
        ])));
        exports.groups.push(new Group_1.default(exports.RESIDENTIAL_ATTENDANT_GROUP, "Residential attendant", Permissions_1.getPermissions([
            Permissions_1.CUSTOMER_RESIDENTIAL_READ,
        ])));
        exports.groups.push(new Group_1.default(exports.COMMERCIAL_ATTENDANT_GROUP, "Commercial attendant", Permissions_1.getPermissions([
            Permissions_1.CUSTOMER_COMMERCIAL_READ,
        ])));
        exports.groups.push(new Group_1.default(exports.VISITOR_GROUP, "Commercial attendant", []));
        resolve();
    });
};
exports.getGroup = (groupId) => {
    return exports.groups.find(group => group.id === groupId);
};
//# sourceMappingURL=Groups.js.map