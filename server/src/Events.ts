import EventEmitter from "events";

export const CONFIG_UPDATE_EVENT = "config_update";
export const LOGGIN_FAILED = "login_failed";
export const LOGGIN_SUCCESS = "login_succes";
export const PASSWORD_RESET = "password_reset"

// @ts-ignore
export const eventEmitter: EventEmitter = new EventEmitter();
