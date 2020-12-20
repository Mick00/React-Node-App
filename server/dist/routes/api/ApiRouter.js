"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = require("./authentication");
const securityOptions_1 = require("./securityOptions");
const customers_1 = require("./customers");
const users_1 = require("./users");
exports.router = express_1.Router();
exports.router.use("/auth", authentication_1.router);
exports.router.use("/options", securityOptions_1.router);
exports.router.use("/customers", customers_1.router);
exports.router.use("/users", users_1.router);
//# sourceMappingURL=ApiRouter.js.map