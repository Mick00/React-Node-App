"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("./env");
const Config_1 = require("./Config");
exports.signJWT = (user) => {
    const userCred = {
        username: user.username,
        passwordNeedsReset: user.passwordNeedsReset,
        disabled: user.disabled,
        permissions: user.getPermissions(),
    };
    return {
        token: jsonwebtoken_1.default.sign(userCred, env_1.env.TOKEN_KEY, { expiresIn: Config_1.config.jwtExpiry }),
        expiry: Config_1.config.jwtExpiry,
        user: userCred,
    };
};
exports.verifyJWT = (token) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, env_1.env.TOKEN_KEY, (err, user) => {
            if (err) {
                reject(err);
            }
            resolve(user);
        });
    });
};
//# sourceMappingURL=jwt.js.map