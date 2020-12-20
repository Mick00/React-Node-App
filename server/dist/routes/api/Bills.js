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
const Bill_1 = require("../../data/Bill");
exports.router = express_1.Router();
exports.router.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.send(yield Bill_1.loadAll());
}));
exports.router.post("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.send(yield Bill_1.save(req.body.bill));
}));
exports.router.get("/id/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.send(yield Bill_1.load(req.params.id));
}));
exports.router.get("/name/:name", (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.send(yield Bill_1.loadByName(req.params.name));
}));
//# sourceMappingURL=Bills.js.map