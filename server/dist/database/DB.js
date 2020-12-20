"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const env_1 = require("../env");
exports.db = mysql_1.default.createPool({
    connectionLimit: 10,
    host: env_1.env.DB_HOST,
    user: env_1.env.DB_USER,
    password: env_1.env.DB_PASS,
    database: env_1.env.DB_NAME,
});
exports.query = (queryString, args) => {
    return new Promise(((resolve, reject) => {
        exports.db.query(queryString, args, (err, result, fields) => {
            if (err) {
                reject(err);
            }
            resolve({ result, fields });
        });
    }));
};
//# sourceMappingURL=DB.js.map