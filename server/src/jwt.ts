import jwt from "jsonwebtoken";
import {IUser} from "./data/User";
import {env} from "./env";
import {config} from "./Config";

export const signJWT = (user: IUser) => {
    const userCred = {
        username: user.username,
        passwordNeedsReset: user.passwordNeedsReset,
        disabled: user.disabled,
        permissions: user.getPermissions(),
    };
    return {
        token: jwt.sign(userCred, env.TOKEN_KEY, { expiresIn: config.jwtExpiry}),
        expiry: config.jwtExpiry,
        user: userCred,
    };
};

export const verifyJWT = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token,  env.TOKEN_KEY, (err, user) => {
            if (err) {
                reject(err);
            }
            resolve(user);
        });
    });
};
