"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = require("./DB");
exports.init = () => {
    Promise.all([createCarsTable(), createBillsTable()])
        .then(() => console.log("Tables are up"))
        .catch((err) => console.log("Erreur", err));
};
const createCarsTable = () => {
    return DB_1.query("CREATE TABLE IF NOT EXISTS cars(" +
        "series VARCHAR(50) UNIQUE," +
        "brand VARCHAR(50)," +
        "model VARCHAR(50)," +
        "yearMade INTEGER," +
        "weight DOUBLE," +
        "price DOUBLE," +
        "INDEX (series))");
};
const createBillsTable = () => {
    return DB_1.query("CREATE TABLE IF NOT EXISTS bills(" +
        "id VARCHAR(50) UNIQUE," +
        "customerName VARCHAR(100)," +
        "cost DOUBLE," +
        "INDEX (id))");
};
//# sourceMappingURL=tables.js.map