"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
exports.CONFIG_UPDATE_EVENT = "config_update";
exports.LOGGIN_FAILED = "login_failed";
exports.LOGGIN_SUCCESS = "login_succes";
exports.PASSWORD_RESET = "password_reset";
// @ts-ignore
exports.eventEmitter = new events_1.default();
//# sourceMappingURL=Events.js.map