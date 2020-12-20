"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Users_1 = require("../../database/Users");
const jwt_1 = require("../../jwt");
const authenticate_1 = require("../../middleware/authenticate");
const Config_1 = require("../../Config");
const rate_limiter_flexible_1 = require("rate-limiter-flexible");
const Events_1 = require("../../Events");
const passwords_1 = require("../../passwords");
exports.router = express_1.Router();
const getRateLimiterOptions = () => ({
    points: Config_1.config.maxConnectionAttempts,
    duration: Config_1.config.connectionTimeout,
});
let rateLimiter = new rate_limiter_flexible_1.RateLimiterMemory(getRateLimiterOptions());
Events_1.eventEmitter.on("update", () => {
    rateLimiter = new rate_limiter_flexible_1.RateLimiterMemory(getRateLimiterOptions());
});
exports.router.post("/login", (req, res) => {
    rateLimiter.consume(req.connection.remoteAddress, 1).then(() => {
        const { username, password } = req.body;
        if (username && password) {
            const user = Users_1.getUser(username);
            if (user) {
                if (user.disabled) {
                    res.send({ failed: true, message: "Account disabled, contact an administrator." });
                    Events_1.eventEmitter.emit(Events_1.LOGGIN_FAILED, req.connection.remoteAddress, username);
                    return;
                }
                else {
                    user.comparePassword(password).then((passwordOk) => {
                        if (passwordOk) {
                            res.send(jwt_1.signJWT(user));
                            Events_1.eventEmitter.emit(Events_1.LOGGIN_SUCCESS, req.connection.remoteAddress, user.username);
                            return;
                        }
                        else {
                            res.send({ failed: true, message: "Wrong password or username" });
                            Events_1.eventEmitter.emit(Events_1.LOGGIN_FAILED, req.connection.remoteAddress, username);
                        }
                    });
                }
            }
            else {
                res.send({ failed: true, message: "Wrong password or username" });
                Events_1.eventEmitter.emit(Events_1.LOGGIN_FAILED, req.connection.remoteAddress, username);
            }
        }
    }).catch(() => res.sendStatus(429));
});
exports.router.post("/validate", authenticate_1.authenticateWithJWT, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { user } = req;
    if (user.disabled) {
        res.send({ failed: true, message: "Account disabled, contact an administrator." });
        return;
    }
    res.send(jwt_1.signJWT(user));
}));
exports.router.post("/reset_password", authenticate_1.authenticateWithJWT, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { user } = req;
    const { password, newPassword, newPasswordConfirm } = req.body;
    user.comparePassword(password).then((passwordOk) => {
        if (passwordOk) {
            if (newPassword === newPasswordConfirm) {
                if (password !== newPassword) {
                    try {
                        passwords_1.assertPasswordPolitics(newPassword);
                        user.hashAndSetPassword(newPassword)
                            .then(() => {
                            res.sendStatus(200);
                            user.passwordNeedsReset = false;
                        });
                    }
                    catch (e) {
                        res.send({ failed: true, message: e.message });
                    }
                }
                else {
                    res.send({ failed: true, message: "New password can't be the same as the old password" });
                }
            }
            else {
                res.send({ failed: true, message: "New password is not the same" });
            }
        }
        else {
            res.send({ failed: true, message: "Wrong password" });
        }
    });
}));
//# sourceMappingURL=authentication.js.map