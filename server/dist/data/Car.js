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
exports.load = (series) => __awaiter(this, void 0, void 0, function* () {
    const result = yield DB_1.query("SELECT * FROM cars WHERE series = ?", [series]);
    return result.result;
});
exports.loadAll = () => __awaiter(this, void 0, void 0, function* () {
    const allCars = yield DB_1.query("SELECT * FROM cars");
    return allCars.result;
});
exports.loadBrand = (brand) => __awaiter(this, void 0, void 0, function* () {
    const allCars = yield DB_1.query("SELECT * FROM cars WHERE brand LIKE ?", [brand + "%"]);
    console.log(allCars.result);
    return allCars.result;
});
exports.save = (car) => __awaiter(this, void 0, void 0, function* () {
    let result = null;
    const carExists = (yield exports.load(car.series)).length > 0;
    if (carExists) {
        result = (yield DB_1.query("UPDATE cars SET brand = ?, model = ?, yearMade = ?, weight = ?, price = ? WHERE series = ?", [car.brand, car.model, car.yearMade, car.weight, car.price, car.series]));
    }
    else {
        result = (yield DB_1.query("INSERT INTO cars(series, brand, model, yearMade, weight, price) VALUES (?,?,?,?,?,?)", [car.series, car.brand, car.model, car.yearMade, car.weight, car.price]));
    }
    return result;
});
//# sourceMappingURL=Car.js.map