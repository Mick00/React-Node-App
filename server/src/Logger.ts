import {CONFIG_UPDATE_EVENT, eventEmitter, LOGGIN_FAILED, LOGGIN_SUCCESS, PASSWORD_RESET} from "./Events";

export default function initLogger() {
    eventEmitter.on(CONFIG_UPDATE_EVENT, (config, username) => {
        console.log("Config update by "+username, config);
    })

    eventEmitter.on(LOGGIN_FAILED, (ip, username) => {
        console.log("Loggin failed from "+ip+", username: "+username);
    })

    eventEmitter.on(LOGGIN_SUCCESS, (ip, username) => {
        console.log("Loggin success from "+ip+", username: "+username);
    })

    eventEmitter.on(PASSWORD_RESET, (user)=>{
        console.log(user.username+" reset password");
    });
}
