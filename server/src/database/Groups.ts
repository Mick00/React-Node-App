import Group, {IGroup} from "../data/Group";
import {
    CONFIG_SECURITY_READ,
    CONFIG_SECURITY_WRITE,
    CUSTOMER_COMMERCIAL_READ,
    CUSTOMER_RESIDENTIAL_READ,
    getPermissions, USER_DISABLE, USER_READ, USER_RESET_PASSWORD
} from "./Permissions";

export const groups: IGroup[] = [];

export const ADMIN_GROUP = "admin";
export const RESIDENTIAL_ATTENDANT_GROUP = "residential_attendant";
export const COMMERCIAL_ATTENDANT_GROUP = "commercial_attendant";
export const VISITOR_GROUP = "visitor";

export const seedGroups = () => {
    return new Promise(resolve => {
        groups.push(
            new Group(ADMIN_GROUP, "Administrator", getPermissions([
                CONFIG_SECURITY_READ,
                CONFIG_SECURITY_WRITE,
                CUSTOMER_COMMERCIAL_READ,
                CUSTOMER_RESIDENTIAL_READ,
                USER_READ,
                USER_RESET_PASSWORD,
                USER_DISABLE,
            ])));
        groups.push(
            new Group(RESIDENTIAL_ATTENDANT_GROUP, "Residential attendant", getPermissions([
                CUSTOMER_RESIDENTIAL_READ,
            ])),
        );
        groups.push(
            new Group(COMMERCIAL_ATTENDANT_GROUP, "Commercial attendant", getPermissions([
                CUSTOMER_COMMERCIAL_READ,
            ])),
        );
        groups.push(new Group(VISITOR_GROUP, "Commercial attendant", []));
        resolve();
    });
};

export const getGroup = (groupId) => {
    return groups.find(group => group.id === groupId);
};
