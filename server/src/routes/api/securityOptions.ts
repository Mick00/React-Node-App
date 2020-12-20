import {Router} from "express";
import {authenticateWithJWT} from "../../middleware/authenticate";
import {config, setConfig} from "../../Config";
import {hasPermissionId} from "../../middleware/hasPermission";
import {CONFIG_SECURITY_READ, CONFIG_SECURITY_WRITE} from "../../database/Permissions";
import {CONFIG_UPDATE_EVENT, eventEmitter} from "../../Events";
import {IUser} from "../../data/User";

export const router = Router();

router.get("/security", authenticateWithJWT,  hasPermissionId(CONFIG_SECURITY_READ), (req, res, next) => {
    res.send(config);
});

router.post("/security", authenticateWithJWT, hasPermissionId(CONFIG_SECURITY_WRITE), (req, res) =>{
    setConfig(req.body.config);
    const {user} = req as unknown as {user: IUser};
    eventEmitter.emit(CONFIG_UPDATE_EVENT, req.body.config, user.username);
    res.sendStatus(200);
});
