import { Router } from "express";
import {getUser} from "../../database/Users";
import {signJWT} from "../../jwt";
import {authenticateWithJWT} from "../../middleware/authenticate";
import {config} from "../../Config";
import {RateLimiterMemory} from "rate-limiter-flexible";
import {LOGGIN_FAILED, LOGGIN_SUCCESS, eventEmitter} from "../../Events";
import {assertPasswordPolitics} from "../../passwords";

export const router = Router();

const getRateLimiterOptions = () => ({
    points: config.maxConnectionAttempts,
    duration: config.connectionTimeout,
})

let rateLimiter = new RateLimiterMemory(getRateLimiterOptions())

eventEmitter.on("update", () => {
    rateLimiter = new RateLimiterMemory(getRateLimiterOptions());
})

router.post("/login",  (req, res) => {
    rateLimiter.consume(req.connection.remoteAddress,1).then( () => {
        const {username, password} = req.body;
        if (username && password) {
            const user = getUser(username);
            if (user) {
                if(user.disabled){
                    res.send({failed: true, message: "Account disabled, contact an administrator."});
                    eventEmitter.emit(LOGGIN_FAILED, req.connection.remoteAddress, username);
                    return;
                } else {
                    user.comparePassword(password).then((passwordOk) => {
                        if (passwordOk) {
                            res.send(signJWT(user));
                            eventEmitter.emit(LOGGIN_SUCCESS, req.connection.remoteAddress, user.username)
                            return;
                        } else {
                            res.send({failed: true, message: "Wrong password or username"});
                            eventEmitter.emit(LOGGIN_FAILED, req.connection.remoteAddress, username);
                        }
                    })
                }
            } else {
                res.send({failed: true, message: "Wrong password or username"});
                eventEmitter.emit(LOGGIN_FAILED, req.connection.remoteAddress, username);
            }
        }
    }).catch(() => res.sendStatus(429))
});

router.post("/validate", authenticateWithJWT, async (req,res) => {
    const {user} = req as any;
    if(user.disabled){
        res.send({failed: true, message: "Account disabled, contact an administrator."});
        return;
    }
    res.send(signJWT(user));
})

router.post("/reset_password", authenticateWithJWT, async (req,res) => {
    const {user} = req as any;
    const {password, newPassword, newPasswordConfirm} = req.body;
    user.comparePassword(password).then((passwordOk) => {
        if (passwordOk){
            if (newPassword === newPasswordConfirm){
                if (password !== newPassword){
                    try {
                        assertPasswordPolitics(newPassword);
                        user.hashAndSetPassword(newPassword)
                            .then(() => {
                                res.sendStatus(200);
                                user.passwordNeedsReset = false;
                            });
                    } catch (e) {
                        res.send({failed: true, message: e.message})
                    }
                } else {
                    res.send({failed: true, message: "New password can't be the same as the old password"})
                }
            } else {
                res.send({failed: true, message: "New password is not the same"})
            }
        } else {
            res.send({failed: true, message: "Wrong password"})
        }

    })
})
