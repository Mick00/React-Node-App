"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("./Config");
exports.assertPasswordPolitics = (password) => {
    const specialChar = ["!", "@", "#", "$", "%", "^", "&", "*", "-", "_"];
    if (password.length >= Config_1.config.passwordMinLength) {
        if (!Config_1.config.passwordNeedsSpecial) {
            return true;
        }
        else {
            const hasSpecialChar = !!specialChar.find(char => password.includes(char));
            if (hasSpecialChar) {
                return hasSpecialChar;
            }
            else {
                throw new Error("Password needs to contain one of the following char: " + specialChar.join());
            }
        }
    }
    throw new Error("Minimum length for password is " + Config_1.config.passwordMinLength);
};
//# sourceMappingURL=passwords.js.map