import Permission, {IPermission} from "../data/Permission";

export const permissions: IPermission[] = [];

export const CONFIG_SECURITY_READ = "config.security.read";
export const CONFIG_SECURITY_WRITE = "config.security.write";
export const CUSTOMER_RESIDENTIAL_READ = "customers.residential.read";
export const CUSTOMER_COMMERCIAL_READ = "customers.commercial.read";
export const USER_READ = "users.read";
export const USER_RESET_PASSWORD = "users.password.reset";
export const USER_DISABLE = "users.disable";

export const seedPermissions = () => {
    return new Promise((res) => {
        permissions.push(new Permission(CONFIG_SECURITY_READ, "View security config"));
        permissions.push(new Permission(CONFIG_SECURITY_WRITE, "Change security config"))
        permissions.push(new Permission(CUSTOMER_RESIDENTIAL_READ, "View residential customer data"));
        permissions.push(new Permission(CUSTOMER_COMMERCIAL_READ, "View commercial customer data"));
        permissions.push(new Permission(USER_READ, "View users"));
        permissions.push(new Permission(USER_RESET_PASSWORD, "Force a user to reset his password"));
        permissions.push(new Permission(USER_DISABLE, "Disable a user account"));
        res();
    });
};

export const getPermission = (id) => {
    return permissions.find(perm => perm.id === id);
};

export const getPermissions = (ids: string[]) => {
    return permissions.filter(perm => ids.includes(perm.id));
};
