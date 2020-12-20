import {Router} from "express";
import {authenticateWithJWT} from "../../middleware/authenticate";
import {hasPermissionId} from "../../middleware/hasPermission";
import {USER_DISABLE, USER_READ, USER_RESET_PASSWORD} from "../../database/Permissions";
import {config} from "../../Config";
import {getUser, users} from "../../database/Users";

export const router = Router()

router.get("/",
    authenticateWithJWT,
    hasPermissionId(USER_READ),
    (req, res, next) => {
        res.send(users);
});

router.post('/:username/disable',
    authenticateWithJWT,
    hasPermissionId(USER_DISABLE),
    (req, res) =>{
        const user = getUser(req.params.username);
        if (user){
            user.disabled = req.body.disabled;
            console.log(user.disabled);
            res.send(200);
        } else {
            console.log("not found")
            res.send(404);
        }
})

router.post('/:username/forcePasswordReset',
    authenticateWithJWT,
    hasPermissionId(USER_RESET_PASSWORD),
    (req, res) => {
        const user = getUser(req.params.username);
        if (user){
            user.passwordNeedsReset = req.body.passwordNeedsReset;
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    })
