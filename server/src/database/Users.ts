import User, {IUser} from "../data/User";
import {ADMIN_GROUP, COMMERCIAL_ATTENDANT_GROUP, getGroup, RESIDENTIAL_ATTENDANT_GROUP, VISITOR_GROUP} from "./Groups";

const addUser = async (username, password, group = getGroup(VISITOR_GROUP)) => {
    const user = new User(username, "");
    await user.hashAndSetPassword(password);
    user.groups.push(group);
    users.push(user);
    return user;
};

export const users: IUser[] = [];

export const seedUsers = async () => {
    await addUser("Administrateur", "0", getGroup(ADMIN_GROUP));
    await addUser("Utilisateur1", "0", getGroup(RESIDENTIAL_ATTENDANT_GROUP));
    await addUser("Utilisateur2", "0", getGroup(COMMERCIAL_ATTENDANT_GROUP));
    const disabledUser = await addUser("disabled", "0", getGroup(COMMERCIAL_ATTENDANT_GROUP));
    disabledUser.disabled = true;
    const needResetUser = await addUser("needreset", "0", getGroup(COMMERCIAL_ATTENDANT_GROUP));
    needResetUser.passwordNeedsReset = true;
};

export const getUser = (username: string) => {
    return users.find(user => user.username === username);
};

export const getUserById = (id: number) => {
    return users.find(user => user.id === id);
};
