"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_1 = require("../../middleware/authenticate");
const hasPermission_1 = require("../../middleware/hasPermission");
const Permissions_1 = require("../../database/Permissions");
const Users_1 = require("../../database/Users");
exports.router = express_1.Router();
exports.router.get("/", authenticate_1.authenticateWithJWT, hasPermission_1.hasPermissionId(Permissions_1.USER_READ), (req, res, next) => {
    res.send(Users_1.users);
});
exports.router.post('/:username/disable', authenticate_1.authenticateWithJWT, hasPermission_1.hasPermissionId(Permissions_1.USER_DISABLE), (req, res) => {
    const user = Users_1.getUser(req.params.username);
    if (user) {
        user.disabled = req.body.disabled;
        console.log(user.disabled);
        res.send(200);
    }
    else {
        console.log("not found");
        res.send(404);
    }
});
exports.router.post('/:username/forcePasswordReset', authenticate_1.authenticateWithJWT, hasPermission_1.hasPermissionId(Permissions_1.USER_RESET_PASSWORD), (req, res) => {
    const user = Users_1.getUser(req.params.username);
    if (user) {
        user.passwordNeedsReset = req.body.passwordNeedsReset;
        res.sendStatus(200);
    }
    else {
        res.sendStatus(404);
    }
});
//# sourceMappingURL=users.js.map