"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ApiRouter_1 = require("./routes/api/ApiRouter");
exports.router = express_1.Router();
exports.router.use("/api/v1", ApiRouter_1.router);
//# sourceMappingURL=router.js.map