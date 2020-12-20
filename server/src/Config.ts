import EventEmitter from 'events';
import {eventEmitter} from "./Events";

interface IConfig {
    jwtExpiry: string,
    maxConnectionAttempts: number,
    connectionTimeout: number,
    passwordMinLength: number,
    passwordNeedsSpecial: boolean,
}

export let config: IConfig = {
    jwtExpiry: "3600s",
    maxConnectionAttempts: 3,
    connectionTimeout: 10,
    passwordMinLength: 8,
    passwordNeedsSpecial: true,
};

export const setConfig = (newConf: IConfig) => {
    config = newConf;
}
