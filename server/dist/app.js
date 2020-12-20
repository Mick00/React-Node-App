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
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const router_1 = require("./router");
const Users_1 = require("./database/Users");
const Groups_1 = require("./database/Groups");
const Permissions_1 = require("./database/Permissions");
const Logger_1 = __importDefault(require("./Logger"));
Logger_1.default();
const seed = () => __awaiter(this, void 0, void 0, function* () {
    yield Permissions_1.seedPermissions();
    yield Groups_1.seedGroups();
    yield Users_1.seedUsers();
});
seed().then(() => {
    const app = express_1.default();
    const port = 3100;
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use(body_parser_1.default.json());
    app.use(cors_1.default());
    app.use("/", router_1.router);
    /* Handling not found url */
    app.use((req, res) => {
        res.send("Not found!");
    });
    /* Handling exceptions to always return json format */
    app.use((err, req, res, next) => {
        console.log(err);
        res.send("Exception!");
    });
    app.listen(port, () => {
        return console.log(`server is listening on ${port}`);
    });
});
//# sourceMappingURL=app.js.map