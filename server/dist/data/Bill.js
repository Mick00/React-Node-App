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
const DB_1 = require("../database/DB");
exports.loadAll = () => __awaiter(this, void 0, void 0, function* () {
    const result = yield DB_1.query("SELECT * FROM bills");
    return result.result;
});
exports.load = (id) => __awaiter(this, void 0, void 0, function* () {
    const result = yield DB_1.query("SELECT * FROM bills WHERE id = ?", [id]);
    return result.result;
});
exports.loadByName = (name) => __awaiter(this, void 0, void 0, function* () {
    const result = yield DB_1.query("SELECT * FROM bills WHERE customerName = ?", [`%${name}%`]);
    return result.result;
});
exports.save = (bill) => __awaiter(this, void 0, void 0, function* () {
    let result = null;
    const billExists = (yield exports.load(bill.id)).length > 0;
    if (billExists) {
        result = (yield DB_1.query("UPDATE bills SET customerName = ?, cost = ? WHERE id = ?", [bill.customerName, bill.cost, bill.id]));
    }
    else {
        result = (yield DB_1.query("INSERT INTO bills(id, customerName, cost) VALUES(?, ?, ?)", [bill.id, bill.customerName, bill.cost]));
    }
    return result;
});
//# sourceMappingURL=Bill.js.map