"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hasPermission_1 = require("../../middleware/hasPermission");
const authenticate_1 = require("../../middleware/authenticate");
const Permissions_1 = require("../../database/Permissions");
exports.router = express_1.Router();
exports.router.get("/residential", authenticate_1.authenticateWithJWT, hasPermission_1.hasPermissionId(Permissions_1.CUSTOMER_RESIDENTIAL_READ), (req, res, next) => {
    res.send([
        {
            name: "Steeve Jean Jacques",
            address: "123 rue de la colline",
            phone: "(418) 123-3210",
        },
        {
            name: "Patricia Tremblay",
            address: "763 blv du Saguenay",
            phone: "(418) 543-0580",
        },
    ]);
});
exports.router.get("/commercial", authenticate_1.authenticateWithJWT, hasPermission_1.hasPermissionId(Permissions_1.CUSTOMER_COMMERCIAL_READ), (req, res, next) => {
    res.send([
        {
            name: "Karl avec un K",
            address: "888 rue des usines",
            business: "Karl Konstruit",
            phone: "(418) 123-3210",
        },
        {
            name: "Janie Thibeault",
            address: "763 blv du Saguenay",
            business: "Pharmarcie",
            phone: "(418) 543-0580",
        },
    ]);
});
//# sourceMappingURL=customers.js.map