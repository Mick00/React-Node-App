"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../data/User"));
const Groups_1 = require("./Groups");
const addUser = (username, password, group = Groups_1.getGroup(Groups_1.VISITOR_GROUP)) => __awaiter(this, void 0, void 0, function* () {
    const user = new User_1.default(username, "");
    yield user.hashAndSetPassword(password);
    user.groups.push(group);
    exports.users.push(user);
    return user;
});
exports.users = [];
exports.seedUsers = () => __awaiter(this, void 0, void 0, function* () {
    yield addUser("Administrateur", "0", Groups_1.getGroup(Groups_1.ADMIN_GROUP));
    yield addUser("Utilisateur1", "0", Groups_1.getGroup(Groups_1.RESIDENTIAL_ATTENDANT_GROUP));
    yield addUser("Utilisateur2", "0", Groups_1.getGroup(Groups_1.COMMERCIAL_ATTENDANT_GROUP));
    const disabledUser = yield addUser("disabled", "0", Groups_1.getGroup(Groups_1.COMMERCIAL_ATTENDANT_GROUP));
    disabledUser.disabled = true;
    const needResetUser = yield addUser("needreset", "0", Groups_1.getGroup(Groups_1.COMMERCIAL_ATTENDANT_GROUP));
    needResetUser.passwordNeedsReset = true;
});
exports.getUser = (username) => {
    return exports.users.find(user => user.username === username);
};
exports.getUserById = (id) => {
    return exports.users.find(user => user.id === id);
};
//# sourceMappingURL=Users.js.map