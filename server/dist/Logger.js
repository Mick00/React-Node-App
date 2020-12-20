"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Events_1 = require("./Events");
function initLogger() {
    Events_1.eventEmitter.on(Events_1.CONFIG_UPDATE_EVENT, (config, username) => {
        console.log("Config update by " + username, config);
    });
    Events_1.eventEmitter.on(Events_1.LOGGIN_FAILED, (ip, username) => {
        console.log("Loggin failed from " + ip + ", username: " + username);
    });
    Events_1.eventEmitter.on(Events_1.LOGGIN_SUCCESS, (ip, username) => {
        console.log("Loggin success from " + ip + ", username: " + username);
    });
    Events_1.eventEmitter.on(Events_1.PASSWORD_RESET, (user) => {
        console.log(user.username + " reset password");
    });
}
exports.default = initLogger;
//# sourceMappingURL=Logger.js.map