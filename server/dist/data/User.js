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
const bcrypt_1 = __importDefault(require("bcrypt"));
const Events_1 = require("../Events");
const saltRound = 12;
class User {
    constructor(username, password, groups = []) {
        this.passwordNeedsReset = false;
        this.lastPasswordReset = new Date();
        this.disabled = false;
        this.id = User.idCounter++;
        this.username = username;
        this.password = password;
        this.groups = groups;
    }
    hashAndSetPassword(plaintext) {
        return __awaiter(this, void 0, void 0, function* () {
            this.lastPasswordReset = new Date();
            this.password = yield bcrypt_1.default.hash(plaintext, saltRound);
            Events_1.eventEmitter.emit(Events_1.PASSWORD_RESET, this);
        });
    }
    comparePassword(plaintext) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default.compare(plaintext, this.password);
        });
    }
    hasPermission(permission) {
        return this.getPermissions().includes(permission);
    }
    getPermissions() {
        return this.groups.map(group => group.permissions)
            .reduce((acc, value) => acc.concat(value))
            .map(perm => perm.id);
    }
}
User.idCounter = 1;
exports.default = User;
//# sourceMappingURL=User.js.map