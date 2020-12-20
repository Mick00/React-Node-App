"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_1 = require("../../middleware/authenticate");
const Config_1 = require("../../Config");
const hasPermission_1 = require("../../middleware/hasPermission");
const Permissions_1 = require("../../database/Permissions");
const Events_1 = require("../../Events");
exports.router = express_1.Router();
exports.router.get("/security", authenticate_1.authenticateWithJWT, hasPermission_1.hasPermissionId(Permissions_1.CONFIG_SECURITY_READ), (req, res, next) => {
    res.send(Config_1.config);
});
exports.router.post("/security", authenticate_1.authenticateWithJWT, hasPermission_1.hasPermissionId(Permissions_1.CONFIG_SECURITY_WRITE), (req, res) => {
    Config_1.setConfig(req.body.config);
    const { user } = req;
    Events_1.eventEmitter.emit(Events_1.CONFIG_UPDATE_EVENT, req.body.config, user.username);
    res.sendStatus(200);
});
//# sourceMappingURL=securityOptions.js.map