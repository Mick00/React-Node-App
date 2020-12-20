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
const express_1 = __importDefault(require("express"));
const Car_1 = require("../../data/Car");
exports.router = express_1.default.Router();
exports.router.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const allCars = yield Car_1.loadAll();
    res.send(allCars);
}));
exports.router.get("/series/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.send(yield Car_1.load(req.params.id));
}));
exports.router.get("/brand/:brand", (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.send(yield Car_1.loadBrand(req.params.brand));
}));
exports.router.post("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.send(yield Car_1.save(req.body.car));
}));
//# sourceMappingURL=Cars.js.map