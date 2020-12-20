"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = {
    jwtExpiry: "3600s",
    maxConnectionAttempts: 3,
    connectionTimeout: 10,
    passwordMinLength: 8,
    passwordNeedsSpecial: true,
};
exports.setConfig = (newConf) => {
    exports.config = newConf;
};
//# sourceMappingURL=Config.js.map